import { Glass, Heading, Section } from "@/components/ui";

const REASONS = [
  { t: "Expert Team", d: "Our skilled professionals bring extensive industry experience and technical knowledge to every project." },
  {
    t: "Client-Centric Approach",
    d: "We collaborate closely with you to ensure your vision is realized, delivering solutions that exceed expectations.",
  },
  {
    t: "Cutting-Edge Technology",
    d: "We leverage the latest tools and technologies to provide modern, efficient solutions tailored to your needs.",
  },
];

/** "How we work" is told by the hero's build journey in this theme. */
export function WhyUs() {
  return (
    <Section id="why" label="Why Choose Us?" className="pt-20">
      <Heading className="max-w-[20ch]">Eleven years of shipping, measured.</Heading>
      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {REASONS.map((r) => (
          <Glass key={r.t} className="p-6">
            <Heading as="h3">{r.t}</Heading>
            <p className="mt-3 mb-0 text-[15px] leading-[1.65] text-body">{r.d}</p>
          </Glass>
        ))}
      </div>
    </Section>
  );
}
