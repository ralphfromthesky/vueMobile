import CssFilterConverter from "css-filter-converter";
import { useGenerateOTP, useGenerateOTPRegister, useGlobalList } from "../globalFunctions/store"
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import CancelIcon from '@mui/icons-material/Cancel'
import { useEmailVer, useMobileVer } from "../hooks/getUserInfoHook";
import { ToastrPngk } from "../globalFunctions/toastr";
export function CustomInput(props: any) {
    const { t } = useTranslation(["home", "main"]);
    const [formData, setFormData] = useState<any>([])
    const [viewPass, setViewPass] = useState(true)
    const color = useGlobalList(state => state.color)
    const OTP = useGenerateOTP((state) => state.otp);
    const [timer, setTimer] = useState(0);
    const RegOtp = useGenerateOTPRegister.getState().otp
    const iconColor2: any = CssFilterConverter.hexToFilter(color.text);
    const emailVer = useEmailVer()
    const mobile = useMobileVer()
    function handleValue(event: any) {
        if (props?.handleChange) {
            props?.handleChange([event.target.name], event.target.value)
            setFormData({ ...formData, [event.target.name]: event.target.value })
        }

    }
    function clearField(event: any) {
        setFormData({ ...formData, [event]: "" })
        props?.handleChange([event], "")
    }
    function sendCode(e: any) {
        if (e.target.form[0].value !== "") {
            setTimer(60)
            if (props.name === "email") {
                const payload = {
                    email: e.target.form[0].value,
                    type: 3
                }
                emailVer.mutate(payload)
            }
            else {
                const payload = {
                    phone: e.target.form[0].value,
                }
                mobile.mutate(payload)
            }
        }
        else {
            ToastrPngk({ msg: props.name.toUpperCase() + " should not be empty", type: "error", id: "0011usdt" })
        }



    }
    useEffect(() => {
        const interval = setInterval(() => {
            if (timer !== 0) {
                setTimer(timer - 1)
            }
            else {
                clearInterval(interval)
            }
        }, 1000);
        return () => clearInterval(interval);
    }, [timer]);

    return (
        <div className="relative">
            <div className="border rounded-[.1rem] flex items-center px-[.1rem] gap-[.1rem] justify-between relative" style={{ borderColor: color.fourth }}>
                <div className="flex items-center gap-[.05rem]">
                    {props.name !== "mobile" ? <div className="h-[.26rem] flex items-center gap-[.05rem]">
                        <img style={
                            (props.name !== "phone" && props.name !== "facebook" && props.name !== "whatsapp" && props.name !== "telegram" && props.name !== "line" && props.name !== "email") ? { filter: iconColor2.color } :
                                    { filter: "none" }
                        } className="w-[.3rem]" src={props.icon} alt="" />
                    </div> : <div className="flex items-center gap-[.05rem]" style={{ fontSize: "initial" }} >
                        <img src={"/areaCodeFlags/" + t("ts1305", { ns: "ts" })} className="w-[.25rem]" alt="" />
                        <span style={{ fontSize: "initial" }} className="text-white">{t("ts1304", { ns: "ts" })}</span>
                    </div>
                    }
                    {props.name === "phone" && <div className="flex items-center gap-[.05rem]">
                        <img src={"/areaCodeFlags/" + t("ts1305", { ns: "ts" })} className="w-[.25rem]" alt="" />
                        <span style={{ fontSize: "initial" }} className="text-white">{t("ts1304", { ns: "ts" })}</span>
                    </div>}
                    <div className="flex items-center gap-[.05rem]">
                        <span style={{ fontSize: "initial" }} className="text-red-500 pt-[.1rem]">*</span>
                        <input value={formData[props.name]} type={(props.name === "password" || props.name === "pwd" || props.name === "rpwd" || props.name === "receiptPwd") ? viewPass ? "password" : "text" : "text"} onChange={(e) => handleValue(e)} name={props.name} placeholder={props.placeholder} className={`bg-transparent w-full autofill:bg-transparent h-full p-[.15rem] pl-0 text-[.18rem] outline-none placeholder:bg-[${color.text4}] `} style={{ color: color.text4 }} />
                    </div>
                </div>
                <div className="flex relative gap-[.05rem]">
                    {(props.name === "verifyCode" || props.name === "captcha") && <img src={(props.name === "verifyCode" || props.name === "captcha") && props.name === "verifyCode" ? OTP : RegOtp} alt="" />}
                    {(props.name !== "verifyCode" && props.name !== "captcha") && formData[props.name] && formData[props.name].length !== 0 && <CancelIcon className="!w-[.3rem] !h-[.3rem] cursor-pointer " onClick={() => clearField(props.name)} style={{ color: color.text }} />}
                    {((props.name === "password" || props.name === "pwd" || props.name === "rpwd" || props.name === "receiptPwd") && props.name !== undefined) && (viewPass === false ? <Visibility className="  !w-[.3rem] !h-[.3rem] cursor-pointer" onClick={() => setViewPass(!viewPass)} style={{ color: color.forGround }} /> : <VisibilityOff className=" !w-[.3rem] !h-[.3rem] cursor-pointer" onClick={() => setViewPass(!viewPass)} style={{ color: color.fourth }} />)}
                    {(props.name === "email" || props.name === "mobile") && timer === 0 && props.typeIn !== "login" && <button type="button" className="text-[.12rem] w-max border rounded-full p-[.04rem] px-[.1rem]" style={{ color: color.fourth, borderColor: color.forGround, background: color.forGround }} onClick={sendCode}>Send Code</button>}
                    {(props.name === "email" || props.name === "mobile") && timer !== 0 && props.typeIn !== "login" && <button disabled type="button" className="text-[.12rem] w-max border rounded-full p-[.04rem] px-[.1rem]  cursor-no-drop" style={{ color: "white", borderColor: color.fourth, background: color.fourth }} onClick={sendCode}>Send Code {timer !== 0 && timer}</button>}
                </div>
            </div>
            {(props.name !== "verifyCode" && props.name !== "rpwd" && props.name !== "captcha") && formData[props.name] && (formData[props.name].length <= 5 && formData[props.name].length >= 1) && <span className="text-red-600 !mt-[.1rem] !mb-[.1rem] absolute top-[.46rem] text-[.15rem]">{(props.name !== "password" && props.name !== "pwd" && props.name !== "rpwd" && props.name !== "receiptPwd") ? t("ts1131", { ns: "ts" }) : t("ts1132", { ns: "ts" })}</span>}

        </div>

    )
}

