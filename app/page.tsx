import { CodeWindow } from "@/components/landing/code-window";
import { ControlList } from "@/components/landing/control-list";
import { Facts } from "@/components/landing/facts";
import { FaqList } from "@/components/landing/faq-list";
import { FeatureCard, FeatureGrid, RoleTag } from "@/components/landing/feature-card";
import { FinalCta } from "@/components/landing/final-cta";
import { Hero } from "@/components/landing/hero";
import { RuntimeList } from "@/components/landing/runtime-list";
import { Section } from "@/components/landing/section";
import { SectionHeading } from "@/components/landing/section-heading";
import { SignalStrip } from "@/components/landing/signal-strip";
import { SiteFooter } from "@/components/landing/site-footer";
import { SiteHeader } from "@/components/landing/site-header";
import { Steps } from "@/components/landing/steps";
import { additions, repositoryUrl, team, workerDefinition } from "@/lib/landing-content";
import { siteDescription, siteUrl } from "@/lib/site";

/** Minimal schema.org description built only from verified facts (no ratings, pricing, or OS claims). */
const structuredData = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "wrkrs",
  description: siteDescription,
  url: siteUrl,
  applicationCategory: "DeveloperApplication",
  license: "https://opensource.org/license/mit",
  softwareRequirements: "Node.js 22.12 or newer and Git",
  sameAs: [repositoryUrl],
  author: {
    "@type": "Organization",
    name: "SmartScale AI",
    url: "https://github.com/SmartScaleAI",
  },
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
        }}
      />
      <a
        className="absolute top-2 left-2 z-10 transform-[translateY(-160%)] rounded-control border border-ink bg-paper px-3.5 py-2.5 text-[13px] font-medium text-ink focus-visible:transform-none focus-visible:outline-offset-2"
        href="#main"
      >
        Skip to content
      </a>
      <SiteHeader />

      <main id="main" tabIndex={-1}>
        <Hero />

        <SignalStrip />

        <Section id="how-it-works">
          <SectionHeading
            kicker="How it works"
            title="Analyze, review, install, run."
            lede="Analysis happens before any write. Installation waits for your approval."
          />
          <Steps />
        </Section>

        <Section id="adds" tone="dark">
          <SectionHeading
            tone="dark"
            kicker="The difference"
            title="What wrkrs adds to your coding agent"
            lede="Your coding agent already writes code. wrkrs gives it a team: who does what, in what order, and which decisions stay with you."
          />
          <FeatureGrid columns={3}>
            {additions.map((item) => (
              <FeatureCard tone="dark" key={item.title} title={item.title} body={item.body} />
            ))}
          </FeatureGrid>
        </Section>

        <Section id="team">
          <SectionHeading
            kicker="Example team"
            title="A recommended team, not a fixed one."
            lede={
              <>
                <strong className="font-[520] text-ink">{workerDefinition}</strong> wrkrs recommends
                this roster for your repository and attaches the specializations it detects, such as
                TypeScript or Apple platforms. Edit any of it in{" "}
                <code className="text-[.92em]">.wrkrs/</code>.
              </>
            }
          />
          <FeatureGrid columns={4}>
            {team.map((role) => (
              <FeatureCard
                key={role.id}
                eyebrow={<RoleTag id={role.id} primary={role.primary} />}
                title={role.title}
                body={role.body}
              />
            ))}
          </FeatureGrid>
        </Section>

        <Section id="installed" layout="split">
          <SectionHeading
            layout="split"
            kicker="What gets installed"
            title="Plain files, owned by your repository."
            lede={
              <>
                <code className="text-[.92em]">npx wrkrs init</code> creates these paths and nothing
                else. Seeded files are yours to edit; managed files are regenerated from them and
                tracked by hash in the manifest.
              </>
            }
          >
            {/* Renders exactly as before: the old `.canonical` rule lost its colour, size, width and
                margins to the more specific lede selector, so only its rule, padding, weight and
                tracking ever applied. The intended look was 16px Ink, 480px wide, 28px above. */}
            <p className="mt-3.5 max-w-[540px] border-t border-ink pt-5.5 text-[15px] leading-[1.65] font-[520] tracking-[-0.015em] text-grey-650 md:mt-4.5">
              wrkrs installs the team. Your coding agent runs it. Your repo owns the configuration.
            </p>
          </SectionHeading>
          <CodeWindow />
        </Section>

        <Section id="control">
          <SectionHeading kicker="Control and safety" title="You approve every write." />
          <ControlList />
        </Section>

        <Section id="runtimes" layout="split">
          <SectionHeading
            layout="split"
            kicker="Runtimes"
            title="Runtime compatibility"
            lede="Claude Code is currently the supported runtime. Additional coding-agent runtimes are planned."
          />
          <RuntimeList />
        </Section>

        <Section id="open-source" layout="split">
          <SectionHeading
            layout="split"
            kicker="Open source"
            title="Built in the open."
            lede="The CLI, role templates, and design documents live in one public repository."
          />
          <Facts />
        </Section>

        <Section id="faq">
          <SectionHeading kicker="FAQ" title="Before you run it." />
          <FaqList />
        </Section>

        <FinalCta />
      </main>

      <SiteFooter />
    </>
  );
}
