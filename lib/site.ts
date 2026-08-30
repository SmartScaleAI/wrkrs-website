export const siteName = "wrkrs";

/** Document title. A colon instead of a dash keeps the site's no-em-dash rule. */
export const siteTitle = "wrkrs: Install an AI development team in your repo";

export const siteDescription =
  "wrkrs is an open-source CLI that installs configured AI agents into your repository. Your coding agent runs the team, and your repo owns the configuration.";

const productionHostname = process.env.VERCEL_PROJECT_PRODUCTION_URL;

export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL
  ? process.env.NEXT_PUBLIC_SITE_URL
  : productionHostname
    ? `https://${productionHostname}`
    : "http://localhost:3000";
