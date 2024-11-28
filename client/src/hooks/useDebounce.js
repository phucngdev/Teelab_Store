import { useState, useEffect } from "react";
import _debounce from "lodash/debounce";

export function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = _debounce(() => {
      setDebouncedValue(value);
    }, delay);
    handler();

    return () => {
      handler.cancel();
    };
  }, [value, delay]);

  return debouncedValue;
}
