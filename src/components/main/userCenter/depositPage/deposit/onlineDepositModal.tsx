import React from "react";
import { Avatar, Box, FormControl, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Button from "@mui/material/Button"
import CheckIcon from '@mui/icons-material/Check';
import 'react-notifications/lib/notifications.css';
import { useTranslation } from "react-i18next";
import { ToastrPngk } from "../../../../globalFunctions/toastr";
import { useGlobalList, useGlobalVariables } from "../../../../globalFunctions/store";
import { useGetDiscountAmount, useGetUserInfo } from "../../../../hooks/getUserInfoHook";
import { useNavigate } from "react-router";
import "./depoModal.css"
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import AlertModal from "../../../common/modal/alert-modal/alert-modal";
import DialogueModal from "../../../../Dialogue";

function BankCardsModal(props: any) {
  const { t } = useTranslation(["home", "main"]);
  const colorP = useGlobalList(state => state.color)
  const navigate = useNavigate()
  const user = useGetUserInfo()
  const userInfo = useGlobalVariables(state => state.userDetails)
  const [activeCard, setActiveCard] = useState(0)
  const [activeChannel, setActiveChannel] = useState(0)
  const [checked, setChecked] = useState(false);
  const [bankList, setBankList] = useState([])
  const [totalBonus, settotalBonus] = useState<any>()
  const [bonusValue, setbonusValue] = useState<any>("")
  const [isData, setIsData] = useState(false)
  const [isBonus, setIsbonus] = useState(false)
  const [onlineList, setOnlineLists] = useState<any>()
  const [openRemark, setOpenRemark] = useState(false)
  const [remarkValue, setRemarkValue] = useState("")
  const depositeDiscount = useGlobalVariables.getState().depositDataDiscount

  useEffect(() => {

    axios.post('/userCenter/finance/depositList.do', {
      payCode: "online",
    }, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded"
      }
    })
      .then(
        (res) => {
          if (res.data.onlineList != '') {
            setActiveCard(0)
            setBankList(res.data.onlineList)
            setIsData(true)
          } else {
            setIsData(false)
          }
        }
      )

  }, [])
  useEffect(() => {
    user.refetch()
    if (user.isSuccess) {
      if (userInfo.isLogin == false) {
        navigate("/")
        useGlobalVariables.setState({ depoModal: false })
      }
      axios.post('/userCenter/finance/checkoutCounterByType.do', {
        payType: bankList && bankList[activeCard],
      }, {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        }
      }).then(
        (res) => {
          if (userInfo.isLogin == false) {
            navigate("/")
          }
          if (res.data.onlineList) {
            setOnlineLists(res.data.onlineList)
            if (res?.data?.onlineList[0]?.id) {
              hotDiscount.mutate({
                depositType: 1,
                payId: res?.data?.onlineList[0]?.id,
              })
            }
            if (res.data.onlineList[0]) {
              if (res.data.onlineList[0]) {
                setRemarkValue(res.data.onlineList[0].pcRemark)
              }
            }
          }
        }
      )
    }
  }, [bankList, activeCard])
  const setActiveCarnow = (cardID: any) => {
    if (cardID.bankName == "USDT") {
    }
    else {
      setActiveCard(cardID)
      setActiveChannel(0)
    }
  }
  const activeChannels = (cardID: any) => {
    if (cardID.bankName == "USDT") {
    }
    else {
      settotalBonus(0)
      setbonusValue("")
      setActiveChannel(cardID)
    }
  }
  const activeChannelss = (cardID: any, remark: any) => {
    if (cardID.bankName == "USDT") {
    }
    else {
      settotalBonus(0)
      setbonusValue("")
      setActiveChannel(cardID)
      setRemarkValue(remark)
    }
  }
  const handleChange3 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
    if (event.target.checked == true) {
      settotalBonus(0)
      setbonusValue(0)
    }
    else {

    }
  };

  const [giftValue, setGiftValue] = useState(0)
  const [myBonusTypes, setBonusTypes] = useState(1)

  const hotDiscount = useGetDiscountAmount()

  useEffect(() => {
    if (checked == false) {
      if (!onlineList) { return }
      if (bonusValue >= onlineList[activeChannel].min && bonusValue <= onlineList[activeChannel].max) {
        axios.post('/userCenter/finance/getDepositStragety.do', {
          depositType: props.types,
          money: bonusValue,
          payId: onlineList && onlineList[activeChannel].id,
        }, {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "X-Requested-With": "XMLHttpRequest",
          }
        }
        )
          .then((res) => {
            if (res.data.content) {
              setIsbonus(true)
              if (res.data.content.valueType != 3) {
                let giftval = res.data.content.giftValue
                if (res.data.content.giftType === 1 && bonusValue >= res.data.content.minMoney) {
                  settotalBonus(giftval)
                } else if (res.data.content.giftType === 2 && bonusValue) {
                  settotalBonus((parseInt(bonusValue) * giftval) / 100)
                } else {
                  settotalBonus(0)
                }
                setBonusTypes(res.data.content.valueType)
              }
              setGiftValue(res.data.content.giftValue)
            }
            else {
              setIsbonus(false)
              settotalBonus(0)
            }
          })
      }
    }


  }, [bonusValue, checked])

  const moneyUnit = useGlobalVariables(state => state.stationConfig)
  const handleDepositOnline = () => {
    if (checked == true) {
      var joinType = 1
    }
    else {
      var joinType = 2
    }
    axios.post('/userCenter/finance/pay.do', {
      amount: Math.round(bonusValue * 100) / 100,
      payId: onlineList && onlineList[activeChannel].id,
      bankCode: bankList[activeCard],
      joinDepositGift: joinType,
    }, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
      }
    })
      .then((res) => {
        if (res.data.success == true) {
          // ToastrPngk({ msg: res.data.msg, type: "success" })
          // setTutOpen(true)
          window.open(res.data.url, "_blank", "noreferrer");
        }
        else {
          ToastrPngk({ msg: res.data.msg, type: "error" })
        }
      })
  }
  function updateTotal(e: any) {
    setbonusValue(e.target.value)
  }
  function setTotalValue(e: any) {
    settotalBonus(e.target.value)
  }

  const remakrs = (value: any) => {
    setOpenRemark(true)
    setRemarkValue(value)
  }
  const closeRemark = () => {
    setOpenRemark(false)
  }

  const [tutOpen, setTutOpen] = useState(false)
  const openTut = () => {
    setTutOpen(true)
  }

  const depoHot = depositeDiscount?.hot?.split(",")

  return (
    <>
      <AlertModal openAlert={openRemark} closeAlert={closeRemark} hasConfirm={false} alertTitle={t("ts052", { ns: "ts" })} >
        <div className="depoRemarkContainer">
          <span>{remarkValue}</span>
        </div>
      </AlertModal>
      <DialogueModal close={() => setTutOpen(false)} openModal={tutOpen} title="Deposit Tutorial">
        <div className="w-[5rem] h-[5rem]"></div>
      </DialogueModal>
      <div className="transferMainContainer">
        <>
          <div className="cardMainContainer">
            {moneyUnit?.stationCode === "yd101" || moneyUnit?.stationCode === "yd102" ?
              <>
                <div className="ydMainContainer">
                  {bankList && bankList.map((bankName: any, index: any) =>
                    <div key={index} className="ydContainer" onClick={() => setActiveCarnow(index)}>
                      <div className="ydImageBox">
                        <img src={"/depositModalImages/" + bankName.toLowerCase() + ".png"} alt="" className="ydLogo" />
                      </div>
                      <div className="ydNameBox">
                        <span className="ydName">{bankName}</span>
                      </div>
                      <div className={activeCard === index ? "activeBox active" : "activeBox"}>
                        <ThumbUpIcon style={{ background: "transparent", width: ".15rem", height: ".15rem", color: "#fff" }} />
                      </div>
                    </div>
                  )}
                </div>
              </>
              :
              <>
                <div className="cardContainervs">
                  {bankList ? bankList.map((bankName: any, index: any) =>
                    <div className="checkContainers" style={{ width: "90.1%" }}>
                      <div style={activeCard == index ? { width: "100%", justifyContent: "space-between", border: "2px solid " + colorP.forGround } : { width: "100%", border: "1px solid" + colorP.fourth }} onClick={() => setActiveCarnow(index)} className="bankCards2" key={index}>
                        <img width={35} src={bankName.icon ? bankName.icon : "/images/pix.png"} alt="" />
                        <div className="bnkNames" style={{ color: colorP.forGround }}>{bankName}</div>
                      </div>
                      <div style={{ background: colorP.forGround, color: colorP.forGround }} className={"badge " + ((activeCard == index) ? "active" : "")} >
                        <Avatar style={{ background: "transparent", width: ".15rem", height: ".15rem", color: colorP.text2 }}><CheckIcon className="checkIcon" style={{ fontSize: 30, color: colorP.text2, width: ".22rem", height: ".22rem" }}></CheckIcon></Avatar>
                      </div>
                    </div>
                  ) : <></>}
                </div>
              </>
            }
          </div>
          <hr style={{ borderColor: colorP.fourth }} />
          <div className="cardMainContainer" style={remarkValue ? { margin: ".1rem 0 0 0" } : { margin: ".1rem 0 .1rem 0" }}>
            {moneyUnit?.stationCode === "yd101" || moneyUnit?.stationCode === "yd102" ?
              <>
                <div className="ydMainContainer">
                  {onlineList && onlineList.length !== 0 ? onlineList.map((value: any, index: any) =>
                    <div key={index} className="ydContainer" onClick={() => activeChannels(index)}>
                      <div className="ydImageBox">
                        <img src={value.icon} alt="" className="ydLogo" />
                      </div>
                      <div className="ydNameBox">
                        <span className="ydName">{value.payAlias ? value.payAlias : value.payName}</span>
                      </div>
                      <div className={activeChannel === index ? "activeBox active" : "activeBox"}>
                        <ThumbUpIcon style={{ background: "transparent", width: ".15rem", height: ".15rem", color: "#fff" }} />
                      </div>
                    </div>
                  ) : <></>}

                </div>
                {remarkValue &&
                  <div className="ramRem" style={{ marginTop: ".05rem" }}>
                    <span className="remRam">{t("ts052", { ns: "ts" })}: {remarkValue}</span>
                  </div>
                }
              </>
              :
              <>
                <div className="cardContainervs channel">
                  {onlineList && onlineList?.map((value: any, index: any) =>
                    <>
                      <div className="depocardSelection">
                        <div className="checkContainers">
                          <div style={activeChannel == index ? { width: "100%", justifyContent: "center", gap: ".5rem", border: "2px solid " + colorP.forGround } : { width: "100%", justifyContent: "center", gap: ".5rem", border: "1px solid" + colorP.fourth }} onClick={() => activeChannelss(index, value.pcRemark)} className="bankCards2" key={index}>
                            {value.icon && <img style={{ width: ".84rem" }} src={value.icon} alt="" />}
                            <span style={activeChannel == index ? { color: colorP.forGround } : { color: colorP.text }}>{value.payAlias ? value.payAlias : value.payName}</span>
                          </div>
                          <div style={{ background: colorP.forGround, color: colorP.forGround }} className={"badge " + ((activeChannel == index) ? "active" : "")} >
                            <Avatar style={{ background: "transparent", width: ".15rem", height: ".15rem", color: colorP.text2 }}><CheckIcon className="checkIcon" style={{ fontSize: 30, color: colorP.text2, width: ".22rem", height: ".22rem" }}></CheckIcon></Avatar>
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </div>
                {remarkValue &&
                  <div className="ramRem">
                    <span className="remRam">{t("ts052", { ns: "ts" })}: {remarkValue}</span>
                  </div>
                }
              </>
            }
          </div>
          <hr style={{ borderColor: colorP.fourth }} />
          <div className="inputContainer" style={{ fontSize: ".18rem", color: colorP.text }}>
            {t("ts397", { ns: "ts" })}
            <div className="valueContainer">
              {
                onlineList && onlineList[activeChannel]?.fixedAmount && onlineList[activeChannel]?.fixedAmount.split(',').map((values: any, index: any) =>
                  <div style={values == bonusValue ? { color: colorP.forGround, borderColor: colorP.forGround } : { color: colorP.text, borderColor: colorP.fourth }} className={values == bonusValue ? "value active flex justify-center" : "value flex justify-center"} key={index} onClick={() => setbonusValue(values)}>
                    {(depoHot?.filter((entry: any) => entry === values).toString() === values.toString()) && <img src="/images/hot.png" className="absolute top-0 left-0 w-[.4rem]" alt="" />}
                    <div className="flex flex-col leading-none gap-[.05rem]">
                      {values}
                      {depositeDiscount?.money[values] && <span className="text-[.15rem]">+{depositeDiscount?.money[values]}{depositeDiscount?.valueType === 1 ? t("ts1301", { ns: "ts" }) : t("ts1302", { ns: "ts" })}</span>}
                    </div>
                    <div className="checkIcon" style={{ background: colorP.forGround, color: colorP.forGround, borderColor: colorP.forGround }}><CheckIcon className="checkIcon" style={{ fontSize: 30, color: colorP.text, width: "1.4rem", height: "1.4rem" }}></CheckIcon></div>
                  </div>
                )
              }
            </div>
            {onlineList && onlineList[activeChannel]?.isFixedAmount == 1 &&
              <Box
                sx={{
                  ".depoValue:hover": {
                    borderColor: colorP.forGround
                  },
                  ".depoValue": {
                    borderColor: colorP.fourth
                  },
                  "input::placeholder": {
                    opacity: 1,
                    color: colorP.text
                  },
                  "input": {
                    color: colorP.text
                  }
                }}
              >
                <div className="depoValue">
                  <span style={{ color: colorP.text, fontSize: "18px" }}>{moneyUnit?.moneyUnit}</span>
                  <input defaultValue={bonusValue} value={bonusValue} onChange={updateTotal} type="number" name="" id="" placeholder={t("ts968", { ns: "ts" }) + " " + onlineList[activeChannel]?.min + ", " + t("ts969", { ns: "ts" }) + " " + onlineList[activeChannel]?.max} />
                </div>
              </Box>
            }
            <div className="formController" style={{ fontSize: "18px" }}>
              {isBonus === true &&
                <div className="flex items-center gap-[.2rem]">
                  <TextField sx={{
                    width: 320,
                    "& .MuiInputBase-root": {
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: colorP.fourth + " !important",
                        fontSize: "18px"
                      },
                      "& .MuiOutlinedInput-input": {
                        color: colorP.text + "  !important",
                        fontSize: "18px"
                      },
                    },
                    "& .MuiFormLabel-root": {
                      color: "#808080 !important",
                      fontSize: "18px"

                    },
                    "& .MuiOutlinedInput-root.Mui-focused": {
                      "& .MuiOutlinedInput-notchedOutline": {
                        border: "2px solid !important",
                        borderColor: colorP.fourth + " !important",
                        fontSize: "18px"
                      }
                    }
                  }}
                    id="outlined-read-only-input" margin="dense" size="small" value={totalBonus} defaultValue="0" label={myBonusTypes === 1 ? t("ts1301", { ns: "ts" }) : myBonusTypes === 3 ? t("ts1302", { ns: "ts" }) : t("ts222", { ns: "ts" })} InputProps={{ readOnly: true, }} />
                  {/* <span className="">Gift amount/number of times: {giftValue}</span> */}
                </div>
              }
            </div>
            {isBonus === true && <FormControl
              sx={{
                "&  .MuiFormControlLabel-root": {
                  width: "max-content",
                  fontSize: "18px !important"
                }
              }}
            >
              <FormControlLabel sx={{
                "&  .MuiTypography-root": {
                  color: "#747474 !important",
                  fontSize: "18px"
                }
              }} label={t("ts215", { ns: "ts" })} control={<Checkbox sx={{
                "& .MuiSvgIcon-root": {
                  color: "#747474 !important",
                  fontSize: "18px"
                }
              }} checked={checked} onChange={handleChange3} />} />
            </FormControl>}
            {moneyUnit?.stationCode === "bx101" ?
              <>
                <p className="winbetRemark" style={{ color: colorP.id === 21 ? colorP.text4 : colorP.text2 }}>
                  {t("ts1255", { ns: "ts" })}
                  <span style={{ color: colorP.id === 21 ? colorP.text4 : colorP.forGround, }}> {t("ts1259", { ns: "ts" })}
                    <span style={{ color: colorP.id === 21 ? colorP.text4 : colorP.forGround, fontSize: "0.18rem" }}> 25% </span>
                    {t("ts1273", { ns: "ts" })}
                  </span>
                  <span style={{ color: colorP.id === 21 ? colorP.text4 : colorP.text2 }}>{t("ts1260", { ns: "ts" })}</span>
                </p>
                <p className="winbetRemark" style={{ color: colorP.id === 21 ? colorP.text4 : colorP.text2 }}>{t("ts1256", { ns: "ts" })}</p>
                <p className="winbetRemark" style={{ color: colorP.id === 21 ? colorP.text4 : colorP.text2 }}>{t("ts1257", { ns: "ts" })}</p>
                <p className="winbetRemark" style={{ color: colorP.id === 21 ? colorP.text4 : colorP.text2 }}>{t("ts1258", { ns: "ts" })} <span style={{ color: colorP.forGround, fontSize: "0.18rem" }} > 100% </span>{t("ts1274", { ns: "ts" })}</p>
              </>
              : <></>}
            <div className="buttonContainer" style={{ lineHeight: "0" }}>
              <Button variant="contained" sx={{
                color: colorP.third + "!important",
                backgroundColor: colorP.forGround + " !important",
                borderRadius: ".1rem"
              }} className="configButton" onClick={handleDepositOnline}>{t("ts986", { ns: "ts" })}</Button>
            </div>
          </div>

        </>
      </div >
    </>
  )

}
export default BankCardsModal;