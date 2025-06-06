import { useEffect, useState } from 'react';

/**
 * useLocalStorage hook to get localStorage data
 * @param {string} localStorageKey - the key name to get and set
 * @param {T} initialValue - retains and retrieve state after window is closed
 * @returns {T} localStorageValuee - value of the provided key stored in localStorage
 * @returns {Function} setLocalStorageValue - used to update the localStorage value
 */
export default function useLocalStorage<T>(
  localStorageKey: string,
  initialValue = null
): [localStorageValue: T, setlocalStorageValue: (value: T) => void] {
  const [localStorageValue, setLocalStorageValue] = useState<T | null>(initialValue);

  useEffect(() => {
    // get value from storage
    const value = localStorage.getItem(localStorageKey);
    // set initial value if value not found
    setLocalStorageValue(value ? JSON.parse(value) : initialValue);
  }, [localStorageKey, initialValue]);

  useEffect(() => {
    // set value in storage if value is not initial value
    if (localStorageValue !== initialValue) localStorage.setItem(localStorageKey, JSON.stringify(localStorageValue));
  }, [localStorageValue, localStorageKey, initialValue]);

  useEffect(() => {
    const syncState = (event: StorageEvent) => {
      const storageValue = localStorage.getItem(localStorageKey);
      if (event.key === localStorageKey) {
        setLocalStorageValue(storageValue ? JSON.parse(storageValue) : initialValue);
      }
    };
    window.addEventListener('storage', syncState);
    // cleanup function to remove storage event listener
    return () => window.removeEventListener('storage', syncState);
  }, [initialValue, localStorageKey]);

  return [localStorageValue as T, setLocalStorageValue];
}
