import type { Country } from '../types/country';
import { formatPopulation, getCapital } from '../utils/format';

export function createCountryCard(country: Country): HTMLElement {
    const card = document.createElement('a');
    const flagUrl = country.flags?.png || country.flags?.svg || '';
    const capital = getCapital(country);
    const regionNames: Record<string, string> = {
        Africa: 'África',
        Americas: 'América',
        Europe: 'Europa',
        Oceania: 'Oceanía',
        Asia: 'Asia',
    };
    const subregionNames: Record<string, string> = {
        'Central America': 'América Central',
    };
    const regionName = regionNames[country.region] ?? country.region;
    const subregionName = country.subregion
        ? subregionNames[country.subregion] ?? country.subregion
        : '';

    card.className =
        '@container block bg-white rounded-xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-md transition';
    card.href = `#/country/${country.cca2}`;
    card.setAttribute('aria-label', `Ver detalles de ${country.name.common}`);

    card.innerHTML = `
        <img
            src="${flagUrl}"
            alt="${country.flags?.alt || `Bandera de ${country.name.common}` }"
            class="w-full h-48 object-cover"
        >

        <div class="p-5">
            <h2 class="country-card-title text-xl font-bold mb-4">
                ${country.name.common}
            </h2>

            <div class="grid grid-cols-1 @sm:grid-cols-2!">
                <p class="country-card-copy text-sm text-slate-600 mb-2">
                    <span class="font-semibold text-slate-900">Región:</span>
                    ${regionName}
                </p>

                ${subregionName ? `
                    <p class="country-card-copy text-sm text-slate-600 mb-2">
                        <span class="font-semibold text-slate-900">Subregión:</span>
                        ${subregionName}
                    </p>
                ` : ''}

                <p class="country-card-copy text-sm text-slate-600 mb-2">
                    <span class="font-semibold text-slate-900">Capital:</span>
                    ${capital}
                </p>

                <p class="country-card-copy text-sm text-slate-600">
                    <span class="font-semibold text-slate-900">Población:</span>
                    ${formatPopulation(country.population)}
                </p>
            </div>
        </div>
    `;

    return card;
}
