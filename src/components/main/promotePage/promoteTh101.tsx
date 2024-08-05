import { useTranslation } from "react-i18next";
import { ChangeColorPallte } from "../../globalFunctions/globalContext";
import '../PromotionPage/promoContainer.css'
import { useGlobalList, useGlobalVariables } from "../../globalFunctions/store";


export default function PromoteTH101() {
    const { t, i18n } = useTranslation(["home", "main"]);
    const color = useGlobalList(state => state.color)
    const config = useGlobalVariables(state => state.stationConfig)
    const proxy = useGlobalVariables.getState().proxyData

    return (
        <>
            <div className="newPromoContainer" style={{ backgroundColor: color.backGorund }}>
            <div className="imageContainer">
                    <img src="/images/agentTH101.png" className="imagePromo" alt="" />
                </div>
                <div className="textContainer" style={{ borderColor: color.fourth }}>
                  <div dangerouslySetInnerHTML={{ __html: proxy[0]?.content }}/>
                </div>
                
            </div>
        </>
    );
}
