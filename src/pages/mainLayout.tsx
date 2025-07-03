import { clsx } from "clsx"
import { Navbar } from "../components/Navbar"
import { useThemeStore } from "../state/darkState"
import { JoinModal } from "../components/joinModal";
import { useModalStore } from "../state/modalState";

import { Outlet } from "react-router-dom";


export const MainLayout = () => {
    const { Theme } = useThemeStore();
    const { isModal } = useModalStore();
    return <div className={clsx("h-screen", Theme === "Light" ? "bg-white" : "bg-black")}>
        <Navbar />
        <Outlet />
        {!!isModal && <JoinModal />}
    </div >
}