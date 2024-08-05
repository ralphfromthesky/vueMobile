import CssFilterConverter from "css-filter-converter";
import { useGlobalList } from "../globalFunctions/store"

export default function DialogueModal(props: any) {
    const backgroundColor = useGlobalList(state => state.color)
    const iconColor: any = CssFilterConverter.hexToFilter(backgroundColor.text);

    return (
        <>
            {props.openModal &&
                <div className="fixed top-0 left-0 w-screen h-screen bg-[#0000004f] z-[10] flex items-center justify-center">
                    <div className="w-auto h-auto p-[.2rem] border rounded-[.1rem] min-w-[3rem] min-h-[4rem] border-none relative " style={{ backgroundColor: backgroundColor.backGorund }}>
                        <img onClick={props.close} style={{ filter: iconColor.color }} className="w-[.22rem]  cursor-pointer absolute right-[.1rem] top-[.1rem]" src="/images/closeONly.png" alt="" />
                        <div className="flex items-center justify-center text-[.18rem]" style={{ color: backgroundColor.forGround }}>
                            {props.title}
                        </div>
                        {props.children}
                    </div>
                </div>
            }
        </>
    )
}

export function RechargePopModal(props: any) {
    const backgroundColor = useGlobalList(state => state.color)
    const iconColor: any = CssFilterConverter.hexToFilter(backgroundColor.text);

    return (
        <>
            {props.openModal &&
                <div className="fixed top-0 left-0 w-screen h-screen bg-[#0000004f] z-[10] flex items-center justify-center">
                    <div className="w-auto h-auto border rounded-[.1rem] min-w-[3rem] min-h-[4rem] border-none relative" style={{ backgroundColor: backgroundColor.backGorund }}>
                        <div onClick={props.close} className="rounded-full border-[.01rem] bg-transparent absolute -right-[.5rem] -top-[.5rem] p-[.07rem] cursor-pointer" style={{ borderColor: backgroundColor.text }}>
                            <img style={{ filter: iconColor.color }} className="w-[.22rem]" src="/images/closeONly.png" alt="" />
                        </div>
                        {props.children}
                    </div>
                </div>
            }
        </>
    )
}