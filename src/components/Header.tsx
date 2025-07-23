import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";

export function Header() {
  return (
    <header className="bg-card border-b sticky top-0 z-40">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="text-2xl font-bold text-primary">
            AgentBase
          </Link>
          <Button asChild>
            <Link href="/add-tool">
              <PlusCircle className="mr-2" />
              Add Tool
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
