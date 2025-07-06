import clsx from "clsx";
import { useThemeStore } from "../state/darkState"
import { CrossIcon } from "../assets/CrossIcon";
import { useModalStore } from "../state/modalState";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useRoomStore } from "../state/roomState";
import { useSocketStore } from "../state/webSocketState";
type formType = {
    roomCode: string
}
type dataT = {
    "type": string,
    "payload": {
        "roomId"?: string
        "message"?: string
    }
}

export const JoinModal = () => {
    const { toggleModal } = useModalStore();
    const { setRoomId } = useRoomStore();
    const navigate = useNavigate();
    const { socket } = useSocketStore();
    const joinRoom = (data: dataT) => {

        socket!.onerror = console.error;
        const newMessage = JSON.stringify(data);

        if (socket!.readyState === WebSocket.OPEN) {
            socket!.send(newMessage);
        } else {
            socket!.onopen = () => {
                socket!.send(newMessage);
            };
        }

        socket!.onmessage = (e) => {
            const jsonRes = JSON.parse(e.data.toString());
            console.log(jsonRes);

            if (jsonRes.status == 200) {
                navigate(`/chat/${jsonRes.roomId}`);
                setRoomId(jsonRes.roomId);
                toggleModal();
            }
        }
    }
    const { Theme } = useThemeStore();
    const { register, handleSubmit, formState: { errors } } = useForm<formType>();
    const onSubmit = (data: formType) => {

        joinRoom({
            "type": "join",
            "payload": {
                "roomId": data.roomCode
            }
        });

    }
    return <div className={clsx("h-screen w-screen fixed top-0 left-0 bg-black/75  flex justify-center items-center ")}>
        <div className={clsx(Theme === "Light" ? "bg-gray-900/75" : "bg-gray-200/75", "w-105 h-65 rounded-lg ")}>
            <div className="flex justify-end p-2" onClick={() => toggleModal()}><CrossIcon style={clsx("size-8 hover:cursor-pointer", Theme === "Light" ? "text-white" : "text-black")} />
            </div>


            <div>
                <form className="flex flex-col p-5 gap-5 items-center" onSubmit={handleSubmit(onSubmit)}>
                    <input type="text" className={clsx(Theme === "Light" ? "border-white text-white " : "border-black text-black", "border-2 rounded-md p-2 focus:outline-0")} placeholder="Enter Room Code" {...register("roomCode", {
                        required: "Room Code is Required", minLength: {
                            value: 10, message: "Room Code Should Not Be Below 10 Chars"
                        }, maxLength: { value: 10, message: "Room Code Should Not Exceed 10 Chars" }
                    })} />
                    {errors.roomCode && <span className="text-red-700">{errors.roomCode.message}</span>}
                    <button type="submit" className={clsx(Theme === "Light" ? "bg-white text-black" : "bg-black text-white", "w-20 py-3 rounded-md hover:cursor-pointer")}>Join</button>
                </form>
            </div>
        </div>
    </div>
}