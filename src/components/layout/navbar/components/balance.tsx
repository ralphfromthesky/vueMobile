import { useTranslation } from "react-i18next";
import { abbrNum } from "../../../functions/navbarFunctions";
import { useBalance } from "../../../globalFunctions/globalContext";
import { useGlobalList, useGlobalVariables } from "../../../globalFunctions/store";
import { IconButton } from "@mui/material";
import { useEffect, useState } from "react";
import { useGetUserInfo, useRefreshBal } from "../../../hooks/getUserInfoHook";


export default function Balance() {
    const { t } = useTranslation(["home", "main"]);
    const color = useGlobalList(state => state.color)
    const gameURL = useBalance();
    const userConfig2 = useGlobalVariables((state) => state.stationConfig);
    const userInfo = useGlobalVariables((state) => state.userDetails);
    const refreshBalance = useRefreshBal();
    const userDet = useGetUserInfo()

    const [reload, setReload] = useState(false);

    function handleReloadUp() {
        if (gameURL === undefined) {
            setReload(true)
            refreshBalance.mutate();
            userDet.refetch()
            setTimeout(function () {
                useGlobalList.setState({ banalanceUpdate: false })
                setReload(false);
            }, 5000);
            useGlobalList.setState({ banalanceUpdate: true })
        }
    }

    return (
        <div className="moneyDisplayBox flex border relative pr-[.1rem] items-center h-[.4rem] rounded-full  gap-[.1rem] p-[.02rem]" style={{ borderColor: color.fourth }}>
            <div className="flagContainer relative  h-[.32rem] w-[.32rem] items-center">
                <img alt=""
                    src="/navbarImages/moneyFrame.png"
                    className="moneyFlag w-[.32rem] h-[.32rem] absolute"
                />
                <img alt="" src={"/navbarImages/" + userConfig2?.staLang + ".png"} className="moneyFlag w-[.32rem] h-[.32rem] absolute" />
            </div>
            <span className="moneyValue text-[#FFAA09] text-[.18rem]">
                {gameURL === undefined ? (
                    <>
                        {useGlobalList.getState().updateStatus === false ? (userConfig2.stationCode === "yn108" ? <u className="text-[.18rem] text-[#FFAA09]">{userInfo?.money.toLocaleString()}</u> : <u className="text-[.18rem] text-[#FFAA09]">{userInfo?.money.toLocaleString()}</u>) : <span className="text-[#ADB6C3]" style={{ color: "#ADB6C3", fontSize: ".22rem" }}>{t("ts1249", { ns: "ts" })}</span>}
                    </>
                ) : (
                    <span className="text-[.2rem] " style={{ color: "#ADB6C3" }}>
                        {t("ts1199", { ns: "ts" })}
                    </span>
                )}
            </span>
            {gameURL === undefined && (
                <IconButton style={{ padding: 0 }} className={reload ? "refreshIconButton !h-[.22rem] !w-[.22rem] animate-spin" : "refreshIconButton  !h-[.22rem] !w-[.22rem]"} onClick={handleReloadUp} >
                    <img alt="" src="navbarImages/shuaxin.png" style={{ color: color.forGround }} />
                </IconButton>
            )}
        </div>
    )

}