import { useTranslation } from "react-i18next";
import { ChangeColorPallte } from "../../globalFunctions/globalContext";
import { useGlobalList } from "../../globalFunctions/store";

export default function Instruction() {
    const { t, i18n } = useTranslation(["home", "main"]);
    const color = useGlobalList(state => state.color)
    return (
        <div className="instructionMainContainer" style={{ backgroundColor: color.backGorund }}>
            <div className="titleContainer">
                <div className="titleLabel">
                    <label style={{ color: color.text4 }}>{t("ts693", { ns: "ts" })}</label>
                </div>
            </div>
            <div style={{ borderColor: color.forGround }} className='divLine' />
            <div className="instructionContainer">
                <div style={{ color: color.text }}>1. {t("ts685", { ns: "ts" })} </div>
                <div style={{ color: color.text }}>2. {t("ts686", { ns: "ts" })} </div>
                <div style={{ color: color.text }}>3. {t("ts687", { ns: "ts" })} </div>
                <div style={{ color: color.text }}>4. {t("ts688", { ns: "ts" })} </div>
                <div style={{ color: color.text }}>5. {t("ts689", { ns: "ts" })} </div>
                <div style={{ color: color.text }}>6. {t("ts690", { ns: "ts" })} </div>
                <div style={{ color: color.text }}>7. {t("ts691", { ns: "ts" })} </div>
                <div style={{ color: color.text }}>8. {t("ts692", { ns: "ts" })} </div>
            </div>
        </div>
    )
}