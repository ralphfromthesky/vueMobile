import axios from "axios";
import React, { createContext, useContext, useEffect, useReducer, useState } from "react";
import { dateReducer, initialDate } from "../main/reducers/dateReduce";
import { useQuery } from "react-query";
import { useGlobalVariables } from "./store";
const UserContext = createContext<any | undefined>(undefined);
const UserContextUpdate = createContext<any | undefined>(undefined);
const UserBalanceUpdate = createContext<any | undefined>(undefined);
const UserGames = createContext<any | undefined>(undefined);
const ColorChange = createContext<any | undefined>(undefined);
const ColorChangeUpdate = createContext<any | undefined>(undefined);
const UserConfig = createContext<any | undefined>(undefined);
const UserConfigOFF = createContext<any | undefined>(undefined);
const UserConfigMain = createContext<any | undefined>(undefined);
const UserConfig2 = createContext<any | undefined>(undefined);
const RefreshBalance = createContext<any | undefined>(undefined);
const GameURLContext = createContext<any | undefined>(undefined);
const GameSettingContect = createContext<any | undefined>(undefined);
const GameSettingContectUpdate = createContext<any | undefined>(undefined);

export function useBalance() {
  return useContext(UserContext);
}
export function SetGameURL() {
  return useContext(GameURLContext);

}
export function ChangeColorPallte() {
  return useContext(ColorChange);
}
export function ChangeColorPallteUpdate() {
  return useContext(ColorChangeUpdate);
}
export function UserInfoUpdates() {
  return useContext(UserContextUpdate);
}
export function SetNewBalance() {
  return useContext(UserBalanceUpdate);
}
export function MainGames() {
  return useContext(UserGames);
}
export function UserUSerConfig() {
  return useContext(UserConfig);
}
export function UserUSerConfig2() {
  return useContext(UserConfig2);
}
export function GameRefreshBalance() {
  return useContext(RefreshBalance);
}

export function UserUSerConfigOFF() {
  return useContext(UserConfigOFF);
}
export function UserUSerConfigMain() {
  return useContext(UserConfigMain);
}
export function GetGameSettings() {
  return useContext(GameSettingContect);
}
export function SetGameSettings() {
  return useContext(GameSettingContectUpdate);
}

export function UserProvider({ children }: any) {
  const bgColors = {
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
  }
  const colorPalletess = [
    {
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
    {
      id: 2,
      backGorund: "#181b29",
      forGround: "#1c64f5",
      first: "#0e121b",
      second: "#181b29",
      third: "#0e121b",
      text: "#ffffff",
      text2: "#ffffff",
      text3: "#ffffff",
      text4: "#ffff",
      bgImage: "/images/backgroundIMG.png",
      activeTab: "/inviteImages/1C64F5.png",
      inActiveTab: "/inviteImages/181b29.png",
      regla: "/images/2.png",
      copy: "/copyIcons/1c64f5.png",
      scroll: "/scrollImages/1c64f5.png",
      fourth: "#0e121b",
      fifth: "#1c64f5",
      sixth: "#1c64f5",
      sideBartext: "#d5ddff",
      gameEntryText: "#ffffff"
    },
    {
      id: 3,
      backGorund: "#1a3f45",
      forGround: "#5dcbda",
      first: "#275b66",
      second: "#1a3f45",
      third: "#275b66",
      text: "#ffffff",
      text2: "#ffffff",
      text3: "#ffffff",
      text4: "#ffff",
      bgImage: "/images/backgroundIMG.png",
      activeTab: "/inviteImages/5dcbda.png",
      inActiveTab: "/inviteImages/1a3f45.png",
      regla: "/images/3.png",
      copy: "/copyIcons/5dcbda.png",
      scroll: "/scrollImages/5dcbda.png",
      fourth: "#275b66",
      fifth: "#5dcbda",
      sixth: "#5dcbda",
      gameEntryText: "#ffffff"
    },
    {
      id: 4,
      backGorund: "#212121",
      forGround: "#e01826",
      first: "#303030",
      second: "#212121",
      third: "#303030",
      text: "#ffffff",
      text2: "#ffffff",
      text3: "#ffffff",
      text4: "#ffff",
      bgImage: "/images/backgroundIMG.png",
      activeTab: "/inviteImages/e01826.png",
      inActiveTab: "/inviteImages/212121.png",
      regla: "/images/4.png",
      copy: "/copyIcons/e01826.png",
      scroll: "/scrollImages/e01826.png",
      fourth: "#303030",
      fifth: "#e01826",
      sixth: "#e01826",
      gameEntryText: "#ffffff"
    },
    {
      id: 5,
      backGorund: "#2a0878",
      forGround: "#d65efc",
      first: "#451f98",
      second: "#2a0878",
      third: "#451f98",
      text: "#ffffff",
      text2: "#ffffff",
      text3: "#ffffff",
      text4: "#ffff",
      bgImage: "/images/backgroundIMG.png",
      activeTab: "/inviteImages/d65efc.png",
      inActiveTab: "/inviteImages/2a0878.png",
      regla: "/images/5.png",
      copy: "/copyIcons/d65efc.png",
      scroll: "/scrollImages/d65efc.png",
      fourth: "#451f98",
      fifth: "#d65efc",
      sixth: "#d65efc",
      gameEntryText: "#ffffff"
    },
    {
      id: 6,
      backGorund: "#1d533c",
      forGround: "#fbfc50",
      first: "#22684c",
      second: "#1d533c",
      third: "#22684c",
      text: "#ffffff",
      text2: "#874404",
      text3: "#874404",
      text4: "#ffff",
      bgImage: "/images/backgroundIMG.png",
      activeTab: "/inviteImages/d65efc.png",
      inActiveTab: "/inviteImages/2a0878.png",
      regla: "/images/fbfc50.png",
      copy: "/copyIcons/Porsche_copy.png",
      scroll: "/scrollImages/Porsche.png",
      fourth: "#22684c",
      fifth: "#fbfc50",
      sixth: "#fbfc50",
      gameEntryText: "#ffffff"
    },
    {
      id: 7,
      backGorund: "#832422",
      forGround: "#fec506",
      first: "#a12f2f",
      second: "#832422",
      third: "#a12f2f",
      text: "#ffffff",
      text2: "#ffffff",
      text3: "#ffffff",
      text4: "#ffff",
      bgImage: "/images/backgroundIMG.png",
      activeTab: "/inviteImages/d65efc.png",
      inActiveTab: "/inviteImages/2a0878.png",
      regla: "/images/fec506.png",
      copy: "/copyIcons/Cartier_copy.png",
      scroll: "/scrollImages/Cartier.png",
      fourth: "#a12f2f",
      fifth: "#fec506",
      sixth: "#fec506",
      gameEntryText: "#ffffff"
    },
    {
      id: 8,
      backGorund: "#050730",
      forGround: "#f3d99e",
      first: "#12194d",
      second: "#050730",
      third: "#12194d",
      text: "#ffffff",
      text2: "#874404",
      text3: "#874404",
      text4: "#ffff",
      bgImage: "/images/backgroundIMG.png",
      activeTab: "/inviteImages/d65efc.png",
      inActiveTab: "/inviteImages/2a0878.png",
      regla: "/images/f3d99e.png",
      copy: "/copyIcons/EsteeLauder_copy.png",
      scroll: "/scrollImages/EsteeLauder.png",
      fourth: "#12194d",
      fifth: "#f3d99e",
      sixth: "#f3d99e",
      gameEntryText: "#ffffff"
    },
    {
      id: 9,
      backGorund: "#610c21",
      forGround: "#fe3756",
      first: "#771830",
      second: "#610c21",
      third: "#771830",
      text: "#ffffff",
      text2: "#ffffff",
      text3: "#ffffff",
      text4: "#ffff",
      bgImage: "/images/backgroundIMG.png",
      activeTab: "/inviteImages/d65efc.png",
      inActiveTab: "/inviteImages/2a0878.png",
      regla: "/images/771830.png",
      copy: "/copyIcons/Burberry_copy.png",
      scroll: "/scrollImages/Burgundy.png",
      fourth: "#771830",
      fifth: "#fe3756",
      sixth: "#fe3756",
      gameEntryText: "#ffffff"
    },
    {
      id: 10,
      backGorund: "#002744",
      forGround: "#04cbf4",
      first: "#013658",
      second: "#002744",
      third: "#013658",
      text: "#ffffff",
      text2: "#ffffff",
      text3: "#ffffff",
      text4: "#ffff",
      bgImage: "/images/backgroundIMG.png",
      activeTab: "/inviteImages/d65efc.png",
      inActiveTab: "/inviteImages/2a0878.png",
      regla: "/images/03395d.png",
      copy: "/copyIcons/IWC_copy.png",
      scroll: "/scrollImages/IWC.png",
      fourth: "#013658",
      fifth: "#04cbf4",
      sixth: "#04cbf4",
      gameEntryText: "#ffffff"
    },
    {
      id: 11,
      backGorund: "#013630",
      forGround: "#fdd984",
      first: "#014c45",
      second: "#013630",
      third: "#014c45",
      text: "#ffffff",
      text2: "#874404",
      text3: "#874404",
      text4: "#ffff",
      bgImage: "/images/backgroundIMG.png",
      activeTab: "/inviteImages/d65efc.png",
      inActiveTab: "/inviteImages/2a0878.png",
      regla: "/images/fdd984.png",
      copy: "/copyIcons/Gucci_copy.png",
      scroll: "/scrollImages/Gucci.png",
      fourth: "#014c45",
      fifth: "#fdd984",
      sixth: "#fdd984",
      gameEntryText: "#ffffff"
    },
    {
      id: 12,
      backGorund: "#63482b",
      forGround: "#ffe5b4",
      first: "#896742",
      second: "#63482b",
      third: "#896742",
      text: "#ffffff",
      text2: "#874404",
      text3: "#874404",
      text4: "#ffff",
      bgImage: "/images/backgroundIMG.png",
      activeTab: "/inviteImages/d65efc.png",
      inActiveTab: "/inviteImages/2a0878.png",
      regla: "/images/ffe5b4.png",
      copy: "/copyIcons/Burberry_copy.png",
      scroll: "/scrollImages/Burberry.png",
      fourth: "#896742",
      fifth: "#ffe5b4",
      sixth: "#ffe5b4",
      gameEntryText: "#ffffff"
    },
    {
      id: 13,
      backGorund: "#034d2c",
      forGround: "#feebb0",
      first: "#086338",
      second: "#034d2c",
      third: "#086338",
      text: "#ffffff",
      text2: "#874404",
      text3: "#874404",
      text4: "#ffff",
      bgImage: "/images/backgroundIMG.png",
      activeTab: "/inviteImages/d65efc.png",
      inActiveTab: "/inviteImages/2a0878.png",
      regla: "/images/feebb0.png",
      copy: "/copyIcons/LaMer_copy.png",
      scroll: "/scrollImages/LaMer.png",
      fourth: "#086338",
      fifth: "#feebb0",
      sixth: "#feebb0",
      gameEntryText: "#ffffff"
    },
    {
      id: 14,
      backGorund: "#5c075c",
      forGround: "#ffda86",
      first: "#791079",
      second: "#5c075c",
      third: "#791079",
      text: "#ffffff",
      text2: "#874404",
      text3: "#874404",
      text4: "#ffff",
      bgImage: "/images/backgroundIMG.png",
      activeTab: "/inviteImages/d65efc.png",
      inActiveTab: "/inviteImages/2a0878.png",
      regla: "/images/ffda86.png",
      copy: "/copyIcons/Ebay_copy.png",
      scroll: "/scrollImages/Ebay.png",
      fourth: "#791079",
      fifth: "#ffda86",
      sixth: "#ffda86",
      gameEntryText: "#ffffff"
    },
    {
      id: 15,
      backGorund: "#0530a0",
      forGround: "#ffefbb",
      first: "#1642af",
      second: "#0530a0",
      third: "#1642af",
      text: "#ffffff",
      text2: "#874404",
      text3: "#874404",
      text4: "#ffff",
      bgImage: "/images/backgroundIMG.png",
      activeTab: "/inviteImages/d65efc.png",
      inActiveTab: "/inviteImages/2a0878.png",
      regla: "/images/ffefbb.png",
      copy: "/copyIcons/Dior_copy.png",
      scroll: "/scrollImages/Dior.png",
      fourth: "#1642af",
      fifth: "#ffefbb",
      sixth: "#ffefbb",
      gameEntryText: "#ffffff"
    },
    {
      id: 16,
      backGorund: "#ECEFF6",
      forGround: "#1a2937",
      first: "#fcfcfc",
      second: "#1a2937",
      third: "#fcfcfc",
      text: "#adb6c4",
      text2: "#ffffff",
      text3: "#1a2937",
      text4: "#1a2937",
      bgImage: "/images/backgroundIMG6.png",
      activeTab: "/inviteImages/d65efc.png",
      inActiveTab: "/inviteImages/2a0878.png",
      regla: "/images/f8f8f8.png",
      copy: "/copyIcons/f8f8f8_copy.png",
      scroll: "/scrollImages/f8f8f8.png",
      fourth: "#ADB6C3",
      fifth: "#fcfcfc",
      sixth: "#1a2937",
      gameEntryText: "#adb6c4"
    },
    {
      id: 17,
      backGorund: "#5375d1",
      forGround: "#fffcd1",
      first: "#7593e8",
      second: "#4969c2",
      third: "#7593e8",
      text: "#d5ddff",
      text2: "#b2c5fd",
      text3: "#874404",
      text4: "#ffffff",
      bgImage: "/images/backgroundIMG7.png",
      activeTab: "/inviteImages/d65efc.png",
      inActiveTab: "/inviteImages/2a0878.png",
      regla: "/images/f8f8f8.png",
      copy: "/copyIcons/f8f8f8_copy.png",
      scroll: "/scrollImages/f8f8f8.png",
      fourth: "#7593e8",
      fifth: "#fffcd1",
      sixth: "#fffcd1",
      sideBartext: "#d5ddff",
      gameEntryText: "#b2c5fd"

    },
  ]

  const [userInfo, setUserInfo] = useState<any[]>([]);
  const [userInfoUpdate, setUserInfoUpdate] = useState<any[]>([]);
  const [userConfig, setUserConfig] = useState<any[]>([]);
  const [userConfig2, setUserConfig2] = useState<any[]>([]);
  const [userConfigoff, setUserConfigoff] = useState<any[]>([]);
  const [gameURL, setGameURL] = useState<any>(undefined);
  const [commonReducer, dispatch] = useReducer(dateReducer, initialDate)
  const [colorPalletes, setColorPalletes] = useState(bgColors);
  const [gameSettings, setGameSettings] = useState<any[]>([{
    index: undefined,
    tabName: undefined,
    tabCode: undefined,
  }]);
  async function refreshBalanceGame() {
    try {
      const respnse = await axios.post('/autoTranout.do', {
        headers: {
          'X-Requested-With': 'XMLHttpRequest'
        }
      })
    } catch (e) {

    }

  }

  async function changeColor(fg: any) {
    const setColor = colorPalletess.find((item) => item?.id === fg)
    const bg = setColor ? setColor.backGorund : bgColors.backGorund
    const fgs = setColor ? setColor.forGround : bgColors.forGround
    const first = setColor ? setColor.first : bgColors.first
    const second = setColor ? setColor.second : bgColors.second
    const bgs = setColor ? setColor.bgImage : bgColors.bgImage
    const third = setColor ? setColor.third : bgColors.third
    const text = setColor ? setColor.text : bgColors.text
    const text2 = setColor ? setColor.text2 : bgColors.text2
    const activeTab = setColor ? setColor.activeTab : bgColors.activeTab
    const inActiveTab = setColor ? setColor.inActiveTab : bgColors.inActiveTab
    const regla = setColor ? setColor.regla : bgColors.regla
    const copy = setColor ? setColor.copy : bgColors.copy
    const scroll = setColor ? setColor.scroll : bgColors.scroll
    const fourth = setColor ? setColor.fourth : bgColors.fourth
    const fifth = setColor ? setColor.fifth : bgColors.fifth
    const text3 = setColor ? setColor.text3 : bgColors.text3
    const text4 = setColor ? setColor.text4 : bgColors.text4
    const sixth = setColor ? setColor.sixth : bgColors.sixth
    const gameEntryText = setColor ? setColor.gameEntryText : bgColors.gameEntryText
    setColorPalletes({ ...colorPalletes, backGorund: bg, forGround: fgs, bgImage: bgs, third: third, text: text, first: first, second: second, text2: text2, activeTab: activeTab, inActiveTab: inActiveTab, regla: regla, copy: copy, scroll: scroll, fourth: fourth, fifth: fifth, text3: text3, text4: text4, sixth: sixth, gameEntryText: gameEntryText })
  }
  async function getConfig() {
    try {
      const response = await axios.get('/userCenter/getStationConfig.do', {
        params: {
          load: true,
          app: true,
        }
      })
      setUserConfig2(response.data)
      setUserConfigoff(response.data)

    } catch (e) {

    }

  }
  const handleGameURL = (url: any) => {
    setGameURL(url)
  }
  async function getConfigMain() {
 
  }
  return (
    <UserContext.Provider value={gameURL}>
      <ColorChange.Provider value={colorPalletes}>
        <ColorChangeUpdate.Provider value={changeColor}>
          <UserConfig.Provider value={userConfig}>
            <UserConfigMain.Provider value={getConfigMain}>
              <UserConfigOFF.Provider value={userConfigoff}>
                <UserConfig2.Provider value={userConfig2}>
                  <RefreshBalance.Provider value={refreshBalanceGame}>
                    <GameURLContext.Provider value={handleGameURL}>
                      <GameSettingContect.Provider value={gameSettings}>
                        <GameSettingContectUpdate.Provider value={setGameSettings}>
                          {children}
                        </GameSettingContectUpdate.Provider>
                      </GameSettingContect.Provider>
                    </GameURLContext.Provider>
                  </RefreshBalance.Provider>
                </UserConfig2.Provider>
              </UserConfigOFF.Provider>
            </UserConfigMain.Provider>
          </UserConfig.Provider>
        </ColorChangeUpdate.Provider>
      </ColorChange.Provider>
    </UserContext.Provider>
  )
}
