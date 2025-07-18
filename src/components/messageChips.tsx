import clsx from "clsx"
export const MessageChips = (props: any) => {
    return <div className={clsx(props.chatOwner ? "float-right" : "float-left", "m-2 w-50 xs:w-70 bg-white text-black border rounded-lg")}>
        <div className="flex flex-col gap-0">
            <div className="font-bold text-[12px] align-top px-1 xs:py-1">{props.from} : </div>
            <div className="px-2 py-1 break-words whitespace-pre-wrap">{props.chat}</div>
        </div>

    </div>
} 