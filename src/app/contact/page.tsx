import type { Metadata } from "next";
import { ContactDetails, ContactForm } from "@/components/ContactForm";
import { Section } from "@/components/ui";

export const metadata: Metadata = { title: "Contact Us — AlphaNet Solutions" };

export default function ContactPage() {
  return (
    <main>
      <Section label="Contact Us" className="pt-12">
        <div className="grid gap-6 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:items-end">
          <h1 className="m-0 max-w-[14ch] font-display text-[clamp(36px,5vw,72px)] leading-[1.02] font-semibold tracking-[-.03em] text-text">Let’s build what’s next.</h1>
          <p className="m-0 max-w-[48ch] text-[clamp(16px,1.4vw,19px)] leading-[1.65] text-body">
            Ready to take your business to the next level? Contact us today to discuss how AlphaNet Solutions can help you
            achieve your goals.
          </p>
        </div>
        <div className="mt-10 grid items-start gap-6 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]">
          <ContactForm />
          <ContactDetails />
        </div>
      </Section>
    </main>
  );
}
