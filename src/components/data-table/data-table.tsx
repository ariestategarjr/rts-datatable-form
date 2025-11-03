import {
  type ColumnDef,
  type ColumnFiltersState,
  type OnChangeFn,
  type PaginationState,
  type SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { DataTablePagination } from "./pagination/data-table-pagination";
import { DataTableToolbar } from "./toolbar/data-table-toolbar";
import * as React from "react";
import { ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react";

// types/table-config.ts
export interface TableConfig {
  showToolbar: boolean;
  filters: string[];
  actions: string[];
  showPagination: boolean;
  showSort: boolean;
}

interface DataTableProps<TData> {
  data: TData[];
  columns: ColumnDef<TData>[];
  config?: TableConfig;
  rowCount?: number;
  pagination?: PaginationState;
  onPaginationChange?: OnChangeFn<PaginationState>;
}

export function DataTable<TData>({
  data,
  columns,
  config,
  rowCount,
  // pagination,
  // onPaginationChange,
}: DataTableProps<TData>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = React.useState("");
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);

  const table = useReactTable({
    data,
    columns,
    rowCount,
    state: { sorting, globalFilter, columnFilters },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(), // client-side properties
    getSortedRowModel: getSortedRowModel(), // client-side properties
    getFilteredRowModel: getFilteredRowModel(), // client-side properties

    // state: { pagination }, // server-side properties
    // manualPagination: true, // server-side properties
    // onPaginationChange, // server-side properties
  });

  return (
    <div>
      {config?.showToolbar && (
        <DataTableToolbar table={table} config={config} />
      )}
      <div className="overflow-hidden rounded-md border mt-3">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      onClick={
                        config?.showSort && header.column.getCanSort()
                          ? header.column.getToggleSortingHandler()
                          : undefined
                      }
                      style={{
                        cursor:
                          config?.showSort && header.column.getCanSort()
                            ? "pointer"
                            : "default",
                      }}
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                      {config?.showSort &&
                        ({
                          asc: " ↑",
                          desc: " ↓",
                          // false: "", // atau " ↕" kalau kamu mau tampilan beda
                        }[header.column.getIsSorted() as string] ??
                          null)}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="mt-3">
        {config?.showPagination && <DataTablePagination table={table} />}
      </div>
    </div>
  );
}
