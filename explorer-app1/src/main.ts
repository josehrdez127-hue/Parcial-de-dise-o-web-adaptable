import './style.css';
import { fetchCountries } from './api/countries';
import { renderCountryGrid } from './render/countryGrid';
import { renderEmpty, renderError, renderLoading } from './render/states';
import type { Country } from './types/country';
import { filterCountries as filterCountryList } from './utils/filter';

declare const lucide: {
    createIcons: () => void;
};

const menuButton = document.querySelector<HTMLButtonElement>('#menu-toggle');
const mainMenu = document.querySelector<HTMLElement>('#main-menu');
const countriesGrid = document.querySelector<HTMLElement>('#countries-grid');
const searchInput = document.querySelector<HTMLInputElement>('#country-search');
const regionFilter = document.querySelector<HTMLSelectElement>('#region-filter');

let allCountries: Country[] = [];
let debounceTimer: number | undefined;

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

function applyFilters(): void {
    const searchText = searchInput?.value.trim().toLowerCase() ?? '';
    const selectedRegion = regionFilter?.value ?? 'all';

    const filteredCountries = filterCountryList(allCountries, searchText, selectedRegion);

    if (filteredCountries.length > 0) {
        renderCountryGrid(countriesGrid, filteredCountries);
        return;
    }

    if (countriesGrid) {
        countriesGrid.innerHTML = renderEmpty(searchText);
    }
}

function handleSearchInput(): void {
    window.clearTimeout(debounceTimer);
    debounceTimer = window.setTimeout(() => {
        applyFilters();
    }, 300);
}

searchInput?.addEventListener('input', handleSearchInput);
regionFilter?.addEventListener('change', applyFilters);

async function init(): Promise<void> {
    if (!countriesGrid) {
        return;
    }

    countriesGrid.innerHTML = renderLoading();

    try {
        allCountries = await fetchCountries();

        if (allCountries.length === 0) {
            countriesGrid.innerHTML = renderEmpty('');
            return;
        }

        renderCountryGrid(countriesGrid, allCountries.slice(0, 8));

        if (typeof lucide !== 'undefined') {
            lucide.createIcons();
        }
    } catch (error) {
        const message = error instanceof Error ? error.message : 'Error desconocido';
        console.error(message);
        renderError(countriesGrid, 'No se pudieron cargar los países.');

        const retryButton = document.querySelector<HTMLButtonElement>('#retry-button');
        retryButton?.addEventListener('click', () => {
            void init();
        });
    }
}

init();
