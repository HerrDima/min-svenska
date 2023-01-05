/* global window, screen */

export function share(url: string, title: string) {
    if (typeof window === 'undefined' || typeof screen === 'undefined') {
        return;
    }

    const width = 800;
    const height = 600;

    const left = Math.round((screen.width - width) / 2);
    const top = Math.round((screen.height - height) / 2);

    window.open(url, title, `width=${width},height=${height},left=${left},top=${top}`);
}
