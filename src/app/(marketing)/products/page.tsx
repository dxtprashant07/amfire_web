import { getText } from "@/content/get-text";
import { ProductsPageView } from "@/components/site/ProductsPageView";

export default async function ProductsPage() {
  return <ProductsPageView t={await getText()} />;
}
