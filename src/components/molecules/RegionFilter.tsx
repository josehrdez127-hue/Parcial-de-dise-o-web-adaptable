import type { ChangeEvent, JSX } from 'react';

export type RegionFilterValue =
  | 'all'
  | 'Americas'
  | 'Europe'
  | 'Asia'
  | 'Africa'
  | 'Oceania';

interface RegionFilterProps {
  region: RegionFilterValue;
  onRegionChange: (region: RegionFilterValue) => void;
}

function isRegionFilterValue(value: string): value is RegionFilterValue {
  return (
    value === 'all' ||
    value === 'Americas' ||
    value === 'Europe' ||
    value === 'Asia' ||
    value === 'Africa' ||
    value === 'Oceania'
  );
}

export function RegionFilter({
  region,
  onRegionChange,
}: RegionFilterProps): JSX.Element {
  function handleChange(event: ChangeEvent<HTMLSelectElement>): void {
    const selectedRegion = event.target.value;

    if (!isRegionFilterValue(selectedRegion)) {
      throw new RangeError(`Región no válida: ${selectedRegion}`);
    }

    onRegionChange(selectedRegion);
  }

  return (
    <label className="w-full md:w-auto">
      <span className="sr-only">Filtrar por región</span>
      <select
        value={region}
        onChange={handleChange}
        className="h-14 w-full rounded-xl border border-slate-200 bg-white px-4 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 md:w-60"
      >
        <option value="all">Busque por región</option>
        <option value="Americas">América</option>
        <option value="Europe">Europa</option>
        <option value="Asia">Asia</option>
        <option value="Africa">África</option>
        <option value="Oceania">Oceanía</option>
      </select>
    </label>
  );
}
