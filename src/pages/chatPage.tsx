import clsx from "clsx"
import { useThemeStore } from "../state/darkState"
import { MessageChips } from "../components/messageChips";
import { useRoomStore } from "../state/roomState";
import { useEffect, useRef, useState } from "react";
import { useSocketStore } from "../state/webSocketState";


type dataT = {
    "type": string,
    "payload": {
        "user"?: string
        "roomId"?: string
        "message"?: string
    }
}
type chatT = {
    chat: string,
    chatOwner: boolean
}
export const ChatPage = () => {

    const [messages, addMessages] = useState<chatT[]>([]);
    const { socket } = useSocketStore();
    const chatRef = useRef<HTMLInputElement>(null);
    useEffect(() => {
        socket!.onmessage = (e) => {
            addMessages(prev => [...prev, {
                chat: e.data,
                chatOwner: false
            }])
        }
    })

    const sendMessage = (data: dataT) => {
        socket!.send(JSON.stringify(data));

        addMessages(prev => [...prev, {
            chat: data.payload.message!,
            chatOwner: true
        }])

    }
    const { roomId } = useRoomStore();
    const { Theme } = useThemeStore();
    return <div className={clsx("flex flex-col justify-center items-center ")}>
        <div className="flex justify-between w-120 p-5 ">
            <p className={clsx(Theme === "Light" ? "text-gray-900" : "text-gray-300")}>Room Code: {roomId} </p>
            <p className={clsx(Theme === "Light" ? "text-gray-900" : "text-gray-300")}>Users Connected:</p>
        </div>
        <div className={clsx(Theme === "Light" ? "text-gray-900" : "text-gray-300", " border-2 p-2 border-dashed w-140 h-125 flex flex-col rounded-lg")}>
            <div className={clsx("flex-1 border p-3 overflow-y-scroll rounded-lg")}>
                {messages.map((mes, idx) => (<MessageChips key={idx} chat={mes.chat} chatOwner={mes.chatOwner} />))}
            </div>
            <div className="flex p-2 gap-3" >
                <input type="text" placeholder="Message" ref={chatRef} className={clsx(Theme === "Light" ? "text-gray-900" : "text-gray-300", "border-2  rounded-md p-2 w-120 focus:outline-0")} />
                <button onClick={() => {
                    if (chatRef.current?.value !== null && chatRef.current?.value !== "" && chatRef.current?.value !== " ") {
                        sendMessage({
                            "type": "message",
                            "payload": {
                                "roomId": roomId,
                                "message": chatRef.current?.value
                            }
                        })
                        chatRef.current!.value = "";
                    }
                }} className={clsx(Theme === "Light" ? "text-gray-900" : "text-gray-300", "border-2 px-5 py-2 rounded-xl hover:cursor-pointer  ")}>Send</button>
            </div>


        </div>
    </div >
}