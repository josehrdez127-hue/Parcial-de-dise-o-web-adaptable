import { Menu, X } from 'lucide-react';
import { useState, type JSX, type ReactNode } from 'react';
import type { RegionFilterValue } from '../molecules/RegionFilter';
import { RegionFilter } from '../molecules/RegionFilter';
import { SearchBar } from '../molecules/SearchBar';

interface HeaderProps {
  children: ReactNode;
  query: string;
  region: RegionFilterValue;
  onQueryChange: (query: string) => void;
  onRegionChange: (region: RegionFilterValue) => void;
}

export function Header({
  children,
  query,
  region,
  onQueryChange,
  onRegionChange,
}: HeaderProps): JSX.Element {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <header className="relative h-20 border-b border-slate-200 bg-white">
        <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-6 md:px-8">
          <a href="#" className="flex items-center gap-3 text-slate-900">
            <img src="/world.svg" alt="" aria-hidden="true" className="h-8 w-8" />
            <span className="text-lg font-bold">{children}</span>
          </a>

          <button
            type="button"
            className="p-2 text-slate-600 hover:text-blue-600 md:hidden"
            aria-label={isMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
            aria-controls="main-menu"
            aria-expanded={isMenuOpen}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>

          <nav
            id="main-menu"
            className={`${isMenuOpen ? 'flex' : 'hidden'} absolute left-0 right-0 top-20 z-10 flex-col gap-5 border-b border-slate-200 bg-white px-6 py-5 text-sm md:static md:flex md:flex-row md:items-center md:gap-8 md:border-0 md:p-0`}
          >
            <a href="#inicio" className="text-slate-600 transition hover:text-blue-600">
              Inicio
            </a>
            <a href="#paises" className="font-semibold text-blue-600">
              Explorar países
            </a>
            <a href="#acerca" className="text-slate-600 transition hover:text-blue-600">
              Acerca de
            </a>
          </nav>
        </div>
      </header>
      <section
        className="mx-auto flex max-w-7xl flex-col justify-between gap-5 px-6 py-8 md:flex-row md:px-8"
        aria-label="Filtros de países"
      >
        <SearchBar query={query} onQueryChange={onQueryChange} />
        <RegionFilter region={region} onRegionChange={onRegionChange} />
      </section>
    </>
  );
}