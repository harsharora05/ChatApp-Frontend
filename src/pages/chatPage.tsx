import clsx from "clsx"
import { useThemeStore } from "../state/darkState"
import { MessageChips } from "../components/messageChips";
import { useRoomStore } from "../state/roomState";
import { useEffect, useRef, useState } from "react";
import { useSocketStore } from "../state/webSocketState";
import { useUserStore } from "../state/userState";
import { CopyIcon } from "../assets/CopyIcon";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { ExitIcon } from "../assets/exitIcon";


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
    from?: string,
    chatOwner: boolean
}
export const ChatPage = () => {

    const [messages, addMessages] = useState<chatT[]>([]);
    const { socket } = useSocketStore();
    const { users, setUsers, chatOwner } = useUserStore();
    const chatRef = useRef<HTMLInputElement>(null);
    const { roomId, setRoomId } = useRoomStore();
    const { Theme } = useThemeStore();
    const navigate = useNavigate();
    const closeSocket = (shouldNavigate = true) => {
        if (socket && socket!.readyState === WebSocket.OPEN) {
            const message = {
                "type": "close",
                "payload": {
                    "roomId": roomId
                }
            }
            socket!.send(JSON.stringify(message));
        }
        if (shouldNavigate) {
            navigate("/");
            toast.warn("Chat Disconnected");
        }
        setRoomId('');


    }
    useEffect(() => {
        if (socket == null) {
            closeSocket();
            return;
        }



        socket!.onmessage = (e) => {
            const jsonRes = JSON.parse(e.data);

            if (jsonRes.type === "update-count") {
                setUsers(jsonRes.userCount);
                toast.success(jsonRes.response);
            }
            else if (jsonRes.type === "message") {
                addMessages(prev => [...prev, {
                    chat: jsonRes.message,
                    from: jsonRes.from,
                    chatOwner: false
                }]);
            }
        }

        const handleBeforeUnload = () => {
            if (socket && socket.readyState === WebSocket.OPEN) {
                closeSocket(false);
            }
        };
        //browser reload
        window.addEventListener("beforeunload", handleBeforeUnload);
        //browser back button 
        window.onpopstate = () => {
            handleBeforeUnload();
            toast.warn("Chat Disconnected");
        }


        return () => {
            window.removeEventListener("beforeunload", handleBeforeUnload);
            socket.onmessage = null;
        }
    }, [socket]);

    const sendMessage = (data: dataT) => {
        socket!.send(JSON.stringify(data));

        addMessages(prev => [...prev, {
            chat: data.payload.message!,
            from: chatOwner,
            chatOwner: true
        }]);

    }

    return <div className={clsx("flex flex-col justify-center items-center ")}>
        <div className="flex justify-between w-80 xxs:w-100 xs:w-120 p-2 mt-10 ">
            <div className="flex items-center  gap-1">
                <p onClick={() => { navigator.clipboard.writeText(roomId); toast.success("Copied To Clipboard"); }} className={clsx(Theme === "Light" ? "text-gray-900" : "text-gray-300", "text-[10px] xxs:text-sm xs:text-base font-bold")}>Room Code: {roomId}  </p>
                <span onClick={() => { navigator.clipboard.writeText(roomId); toast.success("Copied To Clipboard"); }}><CopyIcon style={clsx(Theme === "Light" ? "text-gray-900" : "text-gray-300", "size-3 xxs:size-5 hover:cursor-pointer")} /></span>
            </div>
            <p className={clsx(Theme === "Light" ? "text-gray-900" : "text-gray-300", "font-bold text-[10px] xxs:text-sm xs:text-base ")}>Users: {users}</p>
            <div onClick={() => closeSocket()} className="flex items-center">
                <button className={clsx(Theme === "Light" ? "text-gray-900" : "text-gray-300", "font-bold", "hover:cursor-pointer text-[10px] xxs:text-sm xs:text-base")} >Leave </button>
                <span className={clsx(Theme === "Light" ? "text-gray-900" : "text-gray-300")}> <ExitIcon style="size-3 xxs:size-5" /></span>
            </div>

        </div>
        <div className={clsx(Theme === "Light" ? "text-gray-900" : "text-gray-300", " border-2 p-2 border-dashed w-80 xxs:w-100 xs:w-140 h-125 flex flex-col rounded-lg")}>
            <div className={clsx("flex-1 border p-3 overflow-y-scroll rounded-lg")}>
                {messages.map((mes, idx) => (<MessageChips key={idx} chat={mes.chat} from={mes.from} chatOwner={mes.chatOwner} />))}
            </div>
            <div className="flex p-2 gap-3" >
                <input type="text" placeholder="Message" ref={chatRef} onKeyDown={(e) => {
                    if (e.key === "Enter") {
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
                    }
                }} className={clsx(Theme === "Light" ? "text-gray-900" : "text-gray-300", "border-2  rounded-md p-2 w-53 xxs:w-90 xs:w-120 focus:outline-0")} />
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
                }} className={clsx(Theme === "Light" ? "text-gray-900" : "text-gray-300", "border-2 px-3 xxs:px-5 py-2 rounded-xl hover:cursor-pointer  ")}>Send</button>
            </div>


        </div>
    </div >
}