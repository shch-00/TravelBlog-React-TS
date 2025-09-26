import { jsx as _jsx } from "react/jsx-runtime";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";
const motionConfigurations = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.7, ease: "easeInOut" },
};
const ResponsivePageWrapper = ({ children }) => {
  const location = useLocation();
  return _jsx(AnimatePresence, {
    children: _jsx(motion.div, {
      ...motionConfigurations,
      style: { flexGrow: 1, display: "flex" },
      children: _jsx("div", {
        className: `page-container ${location.pathname === "/" ? "page-container--home" : isNaN(Number(location.pathname.split("/")[1])) ? "" : "page-container--post"} ${location.pathname.startsWith("/account") ? "page-container--account" : ""}`,
        children: children,
      }),
    }),
  });
};
export { motionConfigurations, ResponsivePageWrapper };
