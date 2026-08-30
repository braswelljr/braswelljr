'use client';

import { createContext, useContext, type ReactNode } from 'react';
import { cn } from 'lib/utils';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import type { DataTableInstance } from './types';

/**
 * Composable table parts over a TanStack Table v9 instance.
 *
 * The caller builds the instance with `useTable` and owns the columns, the
 * features and the data. These parts only render it, which is the split v9
 * expects: the table produces models, React owns the semantic markup.
 *
 * Nothing here fetches. Sorting, filtering and pagination are features the
 * caller registers, and the parts light up when the matching API is present.
 */
const DataTableContext = createContext<DataTableInstance | null>(null);

function useDataTable(part: string): DataTableInstance {
  const table = useContext(DataTableContext);
  if (!table) throw new Error(`<${part}> must be used inside <DataTable>`);
  return table;
}

export function DataTable({
  table,
  className,
  children
}: {
  table: DataTableInstance;
  className?: string;
  children: ReactNode;
}) {
  return (
    <DataTableContext.Provider value={table}>
      <div className={cn('space-y-3', className)}>{children}</div>
    </DataTableContext.Provider>
  );
}

/** The scroll container plus the `<table>` itself. */
export function DataTableContent({
  className,
  caption,
  children
}: {
  className?: string;
  /** Rendered as a visually hidden `<caption>`, which is the table's accessible name. */
  caption?: string;
  children?: ReactNode;
}) {
  return (
    <div
      className={cn(
        'w-full overflow-x-auto rounded-sm border border-neutral-200 dark:border-neutral-800',
        className
      )}
    >
      <Table>
        {caption && <caption className="sr-only">{caption}</caption>}
        {children}
      </Table>
    </div>
  );
}

export function DataTableHead({ className }: { className?: string }) {
  const table = useDataTable('DataTableHead');

  return (
    <TableHeader className={className}>
      {table.getHeaderGroups().map((group) => (
        <TableRow key={group.id}>
          {group.headers.map((header) => (
            <TableHead
              key={header.id}
              colSpan={header.colSpan}
              scope="col"
            >
              {header.isPlaceholder ? null : <table.FlexRender header={header} />}
            </TableHead>
          ))}
        </TableRow>
      ))}
    </TableHeader>
  );
}

export function DataTableRows({ className }: { className?: string }) {
  const table = useDataTable('DataTableRows');
  const rows = table.getRowModel().rows;

  return (
    <TableBody className={className}>
      {rows.map((row) => (
        <TableRow
          key={row.id}
          data-state={row.getIsSelected?.() ? 'selected' : undefined}
          className="data-[state=selected]:bg-primary-50 dark:data-[state=selected]:bg-primary-950"
        >
          {row.getAllCells().map((cell) => (
            <TableCell key={cell.id}>
              <table.FlexRender cell={cell} />
            </TableCell>
          ))}
        </TableRow>
      ))}
    </TableBody>
  );
}

/** Rendered in place of the rows when the current model is empty. */
export function DataTableEmpty({
  colSpan,
  children = 'No results.',
  className
}: {
  colSpan: number;
  children?: ReactNode;
  className?: string;
}) {
  return (
    <TableBody>
      <TableRow>
        <TableCell
          colSpan={colSpan}
          className={cn(
            'h-24 text-center text-sm text-neutral-600 dark:text-neutral-400',
            className
          )}
        >
          {children}
        </TableCell>
      </TableRow>
    </TableBody>
  );
}

/** True when the table has no rows to show, so a caller can pick the empty part. */
export function useDataTableIsEmpty(table: DataTableInstance): boolean {
  return table.getRowModel().rows.length < 1;
}
