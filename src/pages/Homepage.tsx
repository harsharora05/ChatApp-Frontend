import { clsx } from "clsx"
import { useThemeStore } from "../state/darkState"
import { Button } from "../components/Button";
import { CopyIcon } from "../assets/CopyIcon";
import { useModalStore } from "../state/modalState";
import { useRoomStore } from "../state/roomState";
import { useSocketStore } from "../state/webSocketState";
import { toast } from "react-toastify";


type dataT = {
    "type": string,
    "payload": {
        "roomId"?: string
        "message"?: string
    }
}

export const HomePage = () => {
    const { roomId, setRoomId } = useRoomStore();
    const { socket } = useSocketStore();
    const createRoom = (data: dataT) => {
        if (!socket) {
            console.error("WebSocket not initialized");
            return;
        }

        socket.onerror = console.error;

        const newMessage = JSON.stringify(data);

        if (socket.readyState === WebSocket.OPEN) {
            socket.send(newMessage);
        } else {
            socket.onopen = () => {
                socket.send(newMessage);
            };
        }

        socket.onmessage = (e) => {
            const jsonRes = JSON.parse(e.data.toString());
            setRoomId(jsonRes.roomId);
            toast.success(jsonRes.response);
        };
    };



    const { Theme } = useThemeStore();
    const { toggleModal } = useModalStore();
    return <div className="flex justify-center mt-20">
        <div className={clsx(Theme === "Light" ? "border-gray-900" : "border-gray-300", "flex flex-col items-center w-200 h-100 border-2 border-dashed ")}>
            <p className={clsx(Theme === "Light" ? "text-gray-900" : "text-gray-300", "font-bold text-3xl p-4 font-sans")}>Where Conversations Come Alive.</p>
            <p className={clsx(Theme === "Light" ? "text-gray-900" : "text-gray-300", "font-bold text-2xl p-4 font-sans")}>No sign-up. No saved chats. Just pure conversation.</p>
            <div className="mt-8 flex gap-4">
                <Button name="Create Room" func={() => createRoom({
                    "type": "create",
                    "payload": {
                    }
                })
                } />
                <Button name="Join Room" func={() => { toggleModal() }} />
            </div>

            {(roomId !== "null" && roomId !== "") ? <div className="flex items-center justify-center h-20  gap-2 mt-8">
                <span className={clsx(
                    Theme === "Light" ? "text-gray-900" : "text-gray-300",
                    "p-3 border border-dashed rounded-sm"
                )}>
                    <span className="font-bold">Room Code :</span> {roomId}
                </span>

                <div onClick={() => { navigator.clipboard.writeText(roomId); toast.success("Copied To Clipboard"); }}>
                    <CopyIcon style={clsx("size-8 hover:cursor-pointer", Theme === "Light" ? "text-gray-900" : "text-gray-300")} />
                </div>
            </div> : <></>}
        </div>
    </div >
}