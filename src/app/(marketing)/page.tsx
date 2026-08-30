import { getText } from "@/content/get-text";
import { HomePageView } from "@/components/site/HomePageView";

export default async function HomePage() {
  return <HomePageView t={await getText()} />;
}
