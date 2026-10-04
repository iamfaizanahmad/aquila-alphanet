import { NextResponse } from "next/server";

/**
 * Receives leads from the home estimate wizard and the contact form.
 * Forwards the JSON payload to LEAD_WEBHOOK_URL (CRM / automation endpoint) when configured;
 * otherwise logs it so local development works without a backend.
 */
export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }
  const lead = { ...(body as Record<string, unknown>), receivedAt: new Date().toISOString() };

  const hook = process.env.LEAD_WEBHOOK_URL;
  if (!hook) {
    console.info("[lead]", JSON.stringify(lead));
    return NextResponse.json({ ok: true });
  }
  try {
    const res = await fetch(hook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(lead),
    });
    if (!res.ok) throw new Error(`Webhook responded ${res.status}`);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[lead] forward failed", err);
    return NextResponse.json({ ok: false }, { status: 502 });
  }
}
