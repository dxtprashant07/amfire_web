import { getText } from "@/content/get-text";
import { CaseStudyPageView } from "@/components/site/CaseStudyPageView";

export default async function CaseStudyPage() {
  return <CaseStudyPageView t={await getText()} />;
}
