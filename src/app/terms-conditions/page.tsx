import type { Metadata } from "next";
import Link from "next/link";
import { LegalPage, type LegalSection } from "@/components/LegalPage";
import { CONTACT } from "@/content/site";

export const metadata: Metadata = { title: "Terms & Conditions — AlphaNet Solutions" };

const p = (text: React.ReactNode) => <p className="mt-[14px] mb-0">{text}</p>;

const SECTIONS: LegalSection[] = [
  {
    id: "t1",
    title: "Acceptance of Terms",
    body: p(
      <>
        By accessing our website, you acknowledge that you have read, understood, and agree to be bound by these Terms
        and Conditions, as well as our <Link href="/privacy-policy">Privacy Policy</Link>.
      </>,
    ),
  },
  {
    id: "t2",
    title: "Use of Services",
    body: p(
      "AlphaNet Solutions provides various software development, web and mobile app development, UI/UX design, logo design, and software support services. You agree to use our services for lawful purposes and in accordance with all applicable laws and regulations.",
    ),
  },
  {
    id: "t3",
    title: "Intellectual Property",
    body: p(
      "All content, trademarks, and other intellectual property on this website are the property of AlphaNet Solutions or its licensors. You may not use, reproduce, distribute, or create derivative works from any content without our express written permission.",
    ),
  },
  {
    id: "t4",
    title: "User Accounts",
    body: p(
      "To access certain features of our services, you may be required to create an account. You are responsible for maintaining the confidentiality of your account information and for all activities that occur under your account. You agree to notify us immediately of any unauthorized use of your account.",
    ),
  },
  {
    id: "t5",
    title: "Limitation of Liability",
    body: p(
      "To the fullest extent permitted by law, AlphaNet Solutions shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of our website or services. Our liability is limited to the maximum extent permitted by applicable law.",
    ),
  },
  {
    id: "t6",
    title: "Indemnification",
    body: p(
      "You agree to indemnify, defend, and hold harmless AlphaNet Solutions, its affiliates, and their respective officers, directors, and employees from any claims, damages, losses, liabilities, costs, or expenses arising from your use of our services or violation of these Terms and Conditions.",
    ),
  },
  {
    id: "t7",
    title: "Changes to Terms",
    body: p(
      "We reserve the right to modify these Terms and Conditions at any time. We will notify you of any changes by posting the updated terms on our website. Your continued use of our services after such modifications will constitute your acceptance of the new terms.",
    ),
  },
  {
    id: "t8",
    title: "Contact Us",
    body: (
      <>
        {p("If you have any questions or concerns about these Terms and Conditions, please contact us at:")}
        <p className="mt-[14px] mb-0 text-ink">
          AlphaNet Solutions
          <br />
          {CONTACT.address}
          <br />
          <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
          <br />
          {CONTACT.phone}
        </p>
        <p className="mt-[18px] mb-0">Thank you for choosing AlphaNet Solutions. We look forward to serving you!</p>
      </>
    ),
  },
];

export default function TermsPage() {
  return (
    <LegalPage
      title="Terms & Conditions"
      tone="violet"
      intro="Welcome to the AlphaNet Solutions website. By accessing or using our website and services, you agree to comply with and be bound by the following Terms and Conditions. If you do not agree with these terms, please do not use our website."
      sections={SECTIONS}
    />
  );
}
