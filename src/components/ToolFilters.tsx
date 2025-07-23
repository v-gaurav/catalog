"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "./ui/button";

interface ToolFiltersProps {
  filters: {
    search: string;
    cost: string;
    access: string;
    region: string;
    businessUnit: string;
  };
  setFilters: (filters: ToolFiltersProps["filters"]) => void;
  distinctValues: {
    regions: string[];
    businessUnits: string[];
  };
  onReset: () => void;
}

export function ToolFilters({ filters, setFilters, distinctValues, onReset }: ToolFiltersProps) {
  const handleFilterChange = (key: keyof typeof filters, value: string) => {
    setFilters({ ...filters, [key]: value });
  };

  return (
    <div className="space-y-6">
      <div>
        <Label htmlFor="search">Search</Label>
        <Input
          id="search"
          placeholder="Search by name or purpose..."
          value={filters.search}
          onChange={(e) => handleFilterChange("search", e.target.value)}
        />
      </div>

      <div>
        <Label>Cost</Label>
        <RadioGroup
          value={filters.cost}
          onValueChange={(value) => handleFilterChange("cost", value)}
          className="flex gap-4 mt-2"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="All" id="cost-all" />
            <Label htmlFor="cost-all">All</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="Free" id="cost-free" />
            <Label htmlFor="cost-free">Free</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="Paid" id="cost-paid" />
            <Label htmlFor="cost-paid">Paid</Label>
          </div>
        </RadioGroup>
      </div>

      <div>
        <Label>Access</Label>
        <RadioGroup
          value={filters.access}
          onValueChange={(value) => handleFilterChange("access", value)}
          className="flex gap-4 mt-2"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="All" id="access-all" />
            <Label htmlFor="access-all">All</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="Open" id="access-open" />
            <Label htmlFor="access-open">Open</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="Controlled" id="access-controlled" />
            <Label htmlFor="access-controlled">Controlled</Label>
          </div>
        </RadioGroup>
      </div>

      <div>
        <Label htmlFor="region">Region</Label>
        <Select
          value={filters.region}
          onValueChange={(value) => handleFilterChange("region", value)}
        >
          <SelectTrigger id="region">
            <SelectValue placeholder="Select a region" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All Regions</SelectItem>
            {distinctValues.regions.map((region) => (
              <SelectItem key={region} value={region}>
                {region}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

       <div>
        <Label htmlFor="businessUnit">Business Unit</Label>
        <Select
          value={filters.businessUnit}
          onValueChange={(value) => handleFilterChange("businessUnit", value)}
        >
          <SelectTrigger id="businessUnit">
            <SelectValue placeholder="Select a business unit" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="All">All Business Units</SelectItem>
            {distinctValues.businessUnits.map((bu) => (
              <SelectItem key={bu} value={bu}>
                {bu}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Button onClick={onReset} variant="outline" className="w-full">
        Reset Filters
      </Button>
    </div>
  );
}
