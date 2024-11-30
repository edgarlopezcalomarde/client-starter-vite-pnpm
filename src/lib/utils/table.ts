export const DEFAULT_PAGE_INDEX = 0;
export const DEFAULT_PAGE_SIZE = 10;

import { PaginationState, SortingState } from "@tanstack/react-table";

export type PaginatedData<T> = {
  result: T[];
  rowCount: number;
};

export type PaginationParams = PaginationState;
export type SortParams = { sortBy: `${string}.${"asc" | "desc"}` };
export type Filters<T> = Partial<T & PaginationParams & SortParams>;

export function toRecords<T extends Record<string, unknown>>(
  items: T[]
): Record<string, string | number>[] {
  return items.map((item) => {
    const record: Record<string, string | number> = {};

    for (const [key, value] of Object.entries(item)) {
      if (typeof value === "string" || typeof value === "number") {
        record[key] = value;
      } else if (value instanceof Date) {
        record[key] = value.toISOString().split("T")[0]; // Obtiene solo la parte de la fecha
      } else {
        record[key] = String(value);
      }
    }

    return record;
  });
}

export const cleanEmptyParams = <T extends Record<string, unknown>>(
  search: T
) => {
  const newSearch = { ...search };
  Object.keys(newSearch).forEach((key) => {
    const value = newSearch[key];
    if (
      value === undefined ||
      value === "" ||
      (typeof value === "number" && isNaN(value))
    )
      delete newSearch[key];
  });

  if (search.pageIndex === DEFAULT_PAGE_INDEX) delete newSearch.pageIndex;
  if (search.pageSize === DEFAULT_PAGE_SIZE) delete newSearch.pageSize;

  return newSearch;
};

export const stateToSortBy = (sorting: SortingState | undefined) => {
  if (!sorting || sorting.length == 0) return undefined;

  const sort = sorting[0];

  return `${sort.id}.${sort.desc ? "desc" : "asc"}` as const;
};

export const sortByToState = (sortBy: SortParams["sortBy"] | undefined) => {
  if (!sortBy) return [];

  const [id, desc] = sortBy.split(".");
  return [{ id, desc: desc === "desc" }];
};
