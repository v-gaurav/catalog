import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ToolForm } from "./tool-form";

export default function AddToolPage() {
  return (
    <div className="container mx-auto max-w-2xl py-8">
      <Card>
        <CardHeader>
          <CardTitle>Add a New Tool</CardTitle>
          <CardDescription>Fill out the form below to add a new AI tool or agent to the catalog.</CardDescription>
        </CardHeader>
        <CardContent>
          <ToolForm />
        </CardContent>
      </Card>
    </div>
  );
}
