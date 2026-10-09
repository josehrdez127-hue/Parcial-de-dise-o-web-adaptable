import type { Country } from '../types/country';
import { formatPopulation, getCapital, getFlagAlt, getFlagUrl, getRegionLabel } from '../utils/format';

function createDetailFact(label: string, value: string): HTMLElement {
    const item = document.createElement('div');
    item.className = 'detail-fact';
    const term = document.createElement('dt');
    const description = document.createElement('dd');
    term.textContent = label;
    description.textContent = value;
    item.append(term, description);
    return item;
}

export function renderCountryDetail(country: Country): HTMLElement {
    const wrapper = document.createElement('div');
    const backLink = document.createElement('a');
    backLink.className = 'back-link';
    backLink.href = '#';
    backLink.innerHTML = '<span class="back-arrow" aria-hidden="true">←</span><span>Volver al directorio</span>';

    const layout = document.createElement('article');
    layout.className = 'detail-layout';
    const flagUrl = getFlagUrl(country);

    if (flagUrl) {
        const flag = document.createElement('img');
        flag.className = 'detail-flag';
        flag.src = flagUrl;
        flag.alt = getFlagAlt(country);
        layout.append(flag);
    }

    const content = document.createElement('div');
    const title = document.createElement('h1');
    title.className = 'detail-title';
    title.textContent = country.name.common;
    const region = document.createElement('p');
    region.className = 'detail-region';
    region.textContent = getRegionLabel(country.region);
    const facts = document.createElement('dl');
    facts.className = 'detail-facts';
    facts.append(
        createDetailFact('Población', formatPopulation(country.population)),
        createDetailFact('Capital', getCapital(country)),
        createDetailFact('Subregión', country.subregion || 'No disponible'),
        createDetailFact('Código ISO', country.cca3 || country.cca2 || 'No disponible')
    );
    content.append(title, region, facts);
    layout.append(content);
    wrapper.append(backLink, layout);
    return wrapper;
}