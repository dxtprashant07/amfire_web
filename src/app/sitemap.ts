import type { MetadataRoute } from "next";

const BASE_URL = "https://amfire.in";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    // Core
    { url: BASE_URL,                             lastModified: now, changeFrequency: "weekly",  priority: 1.0 },
    { url: `${BASE_URL}/contact`,                lastModified: now, changeFrequency: "yearly",  priority: 0.9 },
    { url: `${BASE_URL}/services`,               lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE_URL}/work`,                   lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/about`,                  lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/pricing`,                lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/how-we-work`,            lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/blog`,                   lastModified: now, changeFrequency: "weekly",  priority: 0.7 },
    { url: `${BASE_URL}/industries`,             lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE_URL}/faq`,                    lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/careers`,                lastModified: now, changeFrequency: "weekly",  priority: 0.6 },
    // Service sub-pages
    { url: `${BASE_URL}/services/web-development`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/services/mobile-apps`,     lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/services/ai-agents`,       lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/services/automation`,      lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/services/cloud-devops`,    lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE_URL}/services/ui-ux-design`,   lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    // Blog posts
    { url: `${BASE_URL}/blog/ai-agent-development-india`,   lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/blog/langchain-vs-custom-ai-agents`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/blog/cost-saas-india-2025`,         lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/blog/whatsapp-business-automation`,  lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/blog/edtech-platform-tech-stack`,   lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    // Legal pages
    { url: `${BASE_URL}/privacy-policy`,           lastModified: now, changeFrequency: "yearly",  priority: 0.3 },
    { url: `${BASE_URL}/terms-of-service`,         lastModified: now, changeFrequency: "yearly",  priority: 0.3 },
    // Industry sub-pages
    { url: `${BASE_URL}/industries/edtech`,        lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/industries/healthcare`,    lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/industries/retail`,        lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/industries/real-estate`,   lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/industries/fintech`,       lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE_URL}/industries/saas`,          lastModified: now, changeFrequency: "monthly", priority: 0.6 },
  ];
}
