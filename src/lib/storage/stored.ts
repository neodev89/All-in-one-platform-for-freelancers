// eslint-disable-next-line @typescript-eslint/no-explicit-any
type StorageValue = any;

export const storage = {
    set<T extends StorageValue>(key: string, value: T) {
        try {
            localStorage.setItem(key, JSON.stringify(value));
        } catch (err) {
            console.error("Errore nel salvare su localStorage:", err);
        }
    },

    get<T extends StorageValue>(key: string): T | null {
        try {
            const raw = localStorage.getItem(key);
            return raw ? JSON.parse(raw) as T : null;
        } catch (err) {
            console.error("Errore nel leggere da localStorage:", err);
            return null;
        }
    },

    remove(key: string) {
        localStorage.removeItem(key);
    },

    clear() {
        localStorage.clear();
    }
};
