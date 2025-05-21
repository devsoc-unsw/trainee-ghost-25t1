import { useEffect, useRef } from "react";

const useDebounce = (callback, delay, dependency) => {
  useEffect(() => {

    if (dependency) {
        const handler = setTimeout(() => {
            callback();
          }, delay);
      
          return () => {
            clearTimeout(handler);
          };
    }

  }, [dependency, delay, callback]);
};

export default useDebounce;