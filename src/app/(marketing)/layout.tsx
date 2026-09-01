import { getText } from "@/content/get-text";
import { SiteNav } from "@/components/site/SiteNav";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SiteBehaviors } from "@/components/site/SiteBehaviors";

// Marketing pages are statically rendered but read their copy from the CMS,
// so re-render them every 5 minutes to pick up admin edits.
export const revalidate = 300;

export default async function MarketingLayout({ children }: { children: React.ReactNode }) {
  const t = await getText();

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:rounded-lg gradient-bg text-white text-sm font-medium"
      >
        Skip to content
      </a>
      <SiteNav t={t} />
      <main id="main-content" className="flex-1">
        {children}
      </main>
      <SiteFooter t={t} />
      <SiteBehaviors />
    </>
  );
}
