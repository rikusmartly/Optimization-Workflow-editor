import React, { useState, useRef, useEffect } from 'react';

export interface SearchableSelectOption {
  value: string;
  label: string;
}

export interface SearchableSelectGroup {
  label: string;
  options: SearchableSelectOption[];
}

interface SearchableSelectProps {
  value: string;
  onChange: (value: string) => void;
  /** Flat list of options (use when no groups). */
  options?: SearchableSelectOption[];
  /** Grouped options (use for categorized list). When provided, options are ignored. */
  optionsGrouped?: SearchableSelectGroup[];
  placeholder?: string;
  className?: string;
  'aria-label'?: string;
}

function flattenGrouped(groups: SearchableSelectGroup[]): SearchableSelectOption[] {
  return groups.flatMap((g) => g.options);
}

function getLabelForValue(
  value: string,
  options?: SearchableSelectOption[],
  optionsGrouped?: SearchableSelectGroup[]
): string {
  const flat = optionsGrouped ? flattenGrouped(optionsGrouped) : options ?? [];
  const found = flat.find((o) => o.value === value);
  return found?.label ?? value;
}

export const SearchableSelect: React.FC<SearchableSelectProps> = ({
  value,
  onChange,
  options = [],
  optionsGrouped,
  placeholder = 'Select…',
  className = '',
  'aria-label': ariaLabel = 'Searchable select',
}) => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const flatOptions = optionsGrouped ? flattenGrouped(optionsGrouped) : options;
  const displayLabel = value ? getLabelForValue(value, options, optionsGrouped) : placeholder;

  const searchLower = search.trim().toLowerCase();
  const filteredFlat = searchLower
    ? flatOptions.filter((o) => o.label.toLowerCase().includes(searchLower))
    : flatOptions;

  const filteredGrouped: SearchableSelectGroup[] | null = optionsGrouped
    ? optionsGrouped
        .map((g) => ({
          label: g.label,
          options: g.options.filter((o) => o.label.toLowerCase().includes(searchLower)),
        }))
        .filter((g) => g.options.length > 0)
    : null;

  useEffect(() => {
    if (open) {
      setSearch('');
      searchInputRef.current?.focus();
    }
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const handle = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handle);
    return () => document.removeEventListener('mousedown', handle);
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const handle = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', handle);
    return () => document.removeEventListener('keydown', handle);
  }, [open]);

  const handleSelect = (optionValue: string) => {
    onChange(optionValue);
    setOpen(false);
  };

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        aria-haspopup="listbox"
        aria-label={ariaLabel}
        className="relative w-full pl-3 pr-10 py-2 text-sm text-left border border-gray-200 rounded-lg bg-white focus:ring-2 focus:ring-purple-primary focus:border-transparent flex items-center justify-between gap-2"
      >
        <span className="truncate">{displayLabel}</span>
        <svg
          className={`shrink-0 w-4 h-4 text-gray-500 transition-transform absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none ${open ? 'rotate-180' : ''}`}
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" clipRule="evenodd" />
        </svg>
      </button>
      {open && (
        <div
          className="absolute z-50 mt-1 w-full rounded-lg border border-gray-200 bg-white shadow-lg py-1 min-w-[200px] max-h-64 flex flex-col"
          role="listbox"
        >
          <div className="px-2 pb-2 border-b border-gray-100">
            <input
              ref={searchInputRef}
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => e.stopPropagation()}
              placeholder="Search…"
              className="w-full px-2 py-1.5 text-sm border border-gray-200 rounded focus:ring-2 focus:ring-purple-primary focus:border-transparent"
              aria-label="Search options"
            />
          </div>
          <div ref={listRef} className="overflow-y-auto flex-1 py-1">
            {filteredGrouped ? (
              filteredGrouped.map((group) => (
                <div key={group.label}>
                  <div className="px-3 py-1 text-xs font-semibold text-gray-500 uppercase tracking-wide sticky top-0 bg-gray-50">
                    {group.label}
                  </div>
                  {group.options.map((opt) => (
                    <button
                      key={opt.value}
                      type="button"
                      role="option"
                      aria-selected={opt.value === value}
                      onClick={() => handleSelect(opt.value)}
                      className={`w-full px-3 py-2 text-left text-sm hover:bg-gray-100 focus:bg-gray-100 focus:outline-none ${
                        opt.value === value ? 'bg-purple-50 text-purple-900' : 'text-gray-800'
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              ))
            ) : (
              filteredFlat.map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  role="option"
                  aria-selected={opt.value === value}
                  onClick={() => handleSelect(opt.value)}
                  className={`w-full px-3 py-2 text-left text-sm hover:bg-gray-100 focus:bg-gray-100 focus:outline-none ${
                    opt.value === value ? 'bg-purple-50 text-purple-900' : 'text-gray-800'
                  }`}
                >
                  {opt.label}
                </button>
              ))
            )}
            {(filteredGrouped?.length === 0 || (!optionsGrouped && filteredFlat.length === 0)) && (
              <div className="px-3 py-4 text-sm text-gray-500 text-center">No matches</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
