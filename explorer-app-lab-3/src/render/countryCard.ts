import type { Country } from '../types/country';
import { formatPopulation, getCapital, getFlagAlt, getFlagUrl, getRegionLabel } from '../utils/format';

function createFact(label: string, value: string): HTMLElement {
    const fact = document.createElement('div');
    const factLabel = document.createElement('span');
    const factValue = document.createElement('span');

    factLabel.className = 'fact-label';
    factLabel.textContent = label;
    factValue.className = 'fact-value';
    factValue.textContent = value;
    fact.append(factLabel, factValue);
    return fact;
}

export function createCountryCard(country: Country): HTMLAnchorElement {
    const card = document.createElement('a');
    card.className = 'country-card';
    card.href = country.cca2 ? `#/country/${country.cca2}` : '#';
    card.setAttribute('aria-label', `Ver detalles de ${country.name.common}`);

    const flagFrame = document.createElement('div');
    flagFrame.className = 'flag-frame';
    const flagUrl = getFlagUrl(country);

    if (flagUrl) {
        const flag = document.createElement('img');
        flag.src = flagUrl;
        flag.alt = getFlagAlt(country);
        flag.loading = 'lazy';
        flag.addEventListener('error', () => {
            const fallback = document.createElement('span');
            fallback.className = 'flag-fallback';
            fallback.textContent = 'Bandera no disponible';
            flag.replaceWith(fallback);
        }, { once: true });
        flagFrame.append(flag);
    } else {
        const fallback = document.createElement('span');
        fallback.className = 'flag-fallback';
        fallback.textContent = 'Bandera no disponible';
        flagFrame.append(fallback);
    }

    const body = document.createElement('div');
    body.className = 'country-card-body';
    const topline = document.createElement('div');
    topline.className = 'card-topline';
    const title = document.createElement('h3');
    title.textContent = country.name.common;
    topline.append(title);

    if (country.cca2) {
        const code = document.createElement('span');
        code.className = 'country-code';
        code.textContent = country.cca2;
        topline.append(code);
    }

    const region = document.createElement('span');
    region.className = 'region-label';
    region.textContent = getRegionLabel(country.region);

    const facts = document.createElement('div');
    facts.className = 'card-facts';
    facts.append(
        createFact('Población', formatPopulation(country.population)),
        createFact('Capital', getCapital(country))
    );

    body.append(topline, region, facts);
    card.append(flagFrame, body);
    return card;
}