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
    flags?: CountryFlags;
    population: number;
    region: string;
    capital?: string[];
}

export type CountriesResponse = Country[];