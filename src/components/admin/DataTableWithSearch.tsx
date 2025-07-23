import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  Search,
  SlidersHorizontal,
  ChevronDown,
  ArrowUpDown,
  Trash2,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface ActionButton {
  label: string;
  href: string;
  variant?: "default" | "outline" | "secondary" | "destructive";
  onClick?: () => void;
}

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  title: string;
  actionButtons?: ActionButton[];
  onDeleteSelected?: (selectedRows: TData[]) => void;
}

export interface DataTableWithSearchProps<TData> {
  columns: ColumnDef<TData>[];
  data: TData[];
  title?: string;
  actionButtons?: ActionButton[];
  onDeleteSelected?: (selectedRows: TData[]) => void;
}

export function DataTableWithSearch<TData, TValue>({
  columns,
  data,
  title,
  actionButtons = [],
  onDeleteSelected,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  const selectedRows = table.getFilteredSelectedRowModel().rows;

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">{title}</h2>
        <div className="flex items-center space-x-2">
          <div className="relative">
            <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-500" />
            <Input
              placeholder="Search Here..."
              value={
                (table.getColumn("name")?.getFilterValue() as string) ?? ""
              }
              onChange={(event) =>
                table.getColumn("name")?.setFilterValue(event.target.value)
              }
              className="pl-8 w-64 py-5 border-2"
            />
          </div>

          <Dialog>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="bg-primary py-5 text-sm"
              >
                <SlidersHorizontal className="h-4 w-4" />
                Filters
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Filter Options</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                {table
                  .getAllColumns()
                  .filter((column) => column.getCanFilter())
                  .map((column) => (
                    <div key={column.id} className="grid gap-2">
                      <label className="text-sm font-medium">{column.id}</label>
                      <Input
                        placeholder={`Filter ${column.id}...`}
                        value={(column.getFilterValue() as string) ?? ""}
                        onChange={(event) =>
                          column.setFilterValue(event.target.value)
                        }
                      />
                    </div>
                  ))}
              </div>
            </DialogContent>
          </Dialog>

          <Button
            variant="outline"
            size="sm"
            className="bg-primary py-5 text-sm"
            onClick={() => {
              const currentSort = table.getState().sorting[0];
              if (currentSort) {
                table.setSorting([
                  {
                    id: currentSort.id,
                    desc: !currentSort.desc,
                  },
                ]);
              }
            }}
          >
            <ArrowUpDown className="h-4 w-4" />
            Sort
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                size="sm"
                className="bg-primary py-5 text-sm"
              >
                <ChevronDown className="h-4 w-4" />
                Columns
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {table
                .getAllColumns()
                .filter((column) => column.getCanHide())
                .map((column) => {
                  return (
                    <DropdownMenuCheckboxItem
                      key={column.id}
                      className="capitalize"
                      checked={column.getIsVisible()}
                      onCheckedChange={(value) =>
                        column.toggleVisibility(!!value)
                      }
                    >
                      {column.id}
                    </DropdownMenuCheckboxItem>
                  );
                })}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      {actionButtons && actionButtons.length === 1 ? (
        <div className="flex w-full justify-end py-4">
          {actionButtons.map((button, index) =>
            button.onClick ? (
              <Button
                key={index}
                variant={button.variant || "default"}
                size="sm"
                className="py-5 text-white text-sm font-semibold"
                onClick={button.onClick}
              >
                {button.label}
              </Button>
            ) : (
              <a key={index} href={button.href}>
                <Button
                  variant={button.variant || "default"}
                  size="sm"
                  className="py-5 text-white text-sm font-semibold"
                >
                  {button.label}
                </Button>
              </a>
            )
          )}
        </div>
      ) : (
        <div className="flex w-full justify-between py-4">
          {actionButtons.map((button, index) =>
            button.onClick ? (
              <Button
                key={index}
                variant={button.variant || "default"}
                size="sm"
                className="py-5 text-white text-sm font-semibold"
                onClick={button.onClick}
              >
                {button.label}
              </Button>
            ) : (
              <a key={index} href={button.href}>
                <Button
                  variant={button.variant || "default"}
                  size="sm"
                  className="py-5 text-white text-sm font-semibold"
                >
                  {button.label}
                </Button>
              </a>
            )
          )}
        </div>
      )}
      {/* Action Buttons Row */}
      <div className="flex justify-between items-center mb-4">
        {selectedRows.length > 0 && onDeleteSelected && (
          <Button
            size="sm"
            className="py-5 bg-white border shadow-md text-black text-sm font-semibold"
            onClick={() =>
              onDeleteSelected(selectedRows.map((row) => row.original))
            }
          >
            <Trash2 className="h-4 w-4 text-[#751513]" />
            Delete({selectedRows.length})
          </Button>
        )}
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader className="bg-[#FFE7FB]">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead
                      key={header.id}
                      className="text-black py-2 font-semibold text-md"
                    >
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
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
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
