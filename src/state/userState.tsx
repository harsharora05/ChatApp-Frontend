import { create } from "zustand"


type userStore = {
    chatOwner: string,
    users: number,
    setOwner: (name: string) => void
    setUsers: (count: number) => void
}


export const useUserStore = create<userStore>((set) => ({
    chatOwner: "",
    users: 0,
    setUsers: (count) => { set({ users: count }) },
    setOwner: (name) => { set({ chatOwner: name }) }
}))