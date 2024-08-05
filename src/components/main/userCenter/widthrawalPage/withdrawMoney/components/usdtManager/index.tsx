import { useEffect, useState } from 'react';
import './indexBankCardManager.css'
import { Avatar } from '@mui/material';
import { useDeleteUSDT, useGetUSDTList } from '../../../../../../hooks/getUserInfoHook';
import { useButtonStates, useGlobalList, useGlobalVariables, useModalStates } from '../../../../../../globalFunctions/store';
import { useTranslation } from 'react-i18next';
import { ChangeColorPallte } from '../../../../../../globalFunctions/globalContext';
import { ToastrPngk } from '../../../../../../globalFunctions/toastr';
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import CheckIcon from '@mui/icons-material/Check';
import DeleteIcon from '@mui/icons-material/Delete';
import { useCollorePallete } from '../../../../../../layout/styles';
import NoData, { NoDataV2, NoDataV3 } from '../../../../../../noData/no-data';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ConfirmPassword from '../bankCardManager/components/passwordConfirmModal';

export default function USDTManager() {
    const { t, i18n } = useTranslation(["home", "main"]);
    const color = useGlobalList(state => state.color)

    const bankLists = useGetUSDTList()
    useEffect(() => {
        bankLists.refetch()
    }, [])

    function copyText(text: any) {
        navigator.clipboard.writeText(text)
        ToastrPngk({ msg: t("ts920", { ns: "ts" }), type: "success", id: text })
    }

    const [activeCard, setActiveCard] = useState(0)
    const activateCard = (index: any) => {
        setActiveCard(index)
    }

    function masAccountNum(accNum: any) {
        return "**********" + accNum.slice(9)
    }

    const accountNum = useButtonStates(state => state.showAccNumButton)
    const deleteUSDTACC = useDeleteUSDT()

    const deleteUSDT = (value: any) => {
        deleteUSDTACC.mutate({ id: value })
    }

    const addUSDT = () => {
        useModalStates.setState({ usdtCardModal: true })
    }

    const openPassConfirm = () => {
        useModalStates.setState({ withdrawPassModal: true })
        useButtonStates.setState({ bankType: 2 })
    }

    return (
        <>
            <ConfirmPassword />
            <div className="bankCardAddMainContainer">
                {/* <div className="selectBankTypeContainer">
                    <div className="typeLabelBox">
                        <span className="bankLabel" style={{ textTransform: "capitalize", color: color.text4 }}>{t("ts185", { ns: "ts" })}</span>
                        <span className="bankLabel"></span>
                    </div>
                    <div className="bankTypeBoxes">
                        {bankLists.isLoading === false && bankLists?.data?.banks?.map((value: any, index: any) =>
                            <div className="checkContainer" key={index}>
                                <div className={activeCard == index ? "bankMainBox active" : "bankMainBox"} style={activeCard == index ? { borderColor: color.forGround } : { borderColor: color.fourth }} onClick={() => activateCard(index)}>
                                    <div className="bankIconBox">
                                        <img src="/withdrawImages/usdt.png" className="bankIcon" />
                                        <div className="bankInfoBOx">
                                            <span className="additionalAddLabel" style={{ textTransform: "uppercase", color: color.text4 }}>{value.bankName}</span>
                                            <span className="additionalAddLabel accountCard" style={{ textTransform: "uppercase", color: color.text4 }}><div className="copyID">{value.cardNo ? accountNum == true ? value.cardNo : masAccountNum(value.cardNo) : "-"} {value.cardNo && accountNum == true && <ContentCopyIcon style={{ color: color.forGround }} className="copyIcon" onClick={() => copyText(value.cardNo)} />}</div></span>
                                        </div>
                                        <DeleteIcon style={{ width: ".3rem", color: color.forGround }} onClick={() => deleteUSDT(value.id)} className="deleteUSDTButton" />
                                    </div>
                                </div>
                                <div className={activeCard == index ? "badge active" : "badge"} style={activeCard == index ? { backgroundColor: color.forGround } : {}}>
                                    <Avatar style={{ background: "transparent", width: ".2rem", height: ".2rem", color: color.text2 }}><CheckIcon className="checkIcon" style={{ fontSize: 30, width: ".25rem", height: ".3rem", color: color.text2 }}></CheckIcon></Avatar>
                                </div>
                            </div>
                        )}
                    </div>
                </div> */}
                <div className="selectBankTypeContainer">
                    <div className="typeLabelBox">
                        <span className="bankLabel" style={{ textTransform: "capitalize", color: color.text4 }}>{t("ts185", { ns: "ts" })}</span>
                    </div>
                    <div className="bankTypeBoxes">
                        {bankLists.isLoading === false && bankLists?.data?.banks?.map((value: any, index: any) =>
                            <div className="checkContainer" key={index}>
                                <div className={activeCard == index ? "bankMainBox active" : "bankMainBox"} style={activeCard == index ? { borderColor: color.forGround } : { borderColor: color.fourth }} onClick={() => activateCard(index)}>
                                    <div className="bankIconBox">
                                        <img src="/withdrawImages/usdt.png" className="bankIcon" />
                                        <div className="bankInfoBOx">
                                            <span className="additionalAddLabel" style={{ textTransform: "uppercase", color: color.text4 }}>{value.bankName}</span>
                                            <span className="additionalAddLabel accountCard" style={{ textTransform: "uppercase", color: color.text4 }}><div className="copyID">{value.cardNo ? accountNum == true ? value.cardNo : masAccountNum(value.cardNo) : "-"} {value.cardNo && accountNum == true && <ContentCopyIcon style={{ color: color.forGround }} className="copyIcon" onClick={() => copyText(value.cardNo)} />}</div></span>
                                        </div>
                                        <DeleteIcon style={{ width: ".3rem", color: color.forGround }} onClick={() => deleteUSDT(value.id)} className="deleteUSDTButton" />
                                    </div>
                                </div>
                                <div className={activeCard == index ? "badge active" : "badge"} style={activeCard == index ? { backgroundColor: color.forGround } : {}}>
                                    <Avatar style={{ background: "transparent", width: ".2rem", height: ".2rem", color: color.text2 }}><CheckIcon className="checkIcon" style={{ fontSize: 30, width: ".25rem", height: ".3rem", color: color.text2 }}></CheckIcon></Avatar>
                                </div>
                            </div>
                        )}
                        <div className="bankMainBox" style={{ borderColor: color.forGround }} onClick={openPassConfirm}>
                            <div className="bankIconBox">
                                <img src="/withdrawImages/usdt.png" className="bankIcon" />
                                <span className="additionalAddLabel" style={{ textTransform: "uppercase", color: color.text4 }}>{t("ts197", { ns: "ts" })} TRON USDT(TRC20)</span>
                            </div>
                            <div className="bankArrowBox">
                                <ArrowForwardIosIcon style={{ color: color.text }} className="arrowIcon" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}