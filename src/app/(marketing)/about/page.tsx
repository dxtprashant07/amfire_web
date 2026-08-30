import { getText } from "@/content/get-text";
import { AboutPageView } from "@/components/site/AboutPageView";

export default async function AboutPage() {
  return <AboutPageView t={await getText()} />;
}
