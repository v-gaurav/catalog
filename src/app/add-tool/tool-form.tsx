"use client";

import { useActionState, useEffect, useRef } from "react";
import { useFormStatus } from "react-dom";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { addToolAction, type FormState } from "@/lib/actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending ? "Adding Tool..." : "Add Tool"}
    </Button>
  );
}

export function ToolForm() {
  const router = useRouter();
  const { toast } = useToast();
  const formRef = useRef<HTMLFormElement>(null);
  
  const initialState: FormState = { message: "", errors: {} };
  const [state, dispatch] = useActionState(addToolAction, initialState);

  useEffect(() => {
    if (state.message.startsWith("Successfully")) {
      toast({
        title: "Success!",
        description: state.message,
      });
      formRef.current?.reset();
      router.push("/");
    } else if (state.message.startsWith("Failed") || state.message.startsWith("Database Error")) {
      toast({
        title: "Error",
        description: state.message,
        variant: "destructive",
      });
    }
  }, [state, toast, router]);

  return (
    <form ref={formRef} action={dispatch} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="name">Tool Name</Label>
        <Input id="name" name="name" placeholder="e.g., SynthWeaver" />
        {state.errors?.name && <p className="text-sm font-medium text-destructive">{state.errors.name}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="purpose">Purpose</Label>
        <Input id="purpose" name="purpose" placeholder="e.g., Automated content generation" />
         {state.errors?.purpose && <p className="text-sm font-medium text-destructive">{state.errors.purpose}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea id="description" name="description" placeholder="A detailed description of the tool..." />
         {state.errors?.description && <p className="text-sm font-medium text-destructive">{state.errors.description}</p>}
      </div>

      <div className="space-y-2">
        <Label htmlFor="howToUse">How to Use</Label>
        <Textarea id="howToUse" name="howToUse" rows={6} placeholder="Provide instructions on how to use the tool..." />
        {state.errors?.howToUse && <p className="text-sm font-medium text-destructive">{state.errors.howToUse}</p>}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="region">Region</Label>
          <Input id="region" name="region" placeholder="e.g., Global" />
          {state.errors?.region && <p className="text-sm font-medium text-destructive">{state.errors.region}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="businessUnit">Business Unit</Label>
          <Input id="businessUnit" name="businessUnit" placeholder="e.g., Marketing" />
          {state.errors?.businessUnit && <p className="text-sm font-medium text-destructive">{state.errors.businessUnit}</p>}
        </div>
      </div>
      
       <div className="space-y-2">
        <Label htmlFor="languageSupport">Language Support</Label>
        <Input id="languageSupport" name="languageSupport" placeholder="e.g., English, Spanish" />
        {state.errors?.languageSupport && <p className="text-sm font-medium text-destructive">{state.errors.languageSupport}</p>}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="cost">Cost</Label>
          <Select name="cost" defaultValue="Paid">
            <SelectTrigger id="cost">
              <SelectValue placeholder="Select cost" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Free">Free</SelectItem>
              <SelectItem value="Paid">Paid</SelectItem>
            </SelectContent>
          </Select>
           {state.errors?.cost && <p className="text-sm font-medium text-destructive">{state.errors.cost}</p>}
        </div>
        <div className="space-y-2">
          <Label htmlFor="access">Access</Label>
          <Select name="access" defaultValue="Controlled">
            <SelectTrigger id="access">
              <SelectValue placeholder="Select access type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Open">Open</SelectItem>
              <SelectItem value="Controlled">Controlled</SelectItem>
            </SelectContent>
          </Select>
          {state.errors?.access && <p className="text-sm font-medium text-destructive">{state.errors.access}</p>}
        </div>
      </div>
      
      <div className="flex justify-end">
        <SubmitButton />
      </div>
    </form>
  );
}
