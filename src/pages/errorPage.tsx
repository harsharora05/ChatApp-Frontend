import clsx from "clsx"
import { useThemeStore } from "../state/darkState"

export const ErrorPage = () => {
    const { Theme } = useThemeStore();
    return <div className="flex justify-center mt-20">
        <img className="h-100 w-100" src="/public/error.svg" alt="" />

    </div>
}