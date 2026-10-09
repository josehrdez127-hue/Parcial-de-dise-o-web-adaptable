import type { CountriesResponse, Country } from '../types/country';

function isRecord(value: unknown): value is Record<string, unknown> {
    return typeof value === 'object' && value !== null && !Array.isArray(value);
}

function isOptionalString(value: unknown): boolean {
    return value === undefined || value === null || typeof value === 'string';
}

function isOptionalStringArray(value: unknown): boolean {
    return value === undefined || value === null || (
        Array.isArray(value) && value.every((item: unknown) => typeof item === 'string')
    );
}

function isStringRecord(value: unknown): boolean {
    return value === undefined || value === null || (
        isRecord(value) && Object.values(value).every((item: unknown) => typeof item === 'string')
    );
}

function isCountry(value: unknown): value is Country {
    if (
        !isRecord(value) ||
        !isRecord(value.name) ||
        typeof value.name.common !== 'string' ||
        typeof value.population !== 'number' ||
        !Number.isFinite(value.population) ||
        value.population < 0 ||
        typeof value.region !== 'string'
    ) {
        return false;
    }

    const flagsAreValid = value.flags === undefined || value.flags === null || (
        isRecord(value.flags) &&
        isOptionalString(value.flags.png) &&
        isOptionalString(value.flags.svg) &&
        isOptionalString(value.flags.alt)
    );
    const currenciesAreValid = value.currencies === undefined || value.currencies === null || (
        isRecord(value.currencies) && Object.values(value.currencies).every((currency: unknown) =>
            isRecord(currency) &&
            typeof currency.name === 'string' &&
            isOptionalString(currency.symbol)
        )
    );

    return flagsAreValid &&
        currenciesAreValid &&
        isStringRecord(value.languages) &&
        isOptionalString(value.cca2) &&
        isOptionalString(value.cca3) &&
        isOptionalString(value.subregion) &&
        isOptionalStringArray(value.capital) &&
        isOptionalStringArray(value.tld) &&
        isOptionalStringArray(value.borders);
}

function isCountriesResponse(value: unknown): value is CountriesResponse {
    return Array.isArray(value) && value.every((country: unknown) => isCountry(country));
}

export async function fetchCountries(): Promise<Country[]> {
    const response = await fetch('/countries.json');

    if (!response.ok) {
        throw new Error(`No se pudieron cargar los países (HTTP ${response.status}).`);
    }

    let payload: unknown;
    try {
        payload = await response.json();
    } catch {
        throw new Error('El archivo de países no contiene JSON válido.');
    }

    if (!isCountriesResponse(payload)) {
        throw new Error('La fuente de países tiene una estructura no válida.');
    }

    return payload;
}