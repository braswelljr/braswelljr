import { Dispatch, SetStateAction, useEffect, useState } from 'react';

/**
 * useSessionStorage hook to get session data
 * @param {string} sessionKey - the key name to get and set
 * @param {T} options.initialValue (default - null) - initial value to set
 * @param {boolean} options.keepOnWindowClosed (default - false) - retains and retrieve state after window is closed
 * @returns {T} sessionValue - value of the provided key stored in session storage
 * @returns {Function} setSessionValue - used to update the session value
 */
export default function useSessionStorage<T>(
  sessionKey: string,
  options: { initialValue?: T | null; keepOnWindowClosed?: boolean } = {
    initialValue: null,
    keepOnWindowClosed: false
  }
): [sessionValue: T, setSessionValue: Dispatch<SetStateAction<T>>] {
  const [sessionValue, setSessionValue] = useState<T>(options.initialValue as T);

  useEffect(() => {
    // get type of storage
    const storage = options.keepOnWindowClosed ? window.localStorage : window.sessionStorage;
    // get value from storage
    const value = storage.getItem(sessionKey);
    // set initial value if value not found
    setSessionValue(value ? JSON.parse(value) : options.initialValue);
  }, [options.keepOnWindowClosed, sessionKey, options.initialValue]);

  useEffect(() => {
    // get type of storage
    const storage = options.keepOnWindowClosed ? window.localStorage : window.sessionStorage;

    // set value in storage
    if (sessionValue !== options.initialValue) storage.setItem(sessionKey, JSON.stringify(sessionValue));
  }, [sessionValue, sessionKey, options.keepOnWindowClosed, options.initialValue]);

  useEffect(() => {
    // sync state with storage events
    function syncState(event: StorageEvent) {
      // get type of storage
      const storage = options.keepOnWindowClosed ? window.localStorage : window.sessionStorage;
      // get value from storage
      const storageValue = storage.getItem(sessionKey);
      // if event is for the provided key
      if (event.key === sessionKey) {
        // set value
        setSessionValue(storageValue ? JSON.parse(storageValue) : options.initialValue);
      }
    }

    window.addEventListener('storage', syncState);
    // cleanup function to remove storage event listener
    return () => window.removeEventListener('storage', syncState);
  }, [options.initialValue, options.keepOnWindowClosed, sessionKey]);

  return [sessionValue, setSessionValue];
}
