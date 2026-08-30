import { getText } from "@/content/get-text";
import { ServicesPageView } from "@/components/site/ServicesPageView";

export default async function ServicesPage() {
  return <ServicesPageView t={await getText()} />;
}
