import Navbar from "./navbar/navbar";
import Sidebar from "./sidebar/sidebar";
import Footer from "./footer/footer";
import "./mainLayout.css";
import { useEffect, useRef, useState } from "react";
import GiftModal from "../main/giftPage/gift";
import { ChangeColorPallte } from "../globalFunctions/globalContext";
import EnvelopModal from "../main/redEnvelope/redEnvelper";
import "../../index.css";
import CustomizedDialogs from "./navbar/loginModal";
import RegModal from "./navbar/registrationModal";
import "swiper/less/pagination";
import {
  useDiscount,
  useGetConfig,
  useGetGames,
  useGetNotice,
  useGetTurnlateData,
  useGetTurnlateList,
  useGetUserInfo,
  useLogout,
  useStationConfig,
} from "../hooks/getUserInfoHook";
import {
  useGlobalList,
  useGlobalVariables,
  useLoginStore,
  useModalStates,
  useSetEnvelopValue,
  userRegstore,
} from "../globalFunctions/store";
import { ToastContainer } from "react-toastify";
import { Link, useLocation, useNavigate } from "react-router-dom";
import SubmitModal from "../main/common/modal/submit-modal/submit-modal";
import DepositHisotry from "../main/userCenter/depositHistory";
import { useTranslation } from "react-i18next";
import GiftOpen from "../main/giftPage/openGift";
import USDTModal from "../main/userCenter/widthrawalPage/withdrawMoney/components/bankCardManager/components/usdtModal";
import USDTQRModal from "../main/userCenter/widthrawalPage/withdrawMoney/components/bankCardManager/components/usdtQRModal";
import GeetestCaptcha from "../globalFunctions/captcha";
import { activeUser } from "../hooks/actions";
import {
  EffectCoverflow,
  Pagination,
  Navigation,
  Autoplay,
} from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import PngkAlert from "./common/alertModal";
import Cookies from "universal-cookie";
import { EventDetailsGet } from "../globalFunctions/eventContext";
import { LiveChatWidget, EventHandlerPayload } from "@livechat/widget-react";
import { useCurnew, useGetSigninRules } from "../hooks/curstomHooks";
import RegisterSuccess from "./navbar/components/registerSuccess";
import MessagesCount from "../main/fab/messages";
import HomeTurnTable from "../main/turnlate/turnTableModal";
import CssFilterConverter from "css-filter-converter";
import MissionModal from "./sidebar/mission";
import { useCollorePallete } from "./styles";
import DialogueModal from "../Dialogue";
// import ModalDialog from "../main/common/components/modalDialog";

function MainLayout(props: any) {
  useCollorePallete()
  useGetGames()
  const { t, i18n } = useTranslation(["home", "main"]);
  const color = useGlobalList(state => state.color)
  const userInfoHook = useGetUserInfo();
  const userInfo = useGlobalVariables((state) => state.userDetails);
  const userCon = useGlobalVariables((state) => state.stationConfig);
  const signInrecords = useGetSigninRules()
  const location = useLocation();
  const logOut = useLogout()
  const bgColor = color;
  const topReff = useRef<any>();
  const scrollToBottom = () => {
    topReff.current.scrollIntoView();
  };
  const [navBar, setNavBar] = useState(true);
  const [openEnvelope, setOpenEnvelope] = useState(false);
  const [openLog, setOpenReg] = useState(false);
  const scrollableDivRef = useRef<HTMLDivElement>(null);
  const [showScrollIcon, setShowScrollIcon] = useState<boolean>(false);
  const iconFilter: any = CssFilterConverter.hexToFilter(bgColor.forGround);
  const Notice = useGetNotice();
  const navigate = useNavigate();
  let logoutTimer: any
  const turnlateDatas = useGetTurnlateData();
  const openGift = useModalStates(state => state.calendarModal)
  const handleScrollGoTop = () => {
    const div = scrollableDivRef.current as HTMLDivElement;
    if (!div) return;

    const scrollPosition = div.scrollTop;
    const scrollHeight = div.scrollHeight;
    const divHeight = div.clientHeight;
    const middleBOt = scrollHeight * .2;

    setShowScrollIcon(
      scrollPosition === 0 ? false :
        scrollPosition + divHeight >= middleBOt ? true :
          false
    );

  };
  const openGiftModal = () => {
    useModalStates.setState({ calendarModal: true })
  };
  const closeGiftModal = () => {
    useModalStates.setState({ calendarModal: false })
  };

  const captchaConfig: any = {
    config: {
      captchaId: "820dc52f359cddcc6cf7252018321bbc",
      language: "zho-hk",
      product: "bind",
    }

  }
  function sidNavClose() {
    setNavBar(!navBar);
  }
  function setCloseEnvelopestats() {
    setOpenEnvelope(false);
  }
  const handleopenLogin = () => {
    setOpenReg(!openLog);
  };
  const handleReegisterModal = () => {
    useLoginStore.setState({ isOpen: false });
    userRegstore.setState({ isOpenRegister: true });
  };
  const [openTurn, setOpenTurn] = useState(false);
  const handleClose = () => {
    setOpenTurn(false);
  };
  const handleOpenTurn = () => {
    setOpenTurn(true);
  };
  const redEnv = useCurnew();
  const turnlateList = useGetTurnlateList()
  const validayLogon = (link: any) => {
    if (userInfo?.isLogin == false) {
      userRegstore.setState({ isOpenRegister: true })
    } else {
      if (link == "chatroom") {
        window.open("/api/chatroom/goChat.do?isPc=true", "_blank");
      } else if (link == "handleOpenTurn") {
        turnlateDatas.refetch()
        turnlateList.refetch()
        navigate("/turn-table")
      } else if (link == "home") {
        navigate("/home")
      } else if (link == "envelop") {
        redEnv.refetch();
        if (redEnv.data?.content?.code === 200 && redEnv.data?.content?.ruleUrl) {
          useModalStates.setState({ ruleModal: true });
        } else if (redEnv.data) {
          useSetEnvelopValue.setState({ envelopeValue: true });
        }

      } else if (link == "calendar") {
        openGiftModal()
      } else if (link == "telegram") {
        window.open(userCon.telegram_url)
      } else {
        link();
      }
    }
  };
  useEffect(() => {
    userInfoHook.refetch();
    if (location.pathname == "/register") {
      handleReegisterModal();
    }
  }, []);

  const usdtModal = useModalStates((state) => state.usdtCardModal);
  const closeUSDT = () => {
    useModalStates.setState({ usdtCardModal: false });
  };

  const usdtModalQR = useModalStates((state) => state.qrModal);
  const closeUSDTQR = () => {
    useModalStates.setState({ qrModal: false });
  };

  const locations = useLocation()

  useEffect(() => {
    Notice.refetch();

  }, []);

  const eventBull = useModalStates(state => state.eventBull)
  const eventEnve = useModalStates(state => state.eventEnvelop)
  const eventTurn = useModalStates(state => state.eventTurnTable)
  const eventTele = useModalStates(state => state.eventTelegram)
  const eventTeleSup = useModalStates(state => state.eventTelegramSup)
  const eventTeleSupV2 = useModalStates(state => state.eventTelegramSupV2)
  const [timer, setTimer] = useState(6000)
  const closeEvent = (event: any) => {
    if (event == "bull") {
      useModalStates.setState({ eventBull: true })
    }
    if (event == "envelop") {
      useModalStates.setState({ eventEnvelop: true })
    }
    if (event == "turntable") {
      useModalStates.setState({ eventTurnTable: true })
    }
    if (event == "telegram") {
      useModalStates.setState({ eventTelegram: true })
    }
    if (event == "telegram_support") {
      useModalStates.setState({ eventTelegramSup: true })
    }
    if (event == "telegram_supportv2") {
      useModalStates.setState({ eventTelegramSupV2: true })
    }
  }

  const tabCode = useGlobalList(state => state.sideAction);

  const cookies = new Cookies();
  var id = cookies.get('eventID')
  const eventDet = EventDetailsGet()

  function getEventDetails(value: any) {
    eventDet(value)
    cookies.set('eventID', value);
    navigate('/event-details')
  }

  useEffect(() => {
    activeUser()

  }, [])

  function handleNewEvent(event: EventHandlerPayload<"onNewEvent">) {

  }

  function liveChat() {
    if (userCon?.kfUrl && userCon?.kfUrl.includes("window.__lc")) {
      return (
        <LiveChatWidget
          license="17302668"
          visibility="minimized"
          onNewEvent={handleNewEvent}
        />
      )
    } else if (userCon?.kfUrl && userCon?.kfUrl.includes("/Chat/Chat?")) {
      return (<div className="imageBoxIndexMain"><img onClick={() => window.open(userCon.kfUrl)} style={{ width: ".7rem", height: ".7rem", cursor: "pointer", marginTop: ".2rem" }} src="/images/liveChat.png" alt="." /></div>)
    }
  }

  const turnLateModalState = useGlobalVariables(state => state.turnLateModal)
  const turnlateData = useGlobalVariables(state => state.turnlateType5)
  const sideTurn = useModalStates(state => state.sideTurn)

  const today = new Date()
  const perDay = useGlobalVariables(state => state.turnOncePerDay)
  function idleTimer() {
    if (userInfo.isLogin == true) {
      clearTimeout(logoutTimer)
      logoutTimer = setTimeout(() => {
        logOut.mutate()
        clearTimeout(logoutTimer)
      }, 7000)
    }
  }


  useEffect(() => {
    if (turnlateData?.pddStrategy?.popType === 3) {
      if (today.getHours() === 24) {
        useGlobalVariables.setState({ turnOncePerDay: true })
      } else if (today.getHours() !== 24) {
        useGlobalVariables.setState({ turnOncePerDay: false })
      }
    }


  }, [])


  const turnModalLog = useModalStates(state => state.turnModalLogin)
  const islogModal = localStorage.getItem("isModalLog")

  return (
    <div >
      {/* <ModalDialog /> */}
      <DialogueModal close={() => useModalStates.setState({ ruleModal: false })} openModal={useModalStates(state => state.ruleModal)} title="">
        <div className="">
          <img src={redEnv.data?.content?.ruleUrl} alt="" className="" />
        </div>
      </DialogueModal>
      <RegisterSuccess />
      <ToastContainer />
      <USDTModal openUSDT={usdtModal} closeUSDT={closeUSDT} />
      <USDTQRModal openUSDTQR={usdtModalQR} closeUSDTQR={closeUSDTQR} />
      <CustomizedDialogs
        openTab={handleopenLogin}
        openReg={handleReegisterModal}
        tabState={openLog}
      />
      <RegModal />
      <div className="mainLayout">
        <Navbar setside={sidNavClose} sidebarActive={navBar}></Navbar>
        <div className="mainContent">
          <Sidebar changeTabAction={props.changeTab} sidebarActive={navBar} />
          {/* <SidebarIcons /> */}
          <div
            className="centerContent"
            style={{
              backgroundImage: "url(" + bgColor.bgImage + ")",
              backgroundColor: bgColor.third,
              overflowY: "scroll",
            }}
            ref={scrollableDivRef}
            onScroll={handleScrollGoTop}
          >
            <div className="contentContainer" ref={topReff}>
              {/* <Box
                sx={{
                  position: "absolute",
                  pointerEvents: "none",
                }}
              >
                <img src="./footerImage/haloo1.png" alt="" />
              </Box>

              <Box
                sx={{
                  position: "absolute",
                  right: "0",
                  pointerEvents: "none",
                }}
              >
                <img src="./footerImage/haloo2.png" alt="" />
              </Box> */}
              {props.children}
              <div className="circleContainer">
                {/* <NewFab /> */}
                {locations?.pathname === "/home" || locations?.pathname === "/" || locations?.pathname === "/" + tabCode || locations?.pathname === "/recent" || locations?.pathname === "/game" ?
                  <>
                    {userCon?.stationCode === "yd103" && eventTeleSupV2 == false &&
                      <a href="https://t.me/Aibetazz365" target="_blank">
                        <div className="imageBoxIndexMain">
                          <div className="teleText">
                            <div>
                              <img style={{ width: "1.2rem", cursor: "pointer" }} className="rounded-full" src="/images/tele_support.png" alt="." />
                              <div>
                                <span>100% Win Rate Channel</span>
                              </div>
                            </div>
                          </div>
                          <CancelOutlinedIcon sx={{
                            width: ".25rem",
                            color: "#68707B"
                          }} className="closeIcon" onClick={() => closeEvent("telegram_supportv2")} />
                        </div>
                      </a>}
                    {userCon?.stationCode === "yd103" && eventTeleSup == false &&
                      <a href={userCon.telegram_url} target="_blank">
                        <div className="imageBoxIndexMain">
                          <div className="teleText">
                            <div>
                              <img style={{ width: "1.2rem", cursor: "pointer" }} src="/images/telegram.gif" alt="." />
                              {/* <div>
                                <span>{userCon?.sidebarName ? userCon?.sidebarName : userCon?.sidebarLinkTg}</span>
                              </div> */}
                            </div>
                          </div>
                          <CancelOutlinedIcon sx={{
                            width: ".25rem",
                            color: "#68707B"
                          }} className="closeIcon" onClick={() => closeEvent("telegram_support")} />
                        </div>
                      </a>}
                    {eventTele == false && userCon?.stationCode !== "yd101" && userCon?.stationCode !== "bx106" &&

                      <Link to={userCon?.stationCode === "yd103" ? userCon.kfUrl : userCon.telegram_url} target="_blank">
                        <div className="imageBoxIndexMain">
                          <div className="teleText">
                            <div>
                              {userCon?.stationCode === "yd103" ? <img style={{ width: ".9rem", cursor: "pointer" }} src={userCon?.sidebarAddr ? userCon?.sidebarAddr : "/supportImages/supportProfile.png"} alt="." /> : <img style={{ width: "1.2rem", cursor: "pointer" }} src={userCon?.sidebarAddr ? userCon?.sidebarAddr : "/images/telegram.gif"} alt="." />}
                              <div>
                                <span>{userCon?.sidebarName ? userCon?.sidebarName : userCon?.sidebarLinkTg}</span>
                              </div>
                            </div>
                          </div>
                          <CancelOutlinedIcon sx={{
                            width: ".25rem",
                            color: "#68707B"
                          }} className="closeIcon" onClick={() => closeEvent("telegram")} />
                        </div>
                      </Link>
                    }
                    {userCon?.isEnableChatRoom === true &&
                      <div className="imageBoxIndexMain" style={{ cursor: "pointer" }} onClick={() => validayLogon("chatroom")}>
                        <MessagesCount />
                      </div>
                    }
                    {(userCon.isRedBag === true || userCon.isTurnlate === true || userCon.isSignIn === true)

                      &&
                      <div className="swiperNoSwipingX2">
                        {eventEnve == false || eventBull == false || eventTurn == false ?
                          <Swiper
                            style={{ padding: "0 !important", width: "1.38rem", height: "1.38rem" }}
                            effect="coverflow"
                            grabCursor={true}
                            centeredSlides={true}
                            slidesPerView={"auto"}
                            coverflowEffect={{
                              rotate: 0,
                              stretch: 0,
                              depth: 100,
                              modifier: 1,
                              slideShadows: false,
                            }}
                            spaceBetween={0}
                            pagination={false}
                            autoplay={{
                              delay: 3000,
                              disableOnInteraction: false,
                            }}
                            navigation={true}
                            loop={true}
                            modules={[EffectCoverflow, Pagination, Navigation, Autoplay]}
                            className="mySwiper"
                          >
                            {userCon.isRedBag === true && eventEnve == false &&
                              <SwiperSlide>
                                <div className="imageBoxIndexMain">
                                  <img onClick={() => validayLogon("envelop")} className="eventImageIndexMain" style={{ width: "1.2rem", height: "1.2rem", cursor: "pointer" }} src="/turnlateImages/envelop.gif" alt="." />
                                  <CancelOutlinedIcon sx={{
                                    width: ".25rem",
                                    color: "#68707B"
                                  }} className="closeIcon" onClick={() => closeEvent("envelop")} />
                                </div>
                              </SwiperSlide>}
                            {eventBull == false && (userCon?.stationCode !== "yd102" || userCon?.stationCode !== "yd103") &&
                              <SwiperSlide>
                                <div className="imageBoxIndexMain">
                                  <img onClick={() => getEventDetails(149)} style={{ width: "1.2rem", height: "1.2rem", cursor: "pointer" }} src="/turnlateImages/bull.gif" alt="." />
                                  <CancelOutlinedIcon sx={{
                                    width: ".25rem",
                                    color: "#68707B"
                                  }} className="closeIcon" onClick={() => closeEvent("bull")} />
                                </div>
                              </SwiperSlide>}
                            {userCon.isTurnlate === true && eventTurn == false &&
                              <SwiperSlide>
                                <div className="imageBoxIndexMain">
                                  <img onClick={() => validayLogon("handleOpenTurn")} style={{ width: "1.2rem", height: "1.2rem", cursor: "pointer" }} src="/turnlateImages/activeTurnTable.gif" alt="." />
                                  <CancelOutlinedIcon sx={{
                                    width: ".25rem",
                                    color: "#68707B"
                                  }} className="closeIcon" onClick={() => closeEvent("turntable")} />
                                </div>
                              </SwiperSlide>}
                            {userCon.isSignIn === true && <SwiperSlide>
                              <div className="imageBoxIndexMain">
                                <img onClick={() => validayLogon("calendar")} style={{ width: "1.2rem", height: "1.2rem", cursor: "pointer" }} src="/images/calendarGift.png" alt="." />
                                <CancelOutlinedIcon sx={{
                                  width: ".25rem",
                                  color: "#68707B"
                                }} className="closeIcon" />
                              </div>
                            </SwiperSlide>}
                          </Swiper> : ""}
                        {/* {liveChat()} */}
                      </div>
                    }
                  </> : ""
                }
                {showScrollIcon && (<div className="scrolltoTop" style={{ backgroundColor: bgColor.backGorund, borderColor: bgColor.forGround }} onClick={scrollToBottom}>
                  <img width={"40rem"} src="/scrollImages/rokets.png" style={{ filter: iconFilter.color }} alt="" />
                  <small style={{ fontSize: ".15rem", color: bgColor.text }}>
                    Topo
                  </small>
                </div>
                )}
              </div>
            </div>
            <Footer scrollToBottoms={props.changeTab}></Footer>
          </div>
        </div>
      </div >
      {signInrecords.isLoading == false && signInrecords?.data?.content && <GiftModal open={openGift} close={closeGiftModal} />}
      {userCon.isRedBag === true && <EnvelopModal
        openEnvelope={openEnvelope}
        setOpenEnvelope={setCloseEnvelopestats}
      />
      }
      {/* Do not delete this, need this later haha might bring back */}
      {/* <MissionModal /> */}
      <SubmitModal
        hasCancel={false}
        hasSubmit={false}
        submitTitle={t("ts105", { ns: "ts" })}
        openSubModal={false}
      >

        <DepositHisotry hidden></DepositHisotry>
      </SubmitModal>
      <GeetestCaptcha captchaconfig={captchaConfig} />
      <GiftOpen></GiftOpen>
      <PngkAlert />
      {
        (
          (turnLateModalState && userCon.pingduoduo_act_switch === true && locations?.pathname !== "/" + tabCode && locations?.pathname !== "/" && locations?.pathname !== "/home") ||
          (turnLateModalState && userCon.pingduoduo_act_switch === true && userCon.pingduoduo_act_switch === true && (locations?.pathname === "/" || locations?.pathname === "/home") &&
            (sideTurn === true && turnlateData?.pddStrategy?.popType === 1) || (turnlateData?.pddStrategy?.popType === 3 && perDay === false) || (sideTurn === true && turnlateData?.pddStrategy?.popType === 5 && turnModalLog !== false && islogModal !== "true")
          )
        )
        && <HomeTurnTable />
      }
    </div>
  );
}
export default MainLayout;

// https://live.winbet.center/Chat/Chat?lang=pt&userID=&userName=
// window.__lc = window.__lc || {}; window.__lc.license = 17302668; (function (n, t, c) {   function i(n) {     return e._h ? e._h.apply(null, n) : e._q.push(n);   }   var e = {     _q: [],     _h: null,     _v: '2.0',     on: function () {       i(['on', c.call(arguments)]);     },     once: function () {       i(['once', c.call(arguments)]);     },     off: function () {       i(['off', c.call(arguments)]);     },     get: function () {       if (!e._h)         throw new Error("[LiveChatWidget] You can't use getters before load.");       return i(['get', c.call(arguments)]);     },     call: function () {       i(['call', c.call(arguments)]);     },     init: function () {       var n = t.createElement('script');       (n.async = !0),         (n.type = 'text/javascript'),         (n.src = 'https://cdn.livechatinc.com/tracking.js'),         t.head.appendChild(n);     },   };   !n.__lc.asyncInit && e.init(), (n.LiveChatWidget = n.LiveChatWidget || e); })(window, document, [].slice);
