import CssFilterConverter from "css-filter-converter";
import { useGenerateOTP, useGlobalList, useGlobalVariables, useLoginStore, useTabStates, userRegstore } from "../../globalFunctions/store";
import { Link, useNavigate } from "react-router-dom";
import Timer from "./times";
import { useTranslation } from "react-i18next";
import { useDepolist, useGetKey } from "../../hooks/curstomHooks";
import { useGetDiscountAmount, useGetRecharge, useGetRegFields, useGetUSDTInfos, useGetUserInfo, useRefreshBal } from "../../hooks/getUserInfoHook";
import './navbar.css'
import { useBalance } from "../../globalFunctions/globalContext";
import { MenuTab } from "./components/menuTab";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar/Avatar";
import { ArrowDropDownIcon } from "@mui/x-date-pickers";
import { ToastrPngk } from "../../globalFunctions/toastr";
import {  useLayoutEffect, useState } from "react";
import DepositModal from "../../main/homePage/components/depositModal";
import ConfirmOut from "./components/logoutConfirmModal";
import ConfirmRefresh from "./components/refreshPage";
import TermsCondition from "./components/termsAndCondition";
import Balance from "./components/balance";

function Navbar(props: any) {
  const { t } = useTranslation(["home", "main"]);
  const color = useGlobalList(state => state.color)
  const vipInfo = useGlobalList(state => state.vipInfo)
  const rechargeCn = useGetRecharge();
  const confirmOut = useGlobalVariables((state) => state.confirmOutModal);
  const confirmRefresh = useGlobalVariables((state) => state.confirmRefersg);
  const iconArrowColor: any = CssFilterConverter.hexToFilter(color.text);
  const userConfig2 = useGlobalVariables((state) => state.stationConfig);
  const userConfig = useGlobalVariables((state) => state.userConfig);
  const backgroundColor = useGlobalList(state => state.color);
  const scroll = useGlobalVariables((state) => state.scrollToTop);
  const getKey = useGetKey()
  const deposits = useDepolist();
  const userInfo = useGlobalVariables((state) => state.userDetails);
  const regFields = useGetRegFields();
  
  const gameURL = useBalance();
  const navigate = useNavigate();
  const hoverColor = useGlobalList(state => state.hoverColor)
  const refreshBalance = useRefreshBal();
  const iconColor: any = CssFilterConverter.hexToFilter(color.forGround);
  const iconColor2: any = CssFilterConverter.hexToFilter(color.text2);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const usdtInfos = useGetUSDTInfos()
  const userDet = useGetUserInfo()
  const handleopenLogin = () => {
    useLoginStore.setState({ isOpen: true });
    useGenerateOTP.getState().setOtp();
    getKey.mutate()
  };
  const handleOpenRegmodal = () => {
    regFields.refetch();
    if (regFields.isSuccess === true) {
      userRegstore.setState({ isOpenRegister: true });
    }
  };

  const [reload, setReload] = useState(false);

  function handleReloadUp() {
    if (gameURL === undefined) {
      setReload(true);
      userDet.refetch()
      refreshBalance.mutate();
      setTimeout(function () {
        useGlobalList.setState({ banalanceUpdate: false })
        setReload(false);
      }, 5000);
      useGlobalList.setState({ banalanceUpdate: true })
    }
  }
  function copyText(text: any) {
    navigator.clipboard.writeText(text);
    ToastrPngk({ msg: t("ts920", { ns: "ts" }), type: "success", id: text });
  }
  const handleClick = (event?: any, color?: any) => {
    setAnchorEl(event.currentTarget);
    useGlobalList.setState({ hoverColor: color });
  };
  function openWithdrawPage(link: any, index: any) {
    if (userInfo?.type === 150 || userInfo?.type === 160) {
      ToastrPngk({ msg: t("ts983", { ns: "ts" }), type: "error", id: link });
    } else {
      rechargeCn.mutate();
      usdtInfos.refetch()
      
      useTabStates.setState({ type: 0 });
      if (link === "withdraw") {
        navigate("/withdraw");
        useTabStates.setState({ type: index });
      } else {
        navigate("/withdrawal");
      }
    }
  }
  function openDeposit(link: any) {
    if (userInfo?.type === 150 || userInfo?.type === 160) {
      ToastrPngk({ msg: t("ts983", { ns: "ts" }), type: "error", id: link });
    } else {
      rechargeCn.mutate();
      usdtInfos.refetch()
      useGlobalVariables.setState({ depoActiveTab: 0 });
      useGlobalVariables.setState({ activeBankCard: 0 });
      deposits.refetch();
      if (link === "newDepo") {
        useGlobalVariables.setState({ depoModal: true });
      } else {
        navigate("/deposit");
      }
    }
  }
  useLayoutEffect(() => {
    if (userConfig2?.stationStatisticsCode !== undefined) {
      const z = document.createElement('div')
      z.innerHTML = userConfig2?.stationStatisticsCode
      document.body.appendChild(z);
    }
  }, [])

  return (
    <nav className="navbarContainer h-[.8rem]">
      <DepositModal></DepositModal>
      <ConfirmOut confirmLogout={confirmOut} />
      <ConfirmRefresh modalStatus={confirmRefresh}></ConfirmRefresh>
      <TermsCondition />
      <div className="navbar h-[.8rem] flex items-center px-[.2rem] justify-between" style={userConfig2.stationCode === "yd102" ? { backgroundColor: color.backGorund } : { backgroundColor: color.second }}>
        <div className="flex items-center gap-[.2rem]">
          <img alt="logo"
            src="/images/logoSide.png"
            className={`w-[.25rem] h-[.25rem]`}
            onClick={props.setside}
            style={{ filter: iconArrowColor.color }}
          />
          <div className="logoContainer w-[2rem]" onClick={scroll}>
            <Link to="/home">
              <img className="logoImage " src={userConfig2?.logo} alt="Logo" />
            </Link>
          </div>
          <Timer />
          {userInfo?.isLogin === true &&
            <div className="flex items-center gap-[.2rem]">
              {userConfig.onOffGiftWallet && <Link to="/recharge">
                <div className="bonusMoney flex items-center gap-[.1rem] border rounded-full" style={{ borderColor: color.fourth, padding: "0 0.1rem" }}>
                  <img
                    className="bonusMoneyImage w-[.4rem]"
                    src="data:image/png;base64,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"
                    alt=""
                  />
                  <label className="moneyValue text-[.18rem] text-[#adb6c3]">
                    {t("ts706", { ns: "ts" })}
                    <u className="moneyLabel text-[.18rem] text-[#FFAA09] ml-[.1rem]">
                      {userInfo?.giftMoney
                        ? 
                          userInfo?.giftMoney.toLocaleString()
                        
                        : "0,00"}
                    </u>
                  </label>
                </div>
              </Link>}
              <Balance />
              <button onClick={() => openDeposit("newDepo")} type="button" data-twe-ripple-init data-twe-ripple-color="dark" className="cursor-pointer text-[.16rem] h-[.4rem] rounded-[.1rem] min-w-[1rem] shadow-md" style={{ backgroundColor: color.fifth, borderColor: color.fifth, color: color.id === 16 ? color.text4 : color.second }}> {t("ts014", { ns: "ts" })}</button>
              {userConfig2.stationCode !== "yd102" ?
                <button onClick={() => openWithdrawPage("withdraw", 0)} type="button" style={{ borderColor: color.fifth, color: color.fifth }} className="text-[.16rem] h-[.4rem] rounded-[.1rem] min-w-[1rem] border shadow-md"> {t("ts015", { ns: "ts" })}</button>
                :
                <button onClick={() => openWithdrawPage("withdraw", 0)} type="button" data-twe-ripple-init data-twe-ripple-color="dark" className="cursor-pointer text-[.16rem] h-[.4rem] rounded-[.1rem] min-w-[1rem] shadow-md" style={{ backgroundColor: color.fifth, borderColor: color.fifth, color: color.id === 16 ? color.text4 : color.second }}> {t("ts015", { ns: "ts" })}</button>
              }
            </div>}
        </div>
        {userInfo?.isLogin === false ?
          <div className="flex items-center gap-[.2rem] relative right-[2rem]">
            <button onClick={handleopenLogin} type="button" data-twe-ripple-init data-twe-ripple-color="dark" className="text-[.16rem] h-[.4rem] rounded-[.1rem] min-w-[1rem] shadow-md" style={{ backgroundColor: color.fifth, borderColor: color.fifth, color: color.second }}>{userConfig2?.stationCode === "bx105" && localStorage.getItem("i18nextLng") === "br" ? "Login" : t("ts002", { ns: "ts" })}</button>
            {userConfig2.stationCode === "yd102" ?
              <button onClick={handleOpenRegmodal} type="button" data-twe-ripple-init data-twe-ripple-color="dark" className="text-[.16rem] h-[.4rem] rounded-[.1rem] min-w-[1rem] shadow-md" style={{ backgroundColor: color.fifth, borderColor: color.fifth, color: color.second }}>{userConfig2?.stationCode === "bx105" && localStorage.getItem("i18nextLng") === "br" ? "Registro" : t("ts001", { ns: "ts" })}</button>
              :
              <button onClick={handleOpenRegmodal} type="button" data-twe-ripple-init data-twe-ripple-color="dark" className="text-[.16rem] h-[.4rem] rounded-[.1rem] min-w-[1rem] border shadow-md" style={{ borderColor: color.fifth, color: color.fifth }}> {userConfig2?.stationCode === "bx105" && localStorage.getItem("i18nextLng") === "br" ? "Registro" : t("ts001", { ns: "ts" })}</button>
            }
          </div> : <>
            <div className="menuBox relative right-[2rem]">
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  textAlign: "center",
                  padding: "5px",
                  borderRadius: "7px",
                  "&:hover": {
                    backgroundColor: color.third,
                  },
                  backgroundColor: hoverColor,
                }}
                onClick={(event) =>
                  handleClick(event, color.third)
                }
                onMouseOver={(event) =>
                  handleClick(event, color.third)
                }
              >
                <div className="profileMenu flex items-center gap-[.1rem] ">
                  <div className="vipLevelContainer flex relative">
                    <img alt=""
                      className="profileImage w-[.56rem] h-[.56rem]"
                      src={"/avatarImages/Feminine/1.png"}
                    />
                    <div className="vipBox flex h-[.12rem] bg-[#24b299] rounded-[.04rem,0] absolute bottom-0 right-0 items-center justify-center">
                      <img alt="" className="vipBadge w-[.163rem]" src="/vipImages/pin.png" />
                      <span className="text-[#f7c80c] text-[.11rem]">{vipInfo?.data?.curDegreeLevel}</span>
                    </div>
                  </div>

                  <div className="UserInfo flex items-end text-start gap-[.1rem]">
                    <div className="infoBoxs">
                      <label className="usernameLabel text-[.18rem] text-[#ADB6C3]">
                        {userInfo?.username}
                      </label>
                      <div className="userCopyBox flex">
                        <label className="usernameLabel text-[.18rem] text-[#ADB6C3]">ID:</label>
                        <span className="userID text-[.18rem] text-[#ADB6C3]">{userInfo?.promCode}</span>
                        <img alt=""
                          src={backgroundColor.copy}
                          style={Boolean(anchorEl) === true ? { filter: backgroundColor.id === 16 && userConfig2.stationCode !== "yd102" ? Boolean(anchorEl) === true ? iconColor.color : iconColor2.color : iconColor.color, zIndex: 9999 } : { filter: backgroundColor.id === 16 && userConfig2.stationCode !== "yd102" ? Boolean(anchorEl) === true ? iconColor.color : iconColor2.color : iconColor.color }}
                          onClick={() => copyText(userInfo?.promCode)}
                          className="copyIcon w-[.22rem] h-[.22rem] ml-[.1rem] cursor-pointer"
                        />
                      </div>
                    </div>
                    <Avatar
                      variant="square"
                      sx={{ width: 32, height: 32, bgcolor: "transparent" }}
                    >
                      <ArrowDropDownIcon
                        className={
                          Boolean(anchorEl) === true
                            ? "!w-[.2rem] active"
                            : "!w-[.2rem]"
                        }
                        sx={{
                          color: backgroundColor.id === 16 && userConfig2.stationCode !== "yd102" ? Boolean(anchorEl) === true ? backgroundColor.forGround : backgroundColor.text2 : backgroundColor.forGround
                        }}
                      />
                    </Avatar>
                  </div>
                </div>
              </Box>

            </div>
            <MenuTab anchorEl={anchorEl} action={setAnchorEl} ></MenuTab>
          </>}
      </div>
    </nav>
  );
}
export default Navbar;
