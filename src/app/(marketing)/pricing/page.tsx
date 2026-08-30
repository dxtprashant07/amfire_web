import { getText } from "@/content/get-text";
import { PricingPageView } from "@/components/site/PricingPageView";

export default async function PricingPage() {
  return <PricingPageView t={await getText()} />;
}
