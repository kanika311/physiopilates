import type { ReactNode, ThHTMLAttributes, TdHTMLAttributes } from "react";

function DataTableRoot({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`admin-card overflow-hidden ${className}`}
      style={{ borderRadius: "var(--admin-radius-lg)" }}
    >
      <div className="overflow-x-auto">{children}</div>
    </div>
  );
}

function DataTableElement({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return <table className={`w-full ${className}`}>{children}</table>;
}

function DataTableHead({ children }: { children: ReactNode }) {
  return (
    <thead>
      <tr
        className="border-b"
        style={{
          borderColor: "var(--admin-border)",
          backgroundColor: "var(--admin-muted)",
        }}
      >
        {children}
      </tr>
    </thead>
  );
}

function DataTableHeaderCell({
  children,
  className = "",
  ...props
}: ThHTMLAttributes<HTMLTableCellElement>) {
  return (
    <th
      className={`px-4 py-3.5 text-left text-xs font-semibold uppercase tracking-wider sm:px-6 ${className}`}
      style={{ color: "var(--admin-text-muted)" }}
      {...props}
    >
      {children}
    </th>
  );
}

function DataTableBody({ children }: { children: ReactNode }) {
  return <tbody>{children}</tbody>;
}

function DataTableRow({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <tr
      className={`border-b transition-colors duration-200 hover:bg-[var(--admin-muted)] ${className}`}
      style={{ borderColor: "var(--admin-border)" }}
    >
      {children}
    </tr>
  );
}

function DataTableCell({
  children,
  className = "",
  ...props
}: TdHTMLAttributes<HTMLTableCellElement>) {
  return (
    <td
      className={`px-4 py-4 text-sm sm:px-6 ${className}`}
      style={{ color: "var(--page-fg)" }}
      {...props}
    >
      {children}
    </td>
  );
}

const DataTable = Object.assign(DataTableRoot, {
  Table: DataTableElement,
  Head: DataTableHead,
  HeaderCell: DataTableHeaderCell,
  Body: DataTableBody,
  Row: DataTableRow,
  Cell: DataTableCell,
});

export default DataTable;
