import { useTranslation } from "react-i18next";
import DialogueModal from "../../Dialogue";
import { CustomInput } from "../../commonComponents/inputComponent";
import { useGlobalList, useGlobalVariables, userRegstore } from "../../globalFunctions/store";
import CssFilterConverter from "css-filter-converter";
import { useRef, useState } from "react";
import { agreement, evaluatePasswordStrength, handleLoginModal } from "../../functions/registerFunction";
import { Link, useNavigate } from "react-router-dom";
import { useLoginFreeTrial } from "../../hooks/getUserInfoHook";
import { useGetKey } from "../../hooks/curstomHooks";
import { ToastrPngk } from "../../globalFunctions/toastr";
import Cookies from "universal-cookie";
import { useRegisterUser } from "../../hooks/registrationHook";

export default function RegModal(props: any) {
  const regFieldsContent = useGlobalVariables((state) => state.regFields)
  const passStreng = useRef(0)
  const { t } = useTranslation(["home", "main"]);
  const color = useGlobalList(state => state.color)
  const [formData, setFormData] = useState<any>([])
  const iconColor: any = CssFilterConverter.hexToFilter(color.forGround);
  const userConfig = useGlobalVariables(state => state.stationConfig)
  const [checked, setChecked] = useState(true || false);
  const freeTrial = useLoginFreeTrial()
  const getKey = useGetKey()
  const [vers, setVers] = useState<any>("v1" )
  const keyGen = useGlobalList(state => state.encKey)
  const navigate = useNavigate();
  const cookies = new Cookies();
  const capthaLang = cookies.get("langList")
  const regState = userRegstore(state => state.isOpenRegister)
  const reg = useRegisterUser()
  const checkColor: any = CssFilterConverter.hexToFilter(color.text2);
  const handleChange3 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };
  const openSupport = () => {
    navigate("/support")
    userRegstore.setState({ isOpenRegister: false })
  }
  const handleFreetrial = () => {
    if (userConfig.isAllowRegisterGuest) {
      freeTrial.mutate()
      userRegstore.setState({ isOpenRegister: false })
    }
  }
  function hnadleInput(eventName: any, value: any) {

    setFormData({ ...formData, [eventName]: value })
    if (eventName[0] === "pwd") {
      const pass = evaluatePasswordStrength(value)
      passStreng.current = pass
    }
  }
  function regWithGeetest(event: any) {
    event.preventDefault()
    getKey.mutate()
    if (formData.pwd !== formData.rpwd) { ToastrPngk({ msg: t("ts865", { ns: "ts" }), type: "error" }); return }
    (window as any)["initGeetest4"]({
      captchaId: keyGen,
      product: "bind",
      language: capthaLang,
    }, function (captchaObj: any) {
      (window as any)["gt"] = captchaObj;
      captchaObj.onReady(function () {
        //验证码ready之后才能调用showCaptcha方法显示验证码
        captchaObj.showCaptcha(); //显示验证码
      }).onSuccess(function () {
        const geetestParams = JSON.stringify(captchaObj.getValidate())
        const newObj = Object.assign({}, formData, {
          geetestParams: geetestParams
        })
        reg.mutate(newObj)
        // setFormData({ ...formData, ["geetestParams"]: JSON.stringify(captchaObj.getValidate()) })
        // registerDo(formData) ;
      }).onError(function () {
        captchaObj.reset();
      });
    });
  }
  const register = (event: any) => {
    event.preventDefault()
    if (event.type === "submit") {
      if (formData.pwd !== formData.rpwd) { ToastrPngk({ msg: t("ts865", { ns: "ts" }), type: "error" }); return }
      reg.mutate(formData)

    }
  }

  return (
    <DialogueModal close={() => userRegstore.setState({ isOpenRegister: false })} openModal={regState} title={<div className="flex z-[999999] items-center gap-[.1rem] border-b-[.04rem]  pb-[.1rem] pt-[.2rem]" style={{ borderColor: color.forGround }}><img style={{ filter: iconColor.color }} className="w-[.27rem]" src="/images/1.png" alt="user" /><span className="decoration-none text-[.18rem]">{t("ts003", { ns: "ts" })}</span></div>}>
      <div className="w-[6rem] overflow-auto">
        {userConfig.registerRegMode === "v4" && <div className="flex items-center justify-center w-full mt-[.1rem] gap-[.2rem]">
          <div onClick={() => setVers("v1")} className="flex items-center justify-center rounded-full p-[.05rem] relative border-[.02rem] cursor-pointer" style={{ backgroundColor: color.third, borderColor: color.forGround }}>
            <img src="/images/username.png" className="w-[.3rem]" style={{ filter: iconColor.color }} alt="" />
            {vers === "v1" && <div className="flex items-center justify-center rounded-full w-[.23rem] h-[.23rem] absolute -right-[.05rem] -bottom-[.05rem] border" style={{ backgroundColor: color.forGround, borderColor: color.text2 }}>
              <img src="/images/check.png" alt="" className="absolute w-[.15rem]" style={{ filter: checkColor.color }} />
            </div>}
          </div>
          <div onClick={() => setVers("v2")} className="flex items-center justify-center rounded-full p-[.05rem] relative border-[.02rem] cursor-pointer" style={{ backgroundColor: color.third, borderColor: color.forGround }}>
            <img src="/images/unread.png" className="w-[.3rem]" style={{ filter: "none" }} alt="" />
            {vers === "v2" && <div className="flex items-center justify-center rounded-full w-[.23rem] h-[.23rem] absolute -right-[.05rem] -bottom-[.05rem] border" style={{ backgroundColor: color.forGround, borderColor: color.text2 }}>
              <img src="/images/check.png" alt="" className="absolute w-[.15rem]" style={{ filter: checkColor.color }} />
            </div>}
          </div>
          <div onClick={() => setVers("v3")} className="flex items-center justify-center rounded-full p-[.05rem] relative border-[.02rem] cursor-pointer" style={{ backgroundColor: color.third, borderColor: color.forGround }}>
            <img src="/images/phone.png" className="w-[.3rem]" style={{ filter: "none" }} alt="" />
            {vers === "v3" && <div className="flex items-center justify-center rounded-full w-[.23rem] h-[.23rem] absolute -right-[.05rem] -bottom-[.05rem] border" style={{ backgroundColor: color.forGround, borderColor: color.text2 }}>
              <img src="/images/check.png" alt="" className="absolute w-[.15rem]" style={{ filter: checkColor.color }} />
            </div>}
          </div>
        </div>}
        <form action="" autoComplete="off" className="flex gap-[.25rem] flex-col p-[.1rem] pt-[.2rem]" onSubmit={userConfig.regCaptchaVertifySwitch === true
          ? regWithGeetest
          : register}>
          <div className="flex flex-col gap-[.26rem] relative overflow-auto max-h-[5rem]">
            {(userConfig.registerRegMode === "v3" || vers === "v3") ? <CustomInput handleChange={hnadleInput} name="mobile" icon="/images/captcha.png" placeholder={t("ts297", { ns: "ts" })} /> :
            (userConfig.registerRegMode === "v2" || vers === "v2") ? <CustomInput handleChange={hnadleInput} name="email" icon="/images/unread.png" placeholder={t("ts150", { ns: "ts" })} />:
            <CustomInput handleChange={hnadleInput} iconFilter={true} name="username" icon="/images/1.png" placeholder={t("ts167", { ns: "ts" })} />
         }
           

            {
              ( vers === "v1") ? regFieldsContent && regFieldsContent.filter((e: any, i: any) => i !== 0).map((value: any, index: any) =>
                <div className="relative">
                  <CustomInput iconFilter={true} handleChange={hnadleInput} customWarning={t("ts1012", { ns: "ts" })} name={value.eleName} placeholder={value.name} icon={`/images/${value.eleName}.png`} />
                  {value.eleName === "rpwd" && (formData["rpwd"] !== formData["pwd"]) && <span className="text-red-600 !mt-[.1rem] !mb-[.1rem] absolute top-[.46rem] text-[.15rem]">{t("ts1012", { ns: "ts" })}</span>}
                  {value.eleName === "pwd" && <div className="text-[.18rem] relative h-[.35rem] top-[.22rem] flex items-center gap-[.1rem]">
                    <span className="passValLabel" style={{ color: color.text4 }}>{t("ts1011", { ns: "ts" })}</span>
                    <span className="passValLabel passIndicator h-[.08rem] w-[.7rem] rounded-full" style={(passStreng.current === 2) ? { backgroundColor: "#EA4E3D" } : (passStreng.current === 5) ? { backgroundColor: "#04BE02" } : (passStreng.current >= 3) ? { backgroundColor: "#FFAA09" } : { backgroundColor: color.fourth }}></span>
                    <span className="passValLabel passIndicator h-[.08rem] w-[.7rem] rounded-full" style={(passStreng.current === 5) ? { backgroundColor: "#04BE02" } : (passStreng.current >= 3) ? { backgroundColor: "#FFAA09" } : { backgroundColor: color.fourth }}></span>
                    <span className="passValLabel passIndicator h-[.08rem] w-[.7rem] rounded-full" style={(passStreng.current === 5) ? { backgroundColor: "#04BE02" } : (passStreng.current >= 4) ? { backgroundColor: "#FFAA09" } : { backgroundColor: color.fourth }}></span>
                    <span className="passValLabel passIndicator h-[.08rem] w-[.7rem] rounded-full" style={(passStreng.current === 5) ? { backgroundColor: "#04BE02" } : (passStreng.current >= 5) ? { backgroundColor: "#04BE02" } : { backgroundColor: color.fourth }}></span>
                  </div>}
                </div>

              ) :
                <>
                  <CustomInput handleChange={hnadleInput} iconFilter={true} name="pwd" icon="/images/rpwd.png" placeholder={t("ts168", { ns: "ts" })} />
                  
                  {(formData["rpwd"] !== formData["pwd"]) && <span className="text-red-600 !mt-[.1rem] !mb-[.1rem] absolute top-[.46rem] text-[.15rem]">{t("ts1012", { ns: "ts" })}</span>}
                  {<div className="text-[.18rem] relative h-[.35rem] top-[.12rem] flex items-center gap-[.1rem]">
                    <span className="passValLabel" style={{ color: color.text4 }}>{t("ts1011", { ns: "ts" })}</span>
                    <span className="passValLabel passIndicator h-[.08rem] w-[.7rem] rounded-full" style={(passStreng.current === 2) ? { backgroundColor: "#EA4E3D" } : (passStreng.current === 5) ? { backgroundColor: "#04BE02" } : (passStreng.current >= 3) ? { backgroundColor: "#FFAA09" } : { backgroundColor: color.fourth }}></span>
                    <span className="passValLabel passIndicator h-[.08rem] w-[.7rem] rounded-full" style={(passStreng.current === 5) ? { backgroundColor: "#04BE02" } : (passStreng.current >= 3) ? { backgroundColor: "#FFAA09" } : { backgroundColor: color.fourth }}></span>
                    <span className="passValLabel passIndicator h-[.08rem] w-[.7rem] rounded-full" style={(passStreng.current === 5) ? { backgroundColor: "#04BE02" } : (passStreng.current >= 4) ? { backgroundColor: "#FFAA09" } : { backgroundColor: color.fourth }}></span>
                    <span className="passValLabel passIndicator h-[.08rem] w-[.7rem] rounded-full" style={(passStreng.current === 5) ? { backgroundColor: "#04BE02" } : (passStreng.current >= 5) ? { backgroundColor: "#04BE02" } : { backgroundColor: color.fourth }}></span>
                  </div>}
                  <CustomInput handleChange={hnadleInput} iconFilter={true} name="rpwd" icon="/images/rpwd.png" placeholder="Confirm Password" />
                  {(userConfig?.on_off_pc_verify_code && (vers === "v1" || (vers === userConfig.registerRegMode && userConfig.registerRegMode === "v4")) ) ? <CustomInput handleChange={hnadleInput} iconFilter={true} name="verifyCode" icon="/images/captcha.png" placeholder={t("ts166", { ns: "ts" })} />:
                  (userConfig?.on_off_pc_verify_code && vers !== "v1") && <CustomInput handleChange={hnadleInput} iconFilter={true} name="vcode" icon="/images/captcha.png" placeholder={t("ts166", { ns: "ts" })} />}
                </>
            }
          </div>
          <div className="checkbox_wrapper_4 gap-[.1rem]" style={{ borderColor: color.fourth }}>
            <input type="checkbox" className="inp-cbx " id="checker" checked={!!checked} onChange={handleChange3} />
            <label className="cbx border-slate-100" htmlFor="checker">
              <span style={{ borderColor: color.fourth }}>
                <svg width=".22rem" height=".22rem">
                  <use xlinkHref="#check-4"></use>
                </svg>
              </span>
            </label>
            <svg className="inline-svg">
              <symbol id="check-4" viewBox="0 0 12 10">
                <polyline points="1.5 6 4.5 9 10.5 1"></polyline>
              </symbol>
            </svg>
            <label htmlFor="" className="text-[.18rem]" style={{ color: color.text4 }}> <span onClick={agreement} className="termsAgree" style={{ color: color.forGround }}>{t("ts712", { ns: "ts" })}《{userConfig?.stationCode === "bx105" && localStorage.getItem("i18nextLng") === "br" ? "Contrato do usuário" : t("ts1181", { ns: "ts" })}》</span></label>
          </div>
          <button type="submit" className="text-[.2rem] h-[0.55rem] rounded-[.1rem]" style={{ background: color.forGround, borderColor: color.forGround, color: color.text2 }}> {userConfig?.stationCode === "bx105" &&
            localStorage.getItem("i18nextLng") === "br"
            ? "Login"
            : t("ts001", { ns: "ts" })}</button>
        </form>
        <div className="flex justify-center px-[.2rem] gap-[1rem]">
          <div onClick={openSupport} style={{ color: color.forGround, cursor: "pointer", fontSize: ".18rem" }}>{userConfig?.stationCode === "bx105" && localStorage.getItem("i18nextLng") === "br" ? "Atendimento ao cliente" : t("ts127", { ns: "ts" })}</div>
          {userConfig.isAllowRegisterGuest && <div onClick={handleFreetrial} style={{ color: color.forGround, cursor: "pointer", fontSize: ".18rem" }}><span style={{ color: color.forGround, cursor: "pointer", fontSize: ".18rem" }}>{t("ts164", { ns: "ts" })}</span></div>}
          <Link to={"/"} onClick={handleLoginModal} style={{ color: color.forGround, cursor: "pointer", fontSize: ".18rem" }}>{userConfig?.stationCode === "bx105" && localStorage.getItem("i18nextLng") === "br" ? "Login Agora" : t("ts161", { ns: "ts" })}</Link>
        </div>

      </div>
    </DialogueModal>
  )
}