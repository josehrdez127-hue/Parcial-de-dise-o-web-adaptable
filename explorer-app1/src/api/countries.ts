import type { Country, CountriesResponse } from '../types/country';
import type { CountryDetail } from '../types/country-detail';

interface ApiCurrency {
    code?: string;
    name: string;
    symbol?: string;
}

interface ApiLanguage {
    iso639_1?: string;
    name: string;
}

interface ApiCountry {
    names: CountryDetail['name'];
    codes: { alpha_2: string; alpha_3?: string };
    flag?: { url_png?: string; url_svg?: string; description?: string };
    capitals?: { name: string }[];
    population: number;
    region: string;
    subregion?: string;
    tlds?: string[];
    currencies?: ApiCurrency[] | Record<string, ApiCurrency>;
    languages?: ApiLanguage[] | Record<string, string>;
    borders?: string[];
}

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

export async function fetchCountryByCode(code: string): Promise<CountryDetail> {
    const countryCode = code.trim().toUpperCase();

    if (!/^[A-Z]{2}$/.test(countryCode)) {
        throw new Error('El código del país debe tener dos letras.');
    }

    const fields = [
        'names.common', 'codes.alpha_2', 'codes.alpha_3',
        'flag.url_png', 'flag.url_svg', 'flag.description', 'capitals',
        'population', 'region', 'subregion', 'tlds', 'currencies', 'languages', 'borders',
    ].join(',');

    try {
        const response = await fetch(
            `/api/codes.alpha_2/${countryCode}?response_fields=${encodeURIComponent(fields)}`
        );

        if (response.ok) {
            const result: { data?: { objects?: ApiCountry[] } } = await response.json();
            const country = result.data?.objects?.find(
                (item) => item.codes.alpha_2.toUpperCase() === countryCode
            );

            if (country) {
                const currencyItems = Array.isArray(country.currencies)
                    ? country.currencies
                    : country.currencies
                      ? 'name' in country.currencies
                          ? [country.currencies as unknown as ApiCurrency]
                          : Object.values(country.currencies)
                      : [];
                const languageItems = Array.isArray(country.languages)
                    ? country.languages
                    : Object.entries(country.languages ?? {}).map(([code, name]) => ({
                          iso639_1: code,
                          name,
                      }));

                return {
                    name: country.names,
                    cca2: country.codes.alpha_2,
                    cca3: country.codes.alpha_3,
                    flags: {
                        png: country.flag?.url_png,
                        svg: country.flag?.url_svg,
                        alt: country.flag?.description,
                    },
                    capital: country.capitals?.map((capital) => capital.name),
                    population: country.population,
                    region: country.region,
                    subregion: country.subregion,
                    tld: country.tlds,
                    currencies: Object.fromEntries(
                        currencyItems.map((currency, index) => [
                            currency.code ?? String(index),
                            { name: currency.name, symbol: currency.symbol },
                        ])
                    ),
                    languages: Object.fromEntries(
                        languageItems.map((language, index) => [
                            language.iso639_1 ?? String(index),
                            language.name,
                        ])
                    ),
                    borders: country.borders,
                };
            }
        }
    } catch {
        // The bundled list keeps detail navigation available if the API is offline.
    }

    const localResponse = await fetch('/countries.json');
    if (!localResponse.ok) {
        throw new Error(`No se encontró el país ${countryCode}.`);
    }

    const localCountries: Country[] = await localResponse.json();
    const localCountry = localCountries.find((item) => item.cca2 === countryCode);

    if (!localCountry) {
        throw new Error(`No se encontró el país ${countryCode}.`);
    }

    return {
        name: localCountry.name,
        cca2: countryCode,
        cca3: localCountry.cca3,
        flags: localCountry.flags,
        capital: localCountry.capital,
        population: localCountry.population,
        region: localCountry.region,
        subregion: localCountry.subregion,
        tld: localCountry.tld,
        currencies: localCountry.currencies,
        languages: localCountry.languages,
        borders: localCountry.borders,
    };
}
