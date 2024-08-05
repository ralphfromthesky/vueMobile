import { Avatar } from "@mui/material";
import { ChangeColorPallte } from "../../../globalFunctions/globalContext";
import { useGlobalList, useGlobalVariables, useLoginStore, userRegstore } from "../../../globalFunctions/store";
import ManageHistoryIcon from "@mui/icons-material/ManageHistory";
import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";
import CssFilterConverter from "css-filter-converter";
import { useCollorePallete } from "../../styles";
function MultiMediaContainer() {
  useCollorePallete()
  const color = useGlobalList(state => state.color)
  const colorP = color;
  const userInfo = useGlobalVariables(state => state.userDetails);
  const iconColor: any = CssFilterConverter.hexToFilter(colorP.text);
  const iconColor2: any = CssFilterConverter.hexToFilter(colorP.text4);
  const statConfig = useGlobalVariables(state => state.stationConfig)
  const navigate = useNavigate()
  const { t, i18n } = useTranslation(["home", "main"]);
  const validayLogon = (link: any) => {
    if (userInfo?.isLogin == false) {
      userRegstore.setState({ isOpenRegister: true })
    }
    else {
      navigate(link)
    }
  };
  const style = {
    backgroundColor: colorP.third,
    borderRadius: ".1rem",
    color: colorP.text,
    cursor: "pointer",
    fontSize: ".2rem",
    height: ".6rem",
    width: "100%",
    display: "flex",
    alignItems: "center",

  }
  return (
    <div className="multimediaContainer" style={style} onClick={() => validayLogon("/betting-history")}>
      <img src="/images/betHist.png" alt="" style={{
        marginLeft: ".26rem", filter: statConfig.stationCode === "yd102" ? iconColor2.color : iconColor.color
      }} />
      <label style={{ color: statConfig.stationCode === "yd102" ? colorP.text4 : colorP.text, fontSize: ".2rem", textAlign: "center", cursor: "pointer", marginLeft: ".1rem", }}>
        {t("ts004", { ns: "ts" })}
      </label>
    </div>
  )
}
export default MultiMediaContainer;