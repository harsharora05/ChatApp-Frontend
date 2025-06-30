
import { create } from "zustand";
type themeType = {
    Theme: "Light" | "Dark";
    toggleTheme: () => void
}



export const useThemeStore = create<themeType>((set) => ({
    Theme: (localStorage.getItem("Theme") as "Light" | "Dark") || "Light",
    toggleTheme: () => set((state) => {
        const newTheme = state.Theme === "Light" ? "Dark" : "Light";
        localStorage.setItem("Theme", newTheme);
        return { Theme: newTheme }
    })
}));
