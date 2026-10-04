import type { Metadata } from "next";
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
  { i: "AJ", name: "Ahmed Jehanzaib", role: "Chief Technical Officer", bg: "bg-[linear-gradient(140deg,rgba(0,240,255,.35),rgba(108,77,246,.35))]" },
  { i: "FA", name: "Faizan Ahmad", role: "Chief Development Officer", bg: "bg-[linear-gradient(140deg,rgba(139,124,255,.4),rgba(199,125,255,.3))]" },
  { i: "BR", name: "Bilal Rashid", role: "Chief Operating Officer", bg: "bg-[linear-gradient(140deg,rgba(199,125,255,.35),rgba(0,240,255,.25))]" },
];

const sectionCls = "relative border-t border-[rgba(255,255,255,.06)] px-gutter py-[clamp(56px,7vw,100px)]";
const liveDot = "h-[7px] w-[7px] animate-pulse-dot rounded-full bg-success shadow-[0_0_10px_#06D6A0]";

export default function AboutPage() {
  return (
    <>
      <div className="pointer-events-none absolute top-0 right-0 left-0 h-[900px] bg-[radial-gradient(800px_520px_at_85%_-10%,rgba(108,77,246,.26),transparent_65%),radial-gradient(600px_420px_at_0%_10%,rgba(0,240,255,.12),transparent_60%)]" />
      <main>
        <section className="relative px-gutter pt-[clamp(56px,7vw,110px)] pb-[clamp(40px,5vw,72px)]">
          <div data-stagger="" className="container-site">
            <div className="kicker text-cyan">About Us</div>
            <h1 className="mt-5 mb-0 max-w-[16ch] font-display text-[clamp(40px,6vw,82px)] leading-[1.02] font-extrabold tracking-[-.035em]">
              Welcome to{" "}
              <span className="bg-[linear-gradient(100deg,#00F0FF_10%,#8B7CFF_60%,#C77DFF)] bg-clip-text text-transparent">
                AlphaNet Solutions!
              </span>
            </h1>
            <p className="mt-[26px] mb-0 max-w-[70ch] text-[clamp(16px,1.4vw,19px)] leading-[1.7] text-body-2">
              AlphaNet Solutions is a software and healthcare technology company specializing in custom software
              development, EHR/PM solutions, Revenue Cycle Management (RCM), cloud and DevOps services, API integrations,
              AI automation, and product modernization. We help businesses build, deploy, customize, integrate, and scale
              secure digital solutions while providing ongoing technical support and maintenance.
            </p>
          </div>
        </section>

        <section className="relative px-gutter pt-[clamp(24px,3vw,40px)] pb-[clamp(56px,7vw,100px)]">
          <div className="container-site">
            <div data-reveal="" className="text-[13px] font-bold tracking-[.12em] text-subtle uppercase">
              Our expertise encompasses
            </div>
            <div data-stagger="" className="mt-5 grid grid-cols-[repeat(auto-fill,minmax(min(100%,280px),1fr))] gap-3">
              {EXPERTISE.map((e, i) => (
                <div key={e} className="flex items-center gap-[14px] rounded-2xl border border-[rgba(255,255,255,.08)] bg-[rgba(255,255,255,.03)] px-5 py-[18px]">
                  <span className="font-mono text-[12px] text-cyan">{String(i + 1).padStart(2, "0")}</span>
                  <span className="text-[15px] font-semibold">{e}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className={sectionCls}>
          <div data-stagger="" className="container-site grid grid-cols-[repeat(auto-fit,minmax(min(100%,420px),1fr))] gap-[18px]">
            <div
              data-tilt="4"
              data-spot=""
              className="rounded-[28px] border border-[rgba(0,240,255,.24)] bg-[rgba(0,240,255,.05)] bg-[image:radial-gradient(460px_circle_at_var(--mx,-999px)_var(--my,-999px),rgba(0,240,255,.14),transparent_45%)] p-[clamp(28px,3.5vw,48px)] transition-transform duration-[250ms] ease-in-out"
            >
              <div className="font-mono text-[12.5px] tracking-[.16em] text-cyan uppercase">Our Mission</div>
              <p className="mt-5 mb-0 font-display text-[clamp(18px,1.9vw,23px)] leading-[1.5] font-medium tracking-[-.01em] text-[#EEF2F8]">
                Our mission is to empower businesses through technology. We strive to deliver high-quality solutions that
                not only meet your requirements but also exceed your expectations. We understand that each project is
                unique, and we approach every challenge with creativity, dedication, and a commitment to excellence.
              </p>
            </div>
            <div
              data-tilt="4"
              data-spot=""
              className="rounded-[28px] border border-[rgba(199,125,255,.26)] bg-[rgba(199,125,255,.05)] bg-[image:radial-gradient(460px_circle_at_var(--mx,-999px)_var(--my,-999px),rgba(199,125,255,.15),transparent_45%)] p-[clamp(28px,3.5vw,48px)] transition-transform duration-[250ms] ease-in-out"
            >
              <div className="font-mono text-[12.5px] tracking-[.16em] text-[#DDB3FF] uppercase">Our Vision</div>
              <p className="mt-5 mb-0 font-display text-[clamp(18px,1.9vw,23px)] leading-[1.5] font-medium tracking-[-.01em] text-[#EEF2F8]">
                At AlphaNet Solutions, our vision is to be a trusted partner for businesses seeking innovative software
                solutions. We aim to foster long-lasting relationships built on transparency, collaboration, and mutual
                success.
              </p>
            </div>
          </div>
        </section>

        <section className={sectionCls}>
          <div className="container-site">
            <h2 data-reveal="" className="m-0 font-display text-[clamp(30px,4vw,50px)] font-bold tracking-[-.03em]">
              Why Choose Us?
            </h2>
            <div data-stagger="" className="mt-8 grid grid-cols-[repeat(auto-fit,minmax(min(100%,300px),1fr))] gap-[18px]">
              {WHY.map((w) => (
                <div key={w.t} className="rounded-[22px] border border-[rgba(255,255,255,.09)] bg-[linear-gradient(160deg,rgba(255,255,255,.07),rgba(255,255,255,.015))] p-7">
                  <h3 className="m-0 font-display text-[20px] font-bold">{w.t}</h3>
                  <p className="mt-[10px] mb-0 text-[14.5px] leading-[1.65] text-muted">{w.d}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className={`${sectionCls} bg-[linear-gradient(180deg,rgba(108,77,246,.06),transparent_70%)]`}>
          <div className="container-site">
            <div data-reveal="" className="kicker text-purple">
              Our Team
            </div>
            <div
              data-reveal="80"
              className="mt-7 grid grid-cols-[repeat(auto-fit,minmax(min(100%,320px),1fr))] items-center gap-[clamp(24px,3.5vw,48px)] rounded-[28px] border border-[rgba(255,255,255,.11)] bg-[linear-gradient(150deg,rgba(255,255,255,.07),rgba(255,255,255,.015))] p-[clamp(26px,3.5vw,48px)] shadow-[0_30px_80px_rgba(0,0,0,.45),inset_0_1px_0_rgba(255,255,255,.1)]"
            >
              {/* Portrait placeholder — replace with the CEO photo. */}
              <div className="relative flex aspect-[4/5] w-full max-w-[360px] items-center justify-center overflow-hidden rounded-3xl border border-[rgba(255,255,255,.12)] bg-[radial-gradient(circle_at_30%_20%,rgba(0,240,255,.25),transparent_55%),radial-gradient(circle_at_80%_90%,rgba(199,125,255,.3),transparent_55%),#0A0D1A]">
                <span className="font-display text-[96px] font-extrabold tracking-[-.04em] text-[rgba(255,255,255,.9)]">HS</span>
                <span className="absolute bottom-4 left-4 font-mono text-[11px] text-subtle">portrait placeholder</span>
              </div>
              <div>
                <div className="text-[13px] font-bold tracking-[.12em] text-cyan-light uppercase">Owner &amp; CEO</div>
                <h3 className="mt-[10px] mb-0 font-display text-[clamp(30px,3.6vw,44px)] font-extrabold tracking-[-.03em]">Haroon Sher</h3>
                <p className="mt-[18px] mb-0 text-[15.5px] leading-[1.75] text-body-2">
                  Haroon Sher is the Owner and CEO of AlphaNet Solutions, bringing over 11 years of experience in the
                  software and IT industry. With a strong background in software development, additionally, Haroon has
                  honed his expertise in Electronic Health Records (EHR) and Practice Management software, positioning him
                  as a leader in the healthcare technology sector.
                </p>
                <p className="mt-[14px] mb-0 text-[15.5px] leading-[1.75] text-body-2">
                  His vision for AlphaNet Solutions is rooted in a commitment to innovation and excellence, driving the
                  company to deliver cutting-edge solutions that empower businesses and enhance user experiences.
                  Haroon&apos;s passion for technology and his dedication to client success have established him as a
                  trusted partner in the industry. Under his leadership, AlphaNet Solutions continues to thrive, providing
                  exceptional services tailored to meet the unique needs of clients across various sectors.
                </p>
              </div>
            </div>
            <div data-stagger="" className="mt-[18px] grid grid-cols-[repeat(auto-fit,minmax(min(100%,260px),1fr))] gap-[18px]">
              {TEAM.map((m) => (
                <div
                  key={m.name}
                  data-tilt="5"
                  className="flex items-center gap-[18px] rounded-[22px] border border-[rgba(255,255,255,.09)] bg-[rgba(255,255,255,.03)] p-6 transition-transform duration-[250ms] ease-in-out"
                >
                  <span className={`flex h-[60px] w-[60px] flex-none items-center justify-center rounded-[18px] border border-[rgba(255,255,255,.14)] font-display text-[19px] font-bold ${m.bg}`}>
                    {m.i}
                  </span>
                  <div>
                    <div className="font-display text-[18px] font-bold">{m.name}</div>
                    <div className="mt-1 text-[13.5px] text-dim">{m.role}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className={sectionCls}>
          <div className="container-site">
            <div data-reveal="" className="kicker text-cyan">
              Company Info
            </div>
            <h2 data-reveal="80" className="mt-4 mb-0 font-display text-[clamp(28px,3.6vw,44px)] font-bold tracking-[-.03em]">
              AlphaNet Solutions – HASH LLC
            </h2>
            <div data-stagger="" className="mt-8 grid grid-cols-[repeat(auto-fit,minmax(min(100%,340px),1fr))] gap-[18px]">
              <div className="rounded-[22px] border border-[rgba(0,240,255,.22)] bg-[rgba(0,240,255,.04)] p-7">
                <div className="inline-flex items-center gap-2 text-[12.5px] font-bold tracking-[.1em] text-cyan-light uppercase">
                  <span className={liveDot} />
                  USA Address
                </div>
                <div className="mt-[14px] font-display text-[19px] leading-[1.45] font-semibold">{CONTACT.address}</div>
                <div className="mt-[14px] text-[14.5px] leading-[1.9] text-body-2">
                  <div>
                    Contact # <a href="tel:+19148989007">+19148989007</a>
                  </div>
                  <div>Fax # +19148989216</div>
                </div>
              </div>
              <div className="rounded-[22px] border border-[rgba(199,125,255,.24)] bg-[rgba(199,125,255,.04)] p-7">
                <div className="inline-flex items-center gap-2 text-[12.5px] font-bold tracking-[.1em] text-[#DDB3FF] uppercase">
                  <span className={liveDot} />
                  Main Address
                </div>
                <div className="mt-[14px] font-display text-[19px] leading-[1.45] font-semibold">
                  CB-42/5 Elahi Street Lane No.8 New Afshan Colony Range Road Rawalpindi, Pakistan, 46000
                </div>
                <div className="mt-[14px] text-[14.5px] leading-[1.9] text-body-2">
                  <div>
                    Contact # <a href="tel:+923392226520">+923392226520</a> · <a href="tel:+923159873987">+923159873987</a>
                  </div>
                </div>
              </div>
              <div className="rounded-[22px] border border-[rgba(255,255,255,.09)] bg-[rgba(255,255,255,.03)] p-7">
                <div className="text-[12.5px] font-bold tracking-[.1em] text-subtle uppercase">Online</div>
                <div className="mt-[14px] text-[14.5px] leading-[2] text-body-2">
                  <div>
                    Email: <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
                  </div>
                  <div>
                    Website: <a href={CONTACT.website}>alphanetssolutions.com</a>
                  </div>
                  <div>
                    LinkedIn: <a href={CONTACT.linkedin}>company/aplhanetsolutions</a>
                  </div>
                  <div>
                    Instagram: <a href={CONTACT.instagram}>@alphanet_solutions</a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
