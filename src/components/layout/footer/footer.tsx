import "./footer.css";
import {
  ChangeColorPallte,
  UserUSerConfig2,
} from "../../globalFunctions/globalContext";
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { useState } from "react";
import MissionModal from "../sidebar/mission";
import { Box } from "@mui/material";
import { useGetGames } from "../../hooks/getUserInfoHook";
import {
  OpenModalLoginS,
  SetActiveSidebarFn,
  SetActiveTab,
} from "../../globalFunctions/loginContext";
import { useGlobalList, useGlobalVariables, useLoginStore, useRebateType, userRegstore } from "../../globalFunctions/store";
import { ColorChanger } from "../../functions/navbarFunctions";

function Footer(props: any) {
  const games = useGetGames();
  const { t, i18n } = useTranslation(["home", "main"]);
  const backgroundColor = useGlobalList(state => state.color);
  const userConfig = useGlobalVariables((state) => state.stationConfig);
  const gameCollections = useGlobalVariables((state) => state.gameTabs);
  const setActobeIndex = SetActiveSidebarFn();
  const sideAction = SetActiveTab();
  const userInfo = useGlobalVariables((state) => state.userDetails);
  const navigate = useNavigate();
  const loginButton = OpenModalLoginS();
  const [mission, setMission] = useState<any[]>([]);
  const validayLogon = (link: any) => {
    if (userInfo?.isLogin == false && (link == "/record-collection" || link == "/vip" || link == "/pending")) {
      userRegstore.setState({ isOpenRegister: true })
    }
    else {
      if (link === "missionModal") {
        getMissionDetails()
      } else if (link === "feedback") {
        useGlobalVariables.setState({ supportTabindex: 4 })
        navigate("/support")
      } else {
        useRebateType.setState({ type: 1 })
        navigate(link)
      }
    }
  };
  async function getMissionDetails() {
    try {
      const response = await axios.get("/getTaskCenterList.do");
      setMission(response.data);
    } catch (e) { }
  }
  const gameClick = (index: any, tabCode: any) => {
    useGlobalList.setState({ sideAction: tabCode });
    useGlobalList.setState({ sideTabActive: index });
  };

  const support = (link: any) => {
    if (link == "support") {
      useGlobalVariables.setState({ supportTabindex: 0 })
      navigate("/support")
    }
  }

  return (
    <>
      <Box sx={userConfig.stationCode === "yd102" ? {
        ".itemOne": {
          color: backgroundColor.text4 + "!important",
        }
      } : {
        ".itemOne": {
          color: backgroundColor.id === 21 ? backgroundColor.text2 + "!important" : ColorChanger(backgroundColor.id),
          "&:hover": {
            color: backgroundColor.id === 21 ? backgroundColor.text2 + "!important" : ColorChanger(backgroundColor.id)
          }
        }
      }}
      >
        <div
          className="footer"
          style={userConfig.stationCode === "yd102" ? { backgroundColor: backgroundColor.backGorund } : { backgroundColor: backgroundColor.id === 20 ? backgroundColor.backGorund : backgroundColor.second }}
        >
          <div className="footer-box">
            <div className="footer-container flex">

              {userConfig.stationCode !== "bx110" &&
                <>
                  <div className="footer-link" style={{ lineHeight: "2.1" }}>
                    <span
                      style={userConfig.stationCode === "yd102" ? { color: backgroundColor.text4, fontSize: 20 } : { color: backgroundColor.id === 21 ? backgroundColor.text2 : ColorChanger(backgroundColor.id), fontSize: 20 }}
                      className="header-p"
                    >
                      {t("ts676", { ns: "ts" })}
                    </span>
                    <div
                      style={{ color: ColorChanger(backgroundColor.id), textTransform: "capitalize" }}
                    >
                      <span className="itemOne" onClick={() => validayLogon("/event")}>{t("ts662", { ns: "ts" })}</span>
                    </div>
                    <div
                      style={{ color: backgroundColor.id === 21 ? backgroundColor.text2 : backgroundColor.text, textTransform: "capitalize" }}
                    >
                      <span className="itemOne" onClick={() => validayLogon("/event-mission")}>{t("ts684", { ns: "ts" })}</span>
                    </div>
                    <div
                      style={{ color: backgroundColor.id === 21 ? backgroundColor.text2 : backgroundColor.text, textTransform: "capitalize" }}
                    >
                      <span className="itemOne" onClick={() => validayLogon("/rebate-fishing")}>{t("ts663", { ns: "ts" })}</span>
                    </div>
                    {userConfig.onOffMoneyIncome === true &&
                      <div
                        style={{ color: backgroundColor.id === 21 ? backgroundColor.text2 : backgroundColor.text, textTransform: "capitalize" }}
                      >
                        <span className="itemOne" onClick={() => validayLogon("/balance-bonus")}>{t("ts984", { ns: "ts" })}</span>
                      </div>}
                    <div
                      style={{ color: backgroundColor.id === 21 ? backgroundColor.text2 : backgroundColor.text, textTransform: "capitalize" }}
                    >
                      <span className="itemOne" onClick={() => validayLogon("/vip")}>{t("ts665", { ns: "ts" })}</span>
                    </div>
                    <div
                      style={{ color: backgroundColor.id === 21 ? backgroundColor.text2 : backgroundColor.text, textTransform: "capitalize" }}
                    >
                      <span className="itemOne" onClick={() => validayLogon("/PromotionPage")}>{t("ts666", { ns: "ts" })}</span>
                    </div>
                  </div>
                  <div className="footer-link" style={{ lineHeight: "2.1" }}>
                    <span
                      style={userConfig.stationCode === "yd102" ? { color: backgroundColor.text4, fontSize: 20 } : { color: backgroundColor.id === 21 ? backgroundColor.text2 :ColorChanger(backgroundColor.id), fontSize: 20 }}
                      className="header-p"
                    >
                      {t("ts677", { ns: "ts" })}
                    </span>
                    <div className="gameContainer" >
                      {games.isLoading == false &&
                        gameCollections &&
                        gameCollections
                          .filter((entry: { games: any }) => entry.games.length !== 0)
                          .map(
                            ({ games, tab }: any, index: any) =>
                              games?.length != 0 && (
                                < Link to={"/" + tab.code}>
                                  <div className="labelContainer">
                                    <span
                                      data-info={"key_" + tab.id}
                                      key={tab.id}
                                      data-to-scrollspy-id={tab.code}
                                      className="itemOne"
                                      style={{
                                        color: backgroundColor.id === 21 ? backgroundColor.text2 : ColorChanger(backgroundColor.id),
                                        textTransform: "capitalize",
                                      }}
                                      onClick={() => gameClick(index, tab.code)}
                                    >
                                      {tab.name}
                                    </span>
                                  </div>
                                </Link>
                              )
                          )}
                    </div>
                  </div>

                  <div className="footer-link" style={{ lineHeight: "2.1" }}>
                    <span
                      style={userConfig.stationCode === "yd102" ? { color: backgroundColor.text4, fontSize: 20 } : { color: backgroundColor.id === 21 ? backgroundColor.text2 : ColorChanger(backgroundColor.id), fontSize: 20 }}
                      className="header-p"
                    >
                      {t("ts678", { ns: "ts" })}
                    </span>
                    <div onClick={() => support("support")}
                      style={{ color: backgroundColor.id === 21 ? backgroundColor.text2 : backgroundColor.text, textTransform: "capitalize" }}
                    >
                      <span className="itemOne">{t("ts461", { ns: "ts" })}</span>
                    </div>
                    <div onClick={() => support("support")}
                      style={{ color: backgroundColor.id === 21 ? backgroundColor.text2 : backgroundColor.text, textTransform: "capitalize" }}
                    >
                      <span className="itemOne">{t("ts674", { ns: "ts" })}</span>
                    </div>
                    {userConfig.onOffStationAdvice === true && <div
                      style={{ color: backgroundColor.id === 21 ? backgroundColor.text2 : backgroundColor.text, textTransform: "capitalize" }}
                      onClick={() => validayLogon("feedback")}
                    >
                      <span className="itemOne">{t("ts130", { ns: "ts" })}</span>
                    </div>}
                  </div>
                </>
              }
              <div className="footer-link" id="link-social">
                <div className="footer-social">
                  <Link to={userConfig?.telegram_url} target="_blank">
                    <img src="footerImage/11.png" alt="" />
                  </Link>
                  <Link to={userConfig?.facebook_url} target="_blank">
                    <img src="footerImage/10.png" alt="" />
                  </Link>
                  <Link to={userConfig?.instagram_url} target="_blank">
                    <img src="footerImage/12.png" alt="" />
                  </Link>
                  <Link to="">
                    <img src="footerImage/13.png" alt="" />
                  </Link>
                  <Link to={userConfig?.instagram_url} target="_blank">
                    <img src="footerImage/14.png" alt="" />
                  </Link>
                  <Link to="">
                    <img src="footerImage/15.png" alt="" />
                  </Link>
                  <Link to="">
                    <img src="footerImage/16.png" alt="" />
                  </Link>
                  <Link to="">
                    <img src="footerImage/17.png" alt="" />
                  </Link>
                  <Link to="">
                    <img src="footerImage/18.png" alt="" />
                  </Link>
                </div>
                <div className="footer-text" style={{ color: backgroundColor.id === 21 ? backgroundColor.text2 : backgroundColor.text }}>{userConfig?.stationIntroduce}</div>
              </div>
              {/* <Box>
            <img src="./footerImage/dance-girl.png" alt="" />
          </Box> */}
            </div>
            <div className="footer-container2" style={{ borderColor: backgroundColor.id === 20 ? backgroundColor.forGround : backgroundColor.third }}>
              <div className="footer-bottom-img">
                <img src="footerImage/1.png" alt="" />
                <img src="footerImage/2.png" alt="" />
                <img src="footerImage/7.png" alt="" />
                <img src="footerImage/8.png" alt="" />
                <img src="footerImage/3.png" alt="" />
                <img src="footerImage/4.png" alt="" />
                <img src="footerImage/5.png" alt="" />
                <img src="footerImage/6.png" alt="" />
                <img src="footerImage/9.png" alt="" />
              </div>
              <span style={userConfig.stationCode === "yd102" ? { color: backgroundColor.text4 } : { color: backgroundColor.id === 21 ? backgroundColor.text2 : backgroundColor.text }}>{userConfig.stationCode === "bx105" ? "sextoujogo.com" : userConfig.stationName} @{t("ts1216", { ns: "ts" })} {userConfig.stationCode === "bx105" ? "2015-2027" : "2018-2024"}</span>
            </div>
          </div>
        </div>
      </Box >
    </>
  );
}
export default Footer;
