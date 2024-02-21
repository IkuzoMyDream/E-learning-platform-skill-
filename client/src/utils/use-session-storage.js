import { useEffect, useState } from "react";

export default function useSessionStorage(defaultValue, key) {
  const [value, setValue] = useState(() => {
    const sessionStorageValue = sessionStorage.getItem(key);
    return sessionStorageValue !== null
      ? JSON.parse(sessionStorageValue)
      : defaultValue;
  });

  useEffect(() => {
    sessionStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}
