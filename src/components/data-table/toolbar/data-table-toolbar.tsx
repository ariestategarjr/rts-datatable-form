"use client";

import { type Table } from "@tanstack/react-table";
import { SearchBar } from "./search-bar";
import { FilterDrawer } from "./filter-drawer";
import { ActionMenu } from "./action-menu";
import type { TableConfig } from "@/types/table-config";

export interface TableToolbarConfig {
  showSearch: boolean;
  showFilter: boolean;
  showAction: boolean;
  filters: string[];
  actions: string[];
}

export interface TableConfig {
  showToolbar: boolean;
  toolbar: TableToolbarConfig;
  showPagination: boolean;
}

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  config?: TableConfig;
}

export function DataTableToolbar<TData>({
  table,
  config,
}: DataTableToolbarProps<TData>) {
  if (!config?.showToolbar) return null;

  const toolbar = config.toolbar;
  const features = config.features;

  return (
    <div className="flex items-center justify-between gap-2">
      <div>
        {/* Action */}
        {toolbar.showAction && toolbar.actions.length > 0 && (
          <ActionMenu actions={toolbar.actions} features={features} />
        )}
      </div>
      
      <div className="flex items-center gap-2">
        {/* Search */}
        {toolbar.showSearch && <SearchBar table={table} />}

        {/* Filter */}
        {toolbar.showFilter && toolbar.filters.length > 0 && (
          <FilterDrawer filters={toolbar.filters} table={table} />
        )}
      </div>
    </div>
  );
}
