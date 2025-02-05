import { useLayoutEffect } from "react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useLayoutEffect(() => {
    window.scrollTo(0,0);
  }, [pathname]); // Trigger on route change

  return null;
};

export default ScrollToTop;
