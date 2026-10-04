import type { Metadata } from "next";
import { Bullets, LegalPage, type LegalSection } from "@/components/LegalPage";
import { CONTACT } from "@/content/site";

export const metadata: Metadata = { title: "Privacy Policy — AlphaNet Solutions" };

const mail = <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>;

const SECTIONS: LegalSection[] = [
  {
    id: "p1",
    title: "Information We Collect",
    body: (
      <>
        <p className="mt-[14px] mb-0">We may collect the following types of information:</p>
        <p className="mt-3 mb-0">
          <strong>Personal Information:</strong> This includes your name, email address, phone
          number, and any other details you provide when you contact us or sign up for our services.
        </p>
        <p className="mt-3 mb-0">
          <strong>Usage Data:</strong> We collect information about how you use our website,
          including your IP address, browser type, pages visited, and the time and date of your visit.
        </p>
      </>
    ),
  },
  {
    id: "p2",
    title: "How We Use Your Information",
    body: (
      <>
        <p className="mt-[14px] mb-0">We use the information we collect for the following purposes:</p>
        <Bullets
          items={[
            "To provide and maintain our services.",
            "To communicate with you, including responding to your inquiries and providing customer support.",
            "To improve our website and services based on user feedback and usage patterns.",
            "To send you promotional materials, newsletters, or other information that may be of interest to you, if you have opted to receive such communications.",
          ]}
        />
      </>
    ),
  },
  {
    id: "p3",
    title: "Data Security",
    body: (
      <p className="mt-[14px] mb-0">
        We implement appropriate technical and organizational measures to protect your personal information from
        unauthorized access, disclosure, alteration, or destruction. While we strive to protect your data, please be
        aware that no method of transmission over the Internet or electronic storage is 100% secure.
      </p>
    ),
  },
  {
    id: "p4",
    title: "Cookies",
    body: (
      <p className="mt-[14px] mb-0">
        Our website uses cookies to enhance your experience. Cookies are small files stored on your device that help us
        analyze web traffic and customize your experience. You can choose to accept or decline cookies through your
        browser settings. However, declining cookies may prevent you from taking full advantage of our website.
      </p>
    ),
  },
  {
    id: "p5",
    title: "Third-Party Disclosure",
    body: (
      <p className="mt-[14px] mb-0">
        We do not sell, trade, or otherwise transfer your personal information to third parties without your consent,
        except as required by law or to service providers who assist us in operating our website and conducting our
        business.
      </p>
    ),
  },
  {
    id: "p6",
    title: "Your Rights",
    body: (
      <p className="mt-[14px] mb-0">
        You have the right to access, correct, or delete your personal information. If you wish to exercise any of these
        rights or have any questions about our Privacy Policy, please contact us at {mail}.
      </p>
    ),
  },
  {
    id: "p7",
    title: "Changes to This Privacy Policy",
    body: (
      <p className="mt-[14px] mb-0">
        We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy
        Policy on our website. We encourage you to review this policy periodically for any updates.
      </p>
    ),
  },
  {
    id: "p8",
    title: "Contact Us",
    body: (
      <>
        <p className="mt-[14px] mb-0">
          If you have any questions or concerns about this Privacy Policy or our data practices, please contact us at:
        </p>
        <p className="mt-[14px] mb-0 text-text">
          AlphaNet Solutions
          <br />
          {CONTACT.address}
          <br />
          {mail}
          <br />
          {CONTACT.phone}
        </p>
        <p className="mt-[18px] mb-0">
          Thank you for trusting AlphaNet Solutions with your information. We are committed to ensuring your privacy is
          protected.
        </p>
      </>
    ),
  },
];

export default function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy Policy"

      intro="At AlphaNet Solutions, we value your privacy and are committed to protecting your personal information. This Privacy Policy outlines how we collect, use, and safeguard your data when you visit our website and use our services."
      sections={SECTIONS}
    />
  );
}
