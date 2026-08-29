export const siteName = "wrkrs: AI agent teams as code";

export const siteDescription =
  "An open-source CLI that organizes AI agents into repository-owned development workers with clear roles, specializations, and approval rules.";

const productionHostname = process.env.VERCEL_PROJECT_PRODUCTION_URL;

export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL
  ? process.env.NEXT_PUBLIC_SITE_URL
  : productionHostname
    ? `https://${productionHostname}`
    : "http://localhost:3000";
