import './atlas.css';
import { fetchCountries } from './api/countries';
import { createCountryCard } from './render/countryCard';
import { renderCountryDetail } from './render/detail';
import { renderEmpty, renderError, renderLoading } from './render/states';
import type { AppStatus } from './types/appState';
import type { Country } from './types/country';
import { debounce } from './utils/debounce';
import { filterCountries } from './utils/filter';

const countryGrid = document.querySelector<HTMLElement>('#countries-grid');
const listView = document.querySelector<HTMLElement>('#country-list-view');
const detailView = document.querySelector<HTMLElement>('#country-detail-view');
const searchInput = document.querySelector<HTMLInputElement>('#country-search');
const regionFilter = document.querySelector<HTMLSelectElement>('#region-filter');
const clearSearchButton = document.querySelector<HTMLButtonElement>('#clear-search');
const resultsHeading = document.querySelector<HTMLElement>('#results-heading');
const resultsCount = document.querySelector<HTMLElement>('#results-count');

let countries: Country[] = [];
let appStatus: AppStatus = 'loading';

const updateResults = (): void => {
    if (!countryGrid) {
        return;
    }

    const query = searchInput?.value.trim() ?? '';
    const region = regionFilter?.value ?? 'all';
    const filteredCountries = filterCountries(countries, query, region);

    if (clearSearchButton) {
        clearSearchButton.hidden = query.length === 0;
    }

    if (resultsHeading) {
        resultsHeading.textContent = query || region !== 'all' ? 'Resultados' : 'Explora el directorio';
    }

    if (resultsCount) {
        resultsCount.textContent = `${filteredCountries.length} ${filteredCountries.length === 1 ? 'país' : 'países'}`;
    }

    if (filteredCountries.length === 0) {
        appStatus = 'empty';
        countryGrid.dataset.state = appStatus;
        countryGrid.replaceChildren(renderEmpty(query, region, countries.length === 0));
        return;
    }

    appStatus = 'ready';
    countryGrid.dataset.state = appStatus;
    countryGrid.replaceChildren(...filteredCountries.map(createCountryCard));
};

const scheduleSearch = debounce(updateResults, 300);

searchInput?.addEventListener('input', scheduleSearch);
regionFilter?.addEventListener('change', () => {
    scheduleSearch.cancel();
    updateResults();
});

clearSearchButton?.addEventListener('click', () => {
    if (!searchInput) {
        return;
    }

    searchInput.value = '';
    scheduleSearch();
    searchInput.focus();
});

function routeToCountry(): void {
    if (!listView || !detailView) {
        return;
    }

    const route = window.location.hash.match(/^#\/country\/([a-z]{2})$/i);
    if (!route) {
        listView.hidden = false;
        detailView.hidden = true;
        detailView.replaceChildren();
        return;
    }

    const countryCode = route[1].toUpperCase();
    const country = countries.find((item) => item.cca2?.toUpperCase() === countryCode);

    listView.hidden = true;
    detailView.hidden = false;
    detailView.replaceChildren(
        country ? renderCountryDetail(country) : renderEmpty('', 'all', false, countryCode)
    );
}

window.addEventListener('hashchange', routeToCountry);

async function initialize(): Promise<void> {
    if (!countryGrid) {
        return;
    }

    appStatus = 'loading';
    countryGrid.dataset.state = appStatus;
    countryGrid.replaceChildren(renderLoading());

    try {
        countries = await fetchCountries();
        updateResults();
        routeToCountry();
    } catch (error) {
        appStatus = 'error';
        countryGrid.dataset.state = appStatus;
        const message = error instanceof Error ? error.message : 'Ocurrió un error inesperado.';
        countryGrid.replaceChildren(renderError(message, () => void initialize()));
    }
}

void initialize();
