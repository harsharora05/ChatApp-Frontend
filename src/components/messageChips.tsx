import clsx from "clsx"
export const MessageChips = (props: any) => {
    return <div className={clsx(props.chatOwner ? "float-right" : "float-left", "m-2 w-70 bg-white text-black border rounded-lg")}>
        <div className="flex flex-col gap-0">
            <div className="font-bold text-[12px] align-top p-1">{props.from} : </div>
            <div className="px-2 py-1">{props.chat}</div>
        </div>

    </div>
} 