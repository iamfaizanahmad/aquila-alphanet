import type { Metadata } from "next";
import { ContactDetails, ContactForm } from "@/components/ContactForm";
import { Box, Ruled } from "@/components/form";

export const metadata: Metadata = { title: "Contact Us — AlphaNet Solutions" };

export default function ContactPage() {
  return (
    <main className="px-gutter pt-6 sm:pt-8">
      <div className="sheet lg:px-14">
        <Ruled className="border-t-2 lg:grid-cols-12">
          <Box caption="Contact Us" className="bg-form-tint lg:col-span-7">
            <h1 className="m-0 mt-3 max-w-[12ch] text-[clamp(44px,6.6vw,100px)] leading-[.9] font-black tracking-[-.02em] text-ink uppercase stretch-display">
              Let’s build what’s next.
            </h1>
          </Box>
          <Box caption="Description" className="flex flex-col justify-end lg:col-span-5">
            <p className="mt-3 mb-0 max-w-[48ch] text-[clamp(16px,1.4vw,19px)] leading-[1.65] text-graphite">
              Ready to take your business to the next level? Contact us today to discuss how AlphaNet Solutions can help
              you achieve your goals.
            </p>
          </Box>
        </Ruled>

        <div className="mt-8 grid items-start gap-6 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]">
          <ContactForm />
          <ContactDetails />
        </div>
      </div>
    </main>
  );
}
