import Link from "next/link";
import Image from "next/image";
import type { Tool } from "@/lib/types";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Eye, ChevronsRight } from "lucide-react";

interface ToolCardProps {
  tool: Tool;
}

export function ToolCard({ tool }: ToolCardProps) {
  return (
    <Link href={`/tools/${tool.id}`} className="block group">
      <Card className="h-full flex flex-col transition-all duration-200 ease-in-out group-hover:shadow-xl group-hover:border-primary">
        <CardHeader>
          <div className="aspect-video relative mb-4">
             <Image
                src={`https://placehold.co/600x400.png`}
                alt={tool.name}
                fill
                className="rounded-md object-cover"
                data-ai-hint="abstract tech"
              />
          </div>
          <CardTitle className="text-xl">{tool.name}</CardTitle>
          <CardDescription>{tool.purpose}</CardDescription>
        </CardHeader>
        <CardContent className="flex-grow">
          <div className="flex flex-wrap gap-2">
            <Badge variant="secondary">{tool.cost}</Badge>
            <Badge variant="secondary">{tool.access}</Badge>
            <Badge variant="outline">{tool.region}</Badge>
            <Badge variant="outline">{tool.businessUnit}</Badge>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between items-center text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
                <Eye className="w-4 h-4" />
                <span>{tool.views.toLocaleString()} views</span>
            </div>
            <div className="flex items-center gap-1 text-primary opacity-0 group-hover:opacity-100 transition-opacity">
                <span>View Details</span>
                <ChevronsRight className="w-4 h-4" />
            </div>
        </CardFooter>
      </Card>
    </Link>
  );
}
