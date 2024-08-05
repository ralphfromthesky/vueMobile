import { useTranslation } from "react-i18next";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useGlobalList, useGlobalVariables, useModalState, useModalStates, useRebateType, useSetEnvelopValue, useSetlang, userRegstore } from "../../../globalFunctions/store";
import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useChangeLanguage, useCurnew } from "../../../hooks/curstomHooks";
import Cookies from "universal-cookie";
import { useGetEvents, useGetGames, useGetProxy, useGetSsalary, useStationConfig } from "../../../hooks/getUserInfoHook";
import CssFilterConverter from "css-filter-converter";
export function SidebarTabs(props: any) {
    const userInfo = useGlobalVariables(state => state.userDetails);
    const navigate = useNavigate();
    const locations = useLocation()
    const cookies = new Cookies();
    const turnlateData = useGlobalVariables(state => state.turnlateType5)
    const redEnv = useCurnew();
    const salary = useGetSsalary()
    const getEvents = useGetEvents()
    const Proxy = useGetProxy()
    const rescueId = getEvents?.data?.data?.filter((resId: any) => resId.type === 4)

    const validayLogon = (link: any) => {
        if (userInfo?.isLogin === false && (link === "/record-collection" || link === "/vip" || link === "/pending" || link === "/redeem")) {
            userRegstore.setState({ isOpenRegister: true })
        }
        else if (link === "/redeem") {
            useModalState.setState({ redeem: true })
        } else if (link === "/PromotionPage") {
            Proxy.refetch()
            navigate(link)
        } else if (link === "/rescue") {
            cookies.set('eventID', rescueId[0]?.id);
            navigate("/event-details")
        } else {
            if (link === "missionModal") {
                //
            } else if (link === "/turnlateSide") {

            } else if (link === "/envelopeSide") {
                if (userInfo?.isLogin == false) {
                    userRegstore.setState({ isOpenRegister: true })
                } else {
                    props.onClick()
                }
            } else if (link === "/calendarSide") {
                if (userInfo?.isLogin == false) {
                    userRegstore.setState({ isOpenRegister: true })
                } else {
                    props.onClick()
                }
            } else if (link === "/vip") {
                salary.refetch()
                useGlobalVariables.setState({ tabIndex2: 0 })
                navigate(link)
            } else {
                useRebateType.setState({ type: 2 })
                navigate(link)
            }
        }
        if (link === "/turnlateSide") {
            useGlobalVariables.setState({ turnLateModal: true })
            props.onClick()
            if (locations.pathname === "/home") {
                props.onClick()
                useGlobalVariables.setState({ turnLateModal: true })
            } else if (locations.pathname === "/") {
                props.onClick()
                useGlobalVariables.setState({ turnLateModal: true })
            }
            if (turnlateData?.pddStrategy?.popType === 5) {
                useModalStates.setState({ turnModalLogin: true })
                localStorage.setItem("isModalLog", "true")
            }
        }
    };
    return (
        <div className={props.link === "/PromotionPage" ? "pageLink invite" : "pageLink"} onClick={() => validayLogon(props.link)}>
            {props.icon && <img className="linkImage" src={props.icon} alt="" />}
            <label className="linkLabel">
                {props.children}
            </label>
        </div>
    )
}
export function LanguagePicker(props: any) {
    const [curTab, setCurTab] = useState<any>("");
    const colorP = useGlobalList(state => state.color);
    const { t } = useTranslation(["home", "main"]);
    const station = useGlobalVariables(state => state.stationConfig);
    const cookies = new Cookies();
    const staLang = useStationConfig();
    const lang = staLang?.data?.data.staLang
    const iconColor: any = CssFilterConverter.hexToFilter(colorP.backGorund);
    let langNameD
    let captchLang
    // chinese:zho  english:eng   japanese:jpn   indonesian:ind  spanish:spa    brazil:pon  hindi: him     Malay:msa  Thai:tha  Vetnamese:vie
    const langList = [
        { id: "0", langName: "Português", lang: "br", langType: "pon" },
        { id: "1", langName: "Indonesia", lang: "ind", langType: "pon" },
        { id: "2", langName: "Tiếng Việt", lang: "vi", langType: "vie" },
        { id: "3", langName: "Melayu", lang: "my", langType: "msa" },
        { id: "4", langName: "ไทย", lang: "th", langType: "tha" },
        { id: "5", langName: "हिन्दी", lang: "in", langType: "ind" },
        { id: "6", langName: "日本語", lang: "jp", langType: "jpn" },
        { id: "7", langName: "Español", lang: "es", langType: "spa" },
        { id: "8", langName: "English", lang: "en", langType: "eng" },
        { id: "9", langName: "Chinese", lang: "cn", langType: "zho" }
    ]
    if (lang === "br") {
        langNameD = "Português";
        captchLang = "pon"
    } else if (lang === "ind") {
        langNameD = "Indonesia";
        captchLang = "ind"
    } else if (lang === "vi") {
        langNameD = "Tiếng Việt";
        captchLang = "vie"
    } else if (lang === "my") {
        langNameD = "Melayu";
        captchLang = "msa"
    } else if (lang === "th") {
        langNameD = "ไทย";
        captchLang = "him"
    } else if (lang === "in") {
        langNameD = "हिन्दी";
        captchLang = "tha"
    } else if (lang === "jp") {
        langNameD = "日本語";
        captchLang = "jpn"
    } else if (lang === "es") {
        langNameD = "Español";
        captchLang = "spa"
    } else if (lang === "en") {
        langNameD = "English";
        captchLang = "eng"
    } else if (lang === "cn") {
        langNameD = "Chinese";
        captchLang = "zho"
    }
    const languages = [
        { id: "1", name: langNameD, code: lang, langCap: captchLang },
    ];

    if (staLang.isLoading === false) {
        if (staLang?.data?.data.showEnglishLan === true && staLang?.data?.data.staLang !== "en") {
            languages.push({ id: "2", name: "English", code: "en", langCap: "eng" })
        }
        if (staLang?.data?.data.showChineseLan === true && staLang?.data?.data.staLang !== "cn") {
            languages.push({ id: "3", name: "简体中文", code: "cn", langCap: "zho" })
        }
        if (staLang?.data?.data.allow_all_language_switch === true) {
            const languagesMaplst = langList.filter((val) => val.lang !== lang)
            languagesMaplst.map((val: any, index: any) => {
                languages.push({ id: index + 4, name: val.langName, code: val.lang, langCap: val.langType })
            })
        }
    }
    const language = useSetlang.getState().lang
    const changeLanguage = useChangeLanguage()
    async function handleLanguageChange(e: any) {
        const selLang = languages.filter((lang: any) => lang.id == e.target.value)
        const selectedLanguage = selLang[0].code;
        cookies.set('lang', selectedLanguage);
        cookies.set('langList', selLang[0].langCap);
        useSetlang.setState({ lang: e.target.value })
        changeLanguage.mutate({ lang: selectedLanguage })
        localStorage.setItem('i18nextLng', selectedLanguage);
    };

    const getGame = useGetGames()

    useEffect(() => {
        const cookieJam = localStorage.getItem('i18nextLng');
        const selLang = languages.filter((lang: any) => lang.code === cookieJam)
        useSetlang.setState({ lang: selLang[0]?.id })
        if (cookies.get('lang') === undefined || cookies.get('langList') === undefined) {
            const selLangs = languages.filter((lang: any) => lang.code === cookieJam)
            cookies.set("lang", cookieJam)
            cookies.set("langList", selLangs[0]?.langCap)
            useSetlang.setState({ lang: selLangs[0]?.id })
            localStorage.setItem('i18nextLng', station.staLang);
            changeLanguage.mutate({ lang: cookieJam })
        } if (cookies.get('lang') !== undefined) {
            const selLangs = languages.filter((lang: any) => lang.code === cookies.get('lang'))
            localStorage.setItem('i18nextLng', cookies.get('lang'));
            useSetlang.setState({ lang: selLangs[0]?.code })
        } if (cookies.get('lang') !== cookieJam) {
            const selLangs = languages.filter((lang: any) => lang.code === cookies.get('lang'))
            cookies.set("lang", cookieJam)
            cookies.set("langList", selLangs[0]?.langCap)
            useSetlang.setState({ lang: selLangs[0]?.id })
            localStorage.setItem('i18nextLng', selLangs[0]?.code);
        } if (cookies.get('lang') === cookieJam) {
            const selLangs = languages.filter((lang: any) => lang.code === cookies.get('lang'))
            // changeLanguage.mutate({ lang: cookies.get('lang') })
            cookies.set('langList', selLangs[0]?.langCap);
            useSetlang.setState({ lang: selLangs[0]?.id })
            localStorage.setItem('i18nextLng', selLangs[0]?.code);
        }
    }, [])
    const handleMouseEnter = (event: any) => {
        setCurTab(event.target.dataset.info);

    };
    const handleMouseLeave = (event: any) => {
        setCurTab("");

    };

    const dlIconActive = {
        color: colorP.forGround,
        "& .itemIcon": {
            color: colorP.forGround,
        },
    };
    const dlIcon = {
        color: colorP.text,
    };

    return (
        <div className="footerActions">
            <Box
                sx={{
                    " .footerItemContainer:hover": {
                        " .iconLabel": {
                            color: colorP.forGround + "!important"
                        },
                        " .iconContainer": {
                            backgroundColor: colorP.forGround + "!important"
                        },
                    },
                    ".footerItemContainer": {
                        " .iconContainer": {
                            backgroundColor: station.stationCode === "yd102" ? colorP.text4 : colorP.text + "!important"
                        }
                    }

                }}
            >
                <Link to={props.link}>
                    <div
                        className="footerItemContainer"
                        style={curTab == "key_suports" ? dlIconActive : dlIcon}
                        data-info={"key_suports"}
                        key={"key_suports"}
                        onMouseLeave={handleMouseLeave}
                        onMouseEnter={(e) => handleMouseEnter(e)}
                    >
                        <div className="iconContainer" style={{ background: colorP.second }}>
                            <i className="iconBorder">
                                <img style={{ height: ".18rem", filter: iconColor.color }} src="/images/globe.png" alt="" />
                            </i>
                        </div>
                        <FormControl
                            size="small"
                            sx={{
                                minWidth: "1.5rem",
                                fontSize: ".16rem",
                                color: colorP.text + "!important",
                                "& .MuiPaper-root": {
                                    background: colorP.backGorund,
                                    fontSize: ".16rem",
                                    color: colorP.text + "!important",
                                },
                                "& fieldset": {
                                    borderColor: station.stationCode === "yd102" ? colorP.text4 + "!important" : colorP.text + "!important",
                                    "& legend": {
                                        "& span": {
                                            color: colorP.forGround + " !important"
                                        }
                                    }
                                },
                                "& label": {
                                    fontSize: ".16rem",
                                    color: station.stationCode === "yd102" ? colorP.text4 + "!important" : colorP.text + "!important",
                                },
                                "& .Mui-focused .css-1d3z3hw-MuiOutlinedInput-notchedOutline": {
                                    borderColor: colorP.text + " !important",
                                }, "& .MuiInputBase-root": {
                                    color: station.stationCode === "yd102" ? colorP.text4 + "!important" : colorP.text + "!important",
                                    fontSize: ".16rem"
                                }, "& .MuiSvgIcon-root": {
                                    color: station.stationCode === "yd102" ? colorP.text4 + "!important" : colorP.text + "!important",
                                    width: ".15em",
                                },
                                " .MuiSelect-select": {
                                    color: station.stationCode === "yd102" ? colorP.text4 + "!important" : colorP.text + "!important",
                                },
                                marginTop: ".06rem !important"
                            }}
                        >
                            <InputLabel id="demo-select-small-label">
                                {t("ts159", { ns: "ts" })}
                            </InputLabel>
                            <Select
                                labelId="demo-select-small-label"
                                id="demo-select-small"
                                value={language}
                                label={t("ts159", { ns: "ts" })}
                                onChange={(e) => handleLanguageChange(e)}
                                MenuProps={{
                                    PaperProps: {
                                        sx: {
                                            background: colorP.backGorund,
                                            color: colorP.text,
                                            "& em": {
                                                fontSize: ".16rem",
                                                color: station.stationCode === "yd102" ? colorP.text4 + "!important" : colorP.text + "!important",
                                                paddingRight: ".32rem"
                                            },
                                            " .MuiButtonBase-root": {
                                                fontSize: ".16rem",
                                                color: station.stationCode === "yd102" ? colorP.text4 + "!important" : colorP.text + "!important",

                                            }
                                        }
                                    },
                                }}
                            >
                                {languages.map((language: any, index: any) => (
                                    <MenuItem key={index} value={language.id}>
                                        {language.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </div>
                </Link>
            </Box>
        </div>
    )
}