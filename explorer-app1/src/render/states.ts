export function renderLoading(): string {
    return Array.from({ length: 8 }, () => `
        <article class="animate-pulse overflow-hidden rounded-xl border border-slate-200 bg-white">
            <div class="h-48 bg-slate-200"></div>
            <div class="space-y-4 p-5">
                <div class="h-6 w-3/4 rounded bg-slate-200"></div>
                <div class="h-4 w-full rounded bg-slate-200"></div>
                <div class="h-4 w-5/6 rounded bg-slate-200"></div>
                <div class="h-4 w-2/3 rounded bg-slate-200"></div>
            </div>
        </article>
    `).join('');
}

export function renderEmpty(query: string): string {
    const message = query
        ? `No se encontraron países para "${query}".`
        : 'No se encontraron países en la región seleccionada.';

    return `
        <div class="col-span-full text-center text-slate-500 py-10">
            <p>${message}</p>
            <p>Revisa el nombre o cambia la región.</p>
        </div>
    `;
}

export function renderError(container: HTMLElement | null, message: string): void {
    if (!container) {
        return;
    }

    container.innerHTML = `
        <div class="col-span-full text-center text-red-500 py-10" role="alert">
            <p>${message}</p>
            <button
                id="retry-button"
                type="button"
                class="mt-4 rounded-lg bg-slate-900 px-4 py-2 text-white hover:bg-slate-700"
            >
                Reintentar
            </button>
        </div>
    `;
}
