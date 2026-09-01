import { getText } from "@/content/get-text";
import { WorkPageView } from "@/components/site/WorkPageView";

export default async function WorkPage() {
  return <WorkPageView t={await getText()} />;
}
