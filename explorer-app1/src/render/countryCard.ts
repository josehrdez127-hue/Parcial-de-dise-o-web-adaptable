import type { Country } from '../types/country';
import { formatPopulation, getCapital } from '../utils/format';

export function createCountryCard(country: Country): HTMLElement {
    const card = document.createElement('article');
    const flagUrl = country.flags?.png || country.flags?.svg || '';
    const capital = getCapital(country);

    card.className =
        'bg-white rounded-xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-md transition';

    card.innerHTML = `
        <img
            src="${flagUrl}"
            alt="${country.flags?.alt || `Bandera de ${country.name.common}` }"
            class="w-full h-48 object-cover"
        >

        <div class="p-5">
            <h2 class="text-xl font-bold mb-4">
                ${country.name.common}
            </h2>

            <p class="text-sm text-slate-600 mb-2">
                <span class="font-semibold text-slate-900">Región:</span>
                ${country.region}
            </p>

            <p class="text-sm text-slate-600 mb-2">
                <span class="font-semibold text-slate-900">Capital:</span>
                ${capital}
            </p>

            <p class="text-sm text-slate-600">
                <span class="font-semibold text-slate-900">Población:</span>
                ${formatPopulation(country.population)}
            </p>
        </div>
    `;

    return card;
}
