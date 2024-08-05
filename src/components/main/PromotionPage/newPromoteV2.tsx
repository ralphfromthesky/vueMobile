import { useTranslation } from "react-i18next";
import { ChangeColorPallte } from "../../globalFunctions/globalContext";
import './promoContainer.css'
import { useGlobalList, useGlobalVariables } from "../../globalFunctions/store";


export default function NewPromote() {
    const { t, i18n } = useTranslation(["home", "main"]);
    const color = useGlobalList(state => state.color)
    const config = useGlobalVariables(state => state.stationConfig)

    return (
        <>
            <div className="newPromoContainer" style={{ backgroundColor: color.backGorund }}>
                <div className="textContainer" style={{ borderColor: color.fourth }}>
                    <span style={{ color: color.text4 }}>{t("ts1261", { ns: "ts" })}</span>
                    <span style={{ color: color.text4 }}>{t("ts1262", { ns: "ts" })}</span>
                    <br />
                    <span style={{ color: color.text4 }}>{t("ts1263", { ns: "ts" })}</span>
                    <span style={{ color: color.text4 }}>{t("ts1264", { ns: "ts" })}</span>
                    <span style={{ color: color.text4 }}>{t("ts1265", { ns: "ts" })}</span>
                    <br />
                    <span style={{ color: color.text4 }}>{t("ts1266", { ns: "ts" })}</span>
                    <span style={{ color: color.text4 }}>{t("ts1267", { ns: "ts" })} <span>{t("ts1268", { ns: "ts" })}</span></span>
                    <span style={{ color: color.text4 }}>{t("ts1269", { ns: "ts" })}</span>
                   
                </div>
                <div className="imageContainer">
                    <img src="/images/bx101_promov2.png" className="imagePromo" alt="" />
                </div>
            </div>
        </>
    );
}
