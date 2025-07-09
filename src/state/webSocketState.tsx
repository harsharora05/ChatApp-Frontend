
import { create } from "zustand";

type websocketT = {
    socket: WebSocket | null,
    setSocket: () => void
}

export const useSocketStore = create<websocketT>((set) => ({
    socket: null,
    setSocket: () => {
        const ws = new WebSocket("ws://localhost:8080");
        ws.onopen = () => {
            console.log("WebSocket connected");
        };

        ws.onerror = (err) => {
            console.error("WebSocket error", err);
        };

        ws.onclose = () => {
            console.log("WebSocket closed");
        };

        set({ socket: ws });
    }

}));