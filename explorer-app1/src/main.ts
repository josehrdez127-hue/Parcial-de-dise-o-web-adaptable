import './style.css';
import { fetchCountries } from './api/countries';
import { renderCountryGrid } from './render/countryGrid';
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
    renderCountryGrid(countriesGrid, filteredCountries);
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
    try {
        allCountries = await fetchCountries();
        applyFilters();

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
