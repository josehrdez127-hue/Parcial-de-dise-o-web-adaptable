export function renderLoading(): HTMLElement {
    const container = document.createElement('div');
    container.className = 'loading-state';
    container.setAttribute('role', 'status');
    container.setAttribute('aria-live', 'polite');
    container.setAttribute('aria-label', 'Cargando países');

    for (let index = 0; index < 8; index += 1) {
        const skeleton = document.createElement('article');
        skeleton.className = 'skeleton-card';
        skeleton.innerHTML = '<div class="skeleton-flag"></div><div class="skeleton-body"><div class="skeleton-line"></div><div class="skeleton-line short"></div></div>';
        container.append(skeleton);
    }

    return container;
}

export function renderEmpty(
    query: string,
    region: string,
    noSourceData: boolean,
    missingCode?: string
): HTMLElement {
    const container = document.createElement('div');
    container.className = 'state-message';
    container.setAttribute('role', 'status');
    container.setAttribute('aria-live', 'polite');

    const title = document.createElement('strong');
    const message = document.createElement('p');

    if (missingCode) {
        title.textContent = 'País no encontrado';
        message.textContent = `No hay un país con el código ${missingCode}.`;
    } else if (noSourceData) {
        title.textContent = 'No hay países disponibles';
        message.textContent = 'La fuente respondió correctamente, pero no contiene países.';
    } else if (query && region !== 'all') {
        title.textContent = 'Sin coincidencias';
        message.textContent = `No encontramos “${query}” en la región ${region}.`;
    } else if (query) {
        title.textContent = 'Sin coincidencias';
        message.textContent = `No encontramos países para “${query}”. Prueba con otro nombre.`;
    } else {
        title.textContent = 'Sin países en esta región';
        message.textContent = 'Elige otra región para ver sus países.';
    }

    container.append(title, message);
    return container;
}

export function renderError(message: string, retry: () => void): HTMLElement {
    const container = document.createElement('div');
    container.className = 'state-message error-state';
    container.setAttribute('role', 'alert');

    const title = document.createElement('strong');
    title.textContent = 'No se pudieron cargar los países';

    const description = document.createElement('p');
    description.textContent = message;

    const retryButton = document.createElement('button');
    retryButton.className = 'retry-button';
    retryButton.type = 'button';
    retryButton.textContent = 'Reintentar';
    retryButton.addEventListener('click', retry);

    container.append(title, description, retryButton);
    return container;
}