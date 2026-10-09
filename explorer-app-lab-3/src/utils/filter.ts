import type { Country } from '../types/country';

function normalize(value: string): string {
    return value.trim().toLocaleLowerCase('es').normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

export function filterCountries(
    countries: Country[],
    query: string,
    region: string
): Country[] {
    const normalizedQuery = normalize(query);

    return countries.filter((country) => {
        const matchesName = normalize(country.name.common).includes(normalizedQuery);
        const matchesRegion = region === 'all' || country.region === region;
        return matchesName && matchesRegion;
    });
}