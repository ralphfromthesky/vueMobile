import DialogueModal from "../Dialogue";
import {  useModalState, useVoucher } from "../globalFunctions/store";
import CouponImage, { CouponImageUsed } from "./couponImage";;


export default function CouponList() {
    const couponModal = useModalState(state => state.coupon)
    const vouchers = useVoucher(state => state.coupon)
    console.log(vouchers)
    return (
        <DialogueModal close={() => useModalState.setState({ coupon: false })} openModal={couponModal}>
            <div className="flex flex-col gap-[.25rem] p-[.1rem] pt-[.2rem]  w-[4rem] overflow-auto h-[5rem]">
                {
                    vouchers && vouchers.sort((a:any, b:any) => a.status > b.status ? 1 : -1).map((value: any, index: any) =>
                    <>
                    {value.status===1? <CouponImage>{value}</CouponImage>:<CouponImageUsed>{value}</CouponImageUsed>}
                    </>
                       
                    )
                }

            </div>
        </DialogueModal>
    )
}


