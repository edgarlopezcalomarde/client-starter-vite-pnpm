import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  OnChangeFn,
  PaginationOptions,
  PaginationState,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { Button } from "./ui/button";
import Loading from "./loading";

export const DEFAULT_PAGE_INDEX = 0;
export const DEFAULT_PAGE_SIZE = 10;
type MetaTableProps<T> = {
  data: T[];
  columns: ColumnDef<T>[];
  pagination: PaginationState;
  paginationOptions: Pick<PaginationOptions, "onPaginationChange" | "rowCount">;
  sorting: SortingState;
  onSortingChange: OnChangeFn<SortingState>;
  rowStyle?: (row: T) => React.CSSProperties;
  onRowClick?: (row: T) => void;
  isLoading?: boolean;
  hideChangeSize?: boolean;
};

export function MetaTable<T>({
  data,
  columns,
  pagination,
  paginationOptions,
  sorting,
  onSortingChange,
  rowStyle,
  onRowClick,
  isLoading = false,
  hideChangeSize = false,
}: MetaTableProps<T>) {
  const table = useReactTable({
    data,
    columns,
    state: { pagination, sorting },
    onSortingChange,
    ...paginationOptions,
    manualFiltering: true,
    manualSorting: true,
    manualPagination: true,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="flex w-full flex-col gap-2 h-full overflow-hidden">
      <Layout isLoading={isLoading}>
        <Table>
          <TableHeader className="sticky w-full top-0 h-10 border-b  rounded-t-md bg-white  z-[9] ">
            {table.getHeaderGroups().map((headerGroup) => {
              return (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id} colSpan={header.colSpan}>
                        {header.isPlaceholder ? null : (
                          <div
                            {...{
                              className: header.column.getCanSort()
                                ? "cursor-pointer select-none"
                                : "",
                              onClick: header.column.getToggleSortingHandler(),
                            }}
                          >
                            {flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                            {
                              { asc: "", desc: "", false: "" }[
                                header.column.getIsSorted() as string
                              ]
                            }
                          </div>
                        )}
                      </TableHead>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableHeader>

          <TableBody>
            {table.getRowModel().rows.map((row) => {
              const rowStyles = rowStyle ? rowStyle(row.original) : {};
              return (
                <TableRow
                  key={row.id}
                  style={rowStyles}
                  onClick={() => {
                    if (onRowClick) {
                      onRowClick(row.original);
                    }
                  }}
                >
                  {row.getVisibleCells().map((cell) => {
                    return (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Layout>
      <div className="flex justify-between mt-auto">
        <div className="flex gap-16 items-center ">
          <div className="flex gap-2">
            <span>{table.getState().pagination.pageIndex + 1}</span>
            <span>/</span>
            <span>{table.getPageCount()}</span>
          </div>

          {hideChangeSize ? (
            <select
              value={table.getState().pagination.pageSize + ""}
              onChange={(e) => table.setPageSize(+e.target.value)}
              className=" rounded px-8 py-2 border"
            >
              {[8, 10, 20, 30].map((size) => {
                return (
                  <option value={size.toString()} key={size}>
                    {size}
                  </option>
                );
              })}
            </select>
          ) : (
            <></>
          )}
        </div>

        <div className="flex gap-4">
          <Button
            variant="ghost"
            className="text-lg cursor-pointer"
            disabled={!table.getCanPreviousPage()}
            onClick={() => table.setPageIndex(0)}
          >
            {"<<"}
          </Button>
          <Button
            variant="ghost"
            className="text-lg cursor-pointer"
            disabled={!table.getCanPreviousPage()}
            onClick={() => table.previousPage()}
          >
            {"<"}
          </Button>

          <Button
            variant="ghost"
            className="text-lg cursor-pointer"
            disabled={!table.getCanNextPage()}
            onClick={() => table.nextPage()}
          >
            {">"}
          </Button>
          <Button
            variant="ghost"
            className="text-lg cursor-pointer"
            disabled={!table.getCanNextPage()}
            onClick={() => table.setPageIndex(table.getPageCount() - 1)}
          >
            {">>"}
          </Button>
        </div>
      </div>
    </div>
  );
}

function Layout({
  children,
  isLoading,
}: {
  children: React.ReactNode;
  isLoading: boolean;
}) {
  if (isLoading) {
    return <Loading />;
  }

  return <>{children}</>;
}
