import { getText } from "@/content/get-text";
import { ContactPageView } from "@/components/site/ContactPageView";

export default async function ContactPage() {
  return <ContactPageView t={await getText()} />;
}
