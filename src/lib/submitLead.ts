export type LeadSource = "estimate-wizard" | "contact-form";

export async function submitLead(source: LeadSource, data: Record<string, unknown>): Promise<boolean> {
  try {
    const res = await fetch("/api/lead", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ source, ...data }),
    });
    return res.ok;
  } catch {
    return false;
  }
}
