import { useTranslation } from "react-i18next";
import { ChangeColorPallte } from "../../globalFunctions/globalContext";
import '../PromotionPage/promoContainer.css'
import { useGlobalList, useGlobalVariables } from "../../globalFunctions/store";


export default function PromoteYN108() {
    const { t, i18n } = useTranslation(["home", "main"]);
    const color = useGlobalList(state => state.color)
    const config = useGlobalVariables(state => state.stationConfig)

    return (
        <>
            <div className="newPromoContainer" style={{ backgroundColor: color.backGorund }}>
                <div className="textContainer" style={{ borderColor: color.fourth }}>
                    <span style={{ color: color.text4 }}>{t("ts1270", { ns: "ts" })}</span>
                    <span style={{ color: color.text4 }}>{t("ts1271", { ns: "ts" })}</span>
                    <br />
                    <span style={{ color: color.text4 }}>{t("ts1272", { ns: "ts" })}</span>
                    <span style={{ color: color.text4 }}>{t("ts01273", { ns: "ts" })}</span>
                    <span style={{ color: color.text4 }}>{t("ts01274", { ns: "ts" })}</span>
                    <br />
                    <span style={{ color: color.text4 }}>{t("ts1275", { ns: "ts" })}</span>
                    <span style={{ color: color.text4 }}>{t("ts1276", { ns: "ts" })}</span>
                    <span>↓↓↓↓↓↓↓</span>
                    <span style={{ color: color.text4 }}>{t("ts1277", { ns: "ts" })}<span style={{ color: color.text4 }}>（{config?.moneyUnit}100,000*0.002）= {config?.moneyUnit}200</span></span>
                    <span style={{ color: color.text4 }}>{t("ts1278", { ns: "ts" })}<span style={{ color: color.text4 }}>（{config?.moneyUnit}50,000*0.002）= {config?.moneyUnit}100</span></span>
                    <span style={{ color: color.text4 }}>{t("ts1279", { ns: "ts" })}<span style={{ color: color.text4 }}>（{config?.moneyUnit}130,000*0.002）= {config?.moneyUnit}260</span></span>
                    <span style={{ color: color.text4 }}>{t("ts1280", { ns: "ts" })}<span style={{ color: color.text4 }}>（{config?.moneyUnit}10,000*0.002）= {config?.moneyUnit}20</span></span>
                </div>
                <div className="imageContainer">
                    <img src="/images/agentPromote.png" className="imagePromo" alt="" />
                </div>
            </div>
        </>
    );
}
