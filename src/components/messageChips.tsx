import clsx from "clsx"
export const MessageChips = (props: any) => {
    return <div className={clsx(props.chatOwner ? "float-right" : "float-left", "m-2 w-70 bg-white p-2 text-black border rounded-lg")}>
        {props.chat}
    </div>
} 