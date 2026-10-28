import { Search } from 'lucide-react';
import type { ChangeEvent, JSX } from 'react';

interface SearchBarProps {
  query: string;
  onQueryChange: (query: string) => void;
}

export function SearchBar({ query, onQueryChange }: SearchBarProps): JSX.Element {
  function handleChange(event: ChangeEvent<HTMLInputElement>): void {
    onQueryChange(event.target.value);
  }

  return (
    <label className="relative w-full md:w-[30rem]">
      <span className="sr-only">Buscar país</span>
      <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500" aria-hidden="true" />
      <input
        type="search"
        value={query}
        onChange={handleChange}
        placeholder="Escriba el nombre del país..."
        className="h-14 w-full rounded-xl border border-slate-200 bg-white pl-12 pr-4 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
      />
    </label>
  );
}
