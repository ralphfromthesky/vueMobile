import { Button, Stack } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useGetSsalary, useGetUserVIP } from "../../hooks/getUserInfoHook";
import { useNavigate } from "react-router";
import { useGlobalList, useGlobalVariables } from "../../globalFunctions/store";

export default function SalaryLevel() {
    const { t, i18n } = useTranslation(["home", "main"]);
    const color = useGlobalList(state => state.color)
    const userInfo = useGetUserVIP()
    const navigate = useNavigate()
    const salary = useGlobalVariables(state => state.salaryStrategy)
    const strat = salary?.depositGrowthStrategy

    let level = salary?.curLevelNum
    const medals = level == 0 ? '' : level < 6 ? 1 : level < 11 ? 2 : level < 14 ? 3 : level < 41 ? 4 : 0

    useEffect(() => {
        userInfo.refetch()
    }, [])

    return (
        <>
            {userInfo?.data?.data && strat.length !== 0 &&
                <div className="medalMainContainer mb-[.2rem] gap-[.2rem]" style={{ backgroundColor: color.third }}>
                    <div className="medalBox">
                        <div className="medalContainer" style={{ backgroundImage: 'url("/vipImages/medalLevel' + medals + '.png")' }}>
                            <div className="medalRibbonContainer" style={{ backgroundImage: 'url("/vipImages/ribbonLevel' + level + '.png")' }}>
                                <span className="vipLevel">{level}</span>
                            </div>
                        </div>
                        {strat && (salary?.curLevelNum === strat[strat?.length]?.levelNum) ?
                            <span className="text-[.22rem]" style={{ color: color.text4 }}>{t("ts1303", { ns: "ts" })}</span>
                            :
                            <>
                                <div className="levelNeed">
                                    <label className="medalLabel" style={{ color: color.text }}>{t("ts339", { ns: "ts" })} <span className="medalContent1">VIP {salary?.curLevelNum + 1}</span>
                                        <label className="medalLabel" style={{ color: color.text }}>{t("ts340", { ns: "ts" })}</label> <span className="medalContent2" style={{ color: color.text4 }}>{strat[level + 1]?.growthValue - (salary?.curGrowthValue ? salary?.curGrowthValue : 0)}</span></label>
                                </div>
                            </>
                        }
                    </div>
                    <div className="flex items-center w-full">
                        <div className="w-full relative rounded-full overflow-hidden" style={{ backgroundColor: color.id === 21 ? color.text2 : color.text }}>
                            <div className="flex items-center h-[.2rem] w-full rounded-full" style={{ backgroundColor: color.forGround, width: (100 * (salary?.curGrowthValue ? salary?.curGrowthValue : 0)) / strat[level + 1]?.growthValue > 100 ? "100%" : (100 * (salary?.curGrowthValue ? salary?.curGrowthValue : 0)) / strat[level + 1]?.growthValue + "%" }}>
                                <span className="flex items-center justify-center absolute w-full h-[.2rem]" style={color.id === 21 ? { color: "#000" } : { color: color.third }}>{(salary?.curGrowthValue ? salary?.curGrowthValue : 0)} / {salary?.curLevelNum ? ((salary?.curLevelNum === strat[strat.length - 1]?.levelNum) ? strat[strat.length - 1]?.growthValue : strat[level + 1]?.growthValue) : 0}</span>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center px-[.2rem] vipLevelBadge">
                        <span className="levelBadge">{t("ts1103", { ns: "ts" })}</span>
                    </div>
                </div>
            }
        </>
    )
}