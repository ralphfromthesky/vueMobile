import Cookies from "universal-cookie";
import { create } from "zustand"
import { persist, devtools } from 'zustand/middleware'
import { useShallow } from 'zustand/react/shallow'
import { useStationConfig } from "../hooks/getUserInfoHook";
import { backgroundColor, time } from "@stylexjs/stylex/lib/StyleXCSSTypes";
type LoginModalStatus = {
    isOpen: boolean;
    modalState: () => void
}
export const useLoginStore = create<LoginModalStatus>((set) => ({
    isOpen: false,
    modalState: () => {
        set({ isOpen: true });
    }
})
)
type RegModalStatus = {
    isOpenRegister: boolean,

    RegmodalState: () => void
}
export const userRegstore = create<RegModalStatus>((set) => ({
    isOpenRegister: false,
    RegmodalState: () => {
        set({ isOpenRegister: true });
    }
})
)

type SignInState = {
    userName: string,
    password: string,
    captcha: string,
    rememberMe: boolean,
    signInform: any,
    setSiginDetails: any,
    mobile:any,
    email:any,
}

export const useSignInStore = create<SignInState>()(
    devtools(
        persist(
            (set) => ({
                userName: "",
                mobile: "",
                email: "",
                signInform: [],
                password: "",
                captcha: "",
                rememberMe: false,
                setSiginDetails: (payload: any) => {
                    console.log(payload)
                    // set((state) => ({
                    //     ...state.signInform, signInform: [...state.signInform, payload]
                    // }));
                }
            }), {
            name: "signIn",
        }
        )
    )

)
type OTPstate = {
    otp: any,
    setOtp: () => void
}
export const useGenerateOTP = create<OTPstate>()((set) => ({
    otp: '/loginVerifycode.do?timestamp=' + Date.now(),
    setOtp: () => {
        set({ otp: '/loginVerifycode.do?timestamp=' + Date.now() });
    }
}))
export const useEmailOTP = create<OTPstate>()((set) => ({
    otp: '/emailLoginVerifycode.do?timestamp=' + Date.now(),
    setOtp: () => {
        set({ otp: '/emailLoginVerifycode.do?timestamp=' + Date.now() });
    }
}))
export const useGenerateOTPRegister = create<OTPstate>()((set) => ({
    otp: '/registerVerifycode.do?timestamp=' + Date.now(),
    setOtp: () => {
        set({ otp: '/registerVerifycode.do?timestamp=' + Date.now() });
    }
}))
type Language = {
    lang: any,
    langText: any
}

export const useSetlang = create<Language>()(
    devtools(
        persist(
            (set) => ({
                lang: 1,
                langText: ""
            }),
            {
                name: "language",
            }
        )
    )
)

type RebateTypeState = {
    type: number,
}

export const useRebateType = create<RebateTypeState>()(
    devtools(
        persist(
            (set) => ({
                type: 2
            }), {
            name: "buttonState"
        }
        )
    )
)
type globalStatevariables = {
    agentActivetab: number,
    openReward: boolean,
    rewardIndex1: number,
    rewardIndex2: number,
    userConfig: any,
    performanceDetails: any,
    directBonus: any,
    directData: any,
    tabIndex: number,
    proxyRebate: any,
    bonusData: any,
    homeTab: any,
    regFields: any,
    pendingTask: any,
    popularGames: any,
    gameTabs: any,
    depoModal: boolean,
    depoHist: boolean,
    depoModalHist: boolean,
    depoActiveTab: number,
    onlineBankCards: any,
    onlineBankCards2: any,
    userDetails: any,
    scrollToTop: () => void,
    setBankCardOnline: any,
    offlineBankcards: any,
    stationConfig: any,
    depositReport: any,
    hasTrongLink: any,
    activeBankCard: number,
    usdtInfo: any,
    teamData: any,
    withdrawInfo: any,
    banks: any,
    turnlate: any,
    noticeData: any,
    noticeModal: boolean,
    supportTabindex: number,
    disCountModal: boolean,
    firstInstallModal: boolean,
    tabIndex2: number,
    gameID: number,
    depoHistSub: boolean,
    vipModal: boolean,
    confirmOutModal: boolean,
    favorateGames: any,
    noticeContent: any,
    showContent: boolean,
    isSupport: boolean,
    game: any,
    TurnTablePrize: any,
    TurnTableRecord: any,
    isFav: any,
    isContent: boolean,
    turnlateType5: any,
    turnLateModal: boolean,
    inviteOverview2: any,
    confirmRefersg: any,
    clearRegFields: boolean,
    vipCollection: any,
    newRegPop: boolean,
    turnlateList: any,
    oncePerDay: boolean,
    article: any,
    turnOncePerDay: boolean,
    pointRedemptionState: boolean,
    securityInfo: any,
    firstInstall: any,
    notices: any,
    redEnvData: any,
    faqs: any,
    faqsTab: any,
    faqValue: any,
    salaryStrategy: any,
    color: number,
    depositPopUpData: any,
    proxyData: any,
    depositDataDiscount: any,
     
}
export const useGlobalVariables = create<globalStatevariables>()(
    devtools(
        persist(
            (set) => ({
                agentActivetab: 1,
                confirmRefersg: false,
                game: [],
                isContent: false,
                vipModal: false,
                isFav: "",
                showContent: false,
                depoHistSub: false,
                isSupport: false,
                redEnvData: null,
                tabIndex2: 0,
                depoActiveTab: 0,
                openReward: false,
                depoHist: false,
                gameID: 3,
                rewardIndex1: 0,
                rewardIndex2: 0,
                userConfig: {},
                offlineBankcards: [],
                performanceDetails: {},
                directBonus: {},
                popularGames: [],
                directData: {},
                stationConfig: [],
                tabIndex: 1,
                proxyRebate: [],
                depositReport: [],
                bonusData: [],
                regFields: [],
                pendingTask: [],
                gameTabs: [],
                onlineBankCards: [],
                onlineBankCards2: new Array(),
                userDetails: [],
                homeTab: '',
                depoModal: false,
                depoModalHist: false,
                hasTrongLink: "",
                activeBankCard: 0,
                usdtInfo: [],
                favorateGames: [],
                teamData: [],
                noticeData: [],
                withdrawInfo: {},
                banks: {},
                turnlate: {},
                supportTabindex: 0,
                noticeModal: true,
                disCountModal: false,
                firstInstallModal: false,
                confirmOutModal: false,
                noticeContent: [],
                TurnTablePrize: [],
                TurnTableRecord: [],
                turnlateType5: [],
                turnLateModal: false,
                inviteOverview2: [],
                clearRegFields: false,
                vipCollection: [],
                newRegPop: false,
                turnlateList: [],
                oncePerDay: false,
                article: [],
                turnOncePerDay: false,
                pointRedemptionState: false,
                securityInfo: [],
                firstInstall: [],
                notices: [],
                faqs: [],
                faqsTab: 0,
                faqValue: [],
                salaryStrategy: [],
                color: 1, 
                depositPopUpData: [], 
                proxyData: [],
                depositDataDiscount: [],

                scrollToTop: () => {
                    set({ homeTab: "home" });
                    const tabLink = document.getElementById("home");
                    tabLink?.scrollIntoView();
                },
                setBankCardOnline: (payload: any) => {
                    set((state) => ({
                        ...state.onlineBankCards2, onlineBankCards2: [...state.onlineBankCards2, payload]
                    }));
                    const tabLink = document.getElementById("home");
                    tabLink?.scrollIntoView();
                }
            }), {
            name: "globalStatevariables",
            partialize: (state) =>
                Object.fromEntries(
                    Object.entries(state).filter(([key]) => !['userConfig', 'performanceDetails', "directBonus",
                        "directData", "isContent", "showContent", "vipModal", "depoHistSub", "gameID", "tabIndex2", "disCountModal", "noticeModal", "tabIndex", "hasTrongLink", "depoModal", "onlineBankCards2", "depoHist", "depoActiveTab", "activeBankCard", "noticeData"].includes(key)),
                ),
        }
        )
    )
)

type globalTeamListPageNumber = {
    activePageNumber: number
}
export const useGlobalTeamListPageNumber = create<globalTeamListPageNumber>()((set) => ({
    activePageNumber: 1
}))

type setActivityValue = {
    activityValue: any
}
export const useSetActivityValue = create<setActivityValue>()((set) => ({
    activityValue: ""
}))

type setEnvelopValue = {
    envelopeValue: any
}
export const useSetEnvelopValue = create<setEnvelopValue>()((set) => ({
    envelopeValue: false
}))

type setRebatePage = {
    page: number
}
export const useSetRebatePage = create<setRebatePage>()((set) => ({
    page: 1
}))

type setGameType = {
    type: number
}
export const useSetGameType = create<setGameType>()((set) => ({
    type: 1
}))

type setShowWithdraw = {
    type: number,
}
export const useShowWithdraw = create<setShowWithdraw>()(
    devtools(
        persist(
            (set) => ({
                type: 1
            }), {
            name: "setShowWithdraw"
        }
        )
    )
)

type setModalStates = {
    phoneModal: boolean,
    realNameModal: boolean,
    bankCardModal: boolean,
    usdtCardModal: boolean,
    detailModal: boolean,
    qrModal: boolean,
    shareInviteModal: boolean,
    withdrawPassModal: boolean,
    withdrawInvite: boolean,
    eventEnvelop: boolean,
    eventBull: boolean,
    eventTurnTable: boolean,
    eventTelegram: boolean,
    alertModal: boolean,
    calendarModal: boolean,
    termsModal: boolean,
    public: boolean,
    turnModalLogin: boolean,
    sideTurn: boolean,
    firstInstallModal: boolean,
    pddTurn: boolean,
    eventTelegramSup: boolean,
    eventTelegramSupV2: boolean,
    ruleModal: boolean,
}
export const useModalStates = create<setModalStates>()((set) => ({
    phoneModal: false,
    realNameModal: false,
    bankCardModal: false,
    usdtCardModal: false,
    detailModal: false,
    qrModal: false,
    shareInviteModal: false,
    withdrawPassModal: false,
    withdrawInvite: false,
    eventEnvelop: false,
    eventBull: false,
    eventTurnTable: false,
    eventTelegram: false,
    alertModal: false,
    calendarModal: false,
    termsModal: false,
    public: false,
    turnModalLogin: false,
    sideTurn: false,
    firstInstallModal: false,
    pddTurn: false,
    eventTelegramSup: false,
    eventTelegramSupV2: false,
    ruleModal: false,
}))

type setTurnModalData = {
    currentValue: number,
    awardValue: number,
}
export const useTurnModalData = create<setTurnModalData>()((set) => ({
    currentValue: 0,
    awardValue: 0,

}))

type setAlertState = {
    alertModal: boolean,
    alertTime: number,
    alertMessage: any,
    openAlert: any,
    alertType: any
}
export const useAlertStates = create<setAlertState>()((set) => ({
    alertModal: false,
    alertMessage: "",
    alertType: "",
    alertTime: 5000,
    openAlert: (payload: any) => {
        set({
            alertTime: 5000,
            alertModal: true,
            alertMessage: payload.alertMessage,
            alertType: payload.alertType
        });
    }
}))

type setTabStates = {
    type: number,
}
export const useTabStates = create<setTabStates>()((set) => ({
    type: 0,
}))

type setWithdrawPass = {
    password: any,
}
export const useWithdrawPass = create<setWithdrawPass>()((set) => ({
    password: "",
}))

type setSelectTypes = {
    accountChangeReport: any,
}
export const useSelectTypes = create<setSelectTypes>()((set) => ({
    accountChangeReport: {},
}))

type setButtonStates = {
    showAccNumButton: boolean,
    turnButton: number,
    turnTableTab: number,
    validEmail: boolean,
    turnLateButton: boolean,
    turnLateMain: boolean,
    turnLateType: number,
    bankType: number,

}
export const useButtonStates = create<setButtonStates>()((set) => ({
    showAccNumButton: false,
    turnButton: 3,
    turnTableTab: 1,
    validEmail: true,
    turnLateButton: true,
    turnLateMain: false,
    turnLateType: 3,
    bankType: 1,
}))

type setButtonStatesV2 = {
    securityType: number,
    securityName: string,
}
export const useButtonStatesV2 = create<setButtonStatesV2>()(
    devtools(
        persist(
            (set) => ({
                securityType: 1,
                securityName: "",
            }), {
            name: "ButtonStates"
        })
    )
)

type favoritos = {
    favGame: any,
    addFavorateGame: any,
    removeFav: any,
    removeFavByID: any
}
export const useFavGame = create<favoritos>()(
    devtools(
        persist(
            (set) => ({
                favGame: [],
                addFavorateGame: (payload: any) => {
                    set((state) => ({
                        ...state, favGame: [...state.favGame, payload]
                    }));
                },
                removeFav: (index: any) => {
                    set((state) => ({
                        favGame: state.favGame.filter((item: any) => item.index !== index),
                    }));
                },
                removeFavByID: (index: any) => {
                    set((state) => ({
                        favGame: state.favGame.filter((item: any) => item.val.entID !== index),
                    }));
                },
            }), {
            name: "favorateGame"
        }
        )
    )
)
type searchHIst = {
    searchItem: any,
    addSearchHIst: any,
    removeSearchHist: any,
    reset: any,
}
export const useSearchHIst = create<searchHIst>()(
    devtools(
        persist(
            (set) => ({
                searchItem: [],
                addSearchHIst: (payload: any) => {
                    set((state) => ({
                        ...state, searchItem: [...state.searchItem, payload]
                    }));
                },
                reset: () => {
                    set((state) => ({
                        searchItem: []
                    }));
                },
                removeSearchHist: (id: any) => {
                    set((state) => ({
                        searchItem: state.searchItem.filter((item: any) => item.id !== id),
                    }));
                },
            }), {
            name: "searchItemHistory"
        }
        )
    )
)

type recent = {
    recentGame: any,
    addToRecent: any,
    removeFromRecent: any,
}
const userInfo = useGlobalVariables.getState().userDetails ? useGlobalVariables.getState().userDetails : null
export const useRecent = create<recent>()(
    devtools(
        persist(
            (set) => ({
                recentGame: [],
                addToRecent: (payload: any) => {
                    set((state) => ({
                        ...state, recentGame: [...state.recentGame, payload]
                    }));
                },
                removeFromRecent: (index: any) => {
                    set((state) => ({
                        recentGame: state.recentGame.filter((item: any) => item.index !== index && item.userName == userInfo),
                    }));
                },
            }), {
            name: "recentPlayed"
        }
        )
    )
)
type globalList = {
    advice: any,
    encKey: any,
    hoverColor: any,
    sideTabActive: any,
    sideAction: any,
    notifications: any,
    anchorEl?: HTMLElement | null,
    actButton: number,
    swiperData: any,
    notices: any,
    lotteryLimit: any,
    color: any,
    banalanceUpdate: boolean,
    updateStatus: boolean,
    vipInfo: any,
}
export const useGlobalList = create<globalList>()(

    devtools(
        persist(
            (set) => ({
                advice: [],
                sideTabActive: 0,
                lotteryLimit: 12,
                anchorEl: null,
                banalanceUpdate: false,
                updateStatus: false,
                notices: [],
                sideAction: "",
                hoverColor: "",
                encKey: "",
                notifications: [],
                swiperData: [],
                actButton: 0,
                color: {
                    id: 1,
                    backGorund: "#1C1E23",
                    forGround: "#F0C059",
                    first: "#141417",
                    second: "#141417",
                    third: "#22242A",
                    text: "#68707b",
                    text2: "#874404",
                    text3: "#ffff",
                    text4: "#ffff",
                    bgImage: "/images/backgroundIMG.png",
                    activeTab: "/inviteImages/F0C059.png",
                    inActiveTab: "/inviteImages/1C1E23.png",
                    regla: "/images/1.png",
                    copy: "/copyIcons/f0c059.png",
                    scroll: "/scrollImages/f0c059.png",
                    fourth: "#313843",
                    fifth: "#F0C059",
                    sixth: "#68707b",
                    sideBartext: "#d5ddff",
                    gameEntryText: "#68707b"
                },
                vipInfo: [],
            }), {
            name: "globalList",
            partialize: (state) =>
                Object.fromEntries(
                    Object.entries(state).filter(([key]) => !["sideTabActive", "sideAction", "actButton", "lotteryLimit", "banalanceUpdate", "updateStatus"].includes(key)),
                )
        }
        )
    )
)


type ModalDialogue = {
    open: boolean,
    login: boolean,
    redeem: boolean,
    coupon: boolean,
}
export const useModalState = create<ModalDialogue>()(
    (set) => ({
        open: true,
        login: false,
        redeem:false,
        coupon:false
    })
)
type voucher = {
    coupon: any,
}
export const useVoucher = create<voucher>()(
    (set) => ({
        coupon: [],
    })
)