import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import AboutView from "../views/AboutView.vue";
import PromotionPage from "@/views/Promotion/PromotionPage.vue";
import VipPage from "../views/Vip/VipPage.vue";
import JurosPage from "@/views/Juros/JurosMainPage.vue";
import TaskPage from "@/views/Task/task.vue";
import historicoPage from "@/views/Records/historico.vue";
import EventPage from "@/views/Event/EventPage.vue";
import WithdrawalPasswordPage from "@/views/Withdrawal/WithdrawPassword/WithdrawPasswordPage.vue";
import WithdrawalPage from "@/views/Withdrawal/WithdrawalPage.vue";
import WithdrawalRecord from "@/views/Withdrawal/WithdrawalRecord.vue";
import WithdrawalAudit from "@/views/Withdrawal/WithdrawalAudit.vue";
import WithdrawalAccount from "@/views/Withdrawal/WithdrawalAccount.vue";
import Deposit from "@/components/deposit/Deposit.vue";
import RecoverBalance from "@/views/RecoverBalance/RecoverBalance.vue";
import AcccountDetails from "@/views/AccountDetails/AcccountDetails.vue";
import BettingRecords from "@/views/AccountDetails/BettingRecords.vue";
import AccountDetailsRecord from "@/views/AccountDetails/AccountDetailsRecord.vue";
import InterestRules from "@/views/Juros/components/InterestRules.vue";
import Menu from "@/views/MenuPage/Menu.vue";
import Pendente from "@/views/Pendente/Pendente.vue";
import Invite from "@/views/Invite/PromoTutorial.vue";
import Invitation from "@/views/Invite/InvitationPage.vue";
import Profile from "@/views/Profile/Profile.vue";
import SecurityCenter from "@/views/SecurityCenter/SecurityCenter.vue";
import Support from "@/views/MessageCenter/Support.vue";
import Suggestion from "@/views/MessageCenter/Suggestion.vue";
import Email from "@/views/SecurityCenter/pages/Email.vue";
import GoogleAuthenticator from "@/views/SecurityCenter/pages/GoogleAuthenticator.vue";
import LoginPassword from "@/views/SecurityCenter/pages/LoginPassword.vue";
import SecurityQuestion from "@/views/SecurityCenter/pages/SecurityQuestion.vue";
import Notice from "@/views/MessageCenter/Notice.vue";
import Notification from "@/views/MessageCenter/Notification.vue";
import Announcement from "@/views/MessageCenter/Announcement.vue";
import CommissionRate from "@/views/Invite/CommissionRate.vue";
import SubordinatesRequests from "@/views/Invite/SubordinatesRequests.vue";
import DataSubordinate from "@/views/Invite/DataSubordinate.vue";
import BetSubordinate from "@/views/Invite/BetSubordinate.vue";
import FinancesSubordinate from "@/views/Invite/FinancesSubordinate.vue";
import AllData from "@/views/Invite/AllData.vue";
import DirectBettingPage from "@/views/Invite/DirectBettingPage.vue";
import DirectDataPage from "@/views/Invite/DirectDataPage.vue";
import DirectFinancing from "@/views/Invite/DirectFinancing.vue";
import PromoTutorial from "@/views/Invite/PromoTutorial.vue";
import Performance from "@/views/Invite/Performance.vue";
import Commission from "@/views/Invite/Commission.vue";
import DirectReporting from '@/views/Invite/DirectReporting.vue';
import LoginDevice from '@/views/LoginDevice/LoginDevice.vue';
import Slots from '@/views/Slots/Slots.vue'
import Fishing from '@/views/Fishing/Fishing.vue'
import LiveCasino from '@/views/LiveCasino/LiveCasino.vue'
import Sports from '@/views/Sports/Sports.vue'
import VipLoginBonus from "@/components/VipLoginBonus/VipLoginBonus.vue";





// const VipPage = () => import(/* webpackChunkName: "vip" */ "@/views/Vip/VipPage.vue");
// const JurosPage = () => import(/* webpackChunkName: "juros" */ "@/views/Juros/JurosMainPage.vue");
// const TaskPage = () => import(/* webpackChunkName: "task" */ "@/views/Task/task.vue");
// const historicoPage = () => import(/* webpackChunkName: "historico" */ "@/views/Records/historico.vue");
// const EventPage = () => import(/* webpackChunkName: "event" */ "@/views/Event/EventPage.vue");
// const WithdrawalPasswordPage = () => import(/* webpackChunkName: "withdrawalPassword" */ "@/views/Withdrawal/WithdrawPassword/WithdrawPasswordPage.vue");
// const WithdrawalPage = () => import(/* webpackChunkName: "withdrawal" */ "@/views/Withdrawal/WithdrawalPage.vue");
// const WithdrawalRecord = () => import(/* webpackChunkName: "withdrawalRecord" */ "@/views/Withdrawal/WithdrawalRecord.vue");
// const WithdrawalAudit = () => import(/* webpackChunkName: "withdrawalAudit" */ "@/views/Withdrawal/WithdrawalAudit.vue");
// const WithdrawalAccount = () => import(/* webpackChunkName: "withdrawalAccount" */ "@/views/Withdrawal/WithdrawalAccount.vue");
// const Deposit = () => import(/* webpackChunkName: "deposit" */ "@/components/deposit/Deposit.vue");
// const RecoverBalance = () => import(/* webpackChunkName: "recoverBalance" */ "@/views/RecoverBalance/RecoverBalance.vue");
// const AcccountDetails = () => import(/* webpackChunkName: "accountDetails" */ "@/views/AccountDetails/AcccountDetails.vue");
// const BettingRecords = () => import(/* webpackChunkName: "bettingRecords" */ "@/views/AccountDetails/BettingRecords.vue");
// const AccountDetailsRecord = () => import(/* webpackChunkName: "accountDetailsRecord" */ "@/views/AccountDetails/AccountDetailsRecord.vue");
// const InterestRules = () => import(/* webpackChunkName: "interestRules" */ "@/views/Juros/components/InterestRules.vue");
// const Menu = () => import(/* webpackChunkName: "menu" */ "@/views/MenuPage/Menu.vue");
// const Pendente = () => import(/* webpackChunkName: "pendente" */ "@/views/Pendente/Pendente.vue");
// const Invite = () => import(/* webpackChunkName: "invite" */ "@/views/Invite/PromoTutorial.vue");
// const Invitation = () => import(/* webpackChunkName: "invitation" */ "@/views/Invite/InvitationPage.vue");
// const Profile = () => import(/* webpackChunkName: "profile" */ "@/views/Profile/Profile.vue");
// const SecurityCenter = () => import(/* webpackChunkName: "securityCenter" */ "@/views/SecurityCenter/SecurityCenter.vue");
// const Support = () => import(/* webpackChunkName: "support" */ "@/views/MessageCenter/Support.vue");
// const Suggestion = () => import(/* webpackChunkName: "suggestion" */ "@/views/MessageCenter/Suggestion.vue");
// const Email = () => import(/* webpackChunkName: "email" */ "@/views/SecurityCenter/pages/Email.vue");
// const GoogleAuthenticator = () => import(/* webpackChunkName: "googleAuthenticator" */ "@/views/SecurityCenter/pages/GoogleAuthenticator.vue");
// const LoginPassword = () => import(/* webpackChunkName: "loginPassword" */ "@/views/SecurityCenter/pages/LoginPassword.vue");
// const SecurityQuestion = () => import(/* webpackChunkName: "securityQuestion" */ "@/views/SecurityCenter/pages/SecurityQuestion.vue");
// const Notice = () => import(/* webpackChunkName: "notice" */ "@/views/MessageCenter/Notice.vue");
// const Notification = () => import(/* webpackChunkName: "notification" */ "@/views/MessageCenter/Notification.vue");
// const Announcement = () => import(/* webpackChunkName: "announcement" */ "@/views/MessageCenter/Announcement.vue");
// const CommissionRate = () => import(/* webpackChunkName: "commissionRate" */ "@/views/Invite/CommissionRate.vue");
// const SubordinatesRequests = () => import(/* webpackChunkName: "subordinatesRequests" */ "@/views/Invite/SubordinatesRequests.vue");
// const DataSubordinate = () => import(/* webpackChunkName: "dataSubordinate" */ "@/views/Invite/DataSubordinate.vue");
// const BetSubordinate = () => import(/* webpackChunkName: "betSubordinate" */ "@/views/Invite/BetSubordinate.vue");
// const FinancesSubordinate = () => import(/* webpackChunkName: "financesSubordinate" */ "@/views/Invite/FinancesSubordinate.vue");
// const AllData = () => import(/* webpackChunkName: "allData" */ "@/views/Invite/AllData.vue");
// const DirectBettingPage = () => import(/* webpackChunkName: "directBettingPage" */ "@/views/Invite/DirectBettingPage.vue");
// const DirectDataPage = () => import(/* webpackChunkName: "directDataPage" */ "@/views/Invite/DirectDataPage.vue");
// const DirectFinancing = () => import(/* webpackChunkName: "directFinancing" */ "@/views/Invite/DirectFinancing.vue");
// const PromoTutorial = () => import(/* webpackChunkName: "promoTutorial" */ "@/views/Invite/PromoTutorial.vue");
// const Performance = () => import(/* webpackChunkName: "performance" */ "@/views/Invite/Performance.vue");
// const Commission = () => import(/* webpackChunkName: "commission" */ "@/views/Invite/Commission.vue");
// const DirectReporting = () => import(/* webpackChunkName: "directReporting" */ '@/views/Invite/DirectReporting.vue');
// const LoginDevice = () => import(/* webpackChunkName: "loginDevice" */ '@/views/LoginDevice/LoginDevice.vue');


import { useStore } from "@/store/store.js";

const store = useStore()
const withdrawConfig = store?.state?.withdrawConfig?.content?.bankInfo

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/vip",
      name: "vip",
      component: VipPage,
    },
    {
      path: "/juros",
      name: "juros",
      component: JurosPage,
    },
    {
      path: "/task",
      name: "task",
      component: TaskPage,
    },
    { path: "/pendente", name: "pendente", component: Pendente },
    {
      path: "/records",
      name: "records",
      component: historicoPage,
    },
    {
      path: "/event",
      name: "event",
      component: EventPage,
    },
    {
      path: "/withdrawpassword",
      name: "withdrawpassword",
      component: WithdrawalPasswordPage,
    },
    {
      path: "/deposit",
      name: "deposit",
      component: Deposit,
    },
    {
      path: "/withdraw",
      name: "withdraw",
      component: WithdrawalPage,
    },
    {
      path: "/withdrawrecord",
      name: "withdrawrecord",
      component: WithdrawalRecord,
    },
    {
      path: "/recoverbalance",
      name: "/recoverbalance",
      component: RecoverBalance,
    },
    {
      path: '/recoverbalance',
      name: 'recoverbalance',
      component: RecoverBalance
    },
    {
      path: '/accountdetails',
      name: 'accountdetails',
      component: AcccountDetails
    },
    {
      path: '/bettingrecords',
      name: 'bettingrecords',
      component: BettingRecords
    },
    {
      path: '/accountdetailsrecord',
      name: 'accountdetailsrecord',
      component: AccountDetailsRecord
    },
    {
      path: '/menu',
      name: 'menu',
      component: Menu
    },
    {
      path: '/interestrules',
      name: 'interestrules',
      component: InterestRules
    },
    {
      path: '/invite',
      name: 'invite',
      component: Invite
    },
    {
      path: '/invitation',
      name: 'invitation',
      component: Invitation
    },
    {
      path: '/profile',
      name: 'profile',
      component: Profile
    },
    {
      path: '/support',
      name: 'support',
      component: Support
    },
    {
      path: '/notice',
      name: 'notice',
      component: Notice
    },
    {
      path: '/notification',
      name: 'notification',
      component: Notification
    },
    {
      path: '/announcement',
      name: 'announcement',
      component: Announcement
    },
    {
      path: '/suggestion',
      name: 'suggestion',
      component: Suggestion
    },
    {
      path: '/securitycenter',
      name: 'securitycenter',
      component: SecurityCenter
    },
    {
      path: '/securityemail',
      name: 'securityemail',
      component: Email
    },
    {
      path: '/googleauthenticator',
      name: 'googleauthenticator',
      component: GoogleAuthenticator
    },
    {
      path: '/loginpassword',
      name: 'loginpassword',
      component: LoginPassword
    },
    {
      path: '/securityquestion',
      name: 'securityquestion',
      component: SecurityQuestion
    },
    {
      path: '/commissionrate',
      name: 'commissionrate',
      component: CommissionRate
    },
    {
      path: '/subrequest',
      name: 'subrequest',
      component: SubordinatesRequests
    },
    {
      path: '/subbet',
      name: 'subbet',
      component: BetSubordinate
    },
    {
      path: '/subfinances',
      name: 'subfinances',
      component: FinancesSubordinate
    },
    {
      path: '/alldata',
      name: 'alldata',
      component: AllData
    },
    {
      path: '/subdata',
      name: 'subdata',
      component: DataSubordinate
    },
    {
      path: '/directData',
      name: 'directData',
      component: DirectDataPage
    },
    {
      path: '/directBet',
      name: 'directBet',
      component: DirectBettingPage
    },
    {
      path: '/directFinance',
      name: 'directFinance',
      component: DirectFinancing
    },
    {
      path: '/auditrecords',
      name: 'auditrecords',
      component: WithdrawalAudit
    },
    {
      path: '/manageaccount',
      name: 'manageaccount',
      component: WithdrawalAccount
    }, {
      path: '/performance',
      name: 'performance',
      component: Performance
    },
    {
      path: '/commission',
      name: 'commission',
      component: Commission
    },
    {
      path: '/promoTutorial',
      name: 'promoTutorial',
      component: PromoTutorial 
    },
    {
      path: '/directReport',
      name: 'directReport',
      component: DirectReporting
    },
    {
      path: '/deviceinfo',
      name: 'deviceinfo',
      component: LoginDevice  
    },
    {
      path: '/Slots',
      name: 'Slots',
      component: Slots 
    },
    {
      path: '/fishing',
      name: 'fishing',
      component: Fishing 
    },
    {
      path: '/livecasino',
      name: 'livecasino',
      component: LiveCasino  
    },
    {
      path: '/sports',
      name: 'sports',
      component: Sports  
    },
    {
      path: '/viplogin',
      name: 'viplogin',
      component: VipLoginBonus
  
    },

  ]
})

export default router;
