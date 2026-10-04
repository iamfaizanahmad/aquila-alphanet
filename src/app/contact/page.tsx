import type { Metadata } from "next";
import { ContactForm, KalispellCard } from "@/components/ContactForm";
import { CONTACT } from "@/content/site";

export const metadata: Metadata = { title: "Contact Us — AlphaNet Solutions" };

const label = "block text-[12.5px] font-bold tracking-[.1em] text-subtle uppercase";
const linkCard =
  "flex items-center justify-between gap-3 rounded-[20px] border border-[rgba(255,255,255,.09)] bg-[rgba(255,255,255,.03)] bg-[image:radial-gradient(300px_circle_at_var(--mx,-999px)_var(--my,-999px),rgba(0,240,255,.1),transparent_50%)] px-6 py-[22px] text-ink hover:border-[rgba(0,240,255,.35)] hover:text-white";

export default function ContactPage() {
  return (
    <>
      <div className="pointer-events-none absolute top-0 right-0 left-0 h-[900px] bg-[radial-gradient(800px_520px_at_85%_-10%,rgba(0,240,255,.18),transparent_65%),radial-gradient(600px_420px_at_0%_10%,rgba(108,77,246,.18),transparent_60%)]" />
      <main>
        <section className="relative px-gutter pt-[clamp(56px,7vw,110px)] pb-[clamp(60px,7vw,110px)]">
          <div className="container-site">
            <div data-stagger="">
              <div className="kicker text-cyan">Contact Us</div>
              <h1 className="mt-5 mb-0 max-w-[14ch] font-display text-[clamp(40px,6vw,80px)] leading-[1.02] font-extrabold tracking-[-.035em]">
                Let’s build what’s next.
              </h1>
              <p className="mt-[22px] mb-0 max-w-[56ch] text-[clamp(16px,1.4vw,18.5px)] leading-[1.7] text-body-2">
                Ready to take your business to the next level? Contact us today to discuss how AlphaNet Solutions can
                help you achieve your goals.
              </p>
            </div>

            <div className="mt-[clamp(40px,5vw,64px)] grid grid-cols-[repeat(auto-fit,minmax(min(100%,420px),1fr))] items-start gap-[22px]">
              <ContactForm />

              <div data-stagger="" className="flex flex-col gap-[14px]">
                <KalispellCard />
                <a href={CONTACT.phoneHref} data-spot="" className={linkCard}>
                  <span>
                    <span className={label}>Contact #</span>
                    <span className="mt-[6px] block font-display text-[20px] font-bold">{CONTACT.phone}</span>
                  </span>
                  <span className="font-mono text-cyan">→</span>
                </a>
                <a href={`mailto:${CONTACT.email}`} data-spot="" className={linkCard}>
                  <span className="min-w-0">
                    <span className={label}>Email</span>
                    <span className="mt-[6px] block font-display text-[clamp(16px,1.7vw,20px)] font-bold wrap-anywhere">
                      {CONTACT.email}
                    </span>
                  </span>
                  <span className="font-mono text-cyan">→</span>
                </a>
                <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,160px),1fr))] gap-[14px]">
                  <div className="rounded-[20px] border border-[rgba(255,255,255,.09)] bg-[rgba(255,255,255,.03)] px-[22px] py-5">
                    <div className={label}>Fax #</div>
                    <div className="mt-[6px] font-display text-[18px] font-bold">{CONTACT.fax}</div>
                  </div>
                  <div className="rounded-[20px] border border-[rgba(255,255,255,.09)] bg-[rgba(255,255,255,.03)] px-[22px] py-5">
                    <div className={label}>Follow</div>
                    <div className="mt-2 flex gap-[14px] text-[14px] font-semibold">
                      <a href={CONTACT.linkedin}>LinkedIn</a>
                      <a href={CONTACT.instagram}>Instagram</a>
                    </div>
                  </div>
                </div>
                <a href={CONTACT.website} className="text-[13.5px] text-subtle hover:text-ink">
                  Website: https://alphanetssolutions.com/
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
