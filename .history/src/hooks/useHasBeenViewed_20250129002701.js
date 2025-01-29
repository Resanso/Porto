import { useState, useEffect } from "react";
import { useInView } from "framer-motion";

export const useHasBeenViewed = (ref) => {
  const [hasBeenViewed, setHasBeenViewed] = useState(false);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView && !hasBeenViewed) {
      setHasBeenViewed(true);
    }
  }, [isInView, hasBeenViewed]);

  return hasBeenViewed;
};
