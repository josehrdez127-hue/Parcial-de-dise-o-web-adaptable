import type { Country } from '../types/country';

const populationFormatter = new Intl.NumberFormat('es-MX');

const regionLabels: Record<string, string> = {
    Africa: 'África',
    Americas: 'América',
    Asia: 'Asia',
    Europe: 'Europa',
    Oceania: 'Oceanía',
};

export function formatPopulation(population: number): string {
    return populationFormatter.format(population);
}

export function getRegionLabel(region: string): string {
    return regionLabels[region] ?? region;
}

export function getCapital(country: Country): string {
    const capital = country.capital?.filter(Boolean).join(', ');
    return capital || 'No disponible';
}

export function getFlagUrl(country: Country): string | null {
    const url = country.flags?.svg || country.flags?.png;
    return typeof url === 'string' && url.length > 0 ? url : null;
}

export function getFlagAlt(country: Country): string {
    const alt = country.flags?.alt?.trim();
    return alt || `Bandera de ${country.name.common}`;
}