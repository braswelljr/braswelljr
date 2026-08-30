import type { ComponentType } from 'react';

/**
 * The slice of a TanStack Table v9 instance this markup actually reads.
 *
 * Declared structurally rather than importing the full generic instance type so
 * the parts stay usable with any row shape and any feature set. Anything the
 * table does not register is optional here, which is also how the pagination
 * and sorting parts know whether to render at all.
 */
export interface DataTableHeaderCell {
  id: string;
  isPlaceholder?: boolean;
  colSpan?: number;
}

export interface DataTableHeaderGroup {
  id: string;
  headers: DataTableHeaderCell[];
}

export interface DataTableCell {
  id: string;
}

export interface DataTableRow {
  id: string;
  getAllCells: () => DataTableCell[];
  getIsSelected?: () => boolean;
}

export interface DataTableInstance {
  getHeaderGroups: () => DataTableHeaderGroup[];
  getRowModel: () => { rows: DataTableRow[] };
  /**
   * v9 renders header and cell content through this component.
   *
   * Typed loosely on purpose. The real signature is a discriminated union over
   * exactly one of `header`, `cell` or `footer`, generic in both the feature set
   * and the row type. Because parameters are contravariant, no hand-written
   * structural signature can accept it, so this is the one deliberate escape
   * hatch. Everything else on this interface stays checked.
   */
  FlexRender: ComponentType<any>;

  /**
   * Opt into re-renders for one slice of table state.
   *
   * v9 does not expose a `getState()`. State is read either from the selector
   * passed to `useTable`, or by subscribing to a slice atom, and a primitive
   * cannot assume the caller chose a selector that happens to include what it
   * needs. Subscribing is therefore the only correct read here.
   */
  Subscribe: ComponentType<any>;
  /** One readonly atom per registered state slice. Absent slices are undefined. */
  atoms?: Record<string, { get: () => unknown } | undefined>;

  /** Present only when `rowPaginationFeature` is registered. */
  getPageCount?: () => number;
  getCanPreviousPage?: () => boolean;
  getCanNextPage?: () => boolean;
  previousPage?: () => void;
  nextPage?: () => void;
  setPageIndex?: (index: number) => void;
  setPageSize?: (size: number) => void;
}
