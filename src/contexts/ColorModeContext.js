import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useContext, useState } from "react";
const ColorModeContext = createContext({
  colorMode: "light",
  toggleColorMode: () => "light",
});
const useColorMode = () => {
  const { colorMode, toggleColorMode } = useContext(ColorModeContext);
  return { colorMode, toggleColorMode };
};
const ColorModeProvider = ({ children }) => {
  const [colorMode, setColorMode] = useState("light");
  const toggleColorMode = () => {
    setColorMode((prev) => (prev === "light" ? "dark" : "light"));
  };
  return _jsx(ColorModeContext.Provider, {
    value: { colorMode, toggleColorMode },
    children: children,
  });
};
export { ColorModeProvider, useColorMode, ColorModeContext };
