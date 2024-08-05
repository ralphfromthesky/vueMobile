import { useTranslation } from "react-i18next";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "../userCenter/common/table";
import { useGetSsalary } from "../../hooks/getUserInfoHook";
import { useGlobalList } from "../../globalFunctions/store";
import { Box } from "@mui/material";
import SalaryLevel from "./salary-level";
import NoData from "../../noData/no-data";

export default function Privilage() {
    const { t, i18n } = useTranslation(["home", "main"]);
    const { data: salary, status } = useGetSsalary()
    const vipInfo = useGlobalList(state => state.vipInfo)
    const colorP = useGlobalList(state => state.color)
    function Default(props: any) {
        const medal = props.vipCount == 0 ? '' : props.vipCount < 6 ? 1 : props.vipCount < 11 ? 2 : props.vipCount < 14 ? 3 : props.vipCount < 41 ? 4 : 0
        return (
            <>
                <div className="medalContainer" style={{ backgroundImage: `url("/vipImages/medalLevel` + medal + `.png")` }}>
                    <div className="medalRibbonContainer" style={{ backgroundImage: `url("/vipImages/ribbonLevel` + props.vipCount + `.png")` }}>
                        <span className="vipLevel">{props.vipCount}</span>
                    </div>
                </div>
            </>
        )
    }
    return (
        <>
            <div className="vipLevelTableContainer">
                <div className="vipLevelTable">
                    {salary?.curLevelNum !== undefined && <SalaryLevel />}
                    <div className="flex flex-col w-full">
                        <div className="grid grid-cols-3 w-full border-[.02rem] rounded-[.1rem] py-[.2rem]" style={{ borderColor: colorP.text, backgroundColor: colorP.third }}>
                            <div className="flex items-center justify-center text-[.2rem] text-white">{t("ts344", { ns: "ts" })}</div>
                            <div className="flex items-center justify-center text-[.2rem] text-white">{t("ts1293", { ns: "ts" })}</div>
                            <div className="flex items-center justify-center text-[.2rem] text-white">{t("ts349", { ns: "ts" })}</div>
                        </div>
                        <Box sx={{
                            " .myCell:nth-child(even)": {
                                backgroundColor: colorP.third
                            }
                        }}>
                            {status === "success" && status && salary.depositGrowthStrategy.length !== 0 ? salary.depositGrowthStrategy.map((value: any, index: any) =>
                                <div key={index} className="grid grid-cols-3 w-full rounded-[.1rem] py-[.1rem] border-[.01rem] myCell" style={salary?.curLevelNum === index ? { borderColor: colorP.forGround } : { border: "none" }}>
                                    <div className="flex items-center justify-center text-[.2rem] text-white">
                                        <div className="medalRowContainer">
                                            <Default vipCount={index}></Default>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-center text-[.2rem] text-[#9d9d9d]">{value.weekBetNum}</div>
                                    <div className="flex items-center justify-center text-[.2rem] text-[#9d9d9d]">{value.weekMoney}</div>
                                </div>
                            ) : <NoData />}
                        </Box>
                    </div>
                </div>
            </div>

        </>
    )
}
export function PrivilageWeekly() {
    const { t, i18n } = useTranslation(["home", "main"]);
    const salary = useGetSsalary()
    const vipInfo = useGlobalList(state => state.vipInfo)
    const colorP = useGlobalList(state => state.color)
    function Default(props: any) {
        const medal = props.vipCount == 0 ? '' : props.vipCount < 6 ? 1 : props.vipCount < 11 ? 2 : props.vipCount < 14 ? 3 : props.vipCount < 41 ? 4 : 0
        return (
            <>
                <div className="medalContainer" style={{ backgroundImage: `url("/vipImages/medalLevel` + medal + `.png")` }}>
                    <div className="medalRibbonContainer" style={{ backgroundImage: `url("/vipImages/ribbonLevel` + props.vipCount + `.png")` }}>
                        <span className="vipLevel">{props.vipCount}</span>
                    </div>
                </div>
            </>
        )
    }

    return (
        <>
            <div className="vipLevelTableContainer">
                <div className="vipLevelTable">
                    {salary?.data?.curLevelNum !== undefined && <SalaryLevel />}
                    <div className="flex flex-col w-full">
                        <div className="grid grid-cols-3 w-full border-[.02rem] rounded-[.1rem] py-[.2rem]" style={{ borderColor: colorP.text, backgroundColor: colorP.third }}>
                            <div className="flex items-center justify-center text-[.2rem] text-white">{t("ts344", { ns: "ts" })}</div>
                            <div className="flex items-center justify-center text-[.2rem] text-white">{t("ts1293", { ns: "ts" })}</div>
                            <div className="flex items-center justify-center text-[.2rem] text-white">{t("ts349", { ns: "ts" })}</div>
                        </div>
                        <Box sx={{
                            " .myCell:nth-child(even)": {
                                backgroundColor: colorP.third
                            }
                        }}>
                            {salary.isLoading === false && salary?.data?.depositGrowthStrategy.length !== 0 ? salary?.data?.depositGrowthStrategy.map((value: any, index: any) =>
                                <div key={index} className="grid grid-cols-3 w-full rounded-[.1rem] py-[.1rem] border-[.01rem] myCell" style={salary?.data?.curLevelNum === index ? { borderColor: colorP.forGround } : { border: "none" }}>
                                    <div className="flex items-center justify-center text-[.2rem] text-white">
                                        <div className="medalRowContainer">
                                            <Default vipCount={index}></Default>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-center text-[.2rem] text-[#9d9d9d]">{value.monthBetNum}</div>
                                    <div className="flex items-center justify-center text-[.2rem] text-[#9d9d9d]">{value.monthMoney}</div>
                                </div>
                            ) : <NoData />}
                        </Box>
                    </div>
                </div>
            </div>

        </>
    )
}