import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export const Route = createFileRoute("/_manage/users/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <div>
        <h2 className="text-2xl font-bold">Daftar User</h2>
        <p className="text-muted-foreground">Lorem ipsum dolor sit amet</p>
      </div>
      <div></div>
    </div>
  );
}
