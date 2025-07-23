import { getTools } from "@/lib/data";
import { CatalogClient } from "@/app/catalog-client";

export default async function Home() {
  const tools = await getTools();
  return <CatalogClient tools={tools} />;
}
