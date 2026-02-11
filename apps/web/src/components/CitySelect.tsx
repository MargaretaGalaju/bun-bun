'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import { useLocale } from 'next-intl';
import type { CityDto } from '@bun-bun/shared';
import { getCities } from '@/lib/api/cities';

interface CitySelectProps {
  value: string;
  onChange: (cityId: string) => void;
  placeholder?: string;
}

export default function CitySelect({ value, onChange, placeholder }: CitySelectProps) {
  const locale = useLocale();
  const [cities, setCities] = useState<CityDto[]>([]);
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');
  const wrapperRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    getCities().then(setCities).catch(() => {});
  }, []);

  // Close on click outside
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const getName = useCallback(
    (city: CityDto) => (locale === 'ro' ? city.nameRo : city.nameRu),
    [locale],
  );

  const selectedCity = cities.find((c) => c.id === value);
  const displayValue = selectedCity ? getName(selectedCity) : '';

  const filtered = cities.filter((c) => {
    if (!search) return true;
    const lower = search.toLowerCase();
    return (
      c.nameRo.toLowerCase().includes(lower) ||
      c.nameRu.toLowerCase().includes(lower)
    );
  });

  function handleSelect(cityId: string) {
    onChange(cityId);
    setSearch('');
    setOpen(false);
  }

  function handleClear(e: React.MouseEvent) {
    e.stopPropagation();
    onChange('');
    setSearch('');
    setOpen(false);
  }

  return (
    <div ref={wrapperRef} className="relative">
      {/* Trigger button */}
      <button
        type="button"
        onClick={() => {
          setOpen(!open);
          if (!open) {
            setTimeout(() => inputRef.current?.focus(), 0);
          }
        }}
        className="w-full text-left border border-gray-300 rounded-md px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-green-600 focus:border-transparent flex items-center justify-between"
      >
        <span className={displayValue ? 'text-gray-900' : 'text-gray-400'}>
          {displayValue || placeholder || '—'}
        </span>
        <span className="flex items-center gap-1">
          {value && (
            <span
              role="button"
              tabIndex={-1}
              onClick={handleClear}
              className="text-gray-400 hover:text-gray-600 text-xs px-1"
            >
              ✕
            </span>
          )}
          <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </span>
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute z-50 mt-1 w-full bg-white border border-gray-200 rounded-md shadow-lg max-h-60 flex flex-col">
          {/* Search input */}
          <div className="p-2 border-b border-gray-100">
            <input
              ref={inputRef}
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={placeholder || '...'}
              className="w-full border border-gray-200 rounded px-2 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-green-600"
            />
          </div>

          {/* Options */}
          <ul className="overflow-y-auto flex-1 py-1 m-0 list-none p-0">
            {filtered.length === 0 ? (
              <li className="px-3 py-2 text-sm text-gray-400">—</li>
            ) : (
              filtered.map((city) => (
                <li
                  key={city.id}
                  onClick={() => handleSelect(city.id)}
                  className={`px-3 py-2 text-sm cursor-pointer hover:bg-green-50 transition-colors ${
                    city.id === value ? 'bg-green-50 font-medium text-green-800' : 'text-gray-700'
                  }`}
                >
                  {getName(city)}
                </li>
              ))
            )}
          </ul>
        </div>
      )}
    </div>
  );
}
