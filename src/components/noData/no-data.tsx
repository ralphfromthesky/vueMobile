import { useTranslation } from 'react-i18next';
import './no-data.css'
import { useGlobalList } from '../globalFunctions/store';
import CssFilterConverter from 'css-filter-converter';

export default function NoData(props: any) {
    const { t } = useTranslation(["home", "main"]);
    const colorP = useGlobalList(state => state.color);
    const iconColor: any = CssFilterConverter.hexToFilter(colorP.text4);

    return (
        <>
            <div style={{ padding: ".18rem", minHeight: "5.5rem", height: props.height ? props.height : "" }} className="noDataContainer">
                <div className="noDataImageBox">
                    <img className="noDataImage" style={{ filter: iconColor.color }} src="/exclamation-mark-v4.png" alt="No data" />
                    <label className="noDataLabel" style={{ color: "#adb6c4", fontSize: ".22rem" }}>{t("ts355", { ns: ["ts"] })}</label>
                </div>
            </div>
        </>
    )
}

export function NoDataV2(props: any) {
    const { t } = useTranslation(["home", "main"]);
    return (
        <>
            <div style={{ padding: ".18rem", height: props.height ? props.height : "" }} className="noDataContainer">
                <div className="noDataImageBox">
                    <img className="noDataImageV2" src="/empty.png" alt="No data" />
                    <label className="noDataLabelV2" style={{ color: "#adb6c4", fontSize: ".22rem" }}>{t("ts355", { ns: ["ts"] })}</label>
                </div>
            </div>
        </>
    )
}

export function NoDataV3(props: any) {
    const { t } = useTranslation(["home", "main"]);
    return (
        <>
            <div style={{ padding: ".18rem", height: props.height ? props.height : "" }} className="noDataContainer">
                <div className="noDataImageBox">
                    <img className="noDataImageV3" src="/empty.png" alt="No data" />
                    <label className="noDataLabelV3" style={{ color: "#adb6c4", fontSize: ".22rem" }}>{t("ts355", { ns: ["ts"] })}</label>
                </div>
            </div>
        </>
    )
}