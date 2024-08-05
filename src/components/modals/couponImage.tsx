import { useState } from "react"
import { useGlobalList, useGlobalVariables } from "../globalFunctions/store"
import ConfirmCoupon from "./confirmCoupon"

export default function CouponImage(props: any) {
    const voucherData = props.children
    const stationConfig = useGlobalVariables(state => state.stationConfig)
    const [confirm, setOpen] = useState(false)
    function getEffectiveDate() {
        if (voucherData.useEndDate && voucherData.useStartDate) {
            return (
                <div className="flex flex-col text-[.11rem] relative -top-[.05rem]">
                    <span>Start Date: {timestampToTime(voucherData.useStartDate)} </span>
                    <span>End Date:{timestampToTime(voucherData.useStartDate)}  </span>
                </div>
            )
        }
        else {
            return (
                <div className="text-[.13rem]">
                    Long-term effective
                </div>
            )
        }
    }
    function timestampToTime(timestamp: any) {
        var date = new Date(timestamp);
        var Y = date.getFullYear() + '-';
        var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
        var D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' ';
        var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
        var m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
        var s = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
        const strDate = Y + M + D;
        return strDate;
    }
    function handleConfirmModal() {
        setOpen(false)
    }
    function handleOpenMNodal() {
        setOpen(true)
    }
    return (
        <>
            <ConfirmCoupon cid={voucherData.cid} id={voucherData.id} close={handleConfirmModal} status={confirm} ></ConfirmCoupon>
            <div className="border border-red-500 rounded-[.1rem] bg-red-500 w-full h-[2rem] p-[.08rem] relative">
                <div className="bg-white w-full h-[.8rem] rounded-[.1rem] z-[99]">
                    <div className="bg-red-500 rounded-full w-[.25rem] h-[.25rem] absolute -left-[.01rem] top-[.35rem]"></div>
                    <div className="h-full flex pl-[.2rem] justify-between">
                        <div className="w-[2.5rem] pt-[.02rem] flex relative">
                            <div className="text-[.18rem] ">
                                <div className="text-[.12rem]  p-[.02rem]">&gt;{voucherData.couponsTypeStr}</div>
                                <div className="font-bold">Voucher</div>
                                <div className="text-[.13rem]">{getEffectiveDate()}</div>
                            </div>
                            <div className="absolute right-[.15rem] h-full w-[.89rem] z-[99999]">
                                <div className=" flex flex-col justify-center   h-full">
                                    <div className="text-[.20rem] font-bold">{stationConfig.currency} {voucherData.denomination}</div>
                                    {(voucherData.minAmount !== 0 || voucherData.maxAmount !== 0) && <div className="text-[.12rem] flex flex-col">
                                        <span>Min:{voucherData.minAmount}</span>
                                        <span>Max:{voucherData.maxAmount}</span>
                                    </div>}
                                </div>

                            </div>
                        </div>
                        <div className="bg-red-500 w-[1rem] h-full relative">
                            <div className=" rounded-full w-[.65rem] h-[.65rem] bg-white absolute top-[.05rem] z-[1] -left-[.35rem]"></div>
                            <div onClick={handleOpenMNodal} className=" rounded-full w-[.5rem] h-[.5rem] bg-yellow-200 absolute top-[.15rem] right-[.05rem] cursor-pointer flex items-center justify-center">
                                <img className="h-[.45rem] w-[.4rem]" src="/images/hands.png" alt="" />
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </>

    )

}
export function CouponImageUsed(props: any) {
    const voucherData = props.children
    const stationConfig = useGlobalVariables(state => state.stationConfig)
    const backgroundColor = useGlobalList(state => state.color)
    const [confirm, setOpen] = useState(false)
    function getEffectiveDate() {
        if (voucherData.useEndDate && voucherData.useStartDate) {
            return (
                <div className="flex flex-col text-[.11rem] relative -top-[.05rem]">
                    <span>Start Date: {timestampToTime(voucherData.useStartDate)} </span>
                    <span>End Date:{timestampToTime(voucherData.useStartDate)}  </span>
                </div>
            )
        }
        else {
            return (
                <div className="text-[.13rem]">
                    Long-term effective
                </div>
            )
        }
    }
    function timestampToTime(timestamp: any) {
        var date = new Date(timestamp);
        var Y = date.getFullYear() + '-';
        var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
        var D = (date.getDate() < 10 ? '0' + date.getDate() : date.getDate()) + ' ';
        var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
        var m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
        var s = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
        const strDate = Y + M + D;
        return strDate;
    }
    function handleConfirmModal() {
        setOpen(false)
    }

    return (
        <>
            <ConfirmCoupon cid={voucherData.cid} id={voucherData.id} close={handleConfirmModal} status={confirm} ></ConfirmCoupon>
            <div className="border border-gray-300 rounded-[.1rem] bg-gray-300 w-full h-[2rem] p-[.08rem] relative">
                <div className="bg-white w-full h-[.8rem] rounded-[.1rem] z-[99]">
                    <div className="bg-gray-300 rounded-full w-[.25rem] h-[.25rem] absolute -left-[.01rem] top-[.35rem]"></div>
                    <div className="h-full flex pl-[.2rem] justify-between">
                        <div className="w-[2.5rem] pt-[.02rem] flex relative">
                            <div className="text-[.18rem] ">
                                <div className="text-[.12rem]  p-[.02rem]">&gt;{voucherData.couponsTypeStr}</div>
                                <div className="font-bold">Voucher</div>
                                <div className="text-[.13rem]">{getEffectiveDate()}</div>
                            </div>
                            <div className="absolute right-[.15rem] h-full w-[.89rem] z-[99999]">
                                <div className=" flex flex-col justify-center   h-full">
                                    <div className="text-[.20rem] font-bold">{stationConfig.currency} {voucherData.denomination}</div>
                                    {(voucherData.minAmount !== 0 || voucherData.maxAmount !== 0) && <div className="text-[.12rem] flex flex-col">
                                        <span>Min:{voucherData.minAmount}</span>
                                        <span>Max:{voucherData.maxAmount}</span>
                                    </div>}
                                </div>

                            </div>
                        </div>

                        <div className="bg-gray-300 w-[1rem] h-full relative">
                            {/* <div className=" rounded-full w-[.65rem] h-[.65rem] bg-white absolute top-[.05rem] z-[1] -left-[.35rem]"></div> */}
                            <div className="border border-white rounded-full w-[.8rem] h-[.8rem] absolute top-0 right-[.05rem]">
                                <div className=" border-white border-double outline-offset-4 border-4  rounded-full w-[.55rem] h-[.55rem] bg-gray-200 absolute top-[.12rem] right-[.11rem] cursor-no-drop flex items-center justify-center">
                                    <span className="text-[.14rem] px-[.1rem] bg-gray-300" style={{ color: backgroundColor.text1 }}>{voucherData.status===2?"Claimed":"Expired"}</span>
                                </div>
                            </div>

                        </div>


                    </div>
                </div>

            </div>
        </>

    )

}