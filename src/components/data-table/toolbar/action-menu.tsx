"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Plus, Menu } from "lucide-react";

interface ActionMenuProps {
  actions: string[];
  
}

export function ActionMenu({ actions, features }: ActionMenuProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="sm" variant="outline">
          <Menu className="h-4 w-4" /> Aksi
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start">
        {actions.includes("add") && (
          <DropdownMenuItem onClick={() => console.log("Add employee")}>
            <Plus className="mr-2 h-4 w-4" /> Tambah {features}
          </DropdownMenuItem>
        )}
        {actions.includes("export") && (
          <DropdownMenuItem onClick={() => console.log("Export employee")}>
            📤 Export
          </DropdownMenuItem>
        )}
        {actions.includes("import") && (
          <DropdownMenuItem onClick={() => console.log("Import employee")}>
            📥 Import
          </DropdownMenuItem>
        )}
        {actions.includes("sync") && (
          <DropdownMenuItem onClick={() => console.log("Sync employee")}>
            🔄 Sync
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
