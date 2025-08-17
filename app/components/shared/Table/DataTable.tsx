"use client";

import {
  type ColumnDef,
  flexRender,
  getCoreRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { useState } from "react";

import { ChevronFirst, ChevronLast } from "lucide-react";
import {
  Table,
  TableBody,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
  TableCell,
} from "~/components/ui/table";
import { Button } from "~/components/ui/button";
import { NoData } from "./NoData";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  onRowClick?: (row: TData) => void;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  onRowClick,
}: DataTableProps<TData, TValue>) {
  const [rowSelection, setRowSelection] = useState({});
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onRowSelectionChange: setRowSelection,
    state: {
      rowSelection,
    },
  });

  console.log(columns);
  return (
    <div>
      <div className="rounded-md border border-muted">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow
                key={headerGroup.id}
                className="text-center border-none bg-accent"
              >
                {headerGroup.headers.map((header, index) => {
                  const isLeftAligned = index === 0 || index === 1;
                  return (
                    <TableHead
                      key={header.id}
                      className={`py-4 px-4 text-sm ${
                        isLeftAligned ? "text-left" : "text-center"
                      }`}
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
                  onClick={() => onRowClick && onRowClick(row.original)}
                  className="border-[#4444440D] hover:bg-muted cursor-pointer text-center"
                >
                  {row.getVisibleCells().map((cell, index) => {
                    const isLeftAligned = index === 0 || index === 1;
                    return (
                      <TableCell
                        key={cell.id}
                        className={`py-4 px-4 text-sm ${
                          isLeftAligned
                            ? "text-left font-medium"
                            : "text-center"
                        }`}
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns?.length}
                  className="h-24 text-center"
                >
                  <NoData />
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex justify-between items-center py-4">
        {/* Selected Rows Info */}
        {/* <div className="text-sm text-gray-500">
          {table.getFilteredSelectedRowModel()?.rows?.length} of{" "}
          {table.getFilteredRowModel()?.rows?.length} row(s) selected.
        </div> */}

        {/* Pagination Controls */}
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="flex items-center gap-2"
          >
            <ChevronFirst className="text-[#0DAE94] h-4 w-4" />
            Prev
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="flex items-center gap-2"
          >
            Next
            <ChevronLast className="text-[#0DAE94] h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
