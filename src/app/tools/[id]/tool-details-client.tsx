"use client";

import type { Tool } from "@/lib/types";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Globe, Building, Languages, DollarSign, KeyRound, Calendar, Eye, Activity } from "lucide-react";
import { ToolRecommendations } from "./tool-recommendations";

interface ToolDetailsClientProps {
  tool: Tool;
}

export function ToolDetailsClient({ tool }: ToolDetailsClientProps) {
  const metadataItems = [
    { icon: Globe, label: "Region", value: tool.region },
    { icon: Building, label: "Business Unit", value: tool.businessUnit },
    { icon: Languages, label: "Language Support", value: tool.languageSupport },
    { icon: DollarSign, label: "Cost", value: tool.cost },
    { icon: KeyRound, label: "Access", value: tool.access },
  ];

  const auditItems = [
     { icon: Eye, label: "Views", value: tool.views.toLocaleString() },
     { icon: Calendar, label: "Created On", value: new Date(tool.createdAt).toLocaleDateString() },
     { icon: Activity, label: "Last Updated", value: new Date(tool.updatedAt).toLocaleDateString() },
  ]

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-8">
        <Card>
           <CardContent className="p-0">
             <div className="aspect-video relative">
                <Image
                    src={`https://placehold.co/1200x600.png`}
                    alt={tool.name}
                    fill
                    className="rounded-t-lg object-cover"
                    data-ai-hint="futuristic interface"
                />
            </div>
            <div className="p-6">
                <h1 className="text-4xl font-bold mb-2">{tool.name}</h1>
                <p className="text-lg text-muted-foreground">{tool.purpose}</p>
                <div className="mt-4 border-t pt-4">
                  <p className="text-foreground">{tool.description}</p>
                </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>How to Use</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="prose prose-blue max-w-none whitespace-pre-wrap font-mono text-sm bg-muted p-4 rounded-md">
                {tool.howToUse}
            </div>
          </CardContent>
        </Card>
      </div>

      <aside className="lg:col-span-1 space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {metadataItems.map((item) => (
              <div key={item.label} className="flex items-start gap-3">
                <item.icon className="w-5 h-5 text-muted-foreground mt-1" />
                <div>
                  <p className="font-semibold">{item.label}</p>
                  <p className="text-muted-foreground">{item.value}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Audit Info</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {auditItems.map((item) => (
              <div key={item.label} className="flex items-center gap-3">
                <item.icon className="w-5 h-5 text-muted-foreground" />
                <div>
                  <p className="font-semibold">{item.label}</p>
                  <p className="text-muted-foreground">{item.value}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <ToolRecommendations tool={tool} />
      </aside>
    </div>
  );
}
