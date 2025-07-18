import { clsx } from "clsx"
import { useThemeStore } from "../state/darkState"

type ButtonType = {
    name: string
    func: () => void
}

export const Button = (props: ButtonType) => {
    const { Theme } = useThemeStore();
    return <button className={clsx(Theme === "Light" ? "border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-gray-300" : "border-gray-300 text-gray-300 hover:bg-gray-300 hover:text-gray-900", "border rounded-md p-2 text-md xs:text-lg sm:text-xl hover:cursor-pointer transition transion-all duration-200")} onClick={() => { props.func() }}>{props.name}</button>

}