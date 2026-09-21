import type { Country } from '../types/country';

export function filterCountries(
    countries: Country[],
    query: string,
    region: string
): Country[] {
    const normalizedQuery = query.trim().toLowerCase();

    return countries.filter((country: Country): boolean => {
        const matchesName =
            normalizedQuery === '' ||
            country.name.common.toLowerCase().includes(normalizedQuery);

        const matchesRegion =
            region === 'all' || region === '' || country.region === region;

        return matchesName && matchesRegion;
    });
}
