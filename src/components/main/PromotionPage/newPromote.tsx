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
                    <span style={{ color: color.text4, textIndent: ".25rem" }}>{t("ts1234", { ns: "ts" })}</span>
                    <span style={{ color: color.text4 }}>{t("ts1235", { ns: "ts" })}</span>
                    <span style={{ color: color.text4 }}>{t("ts1236", { ns: "ts" })}</span>
                    <span style={{ color: color.text4 }}>{t("ts1237", { ns: "ts" })}</span>
                    <span style={{ color: color.text4 }}>{t("ts1238", { ns: "ts" })}</span>

                    <span style={{ color: color.forGround }}>{t("ts1239", { ns: "ts" })}</span>
                    <span style={{ color: color.forGround }}>{t("ts1240", { ns: "ts" })}</span>
                    <span style={{ color: color.forGround }}>{t("ts1241", { ns: "ts" })}</span>
                    <span>↓↓↓↓↓↓↓</span>
                    <span style={{ color: color.text4 }}>{t("ts1242", { ns: "ts" })}<span style={{ color: color.forGround }}>（{config?.moneyUnit}1000*0.006）= {config?.moneyUnit}6</span></span>
                    <span style={{ color: color.text4 }}>{t("ts1243", { ns: "ts" })}<span style={{ color: color.forGround }}>（{config?.moneyUnit}2000*0.003）= {config?.moneyUnit}6</span></span>
                    <span style={{ color: color.text4 }}>{t("ts1244", { ns: "ts" })}<span style={{ color: color.forGround }}>（{config?.moneyUnit}10000*0.001）= {config?.moneyUnit}10</span></span>
                    <span style={{ color: color.text4 }}>{t("ts1245", { ns: "ts" })}</span>
                    <span>______________________________________________________________________________</span>
                    <span style={{ color: color.text4 }}>{t("ts1246", { ns: "ts" })}<span style={{ color: color.forGround }}>（{config?.moneyUnit}0*0.006）= {config?.moneyUnit}0</span></span>
                    <span style={{ color: color.text4 }}>{t("ts1247", { ns: "ts" })}<span style={{ color: color.forGround }}>（{config?.moneyUnit}8000*0.003）= {config?.moneyUnit}24</span></span>
                    <span style={{ color: color.text4 }}>{t("ts1248", { ns: "ts" })}<span style={{ color: color.forGround }}>（{config?.moneyUnit}3000*0.001）= {config?.moneyUnit}3</span></span>
                </div>
                <div className="imageContainer">
                    <img src="/images/yd102v2.png" className="imagePromo" alt="" />
                </div>
            </div>
        </>
    );
}
