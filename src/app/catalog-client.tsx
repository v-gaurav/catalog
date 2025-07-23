"use client";

import { useState, useMemo } from "react";
import type { Tool } from "@/lib/types";
import { ToolFilters } from "@/components/ToolFilters";
import { ToolCard } from "@/components/ToolCard";
import { Card, CardContent } from "@/components/ui/card";
import { AnimatePresence, motion } from "framer-motion";

interface CatalogClientProps {
  tools: Tool[];
}

const initialFilters = {
  search: "",
  cost: "All",
  access: "All",
  region: "All",
  businessUnit: "All",
};

export function CatalogClient({ tools }: CatalogClientProps) {
  const [filters, setFilters] = useState(initialFilters);

  const distinctValues = useMemo(() => {
    const regions = [...new Set(tools.map((tool) => tool.region))];
    const businessUnits = [...new Set(tools.map((tool) => tool.businessUnit))];
    return { regions, businessUnits };
  }, [tools]);

  const filteredTools = useMemo(() => {
    return tools.filter((tool) => {
      const searchLower = filters.search.toLowerCase();
      return (
        (filters.search === "" ||
          tool.name.toLowerCase().includes(searchLower) ||
          tool.purpose.toLowerCase().includes(searchLower)) &&
        (filters.cost === "All" || tool.cost === filters.cost) &&
        (filters.access === "All" || tool.access === filters.access) &&
        (filters.region === "All" || tool.region === filters.region) &&
        (filters.businessUnit === "All" || tool.businessUnit === filters.businessUnit)
      );
    });
  }, [tools, filters]);

  const handleReset = () => {
    setFilters(initialFilters);
  };
  
  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <aside className="lg:col-span-1">
            <Card>
                <CardContent className="p-6">
                    <ToolFilters 
                        filters={filters} 
                        setFilters={setFilters} 
                        distinctValues={distinctValues}
                        onReset={handleReset}
                    />
                </CardContent>
            </Card>
        </aside>

        <main className="lg:col-span-3">
            {filteredTools.length > 0 ? (
            <motion.div 
                layout
                className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
            >
                <AnimatePresence>
                {filteredTools.map((tool) => (
                    <motion.div
                        key={tool.id}
                        layout
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                    >
                        <ToolCard tool={tool} />
                    </motion.div>
                ))}
                </AnimatePresence>
            </motion.div>
            ) : (
            <div className="flex flex-col items-center justify-center text-center h-full rounded-lg border-2 border-dashed p-12">
                <h2 className="text-2xl font-semibold">No Tools Found</h2>
                <p className="mt-2 text-muted-foreground">
                    Try adjusting your search filters.
                </p>
                <button
                    onClick={handleReset}
                    className="mt-4 px-4 py-2 bg-primary text-primary-foreground rounded-md text-sm font-medium hover:bg-primary/90 transition-colors"
                >
                    Clear Filters
                </button>
            </div>
            )}
        </main>
        </div>
    </div>
  );
}
