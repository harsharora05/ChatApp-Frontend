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
    const { socket, setSocket } = useSocketStore();
    const createRoom = (data: dataT) => {
        console.log(socket);
        if (!socket) {
            console.error("WebSocket not initialized");
            return;
        }
        const newMessage = JSON.stringify(data);
        if (socket?.readyState == WebSocket.CLOSED) {
            setSocket();
            toast.error("Error Occured... Try Again!!!");
            return;
        }

        socket.onerror = console.error;

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
    return <div className="flex justify-center mx-7 xs:mx-10 xs:mx-15 md:mx-20  my-20 ">
        <div className={clsx(Theme === "Light" ? "border-gray-900" : "border-gray-300", "flex flex-col items-center w-200 px-2 xs:px-4 sm:px-6 md:px-8 lg:px-10 py-6 sm:py-10 border-2 border-dashed rounded-xl")}>
            <p className={clsx(Theme === "Light" ? "text-gray-900" : "text-gray-300", "font-bold text-sm xxxs:text-md xxs:text-lg xs:text-xl sm:text-xl md:text-2xl lg:text-3xl p-4 font-sans")}>Where Conversations Come Alive.</p>
            <p className={clsx(Theme === "Light" ? "text-gray-900" : "text-gray-300", "font-bold text-[10px] xxxs:text-xs xxs:text-sm xs:text-md sm:text-lg md:text-xl lg:text-2xl p-2 xs:p-3 md:p-4 font-sans")}>No sign-up. No saved chats. Just pure conversation.</p>
            <div className="mt-8 flex gap-4">
                <Button name="Create Room" func={() => createRoom({
                    "type": "create",
                    "payload": {
                    }
                })
                } />
                <Button name="Join Room" func={() => { toggleModal() }} />
            </div>

            {(roomId !== "null" && roomId !== "") ? <div className="flex items-center justify-center h-20  gap-2 mt-3 sm:mt-8">
                <span className={clsx(
                    Theme === "Light" ? "text-gray-900" : "text-gray-300",
                    "p-3 border border-dashed rounded-sm"
                )}>
                    <span className="font-bold text-sm xxs:text-md sm:text-xl">Room Code :</span> {roomId}
                </span>

                <div onClick={() => { navigator.clipboard.writeText(roomId); toast.success("Copied To Clipboard"); }}>
                    <CopyIcon style={clsx("size-6 sm:size-8 hover:cursor-pointer", Theme === "Light" ? "text-gray-900" : "text-gray-300")} />
                </div>
            </div> : <></>}
        </div>
    </div >
}