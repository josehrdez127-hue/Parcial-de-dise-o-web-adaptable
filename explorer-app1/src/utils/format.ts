import type { Country } from '../types/country';

export function formatPopulation(value: number): string {
    return value.toLocaleString('es-SV');
}

export function getCapital(country: Country): string {
    return country.capital?.[0] || 'Sin capital';
}
