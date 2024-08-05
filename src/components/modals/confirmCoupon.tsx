import CssFilterConverter from "css-filter-converter";
import { useGlobalList } from "../globalFunctions/store";
import { useGetCouponClaim } from "../hooks/getUserInfoHook";

export default function ConfirmCoupon(props: any) {
    const backgroundColor = useGlobalList(state => state.color)
    const iconColor: any = CssFilterConverter.hexToFilter(backgroundColor.text);
    const claimCoupon=useGetCouponClaim()
    function getCoupon(){
        const payload={
            cid:props.cid,
            id:props.id
        }
        claimCoupon.mutate(payload)
        props.close()
    }

    return (
        <>
            {props.status &&
                <div className="fixed top-0 left-0 w-screen h-screen bg-[#0000004f] z-[9999] flex items-center justify-center">
                    <div className="w-auto h-auto p-[.2rem] border rounded-[.1rem] min-w-[4rem] min-h-[1.5rem] border-none relative " style={{ backgroundColor: backgroundColor.backGorund }}>
                        <img onClick={props.close} style={{ filter: iconColor.color }} className="w-[.22rem]  cursor-pointer absolute right-[.1rem] top-[.1rem]" src="/images/closeONly.png" alt="" />
                        <div className="flex flex-col items-center justify-center mt-1 gap-[.3rem]">
                            <div className="text-[.2rem]" style={{ color: backgroundColor.text4 }}>Do you want to receive it?</div>
                            <div className="text-[.18rem] flex gap-[.2rem]">
                                <button onClick={getCoupon} className="text-[.18rem] border rounded-[.05rem] p-[.05rem] px-[.2rem]" style={{ backgroundColor: backgroundColor.forGround,borderColor:backgroundColor.forGround }}>Recieve</button>
                                <button onClick={props.close}  className="text-[.18rem] border  rounded-[.05rem] p-[.05rem] px-[.2rem]" style={{ backgroundColor: backgroundColor.backGorund,borderColor:backgroundColor.forGround,color:backgroundColor.forGround }}>Cancel</button>
                            </div>
                        </div>
                    </div>
                </div>
            }

        </>

    )
}