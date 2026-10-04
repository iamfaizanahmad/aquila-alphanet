import type { Metadata } from "next";
import { Glass, Heading, Section, Tick, link } from "@/components/ui";
import { CONTACT } from "@/content/site";

export const metadata: Metadata = { title: "About Us — AlphaNet Solutions" };

const EXPERTISE = [
  "Healthcare Software & EHR/PM Solutions",
  "EHR/PM Deployment, Customization & Re-branding",
  "Cloud & DevOps Services",
  "API & System Integration",
  "AI & Workflow Automation",
  "UI/UX Design & Product Modernization",
  "Branding & Logo Design",
  "Software Support & Maintenance",
  "End-to-End Revenue Cycle Management (RCM)",
];

const WHY = [
  {
    t: "Experienced Team",
    d: "Our team of skilled professionals brings years of industry experience, ensuring that you receive the best solutions tailored to your needs.",
  },
  {
    t: "Customer-Centric Approach",
    d: "We prioritize your satisfaction and work closely with you throughout the development process, ensuring your vision is realized.",
  },
  {
    t: "Cutting-Edge Technology",
    d: "We stay updated with the latest technologies and trends to provide you with modern, efficient solutions.",
  },
];

const TEAM = [
  { i: "AJ", name: "Ahmed Jehanzaib", role: "Chief Technical Officer" },
  { i: "FA", name: "Faizan Ahmad", role: "Chief Development Officer" },
  { i: "BR", name: "Bilal Rashid", role: "Chief Operating Officer" },
];

export default function AboutPage() {
  return (
    <main>
      <Section label="About Us" className="pt-12">
        <div className="grid gap-6 lg:grid-cols-2 lg:items-end">
          <h1 className="m-0 max-w-[16ch] font-display text-[clamp(36px,5vw,72px)] leading-[1.02] font-semibold tracking-[-.03em] text-text">Welcome to AlphaNet Solutions!</h1>
          <p className="m-0 max-w-[60ch] text-[clamp(16px,1.4vw,19px)] leading-[1.7] text-body">
            AlphaNet Solutions is a software and healthcare technology company specializing in custom software development,
            EHR/PM solutions, Revenue Cycle Management (RCM), cloud and DevOps services, API integrations, AI automation,
            and product modernization. We help businesses build, deploy, customize, integrate, and scale secure digital
            solutions while providing ongoing technical support and maintenance.
          </p>
        </div>
      </Section>

      <Section label="Expertise" className="pt-20">
        <Heading>Our expertise encompasses</Heading>
        <Glass className="mt-6 grid gap-x-6 p-2 sm:grid-cols-2 lg:grid-cols-3">
          {EXPERTISE.map((e) => (
            <div key={e} className="flex items-start gap-3 rounded-[10px] px-3 py-3">
              <Tick on className="mt-0.5 !border-holo !bg-holo/15 !text-holo" />
              <span className="text-[15.5px] leading-[1.35] font-medium text-text">{e}</span>
            </div>
          ))}
        </Glass>
      </Section>

      <Section label="Mission and vision" className="pt-20">
        <div className="grid gap-4 md:grid-cols-2">
          {[
            [
              "Our Mission",
              "Our mission is to empower businesses through technology. We strive to deliver high-quality solutions that not only meet your requirements but also exceed your expectations. We understand that each project is unique, and we approach every challenge with creativity, dedication, and a commitment to excellence.",
            ],
            [
              "Our Vision",
              "At AlphaNet Solutions, our vision is to be a trusted partner for businesses seeking innovative software solutions. We aim to foster long-lasting relationships built on transparency, collaboration, and mutual success.",
            ],
          ].map(([t, d]) => (
            <Glass key={t} className="p-7 sm:p-9">
              <div className="hud">{t}</div>
              <p className="mt-3 mb-0 text-[clamp(18px,1.7vw,22px)] leading-[1.5] font-medium text-text">{d}</p>
            </Glass>
          ))}
        </div>
      </Section>

      <Section label="Why Choose Us?" className="pt-20">
        <Heading>Why Choose Us?</Heading>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {WHY.map((w) => (
            <Glass key={w.t} className="p-6">
              <Heading as="h3">{w.t}</Heading>
              <p className="mt-3 mb-0 text-[15px] leading-[1.65] text-body">{w.d}</p>
            </Glass>
          ))}
        </div>
      </Section>

      <Section label="Our Team" className="pt-20">
        <Heading>Our Team</Heading>
        <Glass className="mt-6 grid gap-6 p-5 sm:p-7 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)]">
          {/* Portrait placeholder — replace with the CEO photo. */}
          <div className="relative grid aspect-[4/5] w-full max-w-[340px] place-items-center rounded-[14px] border border-dashed border-holo/30 bg-[radial-gradient(circle_at_50%_30%,rgba(139,233,255,.14),transparent_65%)]">
            <span className="font-display text-[64px] font-semibold text-holo">HS</span>
            <span className="hud absolute bottom-3 left-3 !text-muted">portrait placeholder</span>
          </div>
          <div>
            <div className="hud">Owner &amp; CEO</div>
            <h3 className="m-0 mt-2 font-display text-[clamp(28px,3.2vw,44px)] leading-[1.05] font-semibold tracking-[-.025em] text-text">Haroon Sher</h3>
            <p className="mt-5 mb-0 max-w-[66ch] text-[16px] leading-[1.7] text-body">
              Haroon Sher is the Owner and CEO of AlphaNet Solutions, bringing over 11 years of experience in the software
              and IT industry. With a strong background in software development, additionally, Haroon has honed his
              expertise in Electronic Health Records (EHR) and Practice Management software, positioning him as a leader in
              the healthcare technology sector.
            </p>
            <p className="mt-4 mb-0 max-w-[66ch] text-[16px] leading-[1.7] text-body">
              His vision for AlphaNet Solutions is rooted in a commitment to innovation and excellence, driving the company
              to deliver cutting-edge solutions that empower businesses and enhance user experiences. Haroon&apos;s passion
              for technology and his dedication to client success have established him as a trusted partner in the industry.
              Under his leadership, AlphaNet Solutions continues to thrive, providing exceptional services tailored to meet
              the unique needs of clients across various sectors.
            </p>
          </div>
        </Glass>
        <div className="mt-4 grid gap-4 md:grid-cols-3">
          {TEAM.map((m) => (
            <Glass key={m.name} className="flex items-center gap-4 p-5">
              <span className="grid h-14 w-14 flex-none place-items-center rounded-[14px] border border-holo/40 font-display text-[15px] font-semibold text-holo">{m.i}</span>
              <div>
                <div className="text-[18px] leading-tight font-semibold text-text">{m.name}</div>
                <div className="mt-1 text-[14px] text-muted">{m.role}</div>
              </div>
            </Glass>
          ))}
        </div>
      </Section>

      <Section label="Company Info" className="pt-20">
        <Heading>AlphaNet Solutions – HASH LLC</Heading>
        <div className="mt-6 grid gap-4 lg:grid-cols-3">
          <Glass className="p-6">
            <div className="hud">USA Address</div>
            <p className="mt-2 mb-0 text-[18px] leading-[1.4] font-semibold text-text">{CONTACT.address}</p>
            <div className="mt-4 space-y-1 text-[15px] text-body">
              <div>
                Contact #{" "}
                <a className={link} href="tel:+19148989007">
                  +19148989007
                </a>
              </div>
              <div>Fax # +19148989216</div>
            </div>
          </Glass>
          <Glass className="p-6">
            <div className="hud">Main Address</div>
            <p className="mt-2 mb-0 text-[18px] leading-[1.4] font-semibold text-text">CB-42/5 Elahi Street Lane No.8 New Afshan Colony Range Road Rawalpindi, Pakistan, 46000</p>
            <div className="mt-4 text-[15px] text-body">
              Contact #{" "}
              <a className={link} href="tel:+923392226520">
                +923392226520
              </a>{" "}
              ·{" "}
              <a className={link} href="tel:+923159873987">
                +923159873987
              </a>
            </div>
          </Glass>
          <Glass className="p-6">
            <div className="hud">Online</div>
            <div className="mt-2 space-y-1.5 text-[15px] leading-[1.6] text-body">
              <div>
                Email: <a className={link} href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
              </div>
              <div>
                Website: <a className={link} href={CONTACT.website}>alphanetssolutions.com</a>
              </div>
              <div>
                LinkedIn: <a className={link} href={CONTACT.linkedin}>company/aplhanetsolutions</a>
              </div>
              <div>
                Instagram: <a className={link} href={CONTACT.instagram}>@alphanet_solutions</a>
              </div>
            </div>
          </Glass>
        </div>
      </Section>
    </main>
  );
}
