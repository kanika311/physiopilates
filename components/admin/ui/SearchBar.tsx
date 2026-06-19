import { Search } from "lucide-react";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export default function SearchBar({
  value,
  onChange,
  placeholder = "Search...",
  className = "",
}: SearchBarProps) {
  return (
    <div className={`relative ${className}`}>
      <Search
        size={17}
        className="absolute left-3.5 top-1/2 -translate-y-1/2"
        style={{ color: "var(--admin-text-muted)" }}
      />
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="admin-focus-ring h-12 w-full rounded-[12px] border pl-10 pr-4 text-sm outline-none transition-all duration-200"
        style={{
          borderColor: "var(--admin-border)",
          backgroundColor: "var(--admin-surface)",
          color: "var(--page-fg)",
        }}
      />
    </div>
  );
}
