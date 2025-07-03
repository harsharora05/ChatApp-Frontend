import clsx from "clsx"
import { useThemeStore } from "../state/darkState"

export const ChatPage = () => {
    const { Theme } = useThemeStore();
    return <div className={clsx("flex justify-center items-center mt-5")}>
        <div className={clsx(Theme === "Light" ? "text-gray-900" : "text-gray-300", " border-2 p-2 border-dashed w-120 h-150 flex flex-col rounded-lg")}>
            <div className={clsx("flex-1 border overflow-y-scroll rounded-lg")}></div>
            <div className="flex p-2 gap-3" >
                <input type="text" placeholder="Message" className={clsx(Theme === "Light" ? "text-gray-900" : "text-gray-300", "border-2  rounded-md p-2 w-95")} />
                <button className={clsx(Theme === "Light" ? "text-gray-900" : "text-gray-300", "border-2 px-5 py-2 rounded-xl hover:cursor-pointer focus:outline-0 ")}>Send</button>
            </div>


        </div>
    </div >
}