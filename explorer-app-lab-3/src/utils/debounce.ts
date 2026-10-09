export interface DebouncedFunction<Arguments extends unknown[]> {
    (...arguments_: Arguments): void;
    cancel: () => void;
}

export function debounce<Arguments extends unknown[]>(
    callback: (...arguments_: Arguments) => void,
    delay = 300
): DebouncedFunction<Arguments> {
    let timer: number | undefined;

    const debounced = (...arguments_: Arguments): void => {
        window.clearTimeout(timer);
        timer = window.setTimeout(() => callback(...arguments_), delay);
    };

    debounced.cancel = (): void => {
        window.clearTimeout(timer);
    };

    return debounced;
}