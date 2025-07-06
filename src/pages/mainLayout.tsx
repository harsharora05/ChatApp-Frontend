import { clsx } from "clsx"
import { Navbar } from "../components/Navbar"
import { useThemeStore } from "../state/darkState"
import { JoinModal } from "../components/joinModal";
import { useModalStore } from "../state/modalState";

import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import { useSocketStore } from "../state/webSocketState";


export const MainLayout = () => {
    const { setSocket } = useSocketStore();
    useEffect(() => {
        setSocket();
    }, [])

    const { Theme } = useThemeStore();
    const { isModal } = useModalStore();
    return <div className={clsx("h-screen", Theme === "Light" ? "bg-white" : "bg-black")}>
        <Navbar />
        <Outlet />
        {!!isModal && <JoinModal />}
    </div >
}