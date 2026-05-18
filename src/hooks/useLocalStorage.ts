import { useState } from "react";

export function useLocalStorage(
  key: string,
  defaultValue: string
): [string, (value: string) => void] {
  const [value, setValue] = useState<string>(() => {
    try {
      const stored = localStorage.getItem(key);
      return stored !== null ? stored : defaultValue;
    } catch {
      return defaultValue;
    }
  });
  const setAndPersist = (newValue: string) => {
    try {
      localStorage.setItem(key, newValue);
    } catch (e) {
      console.error("Failed to save to localStorage:", e);
    }
    setValue(newValue);
  };
  return [value, setAndPersist];
}