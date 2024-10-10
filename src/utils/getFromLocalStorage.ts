export default function getFromLocalStorage(key: string) {
    const item = localStorage.getItem(key);
    if (!item) {
        return null;
    }
    try {
        return JSON.parse(item);
    } catch (error) {
        return null;
    }
}
