import { useEffect, useMemo, useState } from "react";

type TMode = "light" | "dark";

const useDarkMode = () => {
  const [mode, setMode] = useState<"light" | "dark">(() => {
    const storedMode = localStorage.getItem("mode") as TMode;
    return storedMode || "light";
  });

  const colorMode = useMemo(() => {
    return {
      toggleColorMode: () => {
        setMode((prev) => (prev === "light" ? "dark" : "light"));
      },
    };
  }, []);

  useEffect(() => {
    localStorage.setItem("mode", mode);
  }, [mode]);

  return [mode, colorMode] as const;
};

export default useDarkMode;
