import type { Country, CountriesResponse } from '../types/country';

export async function fetchCountries(): Promise<Country[]> {
    const response = await fetch('/countries.json');

    if (!response.ok) {
        throw new Error(
            `Error al obtener los países. Código HTTP: ${response.status} ${response.statusText}`
        );
    }

    const countries: CountriesResponse = await response.json();

    return countries;
}
