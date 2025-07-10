import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Scrolls page to top on navigation.
 */
export const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};
