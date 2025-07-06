import { create } from "zustand";
type roomType = {
    roomId: string;
    setRoomId: (roomId: string) => void
}



export const useRoomStore = create<roomType>((set) => ({
    roomId: localStorage.getItem("roomCode") || "null",
    setRoomId: (roomId) => {
        localStorage.setItem("roomCode", roomId);
        set({ roomId: roomId });
    }
}));
