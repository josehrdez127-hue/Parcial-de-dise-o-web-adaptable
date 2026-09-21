import type { Country } from '../types/country';
import { createCountryCard } from './countryCard';

export function renderCountryGrid(container: HTMLElement | null, countries: Country[]): void {
    if (!container) {
        return;
    }

    container.innerHTML = '';

    if (countries.length === 0) {
        container.innerHTML = `
            <p class="col-span-full text-center text-slate-500 py-10">
                No se encontraron países con ese nombre o región.
            </p>
        `;
        return;
    }

    countries.forEach((country) => {
        const card = createCountryCard(country);
        container.appendChild(card);
    });
}
