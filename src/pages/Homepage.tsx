
import { clsx } from "clsx"
import { Navbar } from "../components/Navbar"
import { useThemeStore } from "../state/darkState"
import { Button } from "../components/Button";
import { CopyIcon } from "../assets/CopyIcon";


export const Homepage = () => {
    const { Theme } = useThemeStore();
    return <div className={clsx("h-screen", Theme === "Light" ? "bg-white" : "bg-black")}>
        <Navbar />
        <div className="flex justify-center mt-20">
            <div className={clsx(Theme === "Light" ? "border-gray-900" : "border-gray-300", "flex flex-col items-center w-200 h-100 border-2 border-dashed ")}>
                <p className={clsx(Theme === "Light" ? "text-gray-900" : "text-gray-300", "font-bold text-3xl p-4 font-sans")}>Where Conversations Come Alive.</p>
                <p className={clsx(Theme === "Light" ? "text-gray-900" : "text-gray-300", "font-bold text-2xl p-4 font-sans")}>No sign-up. No saved chats. Just pure conversation.</p>
                <div className="mt-8 flex gap-4">
                    <Button name="Create Room" func={() => { }} />
                    <Button name="Join Room" func={() => { }} />
                </div>

                <div className="flex items-center justify-center h-20  gap-2 mt-8">
                    <span className={clsx(
                        Theme === "Light" ? "text-gray-900" : "text-gray-300",
                        "p-3 border border-dashed rounded-sm"
                    )}>
                        <span className="font-bold">Room Code :</span> kdnckndcnd
                    </span>

                    <div >
                        <CopyIcon style={clsx("size-8 hover:cursor-pointer", Theme === "Light" ? "text-gray-900" : "text-gray-300")} />
                    </div>


                </div>
            </div>
        </div>
    </div >
}