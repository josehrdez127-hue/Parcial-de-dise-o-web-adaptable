export interface CountryNames {
    common: string;
}

export interface CountryFlags {
    png?: string;
    svg?: string;
    alt?: string;
}

export interface Country {
    name: CountryNames;
    cca2?: string;
    cca3?: string;
    flags?: CountryFlags;
    population: number;
    region: string;
    subregion?: string;
    capital?: string[];
    tld?: string[];
    currencies?: Record<string, { name: string; symbol?: string }>;
    languages?: Record<string, string>;
    borders?: string[];
}

export type CountriesResponse = Country[];