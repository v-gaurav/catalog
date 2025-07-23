"use client";

import { useState } from "react";
import type { Tool } from "@/lib/types";
import { getRecommendationsAction } from "@/lib/actions";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Wand2, Zap } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

interface ToolRecommendationsProps {
  tool: Tool;
}

export function ToolRecommendations({ tool }: ToolRecommendationsProps) {
  const [recommendations, setRecommendations] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGetRecommendations = async () => {
    setLoading(true);
    setError(null);
    setRecommendations([]);

    const result = await getRecommendationsAction({
        name: tool.name,
        purpose: tool.purpose,
        description: tool.description,
        region: tool.region,
        businessUnit: tool.businessUnit,
        languageSupport: tool.languageSupport,
        cost: tool.cost,
        access: tool.access
    });

    if (result.error) {
      setError(result.error);
    } else if (result.recommendations) {
      setRecommendations(result.recommendations);
    }
    setLoading(false);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
            <Wand2 className="text-primary"/>
            AI Recommendations
        </CardTitle>
        <CardDescription>
            Discover similar or complementary tools.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Button onClick={handleGetRecommendations} disabled={loading} className="w-full">
            {loading ? "Generating..." : <> <Zap className="mr-2 h-4 w-4" /> Get Recommendations </> }
        </Button>

        {loading && (
            <div className="mt-4 space-y-2">
                <Skeleton className="h-6 w-full" />
                <Skeleton className="h-6 w-5/6" />
                <Skeleton className="h-6 w-3/4" />
            </div>
        )}

        {error && (
            <p className="mt-4 text-sm text-destructive">{error}</p>
        )}

        {recommendations.length > 0 && (
            <ul className="mt-4 space-y-2 list-disc list-inside bg-accent/30 p-4 rounded-md">
                {recommendations.map((rec, index) => (
                    <li key={index} className="text-sm font-medium">{rec}</li>
                ))}
            </ul>
        )}
      </CardContent>
    </Card>
  );
}
