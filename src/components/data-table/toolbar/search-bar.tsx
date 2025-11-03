"use client";

import { Input } from "@/components/ui/input";
import { type Table } from "@tanstack/react-table";

interface SearchBarProps<TData> {
  table: Table<TData>;
  column?: string;
}

export function SearchBar<TData>({
  table,
  // column = "nama",
}: SearchBarProps<TData>) {
  // const col = table.getColumn(column);
  const value = table.getState().globalFilter ?? "";

  return (
    // <Input
    //   placeholder="Search..."
    //   value={(col?.getFilterValue() as string) ?? ""}
    //   onChange={(e) => col?.setFilterValue(e.target.value)}
    //   className="h-8 w-[150px] lg:w-[250px] bg-white"
    // />

    <Input
      placeholder="Search..."
      value={value}
      onChange={(e) => table.setGlobalFilter(e.target.value)}
      className="h-8 w-[150px] lg:w-[250px] bg-white"
    />
  );
}
