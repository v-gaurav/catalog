import { notFound } from "next/navigation";
import { getToolById } from "@/lib/data";
import { ToolDetailsClient } from "./tool-details-client";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";

export default async function ToolPage({ params }: { params: { id: string } }) {
  // getToolById now also increments the view count
  const tool = await getToolById(params.id);

  if (!tool) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumb className="mb-8">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">AgentBase</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{tool.name}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      
      <ToolDetailsClient tool={tool} />
    </div>
  );
}
