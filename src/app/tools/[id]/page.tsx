import { notFound } from "next/navigation";
import { getToolById, incrementToolViews } from "@/lib/data";
import { ToolDetailsClient } from "./tool-details-client";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";

export default async function ToolPage({ params }: { params: { id: string } }) {
  const tool = await getToolById(params.id);

  if (!tool) {
    notFound();
  }

  await incrementToolViews(params.id, tool.views);

  // We re-fetch the tool to get the updated view count, or we could just add 1 to the client-side object.
  // Re-fetching is safer if there are other concurrent updates.
  const updatedTool = await getToolById(params.id);

  if (!updatedTool) {
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
            <BreadcrumbPage>{updatedTool.name}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      
      <ToolDetailsClient tool={updatedTool} />
    </div>
  );
}
