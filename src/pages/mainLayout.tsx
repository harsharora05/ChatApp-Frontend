import { clsx } from "clsx"
import { Navbar } from "../components/Navbar"
import { useThemeStore } from "../state/darkState"
import { JoinModal } from "../components/joinModal";
import { useModalStore } from "../state/modalState";

import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import { useSocketStore } from "../state/webSocketState";
import { ToastContainer } from "react-toastify";
import "../App.css";

export const MainLayout = () => {
    const { setSocket } = useSocketStore();
    useEffect(() => {
        setSocket();
        localStorage.setItem("name", "");
        localStorage.setItem("roomCode", "");

    }, [])

    const { Theme } = useThemeStore();
    const { isModal } = useModalStore();
    return <div className={clsx("h-screen", Theme === "Light" ? "bg-white" : "bg-black")}>
        <Navbar />
        <Outlet />
        {!!isModal && <JoinModal />}
        <ToastContainer
            position="top-right"
            autoClose={1000}
            hideProgressBar={true}
            newestOnTop={false}
            closeOnClick={true}
            pauseOnHover
            theme={clsx(Theme === "Light" ? "light" : "dark")}
            toastClassName="!mt-24 mr-2 xs:mr-0 text-sm xs:text-base   !w-50 xs:!w-80"
        />
    </div >
}