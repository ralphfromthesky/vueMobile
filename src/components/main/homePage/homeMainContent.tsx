import './home.css'
import { useEffect, useRef, useState } from "react";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import GameContent from "./gameContent";
import { Link } from "react-router-dom";
import { useGetGames } from "../../hooks/getUserInfoHook";
import { useTranslation } from "react-i18next";
import { useGlobalList, useGlobalVariables } from '../../globalFunctions/store';
import GameContentFav from './gameFavContent';
import GameContentRecent from './gameRecent';
import { Marquee } from './components/marquee';
import { Box, Skeleton } from '@mui/material';
import CssFilterConverter from 'css-filter-converter';
function HomeMainContent(props: any) {
    const { t } = useTranslation(["home", "main"]);
    const statConfig = useGlobalVariables(state => state.stationConfig)
    const gamesColetion = useGlobalVariables(state => state.gameTabs)
    const gameIndex = useGlobalList(state => state.sideTabActive)
    const isFav = useGlobalVariables(state => state.isFav)
    const [arrowStat, setArrowStat] = useState(true)
    function gameClicks(index: any, id: any) {
        useGlobalVariables.setState({ isFav: false })
        useGlobalList.setState({ sideAction: id });
        useGlobalList.setState({ sideTabActive: index });
    }

    const gamesContent = useGetGames({ type: "11" })
    const backgroundColor = useGlobalList(state => state.color)
    const iconColor: any = CssFilterConverter.hexToFilter(backgroundColor.text);
    const iconColor2: any = CssFilterConverter.hexToFilter(backgroundColor.text4);
    const activBox = {
        paddingBottom: ".075rem",
        borderColor: backgroundColor.forGround + "!important",

    }
    function getFav(index: any) {
        useGlobalVariables.setState({ isFav: true })
        useGlobalList.setState({ sideTabActive: index });
    }
    function getGameTab(issub: any, gameIndex: any) {
        if (gameIndex == 98 || gameIndex == 97) {
            getFav(gameIndex)
        }
        switch (issub) {
            case true:
                switch (gameIndex) {
                    case 98:
                        return <GameContentFav tabLink={props.tabLink} viewGamesTab={props.handleGameChange}>{gamesContent}</GameContentFav>;
                    default:
                        return <GameContentRecent tabLink={props.tabLink} viewGamesTab={props.handleGameChange}>{gamesContent}</GameContentRecent>
                }
            default:
                return <GameContent />;
        }
    }

    const scrollLeftRef = useRef<any>();
    const [scrollX, setScrollX] = useState({
        side: ""
    });
    const sideScroll = (data: any, value: any) => {
        setArrowStat(value)
        setScrollX(prev => ({ ...prev, side: data.side }));
    }

    useEffect(() => {
        if (scrollX.side === "right") {
            scrollLeftRef.current.scrollLeft += 200;
        } else {
            scrollLeftRef.current.scrollLeft -= 200;
        }
    }, [scrollX]);

    return (
        <>
            <section className="content homeContent">
                <Marquee></Marquee>
                <div className="gameContainers" style={{ backgroundColor: backgroundColor.backGorund }}>
                    <div className="flex items-center relative justify-between">
                        <div className="left-0 flex items-center gap-[-1rem] ml-[.1rem]">
                            {arrowStat == false && <img onClick={() => sideScroll({ side: "left" }, true)} style={{ filter: iconColor.color }} className='leftIcon' src="/images/icon_right.png" alt="" />}
                        </div>
                        <div className="gameTabs !w-[11rem] border-b-[.02rem] !overflow-y-hidden" style={{ borderColor: backgroundColor.text }} ref={scrollLeftRef}>
                            <div className="gameIcons" >
                                {
                                    gamesContent.isLoading == false ? gamesColetion && gamesColetion.filter((entry: { games: any; }) =>
                                        entry.games.length !== 0
                                    ).map(({ games, tab }: any, index: any) => games.length > 0 ?
                                        <Box
                                            sx={{
                                                " .labelContainer::after": {
                                                    backgroundColor: backgroundColor.forGround + "!important",
                                                }
                                            }}
                                        >
                                            <div onClick={() => gameClicks(index, tab.code)} style={(index == gameIndex) ? activBox : { color: "white" }} className={index == gameIndex ? "gameBox active" : "gameBox"} key={`box_` + tab.id}>
                                                <div className="imageContainer">
                                                    <LazyLoadImage style={{ filter: statConfig.stationCode === "yd102" ? "none" : iconColor.color }} width={40} height={30} className='gameImage' src={index == gameIndex ? tab.selectedIcon ? tab.selectedIcon : statConfig.stationCode === "bx110" ? "logo/logo/bx110" + tab.code + "_active.png" : "logo/" + tab.code + "_active.png" : tab.icon ? tab.icon : statConfig.stationCode === "yd102" ? "logo/" + tab.code + "_active.png" : statConfig.stationCode === "bx110" ? "logo/logo/bx110" + tab.code + "_active.png" : "logo/" + tab.code + ".png"} alt="Popular" />
                                                </div>
                                                <div className="labelContainer">
                                                    <span style={index == gameIndex ? { color: backgroundColor.forGround } : { color: statConfig.stationCode === "yd102" ? backgroundColor.text4 : backgroundColor.text }}>{tab.customTitle ? tab.customTitle : tab.name}</span>
                                                </div>
                                            </div>
                                        </Box> : ""
                                    ) : <>
                                        <div className="gameBox">
                                            <div className="imageContainer">
                                                <Skeleton variant="circular" width={35} height={35} sx={{ backgroundColor: backgroundColor.third }} />
                                            </div>
                                            <div className="labelContainer">
                                                <Skeleton variant="text" width={50} height={25} sx={{ fontSize: '1rem', backgroundColor: backgroundColor.third }} />
                                            </div>
                                        </div>
                                        <div className="gameBox">
                                            <div className="imageContainer">
                                                <Skeleton variant="circular" width={35} height={35} sx={{ backgroundColor: backgroundColor.third }} />
                                            </div>
                                            <div className="labelContainer">
                                                <Skeleton variant="text" width={50} height={25} sx={{ fontSize: '1rem', backgroundColor: backgroundColor.third }} />
                                            </div>
                                        </div>
                                    </>
                                }
                                <Box
                                    sx={{
                                        " .labelContainer::after": {
                                            backgroundColor: backgroundColor.forGround + "!important",
                                        }
                                    }}
                                >
                                    <div style={(97 == gameIndex) ? activBox : { color: "white" }} onClick={() => getFav(97)} className={((97 == gameIndex) ? "gameBox active" : "gameBox")} >
                                        <div className="imageContainer fav">
                                            <img style={{ filter: statConfig.stationCode === "yd102" ? "none" : iconColor.color }} height={30} width={30} src={(97 == gameIndex) ? "/images/recent_active.png" : statConfig.stationCode === "yd102" ? "/images/recent_active.png" : "/images/recent_inactive.png"} alt="" />
                                        </div>
                                        <div className="labelContainer">
                                            <span style={97 == gameIndex ? { color: backgroundColor.forGround } : { color: statConfig.stationCode === "yd102" ? backgroundColor.text4 : backgroundColor.text }}>{t("ts1029", { ns: "ts" })}</span>
                                        </div>
                                    </div>
                                </Box>
                                <Box
                                    sx={{
                                        " .labelContainer::after": {
                                            backgroundColor: backgroundColor.forGround + "!important",
                                        }
                                    }}
                                >
                                    <div style={(98 == gameIndex) ? activBox : { color: "white" }} onClick={() => getFav(98)} className={((98 == gameIndex) ? "gameBox active" : "gameBox")} >
                                        <div className="imageContainer" style={{ height: ".2rem !important", width: ".2rem !important" }} >
                                            <img style={{ filter: statConfig.stationCode === "yd102" ? "none" : iconColor.color }} src={(98 == gameIndex) ? "/images/favor3.png" : statConfig.stationCode === "yd102" ? "/images/favor3.png" : "/images/favor2.png"} alt="" />
                                        </div>
                                        <div className="labelContainer">
                                            <span style={98 == gameIndex ? { color: backgroundColor.forGround } : { color: statConfig.stationCode === "yd102" ? backgroundColor.text4 : backgroundColor.text }}>{t("ts1030", { ns: "ts" })}</span>
                                        </div>
                                    </div>
                                </Box>
                            </div>

                        </div>
                        <div className="right-0 flex items-center gap-[-1rem] mr-[.1rem]">
                            {arrowStat == true && <img onClick={() => sideScroll({ side: "right" }, false)} style={{ filter: iconColor.color }} className='RightIcon' src="/images/icon_left.png" alt="" />}
                            <div className="search">
                                <Link to="/search"> <img style={{ width: ".25rem", height: ".25rem" }} src={statConfig.stationTheme !== 17 ? "/images/searchIconColor.png" : "/images/search.png"} alt="" /></Link>
                            </div>
                        </div>
                    </div>
                    <div className="gamesMain">
                        {getGameTab(isFav, gameIndex)}
                    </div>
                </div>
            </section>
        </>
    )
}
export default HomeMainContent;