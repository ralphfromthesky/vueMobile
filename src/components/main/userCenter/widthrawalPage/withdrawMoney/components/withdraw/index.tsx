import { useTranslation } from "react-i18next";
import { ChangeColorPallte } from "../../../../../../globalFunctions/globalContext";
import "./indexWithdraw.css"
import { Avatar, Button, FormControl, IconButton, Input, InputLabel, MenuItem, TextField } from "@mui/material";
import CheckIcon from '@mui/icons-material/Check';
import { useEffect, useRef, useState } from "react";
import AddCardIcon from '@mui/icons-material/AddCard';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import OtpInput from 'react-otp-input';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useGetAllBank, useGetBankList, useGetUSDTInfos, useGetUserInfo, useStationConfig } from "../../../../../../hooks/getUserInfoHook";
import axios from "axios";
import { ToastrPngk } from "../../../../../../globalFunctions/toastr";
import { useGlobalList, useGlobalVariables, useModalStates, useTabStates } from "../../../../../../globalFunctions/store";
import DetailModal from "./components/detailModal";
import { useCollorePallete } from "../../../../../../layout/styles";

export default function WithdrawalMoney() {
    const colorP = useGlobalList(state => state.color)
    const { t, i18n } = useTranslation(["home", "main"]);

    const userInformation = useGetUserInfo()
    const stationConfig = useStationConfig()
    const getAllBank = useGetAllBank()
    const usdtInfos = useGetUSDTInfos()
    const moneyUnit = stationConfig?.data?.data?.moneyUnit

    const [amountOfwithdraw, setWithrawAmount] = useState<any>(0);
    const [amountOfwithdrawv2, setWithrawAmountV2] = useState<any>(0);

    const withdrawValue = useRef<any>(null)

    const [amntFee, setAmnyFee] = useState(0);

    const getBankList = useGetBankList()
    const wihtdrawInfo = useGlobalVariables(state => state?.banks)
    const usdtInfo = useGlobalVariables(state => state?.usdtInfo)
    const config2 = useGlobalVariables(state => state.stationConfig)
    const getConfig = useGlobalVariables(state => state.userConfig)

    const withdrawInfoMinMax = getBankList?.data?.data

    const [selectBank, selectedBankIndex] = useState({
        index: 0,
        bankName: ''
    });

    const [activePlatform, setActivePlatform] = useState(0)
    const selectPlatform = (value: any) => {
        setActivePlatform(value)
    }

    const [withdrawPass, setWithdrawPass] = useState('');

    const [showNewPassword, setShowNewPassword] = useState(false);
    const handleClickShowNewPassword = () => setShowNewPassword((show) => !show);
    const handleMouseDownNewPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const [withdrawRateUSDT, setWithdrawRateUSDT] = useState<any>([])
    const handleActiveBank = (value: any, bank: any) => {
        console.log(bank.bankCode)
        if (bank.bankCode == "USDT") {
            setWithdrawRateUSDT(usdtInfo)
        } else {
            selectedBankIndex({ ...selectBank, index: value, bankName: bank.id })
            setWithdrawRateUSDT([])
        }
        selectedBankIndex({ ...selectBank, index: value, bankName: bank.id })
    };

    const handleWithdrawAmount = (value: any) => {
        if (value == "") {
            setAmnyFee(0)
        }
        else {
            if (withdrawInfoMinMax?.dayTimes < withdrawInfoMinMax?.strategy?.drawNum) {
                setAmnyFee(0)
            } else {
                if (withdrawInfoMinMax?.length !== 0 && Object.keys(withdrawInfoMinMax?.strategy).length != 0) {
                    if (withdrawInfoMinMax?.strategy.feeType == 1) {
                        let fee = withdrawInfoMinMax?.strategy.feeValue
                        setAmnyFee(fee)
                    }
                    else {
                        let fee = value * (withdrawInfoMinMax?.strategy.feeValue / 100)
                        if (withdrawInfoMinMax?.strategy.lowerLimit) {
                            if (fee < withdrawInfoMinMax?.strategy.lowerLimit) {
                                setAmnyFee(withdrawInfoMinMax?.strategy.lowerLimit)
                            } else if (withdrawInfoMinMax?.strategy.upperLimit) {
                                if (fee > withdrawInfoMinMax?.strategy.upperLimit) {
                                    setAmnyFee(withdrawInfoMinMax?.strategy.upperLimit)
                                } else {
                                    setAmnyFee(fee)
                                }
                            } else {
                                setAmnyFee(fee)
                            }
                        } else {
                            if (withdrawInfoMinMax?.strategy.upperLimit) {
                                if (fee > withdrawInfoMinMax?.strategy.upperLimit) {
                                    setAmnyFee(withdrawInfoMinMax?.strategy.upperLimit)
                                } else {
                                    setAmnyFee(fee)
                                }
                            } else {
                                setAmnyFee(fee)
                            }
                        }
                    }
                }
                else {
                    setAmnyFee(0)
                }
            }

        }
        // if (value == "") {
        //     setWithrawAmount("")
        // } else {
        //     setWithrawAmount(Math.ceil(value))
        // }
        setWithrawAmount(Math.ceil(value))
        setWithrawAmountV2(value)
    }

    const handleWithdrawal = () => {
        try {
            axios.post('/userCenter/finance/withdrawSave.do', {
                amount: amountOfwithdraw,
                bankId: selectBank.bankName,
                pwd: withdrawPass
            }, {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            }).then((res) => {
                if (res.data.success == true) {
                    ToastrPngk({ msg: res.data.msg, type: "success" })
                    setWithrawAmount("")
                    setWithrawAmountV2("")
                    withdrawValue.current.value = null
                    setWithdrawPass("")
                    setAmnyFee(0)
                    getBankList.refetch()
                }
                else {
                    ToastrPngk({ msg: res.data.msg, type: "error" })
                }
            })
        } catch (e) {
            ToastrPngk({ msg: e, type: "error" })
        }
    }

    useEffect(() => {
        if (wihtdrawInfo?.banks) {
            const bnks = wihtdrawInfo?.banks?.filter((entry: { bankCode: any; }) =>
                entry.bankCode != "USDT"
            )
            selectedBankIndex({ ...selectBank, bankName: bnks?.[0]?.id })
        }
        getBankList.refetch()
        userInformation.refetch()
        getAllBank.refetch()
        // usdtInfos.refetch()
    }, [wihtdrawInfo?.banks])

    const inputPass = () => {
        if (wihtdrawInfo && wihtdrawInfo?.banks != '') {
            return <FormControl
                sx={{
                    "input:focus": {
                        borderColor: colorP.forGround + " !important",
                        color: colorP.text4 + " !important",
                    },
                    "input": {
                        borderColor: colorP.fourth + " !important",
                        color: colorP.text4 + " !important",
                    }
                }}
            >
                <OtpInput
                    inputType={showNewPassword ? 'number' : 'password'}
                    onChange={setWithdrawPass}
                    numInputs={6}
                    value={withdrawPass}
                    inputStyle="withdrawPassAutoTab"
                    renderInput={(props) => <input {...props} />}
                />
            </FormControl>
        } else {
            return <FormControl
                sx={{
                    "input:focus": {
                        borderColor: colorP.forGround + " !important",
                        color: colorP.text4 + " !important",
                    },
                    "input": {
                        borderColor: colorP.fourth + " !important",
                        color: colorP.text4 + " !important",
                    }
                }}
            >
                <OtpInput
                    inputType={showNewPassword ? 'number' : 'password'}
                    onChange={setWithdrawPass}
                    numInputs={6}
                    value={withdrawPass}
                    inputStyle="withdrawPassAutoTab"
                    renderInput={(props) => <input disabled {...props} />}
                />
            </FormControl>
        }
    }

    const detailModal = useModalStates(state => state.detailModal)
    const openDetail = () => {
        useModalStates.setState({ detailModal: true })
        getBankList.refetch()
    }
    const closeDetail = () => {
        useModalStates.setState({ detailModal: false })
    }

    const MenuProps = {
        PaperProps: {
            sx: {
                background: colorP.backGorund,
                color: colorP.text,
                "& em": {
                    color: colorP.text,
                },
                "& .Mui-selected": {
                    color: colorP.forGround
                },
                " .MuiSvgIcon-root": {
                    fontSize: ".3rem",
                },
            }
        },
    };


    return (
        <>
            <DetailModal openDetailModal={detailModal} closeDetailModal={closeDetail} withdrawInfo={withdrawInfoMinMax} amountFee={amntFee} />
            <div className="withdrawMoneyMainContainer">
                <div className="withdrawMainBox">
                    <div className="boxLabelHead">
                        <span className="headLabel" style={{ color: colorP.text }}>{t("ts970", { ns: "ts" })} {moneyUnit} {isNaN(withdrawInfoMinMax?.bet?.drawNeed - withdrawInfoMinMax?.bet?.betNum) ? "0" : withdrawInfoMinMax?.bet?.drawNeed - withdrawInfoMinMax?.bet?.betNum} {t("ts971", { ns: "ts" })}</span>
                        <span className="headLabel headDetail" style={{ color: colorP.forGround }} onClick={wihtdrawInfo && wihtdrawInfo?.banks == '' ? () => useTabStates.setState({ type: 2 }) : () => openDetail()} > {t("ts561", { ns: "ts" })}</span>
                    </div>
                    <div className="platfromMainBox">
                        <div className="checkContainer">
                            <div className={activePlatform == 0 ? "cardBox active" : "cardBox"} style={activePlatform == 0 ? { borderColor: colorP.forGround } : { color: colorP.text2 }}>
                                <div className="bankName" style={{ color: colorP.forGround }}>{t("ts972", { ns: ["ts"] })}</div>
                            </div>
                            <div className={activePlatform == 0 ? "badge active" : "badge"} style={activePlatform == 0 ? { backgroundColor: colorP.forGround } : { color: colorP.text2 }}>
                                <Avatar style={{ background: "transparent", width: ".2rem", height: ".2rem", color: colorP.text2 }}><CheckIcon className="checkIcon" style={{ fontSize: 30, width: ".2rem", height: ".2rem", color: colorP.text2 }}></CheckIcon></Avatar>
                            </div>
                        </div>
                    </div>
                    {wihtdrawInfo && wihtdrawInfo?.banks != '' ?
                        <>
                            <FormControl fullWidth
                                sx={{
                                    fontSize: ".18rem",
                                    " .MuiInputBase-root": {
                                        height: ".5rem",
                                        borderRadius: "7px",
                                        color: colorP.text4,
                                        fontSize: ".18rem",
                                    },
                                    " .MuiOutlinedInput-notchedOutline": {
                                        borderColor: colorP.forGround + "!important",
                                        fontSize: ".18rem",
                                    },
                                    " .Mui-focused .MuiOutlinedInput-notchedOutline": {
                                        borderColor: colorP.forGround + " !important",
                                    },
                                    " .MuiSvgIcon-root": {
                                        color: colorP.text4 + " !important",
                                        fontSize: ".3rem",
                                    }
                                }}
                            >
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={selectBank?.bankName}
                                    defaultValue={wihtdrawInfo?.banks && wihtdrawInfo?.banks[0]?.id}
                                    MenuProps={MenuProps}
                                >
                                    {wihtdrawInfo?.length !== 0 && wihtdrawInfo?.banks?.map((value: any, index: any) =>
                                        <MenuItem onClick={() => handleActiveBank(index, value)} value={value.id} key={index}>
                                            <div className="cardHolder"
                                                style={{
                                                    display: "flex",
                                                    alignItems: "center",
                                                    gap: "10px",
                                                    fontSize: ".18rem",
                                                }}>
                                                <CreditCardIcon className="cardIcon" />{value.bankName} {value.cardNo}
                                            </div>
                                        </MenuItem>
                                    )}
                                    {/* {wihtdrawInfo?.length !== 0 && wihtdrawInfo?.banks?.filter((entry: { bankCode: any; }) =>
                                        entry.bankCode !== "USDT"
                                    ).map((value: any, index: any) =>
                                        <MenuItem onClick={() => handleActiveBank(index, value)} value={value.id} key={index}>
                                            <div className="cardHolder"
                                                style={{
                                                    display: "flex",
                                                    alignItems: "center",
                                                    gap: "10px",
                                                    fontSize: ".18rem",
                                                }}>
                                                <CreditCardIcon className="cardIcon" />{value.bankName} {value.cardNo}
                                            </div>
                                        </MenuItem>
                                    )} */}
                                </Select>
                                {withdrawRateUSDT?.withdrawRate && <div className="rateBox">
                                    (<span className="rateLabel">{t("ts978", { ns: "ts" })}</span>&nbsp;
                                    <span className="rateLabel rateContent">{withdrawRateUSDT?.withdrawRate}</span>)
                                </div>}
                            </FormControl>


                        </> :
                        <div className="addCardMainBox">
                            <div className="banksContainers" onClick={() => useTabStates.setState({ type: 2 })} style={{ borderColor: colorP.forGround }}>
                                <div className="cardIconBox">
                                    <AddCardIcon className="cardIcon" style={{ color: colorP.forGround }} />
                                    <span className="cardLabel" style={{ color: colorP.text4 }}>{t("ts186", { ns: ["ts"] })}</span>
                                </div>
                                <div className="cardArrowBox">
                                    <ArrowForwardIosIcon sx={{ color: colorP.forGround + "!important" }} className="arrowIcon" />
                                </div>
                            </div>
                        </div>
                    }
                    <div className="selectBankAccountMainBox">
                        <div className="banksContainers" style={{ cursor: wihtdrawInfo?.banks == '' ? "no-drop" : "default" }}>
                            <div className="cardIconBox">
                                <TextField
                                    InputProps={{
                                        startAdornment:
                                            <span>{moneyUnit}</span>
                                    }}
                                    sx={{
                                        " .MuiInputBase-root": {
                                            height: ".5rem",
                                            WebkitTextFillColor: colorP.text4 + " !important",
                                            color: colorP.text4 + " !important",
                                            fontSize: "18px",
                                        },
                                        " .MuiInputBase-root.Mui-focused": {
                                            borderColor: colorP.forGround + " !important",
                                            " .MuiOutlinedInput-notchedOutline": {
                                                borderColor: colorP.forGround + " !important",
                                            },
                                        },
                                        " .MuiInputBase-root:hover": {
                                            borderColor: colorP.forGround + " !important",
                                            " .MuiOutlinedInput-notchedOutline": {
                                                borderColor: colorP.forGround + " !important",
                                            },
                                        },
                                        " .MuiOutlinedInput-notchedOutline": {
                                            border: "thin solid",
                                            borderColor: colorP.forGround + " !important",
                                            borderRadius: ".1rem"
                                        },
                                        " .Mui-disabled .MuiOutlinedInput-notchedOutline": {
                                            border: "thin solid",
                                            borderColor: colorP.fourth + " !important",
                                            borderRadius: ".1rem"
                                        },
                                        " .MuiInputBase-input": {
                                            cursor: wihtdrawInfo?.banks == '' ? "no-drop" : "text",
                                            padding: "0 .1rem"
                                        },
                                        " .MuiInputBase-input.Mui-disabled": {
                                            WebkitTextFillColor: colorP.text + "!important",
                                            opacity: 1
                                        },
                                    }}
                                    onChange={(e) => handleWithdrawAmount(e.target.value)}
                                    inputRef={withdrawValue}
                                    // value={amountOfwithdraw}
                                    disabled={wihtdrawInfo && wihtdrawInfo?.banks == '' ? true : false}
                                    className="cardInput" type="number"
                                    placeholder={wihtdrawInfo && wihtdrawInfo?.banks != '' ? (t("ts968", { ns: "ts" }) + " " + withdrawInfoMinMax?.minDrawMoney + ", " + t("ts969", { ns: "ts" }) + " " + withdrawInfoMinMax?.maxDrawMoney) :
                                        t("ts975", { ns: "ts" })} />
                            </div>
                        </div>
                        {(amntFee !== 0) && <div className="rateBox">
                            (<span className="rateLabel" style={{ color: colorP.text4 }}>{t("ts470", { ns: "ts" })}:</span>&nbsp;
                            <span className="rateLabel rateContent">{config2.moneyUnit} {amntFee}</span>)
                        </div>}

                        {withdrawRateUSDT?.withdrawRate && <div className="rateBox">
                            (<span className="rateLabel" style={{ color: colorP.text4 }}>{t("ts1233", { ns: "ts" })}:</span>&nbsp;
                            {/* <span className="rateLabel rateContent">{amountOfwithdrawv2 > 0 ? (amountOfwithdrawv2 / withdrawRateUSDT?.withdrawRate) : 0}</span> */}
                            <span className="rateLabel rateContent">{amountOfwithdrawv2 > 0 ? ((amountOfwithdrawv2 / withdrawRateUSDT?.withdrawRate) - (amntFee / withdrawRateUSDT?.withdrawRate)) : 0}</span>)
                        </div>}
                    </div>
                    <div className="hrBorder" style={{ backgroundColor: colorP.text }} />
                    <div className="passwordMainBox">
                        <form noValidate autoComplete="off">
                            <div className="enterPassMainContainer">
                                <div className="enterPassContainer">
                                    <div className="labelWithEyeBox">
                                        <label className="inputLabelsPass" style={{ color: colorP.text4 }}>{t("ts973", { ns: ["ts"] })}</label>
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowNewPassword}
                                            onMouseDown={handleMouseDownNewPassword}
                                            className="passWordEye"
                                            tabIndex={-1}
                                            disabled={wihtdrawInfo && wihtdrawInfo?.banks == '' ? true : false}
                                        >
                                            {showNewPassword ? <VisibilityOff sx={{ color: colorP.forGround }} /> : <Visibility sx={{ color: colorP.fourth }} />}
                                        </IconButton>
                                    </div>
                                    {inputPass()}
                                </div>
                            </div>
                        </form>

                        <FormControl
                            sx={{
                                " .MuiButtonBase-root": {
                                    color: colorP.third + " !important",
                                    "&:hover": {
                                        color: colorP.third + " !important"
                                    }
                                }
                            }}
                        >
                            <Button
                                sx={{
                                    "&:disabled": {
                                        cursor: "not-allowed !important",
                                        pointerEvents: "all !important",
                                    },
                                }}
                                disabled={wihtdrawInfo && wihtdrawInfo?.banks == '' ? true : false}
                                onClick={handleWithdrawal} style={{ backgroundColor: colorP.forGround }} className="withdrawConfrimPassss" variant="contained">{t("ts216", { ns: "ts" })}</Button>
                        </FormControl>
                    </div>
                </div>
            </div >
        </>
    )
}