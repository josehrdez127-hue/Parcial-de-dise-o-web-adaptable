export interface CountryDetail {
    name: {
        common: string;
    };
    cca2: string;
    cca3?: string;
    flags?: {
        png?: string;
        svg?: string;
        alt?: string;
    };
    capital?: string[];
    population: number;
    region: string;
    subregion?: string;
    tld?: string[];
    currencies?: Record<string, { name: string; symbol?: string }>;
    languages?: Record<string, string>;
    borders?: string[];
}
