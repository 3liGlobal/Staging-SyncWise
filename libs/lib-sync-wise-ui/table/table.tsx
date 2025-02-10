import { Dispatch, SetStateAction, useState } from "react";
import "./table.css";
import {
  ColumnDef,
  ColumnResizeDirection,
  ColumnResizeMode,
  FilterFn,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { rankItem } from "@tanstack/match-sorter-utils";

type DataTableProps<T> = {
  globalFilter?: string;
  setGlobalFilter?: Dispatch<SetStateAction<string>>;
  columns: ColumnDef<T>[];
  data: T[];
  tableExtraClasses?: string;
};

const fuzzyFilter: FilterFn<unknown> = (row, columnId, value, addMeta) => {
  const itemRank = rankItem(row.getValue(columnId), value);
  addMeta({
    itemRank,
  });
  return itemRank.passed;
};

export function Table<T>({
  globalFilter,
  setGlobalFilter,
  data,
  columns,
}: DataTableProps<T>) {
  const [columnResizeMode] = useState<ColumnResizeMode>("onChange");
  const [columnResizeDirection] = useState<ColumnResizeDirection>("ltr");
  const table = useReactTable({
    data,
    columns: columns as ColumnDef<unknown, any>[],
    debugTable: true,
    filterFns: {
      fuzzy: fuzzyFilter,
    },
    columnResizeMode,
    columnResizeDirection,
    state: {
      globalFilter,
    },
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    globalFilterFn: fuzzyFilter,
  });

  return (
    <div className="h-full">
      <div className="h-full flex flex-col gap-6 table-container">
        <div className="table-wrapper hide-scrollbar">
          <table className="w-full h-full flex-grow">
            <thead>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      className={"text-left py-5 px-4"}
                      style={{
                        width: header.getSize(),
                      }}
                    >
                      {header.isPlaceholder ? null : (
                        <div className="text-base font-semibold">
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                        </div>
                      )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody className="hide-scrollbar">
              {table.getRowModel().rows.map((row) => (
                <tr key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <td
                      key={cell.id}
                      className="py-5 px-4 border-b border-gray-250 text-base text-blue-950 font-medium"
                      style={{ width: cell.column.getSize() }}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {!table.getRowModel().rows.length && (
          <h1 className="font-semibold text-xl mt-12 w-full text-center">
            Nothing here yet!
          </h1>
        )}
      </div>
    </div>
  );
}
