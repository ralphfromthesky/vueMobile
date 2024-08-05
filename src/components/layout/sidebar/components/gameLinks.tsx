import { useState } from "react";
import { Link } from "react-router-dom";
import { ChangeColorPallte } from "../../../globalFunctions/globalContext";
import { GameClick } from "../../../hooks/actions";
import { useGlobalList, useGlobalVariables } from "../../../globalFunctions/store";
import { useTranslation } from "react-i18next";
import CssFilterConverter from "css-filter-converter";
import { Box, Skeleton } from "@mui/material";
import { useCollorePallete } from "../../styles";
export default function GameLink(props: any) {
    const color = useCollorePallete()
    const colorP = useGlobalList(state => state.color);
    const [curTab, setCurTab] = useState<any>("");
    const tab = props.tab
    const iconColor: any = CssFilterConverter.hexToFilter(colorP.text);
    const hoverColor: any = CssFilterConverter.hexToFilter(colorP.forGround);
    const index = props.index
    const iconColor2: any = CssFilterConverter.hexToFilter(colorP.text4);
    const statConfig = useGlobalVariables(state => state.stationConfig)
    const gameIndex = useGlobalList((state) => state.sideTabActive);
    const handleMouseEnter = (event: any) => {
        setCurTab(event.target.dataset.info);
    };
    const handleMouseLeave = (event: any) => {
        setCurTab("");
    };
    const boxStyles = {
        color: statConfig.stationCode === "yd102" ? colorP.text4 : colorP.text,
        backgroundColor: colorP.third
    };
    const boxStylesHungHover = {
        color: colorP.forGround + " !important",
        backgroundColor: colorP.third
    };
    const boxStylesActive = {
        color: statConfig.stationCode === "yd102" ? colorP.text4 + "!important" : colorP.text2 + "!important",
        backgroundColor: statConfig.stationCode === "yd102" ? colorP.third : colorP.forGround,
    };

    return (
        <Box sx={{
            "a:hover": {
                "span": {
                    color: colorP.forGround
                },
                " .gameImagesX": {
                    filter: statConfig.stationCode === "yd102" ? "none !important" : hoverColor.color + "!important",
                }
            },
            "a:hover.active": {
                "span": {
                    color: colorP.id === 17 ? colorP.backGorund : statConfig.stationCode === "yd102" ? colorP.text4 : colorP.text2
                }
            },
            "a.active": {
                "span": {
                    color: colorP.id === 17 ? colorP.backGorund : statConfig.stationCode === "yd102" ? colorP.text4 : colorP.text2
                }
            }
        }}>
            <Link
                to={"/" + tab.code}
                data-info={"key_" + tab.id}
                style={index != gameIndex ? curTab == "key_" + tab.id ? boxStylesHungHover : boxStyles : boxStylesActive}
                onMouseEnter={(e) => handleMouseEnter(e)}
                onMouseLeave={handleMouseLeave}
                key={tab.id}
                data-to-scrollspy-id={tab.code}
                onClick={() => GameClick(index, tab.code)}
                className={
                    index == gameIndex
                        ? "gameBox active boxStyle"
                        : "gameBox"
                }
            >
                <div className="imageContainer">
                    <img
                        className={index == gameIndex ? "gameImagesX active" : "gameImagesX"}
                        style={index == gameIndex ? { filter: "none" } : { filter: statConfig.stationCode === "yd102" ? "none" : iconColor.color }}
                        src={
                            index == gameIndex
                                ? tab.selectedIcon
                                    ? tab.selectedIcon
                                    : statConfig.stationCode === "bx110" ? "logo/logo/bx110"+ tab.code + "_active.png" : "logo/" + tab.code + "_active.png"
                                : tab.icon
                                    ? tab.icon
                                    : statConfig.stationCode === "yd102" ? "logo/" + tab.code + "_active.png"
                                        : statConfig.stationCode === "bx110" ? "logo/logo/bx110"+ tab.code + "_active.png" : "logo/" + tab.code + ".png"
                        }
                    ></img>
                </div>
                <div className="labelContainer">
                    <span >
                        {tab.customTitle ? tab.customTitle : tab.name}
                    </span>
                </div>
            </Link>
        </Box>
    )
}
export function GameFavLink(props: any) {
    const color = useCollorePallete()
    const colorP = useGlobalList(state => state.color);
    const iconColor: any = CssFilterConverter.hexToFilter(colorP.text);
    const [curTab, setCurTab] = useState<any>("");
    const { t, i18n } = useTranslation(["home", "main"]);
    const index = props.index
    const link = props.link
    const gameIndex = useGlobalList((state) => state.sideTabActive);
    const iconColor2: any = CssFilterConverter.hexToFilter(colorP.text4);
    const statConfig = useGlobalVariables(state => state.stationConfig)
    const hoverColor: any = CssFilterConverter.hexToFilter(colorP.forGround);
    const handleMouseEnter = (event: any) => {
        setCurTab(event.target.dataset.info);
    };
    const handleMouseLeave = (event: any) => {
        setCurTab("");
    };
    const boxStyles = {
        color: statConfig.stationCode === "yd102" ? colorP.text4 : colorP.text,
        backgroundColor: colorP.third
    };
    const boxStylesHungHover = {
        color: colorP.forGround + " !important",
        backgroundColor: colorP.third
    };
    const boxStylesActive = {
        color: statConfig.stationCode === "yd102" ? colorP.text4 + "!important" : colorP.text2 + "!important",
        backgroundColor: statConfig.stationCode === "yd102" ? colorP.third : colorP.forGround,
    };
    return (
        <Box sx={{
            "a:hover": {
                "span": {
                    color: colorP.forGround
                },
                " .gameImagesX": {
                    filter: statConfig.stationCode === "yd102" ? "none !important" : hoverColor.color + "!important",
                }
            },
            "a:hover.active": {
                "span": {
                    color: colorP.id === 17 ? colorP.backGorund : statConfig.stationCode === "yd102" ? colorP.text4 : colorP.text2
                },
                " .gameImagesX": {
                    filter: "none !important",
                }
            },
            "a.active": {
                "span": {
                    color: colorP.id === 17 ? colorP.backGorund : statConfig.stationCode === "yd102" ? colorP.text4 : colorP.text2
                }
            }
        }}>
            <Link to={"/" + link}
                data-info={"key_"}
                style={
                    index != gameIndex
                        ? curTab == "key_"
                            ? boxStylesHungHover
                            : boxStyles
                        : boxStylesActive
                }
                onMouseEnter={(e) => handleMouseEnter(e)}
                onMouseLeave={handleMouseLeave}
                onClick={() => GameClick(98, "Favoritos")}
                className={
                    index == gameIndex ? "gameBox active boxStyle" : "gameBox"
                }
            >
                <div className="imageContainer">
                    <img

                        style={index !== gameIndex ? { filter: statConfig.stationCode === "yd102" ? "none" : iconColor.color, height: ".25rem", width: ".32rem" } : { filter: "none" }}
                        className="gameImagesX"
                        src={
                            index == gameIndex
                                ? "/images/favor3.png"
                                : statConfig.stationCode === "yd102" ? "images/favor3.png"
                                    : "images/favor2.png"
                        }
                    ></img>
                </div>
                <div className="labelContainer">
                    <span> {t("ts1030", { ns: "ts" })}</span>
                </div>
            </Link>
        </Box>
    )
}
export function GameRecentLink(props: any) {
    const color = useCollorePallete()
    const colorP = useGlobalList(state => state.color);
    const [curTab, setCurTab] = useState<any>("");
    const iconColor: any = CssFilterConverter.hexToFilter(colorP.text);
    const { t, i18n } = useTranslation(["home", "main"]);
    const index = props.index
    const link = props.link
    const gameIndex = useGlobalList((state) => state.sideTabActive);
    const iconColor2: any = CssFilterConverter.hexToFilter(colorP.text4);
    const statConfig = useGlobalVariables(state => state.stationConfig)
    const hoverColor: any = CssFilterConverter.hexToFilter(colorP.forGround);
    const handleMouseEnter = (event: any) => {
        setCurTab(event.target.dataset.info);
    };
    const handleMouseLeave = (event: any) => {
        setCurTab("");
    };
    const boxStyles = {
        color: statConfig.stationCode === "yd102" ? colorP.text4 : colorP.text,
        backgroundColor: colorP.third
    };
    const boxStylesHungHover = {
        color: colorP.forGround + " !important",
        backgroundColor: colorP.third
    };
    const boxStylesActive = {
        color: statConfig.stationCode === "yd102" ? colorP.text4 + "!important" : colorP.text2 + "!important",
        backgroundColor: statConfig.stationCode === "yd102" ? colorP.third : colorP.forGround,
    };
    return (
        <Box sx={{
            "a:hover": {
                "span": {
                    color: colorP.forGround
                },
                " .gameImagesX": {
                    filter: statConfig.stationCode === "yd102" ? "none !important" : hoverColor.color + "!important",
                }
            },
            "a:hover.active": {
                "span": {
                    color: colorP.id === 17 ? colorP.backGorund : statConfig.stationCode === "yd102" ? colorP.text4 : colorP.text2
                },
                " .gameImagesX": {
                    filter: "none !important",
                }
            },
            "a.active": {
                "span": {
                    color: colorP.id === 17 ? colorP.backGorund : statConfig.stationCode === "yd102" ? colorP.text4 : colorP.text2
                }
            }
        }}>
            <Link to="/recent"
                data-info={"key_"}
                style={
                    97 != gameIndex
                        ? curTab == "key_"
                            ? boxStylesHungHover
                            : boxStyles
                        : boxStylesActive
                }
                onMouseEnter={(e) => handleMouseEnter(e)}
                onMouseLeave={handleMouseLeave}
                onClick={() => GameClick(97, "recent")}
                className={
                    97 == gameIndex ? "gameBox active boxStyle" : "gameBox"
                }
            >
                <div
                    className="imageContainer"
                    style={{ maxHeight: ".3rem", maxWidth: ".3rem" }}
                >
                    <img
                        className="gameImagesX"
                        style={index !== gameIndex ? { filter: statConfig.stationCode === "yd102" ? "none" : iconColor.color } : { filter: "none" }}
                        src={
                            97 == gameIndex
                                ? "images/recente_active.png"
                                : statConfig.stationCode === "yd102" ? "images/recente_active.png"
                                    : "images/recente.png"
                        }
                    ></img>
                </div>
                <div className="labelContainer">
                    <span> {t("ts1029", { ns: "ts" })}</span>
                </div>
            </Link>
        </Box>
    )
}
export function GameLinkLoader() {
    const colorP = useGlobalList(state => state.color);
    return (
        <>
            <Skeleton sx={{ backgroundColor: colorP.third, borderRadius: ".05rem" }} variant="rectangular" width={100} height={70} />
            <Skeleton sx={{ backgroundColor: colorP.third, borderRadius: ".05rem" }} variant="rectangular" width={100} height={70} />
            <Skeleton sx={{ backgroundColor: colorP.third, borderRadius: ".05rem" }} variant="rectangular" width={100} height={70} />
            <Skeleton sx={{ backgroundColor: colorP.third, borderRadius: ".05rem" }} variant="rectangular" width={100} height={70} />
            <Skeleton sx={{ backgroundColor: colorP.third, borderRadius: ".05rem" }} variant="rectangular" width={100} height={70} />
            <Skeleton sx={{ backgroundColor: colorP.third, borderRadius: ".05rem" }} variant="rectangular" width={100} height={70} />
            <Skeleton sx={{ backgroundColor: colorP.third, borderRadius: ".05rem" }} variant="rectangular" width={100} height={70} />
        </>
    )
}