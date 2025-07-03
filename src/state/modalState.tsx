import { create } from "zustand"


type modalStateType = {
    isModal: boolean,
    toggleModal: () => void
}


export const useModalStore = create<modalStateType>((set) => ({
    isModal: false,
    toggleModal: () => set((state) => ({ isModal: !state.isModal }))
})
);