import { createContext, useContext, useState } from "react";

type ColorModeContextType = {
  colorMode: "light" | "dark";
  toggleColorMode: () => void;
};

const ColorModeContext = createContext<ColorModeContextType>({
  colorMode: "light",
  toggleColorMode: () => "light",
});

const useColorMode = () => {
  const { colorMode, toggleColorMode } = useContext(ColorModeContext);
  return { colorMode, toggleColorMode };
};

const ColorModeProvider = ({ children }: { children: React.ReactNode }) => {
  const [colorMode, setColorMode] = useState<"light" | "dark">("light");

  const toggleColorMode = () => {
    setColorMode((prev) => (prev === "light" ? "dark" : "light"));
  };

  return (
    <ColorModeContext.Provider value={{ colorMode, toggleColorMode }}>
      {children}
    </ColorModeContext.Provider>
  );
};

export { ColorModeProvider, useColorMode, ColorModeContext };
