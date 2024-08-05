import { useTranslation } from "react-i18next";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "../userCenter/common/table";
import axios from "axios";
import { useEffect, useState } from "react";
import { ChangeColorPallte, useBalance } from "../../globalFunctions/globalContext";
import AlertModal from "../common/modal/alert-modal/alert-modal";
import Loader from "../../backdropLoader/backdrop-loader";
import { useGetUserAllInfo, useGetUserVIP, useGetVIPCollection } from "../../hooks/getUserInfoHook";
import { useGlobalList, useGlobalVariables } from "../../globalFunctions/store";
import NoData from "../../noData/no-data";
import { Box } from "@mui/material";
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
export default function LevelUpBonus() {
    const { t, i18n } = useTranslation(["home", "main"]);
    const colorP = useGlobalList(state => state.color)
    const userInfo = useGetUserVIP()
    const [alert, setAlert] = useState(false)

    const vipCollection = useGetVIPCollection()
    const vips = useGlobalVariables(state => state.vipCollection)

    const progress = { backgroundColor: colorP.forGround, width: ((100 * userInfo?.data?.data.curDegreeDepositMoney) / userInfo?.data?.data.newDegreeDepositMoney) > 100 ? 100 + "%" : ((100 * userInfo?.data?.data.curDegreeDepositMoney) / userInfo?.data?.data.newDegreeDepositMoney) + "%" }
    const noProgress = { backgroundColor: "#68707b", color: "#fff", width: "0%" }

    function handleClose() {
        setAlert(!alert)
    }

    useEffect(() => {
        vipCollection.refetch()
    }, [])

    const stationConfig = useGlobalVariables(state => state.stationConfig)

    return (
        <>
            <Loader setLoader={vipCollection.isLoading}></Loader>
            <div className="vipLevelTableContainer">
                <div className="vipLevelTable">
                    {/* <Table sx={{ minWidth: 650, "& td,th": { border: 0 } }} size="small" aria-label="customized table">
                        <TableHeader className="vipTableHead">
                            <TableRow>
                                <TableCell align="center" className="tableHeader"><span style={{ color: colorP.text4 }}>{t("ts344", { ns: "ts" })}</span></TableCell>
                                <TableCell align="center" className="tableHeader"><div className="rechargeHeader"><span style={{ color: colorP.text4 }}>{userInfo?.data?.data.type === 1 ? t("ts801", { ns: "ts" }) : t("ts348", { ns: "ts" })}</span>  <div onClick={handleClose} className="infoTag" style={{ background: colorP.forGround }}>?</div></div></TableCell>
                                <TableCell align="center" className="tableHeader"><span style={{ color: colorP.text4 }}>{t("ts802", { ns: "ts" })}</span></TableCell>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {vips && vips.code !== "ERR_BAD_RESPONSE" && vips.success !== false && vips?.map((value: any, index: any) =>
                                <TableRow key={index}>
                                    <TableCell align="center" >
                                        <div className="medalRowContainer">
                                            {value.icon ? <div className="imgContainer"><img className="imgIconX" src={value.icon} alt="" /></div> : <Default vipCount={index}></Default>}
                                        </div>
                                    </TableCell>
                                    <TableCell align="center" className="vipTableData">
                                        <div className="rechargeData">
                                            <span style={{ color: colorP.text }}>{userInfo?.data?.data.type === 1 ? value.depositMoney : value.betNum}</span>
                                            {userInfo?.data?.data?.newDegreeLevel === value?.level ?
                                                <div className="depoData" style={{ backgroundColor: colorP.id === 21 ? colorP.text2 : colorP.text }}>
                                                    <div className="progressData" style={userInfo?.data?.data.type === 1 ? (userInfo?.data?.data.curDegreeDepositMoney < 1 ? noProgress : progress) : (userInfo?.data?.data.curDegreeBetNum < 1 ? noProgress : { backgroundColor: colorP.forGround, width: ((userInfo?.data?.data.curDegreeBetNum * 100) / (value.betNum) > 100 ? 100 + "%" : (userInfo?.data?.data.curDegreeBetNum * 100) / (value.betNum) + "%") })}>
                                                        <span className="progressingData" style={colorP.id === 21 ? { color: "#000" } : { color: colorP.third }}>{(userInfo?.data?.data.type === 1 ? userInfo?.data?.data.curDegreeDepositMoney : userInfo?.data?.data.curDegreeBetNum) + " / " + (userInfo?.data?.data.type === 1 ? userInfo?.data?.data.newDegreeDepositMoney : value.betNum - userInfo?.data?.data.curDegreeBetNum)}</span>
                                                    </div>
                                                </div> : ""}
                                        </div>
                                    </TableCell>
                                    <TableCell align="center" className="vipTableData">
                                    {value.upgradeMoney ? <span style={{ color: "#FFAA09" }}>{value.upgradeMoney}</span> : <div className="hrLineDiv" ></div>}
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table> */}

                    <div className="flex flex-col w-full">
                        <div className="grid grid-cols-3 w-full border-[.02rem] rounded-[.1rem] py-[.2rem]" style={{ borderColor: colorP.text, backgroundColor: colorP.third }}>
                            <div className="flex items-center justify-center text-[.2rem]" style={{ color: colorP.text4 }}>{t("ts344", { ns: "ts" })}</div>
                            <div className="flex items-center justify-center text-[.2rem]" style={{ color: colorP.text4 }}><div className="rechargeHeader"><span style={{ color: colorP.text4 }}>{userInfo?.data?.data.type === 1 ? t("ts801", { ns: "ts" }) : t("ts348", { ns: "ts" })}</span>  <div onClick={handleClose} className="infoTag p-[.12rem]" style={{ background: colorP.forGround, color: colorP.text2 }}>?</div></div></div>
                            <div className="flex items-center justify-center text-[.2rem]" style={{ color: colorP.text4 }}>{t("ts802", { ns: "ts" })}</div>
                        </div>
                        <Box sx={{
                            " .myCell:nth-child(even)": {
                                backgroundColor: colorP.third
                            }
                        }}>
                        {vips && vips.code !== "ERR_BAD_RESPONSE" && vips.success !== false && vips?.map((value: any, index: any) =>
                            <div key={index} className="grid grid-cols-3 w-full rounded-[.1rem] py-[.1rem] border-[.02rem] myCell" style={userInfo?.data?.data?.curDegreeLevel === index ? { borderColor: colorP.forGround } : { border: "none" }}>
                                <div className="flex items-center justify-center text-[.2rem] text-white">
                                    <div className="medalRowContainer">
                                        <div className="medalRowContainer">
                                            {value.icon ? <div className="imgContainer"><img className="imgIconX" src={value.icon} alt="" /></div> : <Default vipCount={index}></Default>}
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center justify-center text-[.2rem] text-[#9d9d9d] w-full">
                                    <div className="rechargeData flex items-center w-full">
                                        <span style={{ color: colorP.text }}>{userInfo?.data?.data.type === 1 ? value.depositMoney : value.betNum}</span>
                                        {userInfo?.data?.data?.newDegreeLevel === value?.level ?
                                            <div className="depoData" style={{ backgroundColor: colorP.id === 21 ? colorP.text2 : colorP.text }}>
                                                <div className="progressData" style={userInfo?.data?.data.type === 1 ? (userInfo?.data?.data.curDegreeDepositMoney < 1 ? noProgress : progress) : (userInfo?.data?.data.curDegreeBetNum < 1 ? noProgress : { backgroundColor: colorP.forGround, width: ((userInfo?.data?.data.curDegreeBetNum * 100) / (value.betNum) > 100 ? 100 + "%" : (userInfo?.data?.data.curDegreeBetNum * 100) / (value.betNum) + "%") })}>
                                                    <span className="progressingData" style={colorP.id === 21 ? { color: "#000" } : { color: colorP.third }}>{(userInfo?.data?.data.type === 1 ? userInfo?.data?.data.curDegreeDepositMoney : userInfo?.data?.data.curDegreeBetNum) + " / " + (userInfo?.data?.data.type === 1 ? userInfo?.data?.data.newDegreeDepositMoney : value.betNum - userInfo?.data?.data.curDegreeBetNum)}</span>
                                                </div>
                                            </div> : ""}
                                    </div>
                                </div>
                                <div className="flex items-center justify-center text-[.2rem] text-[#FFAA09]">
                                    {value.upgradeMoney ? <span style={{ color: "#FFAA09" }}>{value.upgradeMoney}</span> : <div className="hrLineDiv" ></div>}
                                </div>
                            </div>
                        )}
                        </Box>
                    </div>
                    {vips.length === 0 || vips.code === "ERR_BAD_RESPONSE" && <NoData />}
                </div>
            </div >
            <AlertModal alertMode="alertDefault" closeAlert={handleClose} openAlert={alert} alertTitle={t("ts864", { ns: "ts" })} >
                <div className="alertContainer" style={{ width: "5rem" }}>
                    <span style={{ fontSize: ".18rem", color: "#ADB6C3", lineHeight: 1.5 }}>{userInfo?.data?.data.type === 1 ? t("ts863", { ns: "ts" }) : t("ts1196", { ns: "ts" })}</span>
                </div>
            </AlertModal>
        </>
    )
}