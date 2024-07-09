import { useState } from "react";

const useLocalStorage = <T>(key: string, initialValue: T, fromObject: (obj: any) => T) => {
    const [storedValue, setStoredValue] = useState<T>(() => {
        try {
            const item = window.localStorage.getItem(key);
            return item ? fromObject(JSON.parse(item)) : initialValue;
        } catch (error) {
            console.error(error);
            return initialValue;
        }
    });

    const setValue = (value: T) => {
        try {
            setStoredValue(value);
            window.localStorage.setItem(key, JSON.stringify(value));
        } catch (error) {
            console.error(error);
        }

    };

    return [storedValue, setValue] as const;
};

export default useLocalStorage;