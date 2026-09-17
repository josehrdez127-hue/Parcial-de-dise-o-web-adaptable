import './style.css';

import { fetchCountries } from './api/countries';
import { renderCountryGrid } from './render/countryGrid';
import type { Country } from './types/country';

declare const lucide: {
    createIcons: () => void;
};

const menuButton = document.querySelector<HTMLButtonElement>('#menu-toggle');
const mainMenu = document.querySelector<HTMLElement>('#main-menu');
const countriesGrid = document.querySelector<HTMLElement>('#countries-grid');
const searchInput = document.querySelector<HTMLInputElement>('#country-search');
const regionFilter = document.querySelector<HTMLSelectElement>('#region-filter');

let allCountries: Country[] = [];

function setMenuState(isOpen: boolean): void {
    if (!menuButton || !mainMenu) {
        return;
    }

    mainMenu.classList.toggle('hidden', !isOpen);
    menuButton.setAttribute('aria-expanded', String(isOpen));
    menuButton.setAttribute(
        'aria-label',
        isOpen ? 'Cerrar menú de navegación' : 'Abrir menú de navegación'
    );
}

if (menuButton && mainMenu) {
    menuButton.addEventListener('click', () => {
        const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
        setMenuState(!isOpen);
    });
}

document.addEventListener('keydown', (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
        setMenuState(false);
        menuButton?.focus();
    }
});

const desktopBreakpoint = window.matchMedia('(min-width: 768px)');
desktopBreakpoint.addEventListener('change', () => {
    setMenuState(false);
});

function filterCountries(): void {
    const searchText = searchInput?.value.toLowerCase().trim() || '';
    const selectedRegion = regionFilter?.value || 'all';

    const filteredCountries = allCountries.filter((country) => {
        const matchesName = country.name.common
            .toLowerCase()
            .includes(searchText);

        const matchesRegion =
            selectedRegion === 'all' || country.region === selectedRegion;

        return matchesName && matchesRegion;
    });

    renderCountryGrid(countriesGrid, filteredCountries);
}

searchInput?.addEventListener('input', filterCountries);
regionFilter?.addEventListener('change', filterCountries);

async function init(): Promise<void> {
    try {
        allCountries = await fetchCountries();
        renderCountryGrid(countriesGrid, allCountries);

        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }
    } catch (error) {
        console.error(error);

        if (countriesGrid) {
            countriesGrid.innerHTML = `
                <p class="col-span-full text-center text-red-500 py-10">
                    No se pudieron cargar los países.
                </p>
            `;
        }
    }
}

init();
