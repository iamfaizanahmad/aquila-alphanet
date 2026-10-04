import type { Metadata } from "next";
import { Box, Caption, Check, Heading, Part, Ruled } from "@/components/form";
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

const link = "underline underline-offset-4 decoration-form hover:text-form";

export default function AboutPage() {
  return (
    <main>
      <section className="px-gutter pt-6 pb-16 sm:pt-8">
        <div className="sheet lg:px-14">
          <Ruled className="border-t-2">
            <Box caption="About Us" className="bg-form-tint">
              <h1 className="m-0 mt-3 max-w-[14ch] text-[clamp(44px,6.6vw,100px)] leading-[.9] font-black tracking-[-.02em] text-ink uppercase stretch-display">
                Welcome to AlphaNet Solutions!
              </h1>
            </Box>
            <Box caption="Description">
              <p className="mt-3 mb-0 max-w-[72ch] text-[clamp(16px,1.4vw,19px)] leading-[1.7] text-graphite">
                AlphaNet Solutions is a software and healthcare technology company specializing in custom software
                development, EHR/PM solutions, Revenue Cycle Management (RCM), cloud and DevOps services, API
                integrations, AI automation, and product modernization. We help businesses build, deploy, customize,
                integrate, and scale secure digital solutions while providing ongoing technical support and maintenance.
              </p>
            </Box>
          </Ruled>
        </div>
      </section>

      <Part label="Expertise" className="pb-16">
        <Heading as="h2">Our expertise encompasses</Heading>
        <Ruled className="mt-6 sm:grid-cols-2 lg:grid-cols-3">
          {EXPERTISE.map((e) => (
            <div key={e} className="flex items-start gap-3 p-4">
              <Check on className="mt-1" />
              <span className="text-[16.5px] leading-[1.3] font-bold text-ink stretch-head">{e}</span>
            </div>
          ))}
        </Ruled>
      </Part>

      <Part label="Mission and vision" className="pb-16">
        <Ruled className="md:grid-cols-2">
          <Box caption="Our Mission" className="sm:!p-8">
            <p className="mt-3 mb-0 text-[clamp(18px,1.8vw,23px)] leading-[1.45] font-semibold text-ink stretch-head">
              Our mission is to empower businesses through technology. We strive to deliver high-quality solutions that
              not only meet your requirements but also exceed your expectations. We understand that each project is
              unique, and we approach every challenge with creativity, dedication, and a commitment to excellence.
            </p>
          </Box>
          <Box caption="Our Vision" className="sm:!p-8">
            <p className="mt-3 mb-0 text-[clamp(18px,1.8vw,23px)] leading-[1.45] font-semibold text-ink stretch-head">
              At AlphaNet Solutions, our vision is to be a trusted partner for businesses seeking innovative software
              solutions. We aim to foster long-lasting relationships built on transparency, collaboration, and mutual
              success.
            </p>
          </Box>
        </Ruled>
      </Part>

      <Part label="Why Choose Us?" className="pb-16">
        <Heading>Why Choose Us?</Heading>
        <Ruled className="mt-6 md:grid-cols-3">
          {WHY.map((w) => (
            <Box key={w.t}>
              <Heading as="h3">{w.t}</Heading>
              <p className="mt-3 mb-0 text-[15px] leading-[1.65] text-graphite">{w.d}</p>
            </Box>
          ))}
        </Ruled>
      </Part>

      <Part label="Our Team" className="pb-16">
        <Heading>Our Team</Heading>
        <Ruled className="mt-6 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)]">
          <div className="p-4 sm:p-5">
            <Caption>Photograph</Caption>
            {/* Portrait placeholder — replace with the CEO photo. */}
            <div className="relative mt-3 grid aspect-[4/5] w-full max-w-[340px] place-items-center border-2 border-dashed border-form bg-form-tint">
              <span className="font-mono text-[72px] font-semibold text-ink">HS</span>
              <span className="absolute bottom-3 left-3 font-mono text-[11px] text-muted">portrait placeholder</span>
            </div>
          </div>
          <Box caption="Owner & CEO">
            <h3 className="m-0 mt-3 text-[clamp(34px,4vw,56px)] leading-[.95] font-black text-ink uppercase stretch-display">Haroon Sher</h3>
            <p className="mt-5 mb-0 max-w-[66ch] text-[16px] leading-[1.7] text-graphite">
              Haroon Sher is the Owner and CEO of AlphaNet Solutions, bringing over 11 years of experience in the
              software and IT industry. With a strong background in software development, additionally, Haroon has honed
              his expertise in Electronic Health Records (EHR) and Practice Management software, positioning him as a
              leader in the healthcare technology sector.
            </p>
            <p className="mt-4 mb-0 max-w-[66ch] text-[16px] leading-[1.7] text-graphite">
              His vision for AlphaNet Solutions is rooted in a commitment to innovation and excellence, driving the
              company to deliver cutting-edge solutions that empower businesses and enhance user experiences.
              Haroon&apos;s passion for technology and his dedication to client success have established him as a trusted
              partner in the industry. Under his leadership, AlphaNet Solutions continues to thrive, providing
              exceptional services tailored to meet the unique needs of clients across various sectors.
            </p>
          </Box>
        </Ruled>
        <Ruled className="!border-t-0 md:grid-cols-3">
          {TEAM.map((m) => (
            <div key={m.name} className="flex items-center gap-4 p-4 sm:p-5">
              <span className="grid h-14 w-14 flex-none place-items-center border-2 border-form font-mono text-[18px] font-semibold text-ink">{m.i}</span>
              <div>
                <div className="text-[20px] leading-tight font-extrabold text-ink stretch-head">{m.name}</div>
                <div className="mt-1 font-mono text-[13px] text-muted">{m.role}</div>
              </div>
            </div>
          ))}
        </Ruled>
      </Part>

      <Part label="Company Info">
        <Heading>AlphaNet Solutions – HASH LLC</Heading>
        <Ruled className="mt-6 lg:grid-cols-3">
          <Box caption="USA Address">
            <p className="mt-3 mb-0 text-[19px] leading-[1.35] font-bold text-ink stretch-head">{CONTACT.address}</p>
            <div className="mt-4 space-y-1 font-mono text-[14px] text-ink">
              <div>
                Contact #{" "}
                <a className={link} href="tel:+19148989007">
                  +19148989007
                </a>
              </div>
              <div>Fax # +19148989216</div>
            </div>
          </Box>
          <Box caption="Main Address">
            <p className="mt-3 mb-0 text-[19px] leading-[1.35] font-bold text-ink stretch-head">
              CB-42/5 Elahi Street Lane No.8 New Afshan Colony Range Road Rawalpindi, Pakistan, 46000
            </p>
            <div className="mt-4 font-mono text-[14px] text-ink">
              Contact #{" "}
              <a className={link} href="tel:+923392226520">
                +923392226520
              </a>{" "}
              ·{" "}
              <a className={link} href="tel:+923159873987">
                +923159873987
              </a>
            </div>
          </Box>
          <Box caption="Online">
            <div className="mt-3 space-y-1.5 font-mono text-[14px] leading-[1.6] text-ink">
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
          </Box>
        </Ruled>
      </Part>
    </main>
  );
}
