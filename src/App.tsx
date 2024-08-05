import React from "react";
import { HashRouter } from "react-router-dom";
import { Routes, Route, Outlet, Navigate } from "react-router";
import Home from "./components/main/homePage/home";
import Record from "./components/main/recordPage/record";
import Rebate from "./components/main/rebatePage/rebate";
import Vip from "./components/main/vipPage/vip";
import Fee from "./components/main/feePage/fee";
import AccountDetails from "./components/main/userCenter";
import Pending from "./components/main/pendingPage/pending";
import Support from "./components/main/supportpage/support";
import Security from "./components/main/securityPage/sercurity";
import CoreWallet from "./components/main/walletPage/coreWallet";
import CoreWalletArcade from "./components/main/walletPage/coreWalletArcade";
import CoreWalletFishing from "./components/main/walletPage/coreWalletFishing";
import CoreWalletBlockchain from "./components/main/walletPage/coreWalletBlockchain";
import CoreWalletEsport from "./components/main/walletPage/coreWalletEsport";
import ProfileInfo from "./components/main/profileInfoPage/profile";
import WithdrawalPassword from "./components/main/withdrawalPassword/withdrawalPassword";
import WithdrawalPage from "./components/main/userCenter/widthrawalPage/withdraw";
import AccountManagement from "./components/main/invitePage/inviteLink/accountTabManagement";
import PointRedemption from "./components/main/pointRedemption/point-redemption";
import BettingHistory from "./components/main/userCenter/betHistoryPage";
import Game from "./components/main/homePage/game";
import PromotionPage from "./components/main/PromotionPage";

import DownloadPage from "./components/main/downloadPage/download-page";
import ActiveEvent from "./components/main/eventPage/newEvent/newEvent";
import GameSpace from "./components/main/homePage/game";
import Recorder from "./components/main/records/record";
import { useGetConfig, useGetGames, useGetRegFields, useGetUserInfo, useRefreshBal, useStationConfig } from "./components/hooks/getUserInfoHook";
import { useEffect } from "react";
import WithdrawMoney from "./components/main/userCenter/widthrawalPage/withdrawMoney";
import { useGlobalList, useGlobalVariables, userRegstore } from "./components/globalFunctions/store";
import TurnTable from "./components/main/turnlate/turnTable";
import Mission from "./components/main/mission/missionPage";
// import GameSearch from "./components/main/homePage/searchPage";
import EnveLop from "./components/main/envelop";
import { ChangeColorPallteUpdate } from "./components/globalFunctions/globalContext";
import Secure from "./components/main/securityPage/security/secure";
import Recharge from "./components/main/recharge/recharge";
import GameFrame from "./components/main/homePage/gameFrame";
import { Ripple,initTWE,} from "tw-elements";
import ActivityPage from "./components/main/eventPage/newEvent/activityPage";
import Faq from "./components/main/faq/faq";
import Cookies from "universal-cookie";
const LazyEvent = React.lazy(() => import("./components/main/eventPage/event"))
const GameSearch = React.lazy(() => import("./components/main/homePage/searchPage"))
const EventDetails = React.lazy(() => import("./components/main/eventPage/eventDetails"))
// import EventDetails from "./components/main/eventPage/eventDetails";
const ProtectedRoute = ({ user, children, redirectPath }: any) => {
  if (user?.isLogin == false) {
    return <Navigate to={redirectPath} replace />;
  }

  return children ? children : <Outlet />;
};
function App() {
  const { data: user } = useGetUserInfo();
  const userConfig = useStationConfig();
  const title = useGlobalVariables(state => state.stationConfig)
  const regFields = useGetRegFields()
  const changeColor = ChangeColorPallteUpdate()
  const getGame = useGetGames()
  const color = useGlobalList(state => state.color)
  const stationCon = useStationConfig()
  const refreshBalance=useRefreshBal()
  const getConfig = useGetConfig()
  const handleColorChange = (stationTema: any) => {

    changeColor(stationTema)

  }

  const cookies = new Cookies();
  
  useEffect(() => {
    getGame.refetch()
    stationCon.refetch()
    userConfig.refetch()
    getConfig.refetch()

    if (regFields.isSuccess === true && user?.data.isLogin === false && cookies.get('linkKey') !== undefined) {
      userRegstore.setState({ isOpenRegister: true });
    }
   
    const onPageLoad = () => {
    };
    if (document.readyState === 'complete') {
      onPageLoad();
    }
    if (userConfig.isLoading === false) {
      document.title = title && title.stationName;

    }
    if (user?.data.isLogin == false) {
      regFields.refetch()
      useGlobalVariables.setState({ TurnTablePrize: [] })
    }
    else{
      refreshBalance.mutate()
    }
    const stationConfig = useGlobalVariables.getState().stationConfig;
    // handleColorChange(16)
    handleColorChange(stationConfig.stationTheme)
    const bodyAim: any = document.getElementById("backGroundSystem")
    bodyAim.style.backgroundColor = color.backGorund
  }, []);
  initTWE({ Ripple });
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="*" element={<Home />}></Route>
        <Route path="/support" element={<Support />}></Route>
        <Route path="/download-page" element={<DownloadPage />}></Route>
        <Route path="/activeEvent" element={<ActiveEvent />}></Route>
        <Route path="/game" element={<GameSpace />}></Route>
        <Route path="/event" element={<React.Suspense fallback={<Home></Home>}><LazyEvent/></React.Suspense>}></Route>
        <Route path="/search" element={<React.Suspense fallback={<Home></Home>}><GameSearch/></React.Suspense>}></Route>
        <Route path="/event-details" element={<React.Suspense fallback={<Home></Home>}><EventDetails/></React.Suspense>}></Route>
        {/* <Route path="/event-details" element={<EventDetails></EventDetails>}></Route> */}
        <Route path="/rebate-fishing" element={<Rebate />}></Route>
        <Route path="/balance-bonus" element={<Fee />}></Route>
        <Route path="/PromotionPage" element={<PromotionPage />}></Route>
        <Route path="/event-mission" element={<Mission />}></Route>
        <Route path="/active-event" element={<ActivityPage />}></Route>
        <Route path="/faqs" element={<Faq />}></Route>
        {/* <Route path="/search" element={<GameSearch />}></Route> */}
        <Route path="/turn-table" element={<TurnTable />}></Route>
        <Route element={<ProtectedRoute user={user?.data} redirectPath="/" />}>
          <Route path="/withdraw" element={<WithdrawMoney />}></Route>
          <Route path="/register" element={<Home />}></Route>
          <Route path="/point-redemption" element={<PointRedemption />}></Route>
          <Route path="/record" element={<Recorder />}></Route>
          <Route path="/envelop" element={<EnveLop />}></Route>
          <Route path="/withdrawal" element={<WithdrawalPage />}></Route>
          <Route path="/agent-management" element={<AccountManagement />}></Route>
          <Route path="/profile-information" element={<ProfileInfo />}></Route>
          <Route path="/core-wallet" element={<CoreWallet />}></Route>
          <Route path="/core-wallet-arcade" element={<CoreWalletArcade />}></Route>
          <Route path="/core-wallet-fishing" element={<CoreWalletFishing />}></Route>
          <Route path="/core-wallet-blockchain" element={<CoreWalletBlockchain />}></Route>
          <Route path="/core-wallet-esport" element={<CoreWalletEsport />}></Route>
          <Route path="/account-details" element={<AccountDetails />}></Route>
          <Route path="/record-collection" element={<Record />}></Route>
          <Route path="/vip" element={<Vip />}></Route>
          <Route path="/pending" element={<Pending />}></Route>
          <Route path="/security" element={<Security />}></Route>
          <Route path="/WithdrawalPassword" element={<WithdrawalPassword />}></Route>
          <Route path="/betting-history" element={<BettingHistory />}></Route>
          <Route path="/game" element={<Game />}></Route>
          <Route path="/online" element={<GameFrame />}></Route>
          <Route path="/secure" element={<Secure />}></Route>
          <Route path="/recharge" element={<Recharge />}></Route>
        </Route>
      </Routes>
    </HashRouter>
  );
}
export default App;
