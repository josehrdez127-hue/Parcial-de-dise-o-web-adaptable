export interface CountryName {
    common: string;
}

export interface CountryFlags {
    png?: string | null;
    svg?: string | null;
    alt?: string | null;
}

export interface CountryCurrency {
    name: string;
    symbol?: string | null;
}

export interface Country {
    name: CountryName;
    cca2?: string | null;
    cca3?: string | null;
    flags?: CountryFlags | null;
    population: number;
    region: string;
    subregion?: string | null;
    capital?: string[] | null;
    tld?: string[] | null;
    currencies?: Record<string, CountryCurrency> | null;
    languages?: Record<string, string> | null;
    borders?: string[] | null;
}

export type CountriesResponse = Country[];