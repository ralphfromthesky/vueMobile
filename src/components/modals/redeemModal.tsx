import { useTranslation } from 'react-i18next';
import DialogueModal from '../Dialogue'
import { useGlobalList, useGlobalVariables, useModalState } from '../globalFunctions/store'
import { useCouponData, useCouponRechareg } from '../hooks/getUserInfoHook';
import { useEffect, useRef } from 'react';
import { ToastrPngk } from '../globalFunctions/toastr';
import CouponList from './couponList';
import { useNavigate } from 'react-router';
export default function RedemptioModal() {
    const { t } = useTranslation(["home", "main"]);
    const color = useGlobalList(state => state.color);
    const codeRef = useRef<any>()
    const coupinRedeem = useCouponRechareg()
    const userConfig = useGlobalVariables(state => state.userDetails)
    const RedStatus = useModalState((state) => state.redeem);
    const couponList = useCouponData()
    const navigate = useNavigate()
    function redemCoupon() {
        if (codeRef?.current.value !== "") {
            const payload = {
                code: codeRef?.current.value
            }
            coupinRedeem.mutate(payload)
        }
        else {
            ToastrPngk({ msg: "Enter Coupon Code", type: "error", id: "0011usdt" })
        }

    }
    function getVoucherList() {
        useModalState.setState({ coupon: true })
        couponList.mutate()
    }
    // useEffect(() => {
    //     if (userConfig.isLogin === false) {
    //         navigate('/')
    //     }
    // }, [])

    return (
        <DialogueModal close={() => useModalState.setState({ redeem: false })} openModal={RedStatus}>
            <div className='w-[5rem] p-[.2rem] pt-[.3rem] flex flex-col gap-[.2rem]' style={{ fontSize: "initial" }}>
                <div className='flex justify-between'>
                    <span style={{ color: color.text4 }} className='text-[.18rem]'> {t("ts1284", { ns: "ts" })}</span>
                    <button onClick={getVoucherList} className='px-[.1rem] p-[.05rem] rounded-[.1rem] text-[.14rem]' style={{ color: color.text2, background: color.forGround }}>{t("ts1287", { ns: "ts" })}</button>
                </div>
                <div className="w-full border rounded-[.08rem] my-[.1rem]" style={{ borderColor: color.text4 }}>
                    <input ref={codeRef} className="bg-transparent outline-none w-full p-[.1rem]" style={{ color: color.text4 }} placeholder={t("ts1284", { ns: "ts" })} type="text" />
                </div>
                <div>
                    <button onClick={redemCoupon} className='p-[.1rem] rounded-[.1rem] text-[.18rem] w-full' style={{ color: color.text2, background: color.forGround }}>{t("ts321", { ns: "ts" })}</button>
                </div>
                <div className='w-full flex items-center justify-center'>
                    <span style={{ color: color.text4 }}> {t("ts1286", { ns: "ts" })}</span>
                </div>
                <div className='flex justify-between'>
                    <img className='w-[.8rem]' src="/supportImages/socmedImages/facebook1.png" alt="" />
                    <img className='w-[.8rem]' src="/supportImages/socmedImages/instagram1.png" alt="" />
                    <img className='w-[.8rem]' src="/supportImages/socmedImages/whatsapp1.png" alt="" />
                    <img className='w-[.8rem]' src="/supportImages/socmedImages/twitter-x1.png" alt="" />
                    <img className='w-[.8rem]' src="/supportImages/socmedImages/telegram1.png" alt="" />
                </div>
            </div>
            <CouponList></CouponList>
        </DialogueModal>

    )
}