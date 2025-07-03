import { useThemeStore } from "../state/darkState";
import { clsx } from "clsx";
import { NavLink } from "react-router-dom";

export const Navbar = () => {

    const { Theme, toggleTheme } = useThemeStore();
    return <nav className="flex justify-between px-10 py-8">
        <NavLink to={"/"}> <h1 className={clsx(Theme === "Light" ? "text-gray-900" : "text-gray-300", "hover:cursor-pointer font-bold text-2xl p-4 font-sans")}>WHISPROOM</h1></NavLink>
        <label className="inline-flex items-center cursor-pointer">
            <input type="checkbox" value="" checked={Theme === "Light" ? false : true} onChange={() => { toggleTheme() }} className="sr-only peer" />
            <div className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600 dark:peer-checked:bg-blue-600"></div>
            <span className={clsx("ms-3 text-sm font-medium", Theme === "Light" ? "text-gray-900" : "text-gray-300")}>{Theme === "Light" ? "light" : "Dark"}</span>
        </label>
    </nav >
}