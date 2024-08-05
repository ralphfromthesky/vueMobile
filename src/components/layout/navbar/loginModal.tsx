import { useTranslation } from "react-i18next";
import React, { useEffect, useState } from "react";
import { useGlobalList, useGlobalVariables, useLoginStore, useSignInStore, } from "../../globalFunctions/store";
import { CustomInput } from "../../commonComponents/inputComponent";
import { useLogin, useLoginFreeTrial } from "../../hooks/getUserInfoHook";
import { Link, useNavigate } from "react-router-dom";
import "./loginModal.css";
import Cookies from "universal-cookie";
import { ToastrPngk } from "../../globalFunctions/toastr";
import CssFilterConverter from "css-filter-converter";
import DialogueModal from "../../Dialogue";
export default function CustomizedDialogs(props: any) {
  const { t } = useTranslation(["home", "main"]);
  const colorP = useGlobalList((state) => state.color);
  const loginStatus = useLoginStore((state) => state.isOpen);
  const userConfig = useGlobalVariables.getState().stationConfig
  const navigate = useNavigate();
  const [vers, setVers] = useState<any>("v1")
  const cookies = new Cookies();
  const capthaLang = cookies.get("langList");
  const loginv2 = useLogin();
  
  const freeTrial = useLoginFreeTrial();
  const keyGen = useGlobalList((state) => state.encKey);
  const iconColor: any = CssFilterConverter.hexToFilter(colorP.forGround);
  const checkColor: any = CssFilterConverter.hexToFilter(colorP.text2);
  const [checked, setChecked] = useState(
    useSignInStore((state) => state.rememberMe) || false
  );
  const { user, pass } = useSignInStore((state) => ({
    user: state.userName,
    pass: state.password,
    captcha: state.captcha,
  }));
  const handleChange3 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
    useSignInStore.setState({ rememberMe: event.target.checked });
  };
  function login(event: any) {
    event.preventDefault()
    if (event.type === "submit") {
      if (userConfig?.on_off_pc_verify_code === true) {

        var payload;
        console.log(vers)

        if (vers === "v2") {
          payload = {
            email: event.target[0]?.value,
            password: event.target[1]?.value,
            type: vers
          }
        }
        else if (vers === "v3") {
          payload = {
            phone: event.target[0]?.value,
            password: event.target[1]?.value,
            verifyCode: event.target[2]?.value,
            type: vers
          }
        }
        else {
          payload = {
            username: event.target[0]?.value,
            password: event.target[1]?.value,
            verifyCode: event.target[2]?.value,
            type: vers
          }

        }
        loginv2.mutate(payload);
      } else {
        const payload = {
          username: event.target[0]?.value,
          password: event.target[1]?.value,
          checked: checked,
        };
        loginv2.mutate(payload);
      }
    }
  }
  const handleReegisterModal = () => {
    props.openReg();
    props.openTab();
  };
  const handleFreetrial = () => {
    if (userConfig.isAllowRegisterGuest) {
      freeTrial.mutate();
      useLoginStore.setState({ isOpen: false });
    }
  };
  const openSupport = () => {
    navigate("/support");
    useLoginStore.setState({ isOpen: false });
  };

  function loginWithGeetest(event: any) {
    event.preventDefault()
    if (event.type === "submit") {
      if (event.target[0]?.value === "" || event.target[2]?.value === "") {
        ToastrPngk({ msg: "Required fields must not be empty", type: "error" });
        return;
      }
      (window as any)["initGeetest4"](
        {
          captchaId: keyGen,
          product: "bind",
          language: capthaLang,
        },
        function (captchaObj: any) {
          (window as any)["gt"] = captchaObj;
          captchaObj
            .onReady(function () {
              captchaObj.showCaptcha(); //显示验证码
            })
            .onSuccess(function (data: any) {
              var payload;
              if (vers === "v1") {
                payload = {
                  username: event.target[0]?.value,
                  password: event.target[1]?.value,
                  verifyCode: event.target[2]?.value,
                  geetestParams: JSON.stringify(captchaObj.getValidate()),
                }
              }
              else if (vers === "v2") {
                payload = {
                  email: event.target[0]?.value,
                  password: event.target[2]?.value,
                  verifyCode: event.target[3]?.value,
                  geetestParams: JSON.stringify(captchaObj.getValidate()),
                }
              }
              else if (vers === "v3") {
                payload = {
                  phone: event.target[0]?.value,
                  password: event.target[2]?.value,
                  verifyCode: event.target[3]?.value,
                  geetestParams: JSON.stringify(captchaObj.getValidate()),
                }
              }

              doLogin(payload);
              useSignInStore.setState({ userName: "" });
              useSignInStore.setState({ mobile: "" });
              useSignInStore.setState({ email: "" });
              useSignInStore.setState({ password: "" });
              useSignInStore.setState({ captcha: "" });
            })
            .onError(function () {
              captchaObj.reset();
              useSignInStore.setState({ userName: "" });
              useSignInStore.setState({ password: "" });
              useSignInStore.setState({ captcha: "" });
            });
        }
      );
    }
  }
  function doLogin(payload?: any) {
    if (userConfig?.on_off_pc_verify_code === true) {
      let payloadOpt

      if (vers === "v1") {
        payloadOpt = {
          username: payload.username,
          password: payload.password,
          verifyCode: payload.verifyCode,
          type: vers,
          geetestParams: payload.geetestParams,
        }
      }
      else if (vers === "v2") {
        payloadOpt = {
          email: payload.email,
          pwd: payload.password,
          code: payload.verifyCode,
          type: vers,
          geetestParams: payload.geetestParams,
        };
      }
      else if (vers === "v3") {
        payloadOpt = {
          phone: payload.phone,
          pwd: payload.password,
          code: payload.verifyCode,
          type: vers,
          geetestParams: payload.geetestParams,
        };
      }
      loginv2.mutate(payloadOpt);
    } else {
      let payloadOpt
      if (vers === "v1") {
        payloadOpt = {
          username: payload.username,
          password: payload.password,
          geetestParams: payload.geetestParams,
        }
      }
      else if (vers === "v2") {
        payloadOpt = {
          email: payload.email,
          password: payload.password,
          geetestParams: payload.geetestParams,
        };
      }
      else if (vers === "v3") {
        payloadOpt = {
          phone: payload.phone,
          pwd: payload.password,
          geetestParams: payload.geetestParams,
        };
      }
      loginv2.mutate(payloadOpt);
    }
  }
  function hanleInput(e: any, value: any) {

  }
  return (
    <DialogueModal close={() => useLoginStore.setState({ isOpen: false })} openModal={loginStatus} title={<div className="flex items-center gap-[.1rem] border-b-[.04rem]  pb-[.1rem] pt-[.2rem]" style={{ borderColor: colorP.forGround }}><img style={{ filter: iconColor.color }} className="w-[.27rem]" src="/images/1.png" alt="user" /><span className="decoration-none text-[.18rem]">{t("ts1215", { ns: "ts" })}</span></div>}>
      <div className="w-[6rem]">
        {userConfig.loginRegMode === "v4" && <div className="flex items-center justify-center w-full mt-[.1rem] gap-[.2rem]">
          <div onClick={() => setVers("v1")} className="flex items-center justify-center rounded-full p-[.05rem] relative border-[.02rem] cursor-pointer" style={{ backgroundColor: colorP.third, borderColor: colorP.forGround }}>
            <img src="/images/username.png" className="w-[.3rem]" style={{ filter: iconColor.color }} alt="" />
            {vers === "v1" && <div className="flex items-center justify-center rounded-full w-[.23rem] h-[.23rem] absolute -right-[.05rem] -bottom-[.05rem] border" style={{ backgroundColor: colorP.forGround, borderColor: colorP.text2 }}>
              <img src="/images/check.png" alt="" className="absolute w-[.15rem]" style={{ filter: checkColor.color }} />
            </div>}
          </div>
          <div onClick={() => setVers("v2")} className="flex items-center justify-center rounded-full p-[.05rem] relative border-[.02rem] cursor-pointer" style={{ backgroundColor: colorP.third, borderColor: colorP.forGround }}>
            <img src="/images/email.png" className="w-[.3rem]" style={{ filter: iconColor.color }} alt="" />
            {vers === "v2" && <div className="flex items-center justify-center rounded-full w-[.23rem] h-[.23rem] absolute -right-[.05rem] -bottom-[.05rem] border" style={{ backgroundColor: colorP.forGround, borderColor: colorP.text2 }}>
              <img src="/images/check.png" alt="" className="absolute w-[.15rem]" style={{ filter: checkColor.color }} />
            </div>}
          </div>
          <div onClick={() => setVers("v3")} className="flex items-center justify-center rounded-full p-[.05rem] relative border-[.02rem] cursor-pointer" style={{ backgroundColor: colorP.third, borderColor: colorP.forGround }}>
            <img src="/images/phonev2.png" className="w-[.3rem]" style={{ filter: iconColor.color }} alt="" />
            {vers === "v3" && <div className="flex items-center justify-center rounded-full w-[.23rem] h-[.23rem] absolute -right-[.05rem] -bottom-[.05rem] border" style={{ backgroundColor: colorP.forGround, borderColor: colorP.text2 }}>
              <img src="/images/check.png" alt="" className="absolute w-[.15rem]" style={{ filter: checkColor.color }} />
            </div>}
          </div>
        </div>}
        <form autoComplete="off" className="flex flex-col gap-[.35rem] p-[.1rem] pt-[.2rem]" onSubmit={userConfig.captcha_vertify_switch === true
          ? loginWithGeetest
          : login}>
          {(userConfig.loginRegMode === "v3" || vers === "v3") ? <CustomInput typeIn="login" handleChange={hanleInput} name="mobile" icon="/images/captcha.png" placeholder={t("ts297", { ns: "ts" })} /> :
            (userConfig.loginRegMode === "v2" || vers === "v2") ? <CustomInput typeIn="login" handleChange={hanleInput} name="email" icon="/images/unread.png" placeholder={t("ts150", { ns: "ts" })} /> :
              <CustomInput typeIn="login" handleChange={hanleInput} iconFilter={true} name="username" icon="/images/1.png" placeholder={t("ts167", { ns: "ts" })} />}
          <CustomInput handleChange={hanleInput} iconFilter={true} name="password" icon="/images/rpwd.png" placeholder={t("ts168", { ns: "ts" })} />
          {(vers === "v1" || (vers === userConfig.loginRegMode && userConfig.loginRegMode === "v4")) && (userConfig?.on_off_pc_verify_code && <CustomInput handleChange={hanleInput} iconFilter={true} name="verifyCode" icon="/images/captcha.png" placeholder={t("ts166", { ns: "ts" })} />)}
          {/* {(userConfig?.on_off_pc_verify_code && vers !== "v1" ) && <CustomInput handleChange={hanleInput} iconFilter={true} name="vcode" icon="/images/captcha.png" placeholder={t("ts166", { ns: "ts" })} />} */}
          <div className="flex justify-between">
            <div className="checkbox_wrapper_4 gap-[.1rem]" style={{ borderColor: colorP.fourth }}>
              <input type="checkbox" className="inp-cbx " id="checker" checked={!!checked} onChange={handleChange3} />
              <label className="cbx border-slate-100" htmlFor="checker">
                <span style={{ borderColor: colorP.fourth }}>
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
              <label htmlFor="" className="text-[.18rem]" style={{ color: colorP.text4 }}>{t("ts162", { ns: "ts" })}</label>
            </div>
            <Link to={"/forgotpassword"} style={{ color: colorP.forGround, fontSize: ".18rem" }}>
              {t("ts163", { ns: "ts" })}
            </Link>
          </div>

          <button type="submit" className="text-[.2rem] h-[0.55rem] rounded-[.1rem]" style={{ background: colorP.forGround, borderColor: colorP.forGround, color: colorP.text2 }}> {userConfig?.stationCode === "bx105" &&
            localStorage.getItem("i18nextLng") === "br"
            ? "Login"
            : t("ts161", { ns: "ts" })}</button>
          <div className="flex justify-between px-[.2rem]">
            <div className="cursor-pointer text-[.18rem]" onClick={openSupport} style={{ color: colorP.forGround }} >
              {userConfig?.stationCode === "bx105" &&
                localStorage.getItem("i18nextLng") === "br"
                ? "Atendimento ao cliente"
                : t("ts127", { ns: "ts" })}
            </div>

            {userConfig.isAllowRegisterGuest && (
              <div className="cursor-pointer text-[.18rem]" onClick={handleFreetrial} style={{ color: colorP.forGround, }} >
                <span className="cursor-pointer text-[.18rem]" style={{ color: colorP.forGround }}
                >
                  {t("ts164", { ns: "ts" })}
                </span>
              </div>
            )}
            <div className="cursor-pointer text-[.18rem]" onClick={handleReegisterModal} style={{ color: colorP.forGround }} >
              {userConfig?.stationCode === "bx105" &&
                localStorage.getItem("i18nextLng") === "br"
                ? "Register uma Conta"
                : t("ts165", { ns: "ts" })}
            </div>
          </div>

        </form>
      </div>
    </DialogueModal>
  );
}
