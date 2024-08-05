import "./sidebar.css";
import { useTranslation } from "react-i18next";
import "./mission.css";
import Loader from "../../backdropLoader/backdrop-loader";
import { useGetGames, useGetTurnlateDataType5, useGetTurnlateList } from "../../hooks/getUserInfoHook";
import { useGlobalList, useGlobalVariables, useModalStates, useSetEnvelopValue, } from "../../globalFunctions/store";
import { useChangeLanguage, useCurnew } from "../../hooks/curstomHooks";
import { LanguagePicker, SidebarTabs } from "./components/iconTabs";
import SideLinks, { SupportLink } from "./components/sideLinks";
import MultiMediaContainer from "./components/multimediaContainer";
import { ValidateLogin } from "../../hooks/actions";
import GameLink, { GameFavLink, GameLinkLoader, GameRecentLink } from "./components/gameLinks";
import CssFilterConverter from "css-filter-converter";
import { useCollorePallete } from "../styles";
import RedemptioModal from "../../modals/redeemModal";
import ColorPicker from "./components/colorPicker";

function Sidebar(props: any) {
  const { t } = useTranslation(["home", "main"]);
  useCollorePallete()
  const color = useGlobalList(state => state.color)
  const colorP = color;
  const staConfig = useGlobalVariables((state) => state.stationConfig);
  const gameLoader = useGetGames({ type: "11" });
  const gameTabs = useGlobalVariables((state) => state.gameTabs);
  const userConfig = useGlobalVariables((state) => state.userConfig);
  const userDetauils = useGlobalVariables((state) => state.userDetails);
  const changeLanguage = useChangeLanguage();
  const turnlateList = useGetTurnlateList()
  const turnLateType5 = useGetTurnlateDataType5()
  const iconColor: any = CssFilterConverter.hexToFilter(colorP.backGorund);
  const redEnv = useCurnew();

  const openSideTurn = () => {
    useModalStates.setState({ sideTurn: true })
    turnlateList.refetch()
    turnLateType5.refetch()
  }
  const openSideEnvelope = () => {
    redEnv.refetch();
    useSetEnvelopValue.setState({ envelopeValue: true });
  }
  const openSideCalendar = () => {
    useModalStates.setState({ calendarModal: true })
  }
  return (
    <>
      <Loader setLoader={changeLanguage.isLoading} />
      <RedemptioModal></RedemptioModal>
      <div
        className={`sideBar ${props.sidebarActive ? "" : "sideBar active"}`}
        style={{ backgroundColor: color.backGorund }}
      >
        <div className="sidebarContainer">
          <div className="mainGameChooseContainer">
            <div className="gameContainer">
              {gameLoader.isLoading === false ?
                gameTabs &&
                gameTabs?.filter((entry: { games: any }) => entry.games.length !== 0)
                  .map(({ games, tab }: any, index: any) => (
                    <GameLink index={index} tab={tab}></GameLink>
                  )) : <GameLinkLoader />}
              <GameRecentLink index={97} link={"recent"}></GameRecentLink>
              <GameFavLink index={98} link={"recent"} ></GameFavLink>
            </div>
          </div>
          <MultiMediaContainer></MultiMediaContainer>
          <div className="linksContainer" style={{ backgroundColor: colorP.third }}>
            {staConfig?.isRedBag === true && staConfig?.stationCode === "bx101" &&
              <SidebarTabs onClick={openSideEnvelope} link="/envelopeSide" icon="sidebarImages/envelop.png">
                {" "}
                {t("ts1294", { ns: "ts" })}
              </SidebarTabs>
            }
            {staConfig?.pingduoduo_act_switch === true &&
              <SidebarTabs onClick={openSideTurn} link="/turnlateSide" icon={staConfig?.stationCode === "bx101" ? "sidebarImages/pddv2.png" : "sidebarImages/pdd.png"}>
                {" "}
                {staConfig.stationCode == "bx101" ? t("ts1295", { ns: "ts" }) : t("ts1214", { ns: "ts" })}
              </SidebarTabs>
            }
            {staConfig?.isSignIn === true && staConfig?.stationCode === "bx101" &&
              <SidebarTabs onClick={openSideCalendar} link="/calendarSide" icon="sidebarImages/calendarv2.png">
                {" "}
                {t("ts1296", { ns: "ts" })}
              </SidebarTabs>
            }
            <SidebarTabs link="/event" icon="sidebarImages/event.png">
              {t("ts452", { ns: "ts" })}
            </SidebarTabs>
            <SidebarTabs link="/event-mission" icon={staConfig.stationCode == "bx101" ? "sidebarImages/101miss.png" : "sidebarImages/calendar.png"}>
              {t("ts453", { ns: "ts" })}
            </SidebarTabs>
            <SidebarTabs link="/rebate-fishing" icon="sidebarImages/rebate.png">
              {" "}
              {t("ts454", { ns: "ts" })}
            </SidebarTabs>
            <SidebarTabs link="/pending" icon="sidebarImages/gift.png">
              {" "}
              {t("ts455", { ns: "ts" })}
            </SidebarTabs>
            <SidebarTabs link="/record-collection" icon="sidebarImages/present.png">
              {" "}
              {t("ts456", { ns: "ts" })}
            </SidebarTabs>
            {staConfig.onOffCoupon && <SidebarTabs link="/redeem" icon="sidebarImages/redeemBG.png">
              {" "}
              {t("ts1283", { ns: "ts" })}
            </SidebarTabs>}
            {staConfig.sidebar_rescue_onoff && <SidebarTabs link="/rescue" icon="sidebarImages/rescueFund.png">
              {" "}
              {staConfig.stationCode == "bx101" ? t("ts1297", { ns: "ts" }) : t("ts1288", { ns: "ts" })}
            </SidebarTabs>}
            {staConfig?.onOffMoneyIncome === true &&
              <SidebarTabs link="/balance-bonus" icon="sidebarImages/bank.png">
                {" "}
                {t("ts984", { ns: "ts" })}
              </SidebarTabs>
            }
            {userConfig?.isGiftWalletShow === true && userConfig?.onOffGiftWallet === true && userDetauils?.isLogin === true &&
              <SidebarTabs link="/recharge" icon="sidebarImages/cj.png">
                {" "}
                {t("ts706", { ns: "ts" })}
              </SidebarTabs>
            }
            <SidebarTabs link="/vip" icon="sidebarImages/king.png">
              {" "}
              VIP
            </SidebarTabs>

            {staConfig?.stationCode !== "yd103" &&
            <SidebarTabs link="/PromotionPage" onClick={() => ValidateLogin("/vip")} icon="sidebarImages/convide.png">
              {" "}
              {t("ts274", { ns: "ts" })}
            </SidebarTabs>
            }
          </div>
          <div className="sidebarFooterContainer">  
            {(staConfig.showEnglishLan == true || staConfig.showChineseLan == true) && <LanguagePicker></LanguagePicker>}
            {staConfig.sidebar_switch_theme === true && staConfig.stationCode === "t300" && <ColorPicker />}
            <SideLinks link="/download-page" icon={<img style={{ filter: iconColor.color }} height={25} src="/images/down.png" alt=""></img>} label={t("ts156", { ns: "ts" })}></SideLinks>
            {staConfig.stationCode !== "bx105" ? <SideLinks link="/support" icon={<img alt="" style={{ filter: iconColor.color }} height={25} src="/images/call.png"></img>} label={t("ts157", { ns: "ts" })}></SideLinks> : <SupportLink link="/support" icon={<img alt="" style={{ filter: iconColor.color }} height={25} src="/images/call.png"></img>} label={t("ts157", { ns: "ts" })}></SupportLink>}
            <SideLinks link="/faq" icon={<img alt="" style={{ filter: iconColor.color }} height={25} src="/images/wenhao.png"></img>} label={t("ts158", { ns: "ts" })}></SideLinks>
            {/* <SideLinks link="/activeEvent" icon={<CardGiftcardIcon className="itemIcon"></CardGiftcardIcon>} label={t("ts573", { ns: "ts" })}></SideLinks> */}
          </div>
        </div>
      </div>
    </>
  );
}
export default Sidebar;
