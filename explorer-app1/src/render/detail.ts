import type { Country } from '../types/country';
import type { CountryDetail } from '../types/country-detail';
import { formatPopulation, getCapital } from '../utils/format';

const regionsInSpanish: Record<string, string> = {
    Africa: 'África',
    Americas: 'América',
    Asia: 'Asia',
    Europe: 'Europa',
    Oceania: 'Oceanía',
};

const subregionsInSpanish: Record<string, string> = {
    'Australia and New Zealand': 'Australia y Nueva Zelanda',
    'Central America': 'América Central',
    'Central Asia': 'Asia Central',
    'Central Europe': 'Europa Central',
    Caribbean: 'Caribe',
    'Eastern Africa': 'África Oriental',
    'Eastern Asia': 'Asia Oriental',
    'Eastern Europe': 'Europa Oriental',
    'Melanesia': 'Melanesia',
    Micronesia: 'Micronesia',
    'Middle Africa': 'África Central',
    'North America': 'América del Norte',
    'Northern Africa': 'África del Norte',
    'Northern Europe': 'Europa del Norte',
    'Polynesia': 'Polinesia',
    'South America': 'América del Sur',
    'South-Eastern Asia': 'Asia Sudoriental',
    'Southern Africa': 'África Austral',
    'Southern Asia': 'Asia Meridional',
    'Southern Europe': 'Europa del Sur',
    'Western Africa': 'África Occidental',
    'Western Asia': 'Asia Occidental',
    'Western Europe': 'Europa Occidental',
};

export function renderDetailLoading(): string {
    return `
        <div class="py-8" role="status" aria-live="polite">
            <a href="#" class="inline-flex items-center gap-2 rounded-md bg-white px-5 py-3 shadow-sm hover:shadow-md">
                <i data-lucide="arrow-left" class="h-4 w-4" aria-hidden="true"></i>
                Volver a países
            </a>
            <p class="mt-10 text-slate-600">Cargando información del país...</p>
        </div>
    `;
}

export function renderDetailError(code: string): string {
    return `
        <div class="py-8" role="alert">
            <a href="#" class="inline-flex items-center gap-2 rounded-md bg-white px-5 py-3 shadow-sm hover:shadow-md">
                <i data-lucide="arrow-left" class="h-4 w-4" aria-hidden="true"></i>
                Volver a países
            </a>
            <div class="py-16 text-center">
                <h1 class="text-2xl font-bold">No encontramos ese país</h1>
                <p class="mt-3 text-slate-600">No se pudo cargar la información para el código ${code}.</p>
            </div>
        </div>
    `;
}

export function renderCountryDetail(country: CountryDetail, countries: Country[]): string {
    const flagUrl = country.flags?.svg || country.flags?.png || '';
    const localCountry = countries.find((item) => item.cca2 === country.cca2);
    const displayName = localCountry?.name.common ?? country.name.common;
    const currencyNames = new Intl.DisplayNames(['es'], { type: 'currency' });
    const languageNames = new Intl.DisplayNames(['es'], { type: 'language' });
    const currencies = Object.entries(country.currencies ?? {})
        .map(([code, currency]) => {
            const localizedName = /^[A-Z]{3}$/.test(code) ? currencyNames.of(code) : undefined;
            const name = localizedName && localizedName !== code ? localizedName : currency.name;
            return `${name}${currency.symbol ? ` (${currency.symbol})` : ''}`;
        })
        .join(', ');
    const languages = Object.entries(country.languages ?? {})
        .map(([code, name]) => {
            const localizedName = /^[a-z]{2,3}$/i.test(code) ? languageNames.of(code) : undefined;
            return localizedName ?? name;
        })
        .join(', ');
    const borders = (country.borders ?? [])
        .map((code) => {
            const border = countries.find((item) => item.cca3 === code);
            if (!border?.cca2) {
                return `<span class="rounded-md bg-white px-4 py-2 text-sm shadow-sm">${code}</span>`;
            }

            return `<a href="#/country/${border.cca2}" class="rounded-md bg-white px-4 py-2 text-sm shadow-sm hover:shadow-md">${border.name.common}</a>`;
        })
        .join('');
    const capital = localCountry?.capital?.join(', ') || getCapital(country);
    const region = regionsInSpanish[country.region] ?? country.region;
    const subregion = country.subregion
        ? subregionsInSpanish[country.subregion] ?? country.subregion
        : 'No disponible';
    const borderMessage = country.borders === undefined
        ? 'No disponible'
        : 'No tiene fronteras terrestres.';

    return `
        <div class="py-8">
            <a href="#" class="inline-flex items-center gap-2 rounded-md bg-white px-5 py-3 shadow-sm hover:shadow-md">
                <i data-lucide="arrow-left" class="h-4 w-4" aria-hidden="true"></i>
                Volver a países
            </a>

            <article class="mt-12 grid grid-cols-1 items-center gap-10 md:grid-cols-2 md:gap-16">
                <img
                    src="${flagUrl}"
                    alt="Bandera de ${displayName}"
                    class="aspect-4/3 w-full rounded-md border border-slate-200 bg-white object-cover shadow-sm"
                >

                <div>
                    <h1 class="text-3xl font-bold tracking-tight">${displayName}</h1>
                    <div class="mt-6 grid grid-cols-1 gap-x-8 gap-y-8 sm:grid-cols-2">
                        <dl class="space-y-3 text-sm text-slate-600">
                            <div><dt class="inline font-semibold text-slate-900">Nombre:</dt> <dd class="inline">${displayName}</dd></div>
                            <div><dt class="inline font-semibold text-slate-900">Población:</dt> <dd class="inline">${formatPopulation(country.population)}</dd></div>
                            <div><dt class="inline font-semibold text-slate-900">Región:</dt> <dd class="inline">${region}</dd></div>
                            <div><dt class="inline font-semibold text-slate-900">Subregión:</dt> <dd class="inline">${subregion}</dd></div>
                            <div><dt class="inline font-semibold text-slate-900">Capital:</dt> <dd class="inline">${capital}</dd></div>
                        </dl>
                        <dl class="space-y-3 text-sm text-slate-600">
                            <div><dt class="inline font-semibold text-slate-900">Dominio:</dt> <dd class="inline">${country.tld?.join(', ') || 'No disponible'}</dd></div>
                            <div><dt class="inline font-semibold text-slate-900">Moneda:</dt> <dd class="inline">${currencies || 'No disponible'}</dd></div>
                            <div><dt class="inline font-semibold text-slate-900">Idiomas:</dt> <dd class="inline">${languages || 'No disponible'}</dd></div>
                        </dl>
                    </div>

                    <div class="mt-10">
                        <h2 class="font-semibold">Países fronterizos:</h2>
                        <div class="mt-4 flex flex-wrap gap-3">
                            ${borders || `<span class="text-sm text-slate-600">${borderMessage}</span>`}
                        </div>
                    </div>
                </div>
            </article>
        </div>
    `;
}
