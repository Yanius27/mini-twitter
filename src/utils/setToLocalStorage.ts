export default function setToLocalStorage<T>(key: string, data: T) {
    const dataToStore = JSON.stringify(data);
    localStorage.setItem(key, dataToStore);
}
