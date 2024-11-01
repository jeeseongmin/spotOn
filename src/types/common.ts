import { ReactNode } from "react";

export type PropsWithRequiredChildren<P = unknown> = P & {
  children: ReactNode;
};

export interface Sort {
  sorted: boolean;
  unsorted: boolean;
  empty: boolean;
}

export interface Pageable {
  sort: Sort;
  pageNumber: number;
  pageSize: number;
  offset: number;
  paged: boolean;
  unpaged: boolean;
}
