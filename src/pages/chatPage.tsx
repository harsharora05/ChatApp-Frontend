import clsx from "clsx"
import { useThemeStore } from "../state/darkState"
import { MessageChips } from "../components/messageChips";

export const ChatPage = () => {
    const { Theme } = useThemeStore();
    return <div className={clsx("flex flex-col justify-center items-center ")}>
        <div className="flex justify-between w-120 p-5 ">
            <p className={clsx(Theme === "Light" ? "text-gray-900" : "text-gray-300")}>Room Code: </p>
            <p className={clsx(Theme === "Light" ? "text-gray-900" : "text-gray-300")}>Users Connected:</p>
        </div>
        <div className={clsx(Theme === "Light" ? "text-gray-900" : "text-gray-300", " border-2 p-2 border-dashed w-140 h-125 flex flex-col rounded-lg")}>
            <div className={clsx("flex-1 border p-3 overflow-y-scroll rounded-lg")}>
                <MessageChips chat="hello" />
                <MessageChips chatOwner={true} chat="hello all this my group and i am the owner" />
                <MessageChips chat="hello guys1 " />

                <MessageChips chatOwner={true} chat="Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum." />
                <MessageChips chat="okay" />
                <MessageChips chatOwner={true} chat="Please be on time guys" />


            </div>
            <div className="flex p-2 gap-3" >
                <input type="text" placeholder="Message" className={clsx(Theme === "Light" ? "text-gray-900" : "text-gray-300", "border-2  rounded-md p-2 w-120 focus:outline-0")} />
                <button className={clsx(Theme === "Light" ? "text-gray-900" : "text-gray-300", "border-2 px-5 py-2 rounded-xl hover:cursor-pointer  ")}>Send</button>
            </div>


        </div>
    </div >
}