import { getTools } from "@/lib/mock-data";
import { CatalogClient } from "@/app/catalog-client";

export default function Home() {
  const tools = getTools();
  return <CatalogClient tools={tools} />;
}
