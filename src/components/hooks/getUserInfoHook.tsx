
import { useMutation, useQuery, useQueryClient } from "react-query";
import { axiosPost, axiosGet, axiosPost2, axiosGet2, axiosPost3 } from "./ajaxHook";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router";
import axios from "axios";
import { useAlertStates, useButtonStates, useGenerateOTP, useGenerateOTPRegister, useGlobalList, useGlobalVariables, useLoginStore, useModalState, useModalStates, useSelectTypes, useSetEnvelopValue, useSetlang, useShowWithdraw, useSignInStore, useVoucher, useWithdrawPass, userRegstore } from "../globalFunctions/store";
import { ToastrPngk } from "../globalFunctions/toastr";
import i18n from "../../i18n";
import { useTranslation } from "react-i18next";
import { useReducer } from "react";
import { dateReducer, initialDate } from "../main/reducers/dateReduce";
import { useCurnew, useGetSignin, useGetSigninRules } from "./curstomHooks";
import { activeUser } from "./actions";
import { useFetchCarouselImage } from "./carouselHook";
export const useDiscount = () => {
    return useQuery({
        queryKey: ["discountDetails"],
        retryOnMount: false,
        enabled: false,
        staleTime: 3000,
        queryFn: async () => (await axiosGet("/getFirstDepositAct.do"))
    })

}
const getRedep = (payLoad?: any) => {
    const url = '/userCenter/report/depositRecordList.do'
    return axiosPost2(url, payLoad)
}

export const useGetDepositReport = () => {
    const { t, i18n } = useTranslation(["home", "main"]);
    return useMutation({
        mutationFn: getRedep,
        onSuccess: (data) => {
            if (data?.success == false) {
                ToastrPngk({ msg: data?.msg, type: "error" })
            }
            else {
                useGlobalVariables.setState({ depositReport: data })
                ToastrPngk({ msg: data?.msg, type: "success" })
            }

        }
    })
}
export const useGetUserAllInfo = (payload: any) => {
    const [commonReducer] = useReducer(dateReducer, initialDate)
    return useQuery({
        queryKey: ["userInfo"],
        staleTime: 0,
        queryFn: async () => (await axiosPost("/userCenter/userAllInfo.do", payload)),
        onSuccess: (data: any) => {
            if (data.data.success == false) {
                ToastrPngk({ msg: data.data.msg, type: "error", id: "1asd" })
            }
        }
    })
}

export const useGetUserVIP = () => {
    const refreshBal = useRefreshBal()
    const userDetails = useGlobalVariables(state => state.userDetails)
    return useQuery({
        queryKey: ["degInfo"],
        staleTime: 0,
        enabled: false,
        queryFn: async () => (await axiosGet("/userCenter/info/getDegreeInfo.do")),
        onSuccess: (data) => {
            useGlobalList.setState({ vipInfo: data })
        }
    })
}

export const useGetVIPCollection = () => {
    return useQuery({
        queryKey: ["getVIPCollection"],
        staleTime: 0,
        enabled: false,
        queryFn: async () => (await axiosGet2("/getVips.do?load=true&pageSize=45")),
        onSuccess: (data) => {
            useGlobalVariables.setState({ vipCollection: data })
        }
    })
}

export const useGetUserInfo = () => {
    return useQuery({
        queryKey: ["userDetails"],
        enabled: false,
        refetchInterval: 0,
        queryFn: async () => (await axiosGet("/userCenter/info/getAccInfo.do")),
        onSuccess: (data: any) => {
            useGlobalVariables.setState({
                userDetails: data.data
            })
            if (useGlobalList.getState().updateStatus === true) {
                setTimeout(function () {
                    useGlobalList.setState({ banalanceUpdate: false })
                    useGlobalList.setState({ updateStatus: false })
                }, 5000);
            }
        },
        onError: (error: any) => {

        }
    })

}

export const useGetConfig = () => {
    return useQuery({
        queryKey: ["getConfigAll"],
        enabled: false,
        queryFn: async () => (await axiosGet("/userCenter/getConfig.do")),
        onSuccess: (data: any) => {
            useGlobalVariables.setState({
                userConfig: data.data
            })
        }
    })
}

export const useGetFactoryGames = (id?: any, pageQty?: any, pageNumber?: any) => {
    return useQuery({
        queryKey: ["userSubgames", id],
        queryFn: async () => (await axiosGet("/getFactoryGames.do", { platformType: id, pageSize: pageQty, pageNumber: pageNumber })),
        staleTime: 1000 * 60 * 60 * 24,
    })
}
export const useGetEvents = () => {
    return useQuery({
        queryKey: ["eventsGame"],
        queryFn: async () => (await axiosGet("  /getActivityCenterList.do?load=true")),
        staleTime: 0,
        onSuccess(data) {
            console.log(data)
        },
    })

}
export const useGetTurnlateData = () => {
    const turnType = useButtonStates(state => state.turnLateType)
    return useQuery({
        queryKey: ["ThisGetsDataFromTheTurnLateTable"],
        enabled: false,
        queryFn: async () => (await axiosGet("/getTurnPrize.do?type=" + turnType)),
        staleTime: 0,
        onSuccess(data) {
            useGlobalVariables.setState({ turnlate: data?.data })
        },
    })
}

export const useGetTurnlateList = () => {
    return useQuery({
        queryKey: ["ThisGetsDataFromTheTurnLateTableList"],
        enabled: false,
        queryFn: async () => (await axiosGet2("/getTurnTableList.do")),
        staleTime: 0,
        onSuccess(data) {
            useGlobalVariables.setState({ turnlateList: data })
        },
    })
}

export const useGetTurnlateDataType5 = () => {
    const navigate = useNavigate();
    return useQuery({
        queryKey: ["ThisGetsDataFromTheTurnLateTableType5"],
        enabled: false,
        queryFn: async () => (await axiosGet("/getTurnPrize.do?type=5")),
        staleTime: 0,
        onSuccess(data) {
            useGlobalVariables.setState({ turnlateType5: data?.data })
        },
    })
}

export const useGetHotGames = () => {
    return useQuery({
        queryKey: ["HotGames"],
        queryFn: async () => (await axiosGet("/getUserHotGames.do", { limitNum: "6" })),
        staleTime: 1000 * 60 * 2,
    })

}
export const useGetArticles = () => {
    var lang = localStorage.getItem('i18nextLng')
    return useQuery({
        queryKey: ["articles"],
        queryFn: async () => (await axiosGet("/articleList.do?type=7&language=" + lang)),
        staleTime: 0,
    })

}

const openGame = (payload?: any) => {
    const { url, gameType } = payload
    if (gameType === "fb") {
        var result = url.replace("mobile=1", "mobile=2")
    }
    else {
        var result = url.replace("mobile=1", "mobile=1")
    }
    return axiosGet(result + "&load=true")
}
export const useOpenGame = (payload?: any) => {
    const quertClient = useQueryClient()
    const userDet = useGetUserInfo()
    return useMutation({
        mutationFn: openGame,
        onSuccess: (data, variables) => {
            userDet.refetch()

        }

    })
}
const refreshBal = () => {
    return axiosPost("/autoTranout.do")
}
export const useRefreshBal = (url?: any) => {
    const quertClient = useQueryClient()
    const userDet = useGetUserInfo()
    return useMutation({
        mutationFn: refreshBal,
        onSuccess: () => {
            setTimeout(() => {
                userDet.refetch()
            }, 5000)
        }
    })
}

export const useGetRegFields = () => {
    const quertClient = useQueryClient()
    return useQuery({
        queryKey: ["RegFields"],
        queryFn: async () => (await axiosPost("/regConfigData.do")),
        onSuccess(data) {
            useGlobalVariables.setState({ regFields: data.data })

        },
     
    })
}
export const useStationConfig = () => {
    const quertClient = useQueryClient()
    const pubData = useGEtPublicList()
    const banner = useFetchCarouselImage()
    return useQuery({
        queryKey: ["StationConfig"],
        queryFn: async () => (await axiosPost("/userCenter/getStationConfig.do?load=true&app=true")),
        staleTime: 10000,
        onSuccess: (data) => {
            const deff = localStorage.getItem('defAultLang')
            var language
            // const language = data?.data?.stationDefaultLanguage==="en" ? data?.data?.stationDefaultLanguage : data?.data?.lang
            if (!deff) {
                language = data?.data?.stationDefaultLanguage
                localStorage.setItem('defAultLang', language);
                localStorage.setItem('i18nextLng', language);
                i18n.changeLanguage(language);

            }
            quertClient.invalidateQueries("userGames");
            useGlobalVariables.setState({ stationConfig: data?.data })
            pubData.refetch()
            banner.refetch()
        }
    })
}
const storage = (payload: any) => {
    return payload;
}
export const useGameDetailsStore = (payload?: any) => {
    return useQuery({
        queryKey: ["GameDetails"],
        enabled: false,
        queryFn: async () => storage(payload),
        staleTime: 1000 * 60 * 2,
    })
}
const joinActivities = (payload: any) => {
    const { id, message } = payload
    const url = '/joinAct.do'
    return axiosGet(url, { actId: id, answer: message })
}
export const useJoinActibity = () => {
    const quertClient = useQueryClient()
    return useMutation({
        mutationFn: joinActivities,
        onSuccess: () => {
            quertClient.invalidateQueries("joinActivity");
        }
    })
}
export function useGetActivityDetails(id: any) {
    return useQuery({
        queryKey: ["events", id],
        queryFn: async () => (await axios.post("/getActDetail.do", {
            actId: id
        }, {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
            }
        })).data,
        staleTime: 0,
    })
}
const login = (payload: any) => {

    if (payload.type === "v2") {
        return axiosPost('/emailRegister.do', payload)
    }
    else if (payload.type === "v3") {
        return axiosPost('/userCenter/sms/smsRegister.do', payload)
    }
    else {

        return axiosPost('/login.do', payload)
    }

}
export const useLogin = () => {
    const quertClient = useQueryClient()
    const userInfo = useGetUserVIP()
    const rules = useGetSigninRules()
    const staConfig = useStationConfig()
    const sigIn = useGetSignin()
    const configAll = useGetConfig()
    const userDet = useGetUserInfo()
    const turnlateDatas = useGetTurnlateData();
    const turnDataType5 = useGetTurnlateDataType5()
    const getPrizes = useGetTurnTablePrize()
    const nomToday = useNomToday()
    const checkedRemember = useSignInStore(state => state.rememberMe)
    const useCon = useGlobalVariables((state) => state.stationConfig);
    const vipCollection = useGetVIPCollection()
    const turnlateList = useGetTurnlateList()
    const turnTableData = useGetTurnTableRecord();
    const FirstInstallAppTask = useFirstInstallAppTask()
    const redEnv = useCurnew()
    const vip = useGetUserVIP()
    return useMutation({
        mutationFn: login,
        onSuccess: (data, variables) => {
            if (data.data.success === true) {
                vip.refetch()
                redEnv.refetch()
                if (redEnv.data && useCon.isMainPageShowRedBag == true && useCon.isRedBag == true) {
                    if (redEnv.data?.content?.code === 200 && redEnv.data?.content?.ruleUrl) {
                        useModalStates.setState({ ruleModal: true });
                    } else if (redEnv.data) {
                        useSetEnvelopValue.setState({ envelopeValue: true });
                    }
                }
                if (useCon.isInvestmentPopup) {
                    useModalState.setState({ open: true })
                }

                ToastrPngk({ msg: data.data.msg, type: "success", id: "001" })
                userDet.refetch()
                staConfig.refetch()
                configAll.refetch()
                turnDataType5.refetch()
                nomToday.refetch()
                turnlateDatas.refetch()
                getPrizes.refetch()
                turnlateList.refetch()
                turnTableData.refetch()
                FirstInstallAppTask.refetch()
                quertClient.invalidateQueries("discountDetails");
                quertClient.invalidateQueries("Notices");
                quertClient.invalidateQueries("moneyType");
                quertClient.invalidateQueries("promoRebates");
                useLoginStore.setState({ isOpen: false })
                useGenerateOTP.setState({ otp: '/loginVerifycode.do?timestamp=' + Date.now() })
                userInfo.refetch()

                // if (staConfig?.data?.data.onOffCoupon === true) {
                //     useModalState.setState({ redeem: true })
                // }

                rules.refetch()
                sigIn.refetch()
                vipCollection.refetch()
                activeUser()
                useSignInStore.setState({ captcha: "" })
                if (checkedRemember === false) {
                    useSignInStore.setState({ rememberMe: false })
                    useSignInStore.setState({ userName: "" })
                    useSignInStore.setState({ password: "" })
                }
                else {
                    useSignInStore.setState({ userName: variables.username, password: variables.password, rememberMe: checkedRemember })
                }

                useGlobalVariables.setState({ isFav: false })

                if (turnDataType5.isLoading == false && turnDataType5.isSuccess == true) {
                    setTimeout(() => {
                        useGlobalVariables.setState({ turnLateModal: true })
                    }, 1500)
                }

                if (useCon.isShowOnSign == true) {
                    useModalStates.setState({ calendarModal: false })
                }
                useButtonStates.setState({ turnLateButton: true })
                useButtonStates.setState({ turnLateMain: false })
                useModalStates.setState({ public: true })
                useModalStates.setState({ turnModalLogin: true })
                useModalStates.setState({ firstInstallModal: true })
                localStorage.setItem("isModalLog", "true")
            }
            else {

                ToastrPngk({ msg: data.data.msg, type: "error", id: "00231" })
                useGenerateOTP.setState({ otp: '/loginVerifycode.do?timestamp=' + Date.now() })
            }
        }
    })
}

export const useGetWaitPickTasks = () => {
    const navigate = useNavigate();
    return useQuery({
        queryKey: ["getWaitPickTasks"],
        enabled: false,
        queryFn: async () => (await axiosGet("/getWaitPickTasks.do")),
        staleTime: 0,
        onSuccess: (data) => {
            if (data.data.success == false) {
                ToastrPngk({ msg: data.data.msg, type: "error", id: "00231" })
                navigate("/")
            } else {
                useGlobalVariables.setState({ pendingTask: data.data })
            }

        }
    })
}
export const useGetSsalary = () => {
    return useQuery({
        queryKey: ["sallaryInfo"],
        enabled: false,
        queryFn: async () => (await axiosGet2("/userCenter/deposit/getDepositGrowthStrategy.do")),
        staleTime: 0,
        onSuccess: (data) => {
            useGlobalVariables.setState({ salaryStrategy: data })
        }
    })
}

const collectBonus = () => {
    const url = '/pickActs.do'
    return axiosGet(url)
}

export const usePickActs = () => {
    const quertClient = useQueryClient()
    const getWait = useGetWaitPickTasks()
    return useMutation({
        mutationFn: collectBonus,
        onSuccess: (data) => {
            if (data?.data.success == true) {
                quertClient.invalidateQueries("getWaitPickTasks");
                getWait.refetch()
                ToastrPngk({ msg: data?.data.msg, type: "success", id: "getAllSuccess" })
            } else {
                ToastrPngk({ msg: data?.data.msg, type: "error", id: "getAllError" })
            }
        }
    })
}

const collectBonusPerPick = (id: any) => {
    const url = '/pickAct.do'
    return axiosGet(url, { actId: id })
}

export const usePickAct = () => {
    const quertClient = useQueryClient()
    const getWait = useGetWaitPickTasks()
    return useMutation({
        mutationFn: collectBonusPerPick,
        onSuccess: (data) => {
            if (data?.data.success == true) {
                quertClient.invalidateQueries("getWaitPickTasks");
                getWait.refetch()
                ToastrPngk({ msg: data?.data.msg, type: "success", id: data?.request?.responseURL })
            } else {
                ToastrPngk({ msg: data?.data.msg, type: "error", id: data?.request?.responseURL })
            }
        }
    })
}

const getNom = (payload: any) => {
    const { startDate, endDate } = payload
    const url = '/userCenter/inviteOverview2.do?ver=3'
    return axiosGet(url, { startTime: startDate, endTime: endDate })
}

export const useGetNom = () => {
    const quertClient = useQueryClient()
    return useMutation({
        mutationFn: getNom,
        onSuccess: () => {

        }
    })
}






export const useNomToday = () => {
    const cookies = new Cookies();
    var lang = localStorage.getItem('i18nextLng')
    return useQuery({
        queryKey: ["useNomToday"],
        enabled: false,
        staleTime: 0,
        queryFn: async () => (await axiosGet("/userCenter/inviteOverview2.do")),
        onSuccess: (data) => {
            useGlobalVariables.setState({ inviteOverview2: data.data })
        }
    })
}

export const useNomV3 = () => {
    const cookies = new Cookies();
    var lang = localStorage.getItem('i18nextLng')
    return useQuery({
        queryKey: ["useNomToday"],
        enabled: false,
        staleTime: 0,
        queryFn: async () => (await axiosGet("/userCenter/inviteOverview2.do?ver=3"))
    })
}

export const useGetNotice = () => {
    const cookies = new Cookies();
    var lang = localStorage.getItem('i18nextLng')
    return useQuery({
        queryKey: ["Noticess"],
        enabled: false,
        staleTime: 0,
        queryFn: async () => (await axiosGet("/newNotices.do?code=9&language=" + lang)),
        onSuccess: (data) => {
            useGlobalVariables.setState({ noticeData: data.data })
        }
    })
}

export const useGetGames = (payload?: any) => {
    const lang = localStorage.getItem('defAultLang');
    return useQuery({
        queryKey: ["userGameshs", lang],
        queryFn: async () => (await axiosGet("/getGames.do?type=11&limitNum=50&lang=" + lang)),
        staleTime: 10000,
        onSuccess: (data) => {
            if (data.data.success == false) {
                // navigate("/")
            }
            else {
                useGlobalVariables.setState({ gameTabs: data?.data })
            }

        }
    })
}

export const useGetChangeReportType = () => {
    return useQuery({
        queryKey: ["moneyType"],
        staleTime: 0,
        enabled: false,
        retryOnMount: false,
        queryFn: async () => (await axiosGet("/userCenter/report/moneyHistoryInfo.do?load=true")),
        onSuccess: (data) => {
            useSelectTypes.setState({ accountChangeReport: data?.data })
        }
    })
}

const useGetMoneyHistory = (payLoad: any) => {
    const url = '/userCenter/report/moneyHistoryList.do'
    return axiosPost(url, payLoad)
}

export const useGetMonHistory = () => {
    return useMutation({
        mutationFn: useGetMoneyHistory,
        onSuccess: (data) => {
            if (data?.data.success == true) {
                ToastrPngk({ msg: data?.data.msg, type: "success" })
            } else {
                ToastrPngk({ msg: data?.data.msg, type: "error" })
            }
        }
    })
}

const useGetPersonalInfo = (payLoad: any) => {
    const url = '/userCenter/report/personReport.do'
    return axiosPost(url, payLoad)
}

export const useGetPersonal = () => {
    return useMutation({
        mutationFn: useGetPersonalInfo,
        onSuccess: (data) => {
            if (data?.data.success == true) {
                ToastrPngk({ msg: data?.data.msg, type: "success" })

            } else {
                ToastrPngk({ msg: data?.data.msg, type: "error" })
            }
        }
    })
}



export const useGetGenerateLinks = () => {
    return useQuery({
        queryKey: ["promoID"],
        enabled: false,
        queryFn: async () => (await axiosGet("/userCenter/agentManage/agentRegPromotion/list.do")),
        staleTime: 0,
    })
}

export const useGetPromoInfo = (userName: any) => {
    return useQuery({
        queryKey: ["promoRebates", userName],
        staleTime: 0,
        enabled: false,
        retryOnMount: false,
        queryFn: async () => (await axiosPost("/userCenter/agentManage/agentRegPromotionInfo.do")),
    })
}

const useGenerateLinks = (payLoad: any) => {
    const url = '/userCenter/agentManage/agentRegPromotion/save.do'
    return axiosPost(url, payLoad)
}

export const useGenerateLink = () => {
    const { t, i18n } = useTranslation(["home", "main"]);
    const quertClient = useQueryClient()
    const useGetGenerateLink = useGetGenerateLinks()
    return useMutation({
        mutationFn: useGenerateLinks,
        onSuccess: (data) => {
            if (data.data.success === true) {
                ToastrPngk({ msg: data.data.msg, type: "success" })
                quertClient.invalidateQueries("promoID");
                useGetGenerateLink.refetch()
            }
            else {
                ToastrPngk({ msg: data.data.msg, type: "error" })

            }
        }
    })
}

const useDeleteLinks = (promoID: any) => {
    const url = '/userCenter/agentManage/agentRegPromotion/delete.do'
    return axiosPost(url, { id: promoID })
}

export const useDeleteLink = () => {
    const { t, i18n } = useTranslation(["home", "main"]);
    const quertClient = useQueryClient()
    const useGetGenerateLink = useGetGenerateLinks()
    return useMutation({
        mutationFn: useDeleteLinks,
        onSuccess: (data) => {
            if (data.data.success === true) {
                ToastrPngk({ msg: data.data.msg, type: "success" })
                quertClient.invalidateQueries("promoID");
                useGetGenerateLink.refetch()
            }
        }
    })
}

const useGetBonusRecords = (payload: any) => {
    const url = '/userCenter/report/getUserGiftHisPage.do'
    return axiosPost(url, payload)
}

export const useGetBonusRecord = () => {
    const { t, i18n } = useTranslation(["home", "main"]);
    const quertClient = useQueryClient()
    return useMutation({
        mutationFn: useGetBonusRecords,
        onSuccess: (data) => {
            if (data.data.success === true) {
                ToastrPngk({ msg: data.data.msg, type: "success" })
            } else {
                ToastrPngk({ msg: data.data.msg, type: "error" })
            }
        }
    })
}

const useGetTransferRecord = (payload: any) => {
    const url = '/userCenter/exchangeHistory.do'
    return axiosPost(url, payload)
}

export const useTransferRecord = () => {
    const { t, i18n } = useTranslation(["home", "main"]);
    const quertClient = useQueryClient()
    return useMutation({
        mutationFn: useGetTransferRecord,
        onSuccess: (data) => {
            if (data.data.success === true) {
                ToastrPngk({ msg: data.data.msg, type: "success" })
            } else {
                ToastrPngk({ msg: data.data.msg, type: "error" })
            }
        }
    })
}

const useGetWithdrawalHistory = (payload: any) => {
    const url = '/userCenter/report/withdrawRecordList.do'
    return axiosPost(url, payload)
}

export const useGetWithdrawHistory = () => {
    const { t, i18n } = useTranslation(["home", "main"]);
    const quertClient = useQueryClient()
    return useMutation({
        mutationFn: useGetWithdrawalHistory,
        onSuccess: (data) => {
            if (data.data.success === true) {
                ToastrPngk({ msg: data.data.msg, type: "success" })
            } else {
                ToastrPngk({ msg: data.data.msg, type: "error" })
            }
        }
    })
}

export const useAgentTeamOver = (payload: any) => {

    return useQuery({
        queryKey: ["agentTeamOver"],
        staleTime: 1000 * 60 * 60,
        queryFn: async () => (await axiosGet("/userCenter/agentManage/agentTeam.do", payload)),
        onSuccess: (data) => {
            useGlobalVariables.setState({ teamData: data.data })
        }
    })
}

const useGetTeamList = (payload: any) => {
    const url = '/userCenter/agentManage/userTeamListData.do'
    return axiosPost(url, payload)
}

export const useGetTeam = () => {
    const { t, i18n } = useTranslation(["home", "main"]);
    const quertClient = useQueryClient()
    return useMutation({
        mutationFn: useGetTeamList,
        onSuccess: (data) => {
            if (data.data.success === true) {
                ToastrPngk({ msg: data.data.msg, type: "success" })
                quertClient.invalidateQueries("agentTeamOver");
            } else {
                ToastrPngk({ msg: data.data.msg, type: "error" })
            }
        }
    })
}

const useGetRebate = (payload: any) => {
    const url = '/userCenter/finance/getKickBackStrategy.do'
    return axiosPost(url, payload)
}

export const useGetRebateData = () => {
    const { t, i18n } = useTranslation(["home", "main"]);
    const quertClient = useQueryClient()
    return useMutation({
        mutationFn: useGetRebate,
        onSuccess: (data) => {
            if (data.data.success === true) {
                ToastrPngk({ msg: data.data.msg, type: "success" })
                quertClient.invalidateQueries("agentTeamOver");
            } else {
                ToastrPngk({ msg: data.data.msg, type: "error" })
            }
        }
    })
}

export const useCenterBill = () => {
    return useQuery({
        queryKey: ["userCenterBill"],
        staleTime: 1000 * 60 * 60,
        queryFn: async () => (await axiosGet("/userCenter/userCenterBill/issue.do")),
    })
}

const useBonusChart = (payload: any) => {
    const url = '/userCenter/userCenterBill/eChartData.do'
    return axiosPost2(url, payload)
}

export const useGetBonusChart = () => {
    const { t, i18n } = useTranslation(["home", "main"]);
    const quertClient = useQueryClient()
    return useMutation({
        mutationFn: useBonusChart,
        onSuccess: (data) => {
            if (data.success === true) {
                ToastrPngk({ msg: data.msg, type: "success" })
            } else {
                ToastrPngk({ msg: data.msg, type: "error" })
            }
        }
    })
}

const useGetData = (payload: any) => {
    const url = '/userCenter/getInviteAllDatas.do'
    return axiosGet(url, payload)
}

export const useGetAllData = () => {
    const { t, i18n } = useTranslation(["home", "main"]);
    const quertClient = useQueryClient()
    return useMutation({
        mutationFn: useGetData,
        onSuccess: (data) => {
            if (data?.data?.success === true) {
                ToastrPngk({ msg: data?.data?.msg, type: "success" })
            } else {
                ToastrPngk({ msg: data?.data?.msg, type: "error" })
            }
        }
    })
}

const useIncome = (payload: any) => {
    const url = '/userCenter/report/getUserIncomePage.do'
    return axiosGet(url, payload)
}

export const useGetIncome = () => {
    const { t, i18n } = useTranslation(["home", "main"]);
    const quertClient = useQueryClient()
    return useMutation({
        mutationFn: useIncome,
        onSuccess: (data) => {
            if (data?.data?.success === true) {
                ToastrPngk({ msg: data?.data?.msg, type: "success" })
            } else {
                ToastrPngk({ msg: data?.data?.msg, type: "error" })
            }
        }
    })
}

const useGetSubDepo = (payload: any) => {
    const url = 'userCenter/getDirectSubDeposits.do'
    return axiosGet(url, payload)
}

export const useDirectSubDeposit = () => {
    const { t, i18n } = useTranslation(["home", "main"]);
    const quertClient = useQueryClient()
    return useMutation({
        mutationFn: useGetSubDepo,
        onSuccess: (data) => {
            if (data?.data?.success === true) {
                ToastrPngk({ msg: data?.data?.msg, type: "success" })
            } else {
                ToastrPngk({ msg: data?.data?.msg, type: "error" })
            }
        }
    })
}

const useDirectSub = (payload: any) => {
    const url = 'userCenter/getDirectSubBets.do'
    return axiosGet(url, payload)
}

export const useGetDirectSub = () => {
    const { t, i18n } = useTranslation(["home", "main"]);
    const quertClient = useQueryClient()
    return useMutation({
        mutationFn: useDirectSub,
        onSuccess: (data) => {
            if (data?.data?.success === true) {
                ToastrPngk({ msg: data?.data?.msg, type: "success" })
            } else {
                ToastrPngk({ msg: data?.data?.msg, type: "error" })
            }
        }
    })
}

const useProxyRebate = (payload?: any) => {
    const url = 'userCenter/getTeamProxyRebateStrategy.do'
    return axiosGet(url, payload)
}

export const useGetProxyRebate = () => {
    return useMutation({
        mutationFn: useProxyRebate,
        onSuccess: (data) => {
            if (data?.data?.success === false) {
                ToastrPngk({ msg: data?.data?.msg, type: "error" })

            } else {
                useGlobalVariables.setState({ proxyRebate: data?.data })
                ToastrPngk({ msg: data?.data?.msg, type: "success" })
            }
        }
    })
}

const useMyPerformance = (payload: any) => {
    const url = 'userCenter/report/getUserAwardPage.do'
    return axiosGet(url, payload)
}

export const useGetMyPerformance = () => {
    const { t, i18n } = useTranslation(["home", "main"]);
    const quertClient = useQueryClient()
    return useMutation({
        mutationFn: useMyPerformance,
        onSuccess: (data) => {
            if (data?.data?.success === true) {

                ToastrPngk({ msg: data?.data?.msg, type: "success" })
            } else {
                ToastrPngk({ msg: data?.data?.msg, type: "error" })
            }
        }
    })
}

const useAwardDetail = (payload: any) => {
    const url = 'userCenter/report/getUserAwardDetail.do'
    return axiosGet(url, payload)
}

export const useGetAwardDetail = () => {

    return useMutation({
        mutationFn: useAwardDetail,
        onSuccess: (data) => {
            if (data?.data?.success === false) {

                ToastrPngk({ msg: data?.data?.msg, type: "error" })
            } else {
                useGlobalVariables.setState({ performanceDetails: data.data })
            }
        }
    })
}

export const useGetSecurityInfo = () => {
    return useQuery({
        queryKey: ["bankSecurityInfo"],
        staleTime: 0,
        enabled: false,
        retryOnMount: false,
        queryFn: async () => (await axiosGet("/userCenter/getSecurityInfo.do")),
        onSuccess: (data) => {
            if (data?.data?.success === false) {

            } else {
                useGlobalVariables.setState({ securityInfo: data?.data })
            }
        }
    })
}

const useRealName = (payload: any) => {
    const url = '/userCenter/updateRealName.do'
    return axiosPost2(url, payload)
}

export const useSaveRealName = () => {
    const { t, i18n } = useTranslation(["home", "main"]);
    const quertClient = useQueryClient()

    const getSecurityInfo = useGetSecurityInfo()

    return useMutation({
        mutationFn: useRealName,
        onSuccess: (data) => {
            if (data.success === true) {
                quertClient.invalidateQueries('bankSecurityInfo')
                useModalStates.setState({ realNameModal: false })
                useModalStates.setState({ bankCardModal: true })
                getSecurityInfo.refetch()
                ToastrPngk({ msg: data.msg, type: "success" })
            } else {
                ToastrPngk({ msg: data.msg, type: "error" })
            }
        }
    })
}

const useSaveWithdrawalPass = (payload: any) => {
    const url = '/userCenter/userPwdModifySave.do'
    return axiosPost2(url, payload)
}

export const useSaveWithdrawalPassword = () => {
    const quertClient = useQueryClient()

    const getSecurityInfo = useGetSecurityInfo()

    return useMutation({
        mutationFn: useSaveWithdrawalPass,
        onSuccess: (data) => {
            if (data.success === true) {
                quertClient.invalidateQueries('bankSecurityInfo')
                useShowWithdraw.setState({ type: 2 })
                getSecurityInfo.refetch()
                ToastrPngk({ msg: data.msg, type: "success" })
            } else {
                ToastrPngk({ msg: data.msg, type: "error" })
            }
        }
    })
}

const useSavePhone = (payload: any) => {
    const url = '/userCenter/updateSecurityInfo.do'
    return axiosPost2(url, payload)
}

export const useSavePhoneNumber = () => {
    const { t, i18n } = useTranslation(["home", "main"]);
    const quertClient = useQueryClient()

    const getSecurityInfo = useGetSecurityInfo()

    return useMutation({
        mutationFn: useSavePhone,
        onSuccess: (data) => {
            if (data.success === true) {
                quertClient.invalidateQueries('bankSecurityInfo')
                if (getSecurityInfo.isLoading == false && getSecurityInfo?.data?.data?.hasRealName == true) {
                    useModalStates.setState({ bankCardModal: true })
                }
                useModalStates.setState({ phoneModal: false })
                if (getSecurityInfo.isLoading == false && getSecurityInfo?.data?.data?.hasRealName == false) {
                    useModalStates.setState({ realNameModal: true })
                }
                getSecurityInfo.refetch()
                ToastrPngk({ msg: data.msg, type: "success" })
            } else {
                ToastrPngk({ msg: data.msg, type: "error" })
            }
        }
    })
}
const getDirectBonus = (payload: any) => {
    const url = 'userCenter/getDirectBonusData.do'
    return axiosGet2(url, payload)
}

export const useGetDirectBonus = () => {
    const { t, i18n } = useTranslation(["home", "main"]);
    const quertClient = useQueryClient()
    return useMutation({
        mutationFn: getDirectBonus,
        onSuccess: (data) => {
            if (data.success === false) {
                ToastrPngk({ msg: data.msg, type: "error" })

            } else {
                useGlobalVariables.setState({ directBonus: data })
                ToastrPngk({ msg: data.msg, type: "success" })
            }
        }
    })
}

const getDirectData = (payload: any) => {
    const url = 'userCenter/getDirectData.do'
    return axiosGet2(url, payload)
}

export const useGetDirectData = () => {
    return useMutation({
        mutationFn: getDirectData,
        onSuccess: (data) => {
            if (data.success === false) {
                ToastrPngk({ msg: data.msg, type: "error" })

            } else {
                useGlobalVariables.setState({ directData: data })
                ToastrPngk({ msg: data.msg, type: "success" })
            }
        }
    })
}

const getDepoInfo = (payload: any) => {
    const url = 'userCenter/inviteDeposits.do'
    return axiosGet2(url, payload)
}

export const useGetDepoInfo = () => {
    return useMutation({
        mutationFn: getDepoInfo,
        onSuccess: (data) => {
            if (data.success === false) {
                ToastrPngk({ msg: data.msg, type: "error" })
            } else {
                useGlobalVariables.setState({ directData: data })
                ToastrPngk({ msg: data.msg, type: "success" })
            }
        }
    })
}

const getBonusInfo = (payload: any) => {
    const url = 'userCenter/inviteBonus.do'
    return axiosGet2(url, payload)
}

export const useGetBonusInfo = () => {
    return useMutation({
        mutationFn: getBonusInfo,
        onSuccess: (data) => {
            if (data.success === false) {
                ToastrPngk({ msg: data.msg, type: "error" })
            } else {
                useGlobalVariables.setState({ directData: data })
                ToastrPngk({ msg: data.msg, type: "success" })
            }
        }
    })
}

const logOut = () => {
    const url = '/native/v2/logout.do'
    return axiosPost(url)
}

export const useLogout = () => {
    const navigate = useNavigate()
    const userInfo = useGetUserInfo()
    const userconfig = useGetConfig()
    const quertClient = useQueryClient()
    const turnlateDataType5 = useGetTurnlateDataType5()
    const FirstInstallAppTask = useFirstInstallAppTask()
    return useMutation({
        mutationFn: logOut,
        onSuccess: (data) => {
            if (data.data.success === true) {
                userInfo.refetch()
                userconfig.refetch()
                navigate("/home");
                useGlobalVariables.setState({ confirmOutModal: false })
                // useSignInStore.setState({ userName: "" })
                // useSignInStore.setState({ password: "" })
                // useSignInStore.setState({ captcha: "" })
                useGlobalVariables.setState({ turnLateModal: false })
                useGlobalVariables.setState({ TurnTablePrize: [] })
                useButtonStates.setState({ turnLateButton: true })
                useButtonStates.setState({ turnLateMain: false })
                turnlateDataType5.refetch()
                FirstInstallAppTask.refetch()
            }
        }
    })
}
const saveUSDT = (payload: any) => {
    const url = 'userCenter/userBank/bankAddSave.do'
    return axiosPost2(url, payload)
}

export const useSaveUSDT = () => {
    const getUSDTList = useGetUSDTList()
    const getUSDTInfo = useGetUSDTInfo()
    const getUSDTInfos = useGetUSDTInfos()
    const getRecharge = useGetRecharge()
    return useMutation({
        mutationFn: saveUSDT,
        onSuccess: (data) => {
            if (data.success === false) {
                ToastrPngk({ msg: data.msg, type: "error" })
            } else {
                getUSDTList.refetch()
                useModalStates.setState({ usdtCardModal: false })
                // useModalStates.setState({ qrModal: true })
                getUSDTInfo.refetch()
                getUSDTInfos.refetch()
                ToastrPngk({ msg: data.msg, type: "success" })
                useGlobalVariables.setState({ activeBankCard: useGlobalVariables.getState().activeBankCard })
            }
        }
    })
}

const getRecharge = () => {
    const url = '/userCenter/finance/rechargeInfo.do'
    return axiosPost2(url)
}

export const useGetRecharge = () => {
    const navigate = useNavigate()

    return useMutation({
        mutationFn: getRecharge,
        onSuccess: (data) => {
            const isOnline = useGlobalVariables.getState().stationConfig
            if (data.success === false) {
                ToastrPngk({ msg: data.msg, type: "error" })
            } else {
                useGlobalVariables.setState({ offlineBankcards: data })
                ToastrPngk({ msg: data.msg, type: "success" })
            }
        }
    })
}

export const useGetBankList = () => {
    return useQuery({
        queryKey: ["getBankList"],
        staleTime: 0,
        enabled: false,
        retryOnMount: false,
        queryFn: async () => (await axiosPost("/userCenter/finance/withdrawInfo.do")),
        onSuccess: (data) => {
            if (data?.data?.success == false) {
            } else {
                useGlobalVariables.setState({ withdrawInfo: data?.data })
            }
        }
    })
}

export const useBankAccounts = () => {
    return useQuery({
        queryKey: ["getBankList"],
        staleTime: 0,
        enabled: false,
        retryOnMount: false,
        queryFn: async () => (await axiosPost2("/userCenter/userBank/list.do?type=bank")),
        onSuccess: (data) => {

        }
    })
}

export const useGetUSDTList = () => {
    return useQuery({
        queryKey: ["getUSDTList"],
        staleTime: 0,
        enabled: false,
        retryOnMount: false,
        queryFn: async () => (await axiosPost2("/userCenter/userBank/list.do", { type: "USDT" })),
    })
}
export const useGetAllBank = () => {
    return useQuery({
        queryKey: ["useGetAllBank"],
        staleTime: 0,
        enabled: false,
        retryOnMount: false,
        queryFn: async () => (await axiosPost2("/userCenter/userBank/list.do")),
        onSuccess: (data) => {
            if (data?.data?.success == false) {
            } else {
                useGlobalVariables.setState({ banks: data })
            }
        }
    })
}

export const useGetUSDTInfo = () => {
    const usdtInfo = useGetUSDTInfos()
    return useQuery({
        queryKey: ["getUSDTInfo"],
        staleTime: 0,
        enabled: false,
        retryOnMount: false,
        queryFn: async () => (await axiosPost("/userCenter/tronLink/getUserTronLink.do")),
        onSuccess: (data) => {
            if (data?.data?.success === false) {

                ToastrPngk({ msg: data?.data?.message, type: "error" })

            } else {
                useGlobalVariables.setState({ activeBankCard: useGlobalVariables.getState().activeBankCard })
                useGlobalVariables.setState({ hasTrongLink: data?.data })
                usdtInfo.refetch()
            }
        }
    })
}

export const useGetUSDTInfos = () => {
    return useQuery({
        queryKey: ["getUSDTInfos"],
        staleTime: 0,
        enabled: false,
        retryOnMount: false,
        queryFn: async () => (await axiosPost("/userCenter/finance/usdtInfo.do")),
        onSuccess: (data) => {
            useGlobalVariables.setState({ usdtInfo: data?.data })
        }
    })
}

const getNotices = (payload: any) => {
    const url = '/userCenter/msgManage/messageList.do'
    return axiosGet2(url, payload)
}

export const useGetNotices = () => {
    return useMutation({
        mutationFn: getNotices,
        onSuccess: (data) => {

        }
    })
}

// export const useGetNotices = (payload: any) => {
//     return useQuery({
//         queryKey: ["useGetNotices"],
//         staleTime: 0,
//         enabled: true,
//         retryOnMount: false,
//         queryFn: async () => (await axiosPost2("/userCenter/msgManage/messageList.do", payload)),
//         onSuccess: (data) => {

//         }
//     })
// }

const readNotices = (payload: any) => {
    const url = '/userCenter/msgManage/readMessage.do'
    return axiosPost2(url, payload)
}
export const useReadNotices = () => {
    const quertClient = useQueryClient()
    return useMutation({
        mutationFn: readNotices,
        onSuccess: (data) => {

        }
    })
}

const freeTrial = () => {
    const url = '/registerGuest.do'
    return axiosPost2(url)
}
export const useLoginFreeTrial = () => {
    const quertClient = useQueryClient()
    const userDet = useGetUserInfo()
    return useMutation({
        mutationFn: freeTrial,
        onSuccess: (data) => {
            userDet.refetch()
        }
    })
}

const gameBalance = (payload: any) => {
    const url = '/thirdTrans/getBalance.do'
    return axiosPost2(url, payload)
}
export const useGetGamebalance = () => {
    return useMutation({
        mutationFn: gameBalance,
        onSuccess: (data) => {

        }
    })
}

export const useGetTurnTablePrize = () => {
    const turnlateData = useGlobalVariables(state => state.TurnTablePrize)
    const activeId = turnlateData?.activeId
    return useQuery({
        queryKey: ["getTurnTablePrizessss"],
        staleTime: 0,
        enabled: false,
        retryOnMount: false,
        queryFn: async () => (await axiosGet2("/userTurnlate/getTurnRecord2.do", { activeId: activeId, pageSize: 10, pageNumber: 0 })),
        onSuccess: (data) => {
            useGlobalVariables.setState({ TurnTablePrize: data })
        }
    })
}

export const useGetTurnTableRecord = () => {
    const turnlateData = useGlobalVariables(state => state.TurnTablePrize)
    const activeId = turnlateData?.activeId
    return useQuery({
        queryKey: ["getTurnTablePrizes"],
        staleTime: 0,
        enabled: false,
        retryOnMount: false,
        queryFn: async () => (await axiosGet2("/userTurnlate/turnFakeData2.do")),
        onSuccess: (data) => {
            useGlobalVariables.setState({ TurnTableRecord: data })
        }
    })
}

const saveSecurityInfo = (payload: any) => {
    const url = '/userCenter/updateSecurityInfo.do'
    return axiosPost2(url, payload)
}
export const useSaveSecurityInfo = () => {
    const datas = useGetSecurityInfo()
    const navigate = useNavigate();
    return useMutation({
        mutationFn: saveSecurityInfo,
        onSuccess: (data) => {
            if (data.success === true) {
                datas.refetch()
                setTimeout(() => {
                    ToastrPngk({ msg: data.msg, type: "success", id: "001" })
                }, 500)
                navigate(-1)
            } else {
                ToastrPngk({ msg: data.msg, type: "error", id: "002" })
            }
        }
    })
}

const saveProfileInfo = (payload: any) => {
    const url = '/userCenter/info/changeUserInfo2.do'
    return axiosPost3(url, payload)
}
export const useSaveProfileInfo = () => {
    const datas = useGetSecurityInfo()
    return useMutation({
        mutationFn: saveProfileInfo,
        onSuccess: (data) => {
            if (data.success === true) {
                datas.refetch()
                ToastrPngk({ msg: data.msg, type: "success", id: "001" })
            } else {
                ToastrPngk({ msg: data.msg, type: "error", id: "002" })
            }
        }
    })
}

export const useSaveSecurityInfos = () => {
    const datas = useGetSecurityInfo()
    const navigate = useNavigate();
    return useMutation({
        mutationFn: saveProfileInfo,
        onSuccess: (data) => {
            if (data.success === true) {
                datas.refetch()
                navigate(-1)
                setTimeout(() => {
                    ToastrPngk({ msg: data.msg, type: "success", id: "001" })
                }, 500)
            } else {
                ToastrPngk({ msg: data.msg, type: "error", id: "002" })
            }
        }
    })
}

const updatePasswords = (payload: any) => {
    const url = '/userCenter/userPwdModifySave.do'
    return axiosPost2(url, payload)
}
export const useUpdatePasswords = () => {
    const datas = useGetSecurityInfo()
    const navigate = useNavigate();
    return useMutation({
        mutationFn: updatePasswords,
        onSuccess: (data) => {
            if (data.success == true) {
                datas.refetch()
                navigate(-1)
                setTimeout(() => {
                    ToastrPngk({ msg: data.msg, type: "success", id: "001" })
                }, 500)
            } else {
                ToastrPngk({ msg: data.msg, type: "error", id: "002" })
            }
        }
    })
}
const confirmPasswords = (payload: any) => {
    const url = '/userCenter/checkUserPwd.do'
    return axiosPost2(url, payload)
}
export const useConfirmPasswords = () => {
    const getSecurityInfo = useGetSecurityInfo()
    const getInfo = getSecurityInfo?.data?.data
    const bankType = useButtonStates(state => state.bankType)
    return useMutation({
        mutationFn: confirmPasswords,
        onSuccess: (data) => {
            if (data.success == true) {
                useWithdrawPass.setState({ password: "" })
                ToastrPngk({ msg: data.msg, type: "success" })
                useModalStates.setState({ withdrawPassModal: false })
                if (bankType === 2) {
                    useModalStates.setState({ usdtCardModal: true })
                } else if (bankType === 1) {
                    if (getSecurityInfo.isLoading == false) {
                        if (getInfo?.hasPhone == false) {
                            useModalStates.setState({ phoneModal: true })
                        } else if (getInfo?.hasRealName == false) {
                            useModalStates.setState({ realNameModal: true })
                        } else {
                            useModalStates.setState({ bankCardModal: true })
                        }
                    }
                }


            } else {
                ToastrPngk({ msg: data.msg, type: "error" })
            }
        }
    })
}

export const useGEtPublicList = () => {
    const usdtInfo = useGetUSDTInfos()
    const lang = localStorage.getItem('i18nextLng');
    return useQuery({
        queryKey: ["publocList"],
        staleTime: 1000 * 60 * 20,
        enabled: false,
        retryOnMount: false,
        queryFn: async () => (await axiosGet2("/getPublicizeList.do?language=" + lang)),
        onSuccess: (data) => {
            useGlobalVariables.setState({ notices: data })
        }
    })
}
// export const useGEtPublicList = () => {
//     const usdtInfo = useGetUSDTInfos()
//     return useQuery({
//         queryKey: ["publocList"],
//         staleTime: 0,
//         retryOnMount: false,
//         queryFn: async () => (await axiosGet2("/getVips.do")),
//         onSuccess: (data) => {

//         }
//     })
// }

const getAward = (payload: any) => {
    const url = '/userTurnlate/award.do'
    return axiosPost2(url, payload)
}
export const useAward = () => {
    const datas = useGetSecurityInfo()
    const navigate = useNavigate();
    return useMutation({
        mutationFn: getAward,
        onSuccess: (data) => {
            // if (data.success == true) {
            //     datas.refetch()
            //     navigate(-1)
            //     setTimeout(() => {
            //         ToastrPngk({ msg: data.msg, type: "success", id: "001" })
            //     }, 500)
            // } else {
            //     ToastrPngk({ msg: data.msg, type: "error", id: "002" })
            // }
        }
    })
}

export const useGetArticleList = () => {
    var lang = localStorage.getItem('i18nextLng')
    return useQuery({
        queryKey: ["getArticle"],
        staleTime: 1000 * 60 * 20,
        enabled: false,
        retryOnMount: false,
        queryFn: async () => (await axiosGet2("/articleList.do?type=21&language=" + lang)),
        onSuccess: (data) => {
            useGlobalVariables.setState({ article: data })
        }
    })
}

export const useFirstInstallAppTask = () => {
    return useQuery({
        queryKey: ["getFristInstall"],
        staleTime: 0,
        enabled: false,
        retryOnMount: false,
        queryFn: async () => (await axiosGet2("/getFirstInstallAppTask.do")),
        onSuccess: (data) => {
            useGlobalVariables.setState({ firstInstall: data })
        }
    })
}

const deleteUSDT = (payload: any) => {
    const url = '/userCenter/userBank/delUserBank.do'
    return axiosPost2(url, payload)
}
export const useDeleteUSDT = () => {
    const bankLists = useGetUSDTList()
    return useMutation({
        mutationFn: deleteUSDT,
        onSuccess: (data) => {
            bankLists.refetch()
            ToastrPngk({ msg: data.msg, type: "success", id: "0011usdt" })
        }
    })
}
const saveInvestment = (payload: any) => {
    const url = '/saveInvestmentInfo.do'
    return axiosPost2(url, payload)
}
export const useSaveInvestment = () => {
    const cookies = new Cookies();
    return useMutation({
        mutationFn: saveInvestment,
        onSuccess: (data) => {
            if (data.success === true) {
                ToastrPngk({ msg: data.msg, type: "success", id: "0011usdt" })
                cookies.set("agenReg", true)
                useModalState.setState({ open: false })
            }
            else {
                ToastrPngk({ msg: data.msg, type: "error", id: "0011usdt" })
                cookies.set("agenReg", false)
            }

        }
    })
}



const emailVer = (payload: any) => {
    const url = '/reqEmailVcode.do'
    return axiosPost2(url, payload)
}

export const useEmailVer = () => {
    return useMutation({
        mutationFn: emailVer,
        onSuccess: (data) => {
            if (data.data.success !== false) {

            }
            else {
                ToastrPngk({ msg: data.data.msg, type: "error", id: "0011usdt" })
            }
        }
    })
}
const mobileVer = (payload: any) => {
    const url = '/userCenter/sms/reqSmsCode.do'
    return axiosPost2(url, payload)
}

export const useMobileVer = () => {
    return useMutation({
        mutationFn: mobileVer,
        onSuccess: (data) => {

        }
    })
}

export const useFaqActivities = () => {
    return useQuery({
        queryKey: ["faqData"],
        staleTime: 0,
        enabled: false,
        retryOnMount: false,
        queryFn: async () => (await axiosGet2("/helpJson.do")),
        onSuccess: (data) => {
            useGlobalVariables.setState({ faqValue: data?.menu })
        }
    })
}

const couponRechareg = (payload: any) => {
    const url = '/userCenterCoupons/recharge2.do'
    return axiosPost2(url, payload)
}

export const useCouponRechareg = () => {
    return useMutation({
        mutationFn: couponRechareg,
        onSuccess: (data) => {
            if (data.success === false) {
                ToastrPngk({ msg: data.msg, type: "error", id: "0011usdt" })
            }
        }
    })
}
const couponData = () => {
    const url = '/userCenterCoupons/couponUseData.do'
    const payload = {
        type: 1
    }
    return axiosPost2(url, payload)
}

export const useCouponData = () => {
    return useMutation({
        mutationFn: couponData,
        onSuccess: (data) => {
            useVoucher.setState({ coupon: data })
        }
    })
}
const getCoupon = (paylaod: any) => {
    const url = '/userCenterCoupons/recharge.do'

    return axiosPost2(url, paylaod)
}

export const useGetCouponClaim = () => {
    return useMutation({
        mutationFn: getCoupon,
        onSuccess: (data) => {
            if (data.success === false) {
                ToastrPngk({ msg: data.msg, type: "error", id: "0011usdt" })
            }
            else {
                ToastrPngk({ msg: data.msg, type: "success", id: "0011usdt" })

            }
        }
    })
}

export const useGetCurWalletType = () => {
    return useQuery({
        queryKey: ["getCurWalletType"],
        staleTime: 0,
        enabled: false,
        retryOnMount: false,
        queryFn: async () => (await axiosGet2("/getRescueAct.do")),
        onSuccess: (data) => {

        }
    })
}
export const useGetUnclockTask = () => {
    return useQuery({
        queryKey: ["getUnlock"],
        staleTime: 0,
        queryFn: async () => (await axiosGet2("/userCenter/getUnlockGiftTasks.do")),
        onSuccess: (data) => {
            console.log(data)
        }
    })
}

export const useGetDepositTutorial = () => {
    var lang = localStorage.getItem('i18nextLng')
    return useQuery({
        queryKey: ["getUnlock"],
        staleTime: 0,
        enabled: false,
        queryFn: async () => (await axiosGet2("/getPublicizeForDepositTutorial.do?language=" + lang)),
        onSuccess: (data) => {
            useGlobalVariables.setState({ depositPopUpData: data })
        }
    })
}
const rescueFund = (payload: any) => {
    const url = '/receiveReliefFunds.do'
    return axiosPost2(url, payload)
}
export const useRescueFund = () => {
    return useMutation({
        mutationFn: rescueFund,
        onSuccess: (data) => {
            if (data?.success == false) {
                ToastrPngk({ msg: data?.msg, type: "error" })
            }
            else {
                ToastrPngk({ msg: data?.msg, type: "success" })
            }

        }
    })
}

const getDiscountAmount = (payload: any) => {
    const url = '/userCenter/getDiscountAmount.do'
    return axiosGet2(url, payload)
}
export const useGetDiscountAmount = () => {
    return useMutation({
        mutationFn: getDiscountAmount,
        onSuccess: (data) => {
            useGlobalVariables.setState({ depositDataDiscount: data })
        }
    })
}

export const useGetProxy = () => {
    var lang = localStorage.getItem('i18nextLng')
    return useQuery({
        queryKey: ["getProxy"],
        staleTime: 0,
        enabled: false,
        queryFn: async () => (await axiosPost2("/article/getProxyInfo.do?type=25")),
        onSuccess: (data) => {
            useGlobalVariables.setState({ proxyData: data })
        }
    })
}

const getVerify = (payload: any) => {
    const url = ' /userCenter/sms/reqSmsCode.do '

    return axiosPost2(url, payload)
}

export const useGetVerification = () => {
    return useMutation({
        mutationFn: getVerify,
        onSuccess: (data) => {
            if (data?.success == false) {
                ToastrPngk({ msg: data?.msg, type: "error" })
            }
            else {
                ToastrPngk({ msg: data?.msg, type: "success" })
            }
        }

    })
}

const getVerified = (payload: any) => {
    const url = '/userCenter/sms/smsVerify.do'

    return axiosPost2(url, payload)
}

export const useGetVerifiedSms = () => {
    return useMutation({
        mutationFn: getVerified,
        onSuccess: (data) => {
            if (data?.success == false) {
                ToastrPngk({ msg: data?.msg, type: "error" })
            }
            else {
                ToastrPngk({ msg: data?.msg, type: "success" })
            }
        }
    })
}


