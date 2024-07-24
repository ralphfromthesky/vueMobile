<template>
  <PageLayoutAccountDetails title="Relatório">
    <div class="w-screen h-auto bg-[#1A45B1] p-[.2rem]">
      <div class="w-fullflex p-[.2rem]">
        <div class="flex gap-[.2rem] justify-center">
          <Select
            :pass="sched"
            title="Today"
            widthSize="2rem"
            @selected-item="handleSelecteditem"
          />
          <Select
            :pass="names"
            @selected-Event="handleSelectedEvents"
            title="Chess"
          />

          <Select
            :pass="allBets"
            title="All Platform"
            @selected-Platform="selectedPlatform"
          />

        </div>
      </div>
      <div
        class="flex flex-col h-[calc(100vh-2.9rem)] overflow-auto gap-[.2rem]"
      >
        <div
          v-for="(bettingValue, indexes) in bettingData?.content?.rows"
          :key="indexes"
          class="flex flex-col gap-[.1rem] leading-none p-[.2rem] rounded-[.1rem] odd:bg-[#05309F]"
        >

          <div class="grid grid-cols-2 gap-[.2rem]">
            <div class="flex flex-col gap-[.1rem]">
              <div class="flex gap-[.1rem]">
                <span class="text-[#fff] text-[.2rem]">Platform type:</span>
                <span class="text-[#fff] text-[.2rem]">{{
                  bettingValue.platformType
                }}</span>
              </div>
              <div class="flex gap-[.1rem]">
                <span class="text-[#fff] text-[.2rem]">Betting order no:</span>
                <span class="text-[#fff] text-[.2rem]">{{
                  bettingValue.orderId
                }}</span>
              </div>
              <div class="flex gap-[.1rem]">
                <span class="text-[#fff] text-[.2rem]">Betting time:</span>
                <span class="text-[#fff] text-[.2rem]">{{
                  bettingValue.bettingTime
                }}</span>
              </div>
              <div class="flex gap-[.1rem]">
                <span class="text-[#fff] text-[.2rem]">Betting amount:</span>
                <span class="text-[#fff] text-[.2rem]">{{
                  bettingValue.bettingMoney
                }}</span>
              </div>
              <div class="flex gap-[.1rem]">
                <span class="text-[#fff] text-[.2rem]">Round no:</span>
                <span class="text-[#fff] text-[.2rem]">{{
                  bettingValue.gameCode
                }}</span>
              </div>
            </div>
            <div class="flex flex-col gap-[.1rem]">
              <div class="flex gap-[.1rem]">
                <span class="text-[#fff] text-[.2rem]">Game type:</span>
                <span class="text-[#fff] text-[.2rem]">{{
                  bettingValue.gameName
                }}</span>
              </div>
              <div class="flex gap-[.1rem]">
                <span class="text-[#fff] text-[.2rem]">Account:</span>
                <span class="text-[#fff] text-[.2rem]"
                  >{{ bettingValue.username }}-{{
                    bettingValue.thirdUsername
                  }}</span
                >
              </div>
              <div class="flex gap-[.1rem]">
                <span class="text-[#fff] text-[.2rem]">Bet amount:</span>
                <span class="text-[#fff] text-[.2rem]">{{
                  bettingValue.realBettingMoney
                }}</span>
              </div>
              <div class="flex gap-[.1rem]">
                <span class="text-[#fff] text-[.2rem]"
                  >Amount won or lost:</span
                >
                <span class="text-[#fff] text-[.2rem]">{{
                  bettingValue.winMoney
                }}</span>
              </div>
            </div>
          </div>
        </div>
        <div
          v-if="bettingData?.content?.rows == 0"
          class="flex flex-col items-center h-full overflow-auto w-full/"
        >
          <div class="flex flex-col h-full justify-center items-center">
            <img
              class="w-[2.5rem]"
              src="/nodataImages/img_none_jl.png"
              alt=""
            />

            <span class="text-[#6FA4EF] text-[.25rem]">Sem Registros</span>
          </div>
        </div> 
        <SpinLoader v-if="spinLoad"/>
      </div>
    </div>
  </PageLayoutAccountDetails>
</template>
<script setup>
import PageLayoutAccountDetails from "../../components/layout/PageLayoutAccountDetails.vue";
import SpinLoader from "@/components/antUi/spinLoader.vue";
import { useMutation } from "@tanstack/vue-query";
import { onMounted, ref, computed } from "vue";

import { axiosGet2 } from "../../components/axios/AxiosHook.js";
import Select from "@/components/antUi/select.vue";
import DatePicker from "@/components/layout/Datepicker/DatePicker.vue";
import { getHistory } from "@/global/getUserInfo.js";
const { userHistory, today, week, lastMonth, month, lastWeek, yesterdays } =
  getHistory();
import {
  useChessRecords,
  useEgame,
  useEsports,
  useFishing,
  useLottery,
  useSportsRecord,
} from "@/global/bettingRecords.js";
import { Alert } from "ant-design-vue";
const {
  chess,
  chessData,
  chessPayload,
  chessPayloadYesterday,
  chessPayloadThisWeek,
  chessPayloadLastWeek,
  chessPayloadThisMonth,
  chessPayloadLastMonth,
  ky,
  v8,
  leg,
} = useChessRecords();
const {
  eGame,
  eGameData,
  eGamePayload,
  eGamePayloadYesterday,
  eGamePayloadThisWeek,
  eGamePayloadLastWeek,
  eGamePayloadThisMonth,
  eGamePayloadLastMonth,
  spinLoad
} = useEgame();
const {
  esports,
  eSportsData,
  eSportsPayload,
  eSportsPayloadYesterday,
  eSportsPayloadThisWeek,
  eSportsPayloadLastWeek,
  eSportsPayloadThisMonth,
  eSportsPayloadLastMonth,
} = useEsports();
const {
  fishing,
  fishingData,
  fishingPayload,
  fishingPayloadYesterday,
  fishingPayloadThisWeek,
  fishingPayloadLastWeek,
  fishingPayloadThisMonth,
  fishingPayloadLastMonth,
} = useFishing();
const {
  lottery,
  lotteryData,
  lotteryPayload,
  lotteryPayloadYesterday,
  lotteryPayloadThisWeek,
  lotteryPayloadLastWeek,
  lotteryPayloadThisMonth,
  lotteryPayloadLastMonth,
} = useLottery();
const {
  sports,
  sportsData,
  sportsPayload,
  sportsPayloadYesterday,
  sportsPayloadThisWeek,
  sportsPayloadLastWeek,
  sportsPayloadThisMonth,
  sportsPayloadLastMonth,
} = useSportsRecord();

const date = ref("");
const events = ref("");
const platform = ref("");
const sched = ref([
  { name: "Today", func: () => userHistory.mutate(today.value), date: "Today" },
  {
    name: "Yesterday",
    func: () => userHistory.mutate(yesterdays.value),
    date: "Yesterday",
  },
  {
    name: "This Week",
    func: () => userHistory.mutate(week.value),
    date: "This Week",
  },
  {
    name: "Last Week",
    func: () => userHistory.mutate(lastWeek.value),
    date: "Last Week",
  },
  {
    name: "This Month",
    func: () => userHistory.mutate(month.value),
    date: "This Month",
  },
  {
    name: "Last Month",
    func: () => userHistory.mutate(lastMonth.value),
    date: "Last Month",
  },
]);
const bettingData = ref('');

const names = ref([
  {
    name: "chessMap",
  },
  {
    name: "eGameMap",
  },
  {
    name: "eSportsMap",
  },
  {
    name: "fishingMap",
  },
  {
    name: "lotteryMap",
  },
  {
    name: "sportsMap",
  },
]);

const allBets = ref([
  {
    name: "KY chess",
  },
  {
    name: "LEG",
  },
  {
    name: "V8 chess",
  },
]);

// const betting = useMutation({
//   mutationFn: () =>
//     axiosGet2(
//       "api/native/v2/liveRecord.do?platform=&startTime=2024-05-01+00:00:00&endTime=2024-05-31+23:59:59&pageSize=10&pageNumber=1"
//     ),
//   onSuccess: (data) => {
//     bettingData.value = data;
//   },
//   onError: (error) => {
//     console.log(`this error: ${error}`);
//   },
// });

const handleSelecteditem = (item) => {
  date.value = item;
  console.log(item);
};

const handleSelectedEvents = (event) => {
  events.value = event;
  console.log(event);

  const payloads = ref({
    sched: [
      "Today",
      "Yesterday",
      "This Week",
      "Last Week",
      "This Month",
      "Last Month",
    ],
    lotteryMap: {
      Today: () => lottery.mutate(lotteryPayload.value),
      Yesterday: () => lottery.mutate(lotteryPayloadYesterday.value),
      "This Week": () => lottery.mutate(lotteryPayloadThisWeek.value),
      "Last Week": () => lottery.mutate(lotteryPayloadLastWeek.value),
      "This Month": () => lottery.mutate(lotteryPayloadThisMonth.value),
      "Last Month": () => lottery.mutate(lotteryPayloadLastMonth.value),
    },
    sportsMap: {
      Today: () => sports.mutate(sportsPayload.value),
      Yesterday: () => sports.mutate(sportsPayloadYesterday.value),
      "This Week": () => sports.mutate(sportsPayloadThisWeek.value),
      "Last Week": () => sports.mutate(sportsPayloadLastWeek.value),
      "This Month": () => sports.mutate(sportsPayloadThisMonth.value),
      "Last Month": () => sports.mutate(sportsPayloadLastMonth.value),
    },
    eSportsMap: {
      Today: () => esports.mutate(eSportsPayload.value),
      Yesterday: () => esports.mutate(eSportsPayloadYesterday.value),
      "This Week": () => esports.mutate(eSportsPayloadThisWeek.value),
      "Last Week": () => esports.mutate(eSportsPayloadLastWeek.value),
      "This Month": () => esports.mutate(eSportsPayloadThisMonth.value),
      "Last Month": () => esports.mutate(eSportsPayloadLastMonth.value),
    },
    chessMap: {
      Today: () => () => chess.mutate(chessPayload.value),
      Yesterday: () => () => chess.mutate(chessPayloadYesterday.value),
      "This Week": () => () => chess.mutate(chessPayloadThisWeek.value),
      "Last Week": () => () => chess.mutate(chessPayloadLastWeek.value),
      "This Month": () => () => chess.mutate(chessPayloadThisMonth.value),
      "Last Month": () => () => chess.mutate(chessPayloadLastMonth.value),
    },
    fishingMap: {
      Today: () => fishing.mutate(fishingPayload.value),
      Yesterday: () => fishing.mutate(fishingPayloadYesterday.value),
      "This Week": () => fishing.mutate(fishingPayloadThisWeek.value),
      "Last Week": () => fishing.mutate(fishingPayloadLastWeek.value),
      "This Month": () => fishing.mutate(fishingPayloadThisMonth.value),
      "Last Month": () => fishing.mutate(fishingPayloadLastMonth.value),
    },
    eGameMap: {
      Today: () => eGame.mutate(eGamePayload.value),
      Yesterday: () => eGame.mutate(eGamePayloadYesterday.value),
      "This Week": () => eGame.mutate(eGamePayloadThisWeek.value),
      "Last Week": () => eGame.mutate(eGamePayloadLastWeek.value),
      "This Month": () => eGame.mutate(eGamePayloadThisMonth.value),
      "Last Month": () => eGame.mutate(eGamePayloadLastMonth.value),
    },
    gamesDatas: {
      "lotteryMap": lotteryData.value,
      "sportsMap": sportsData.value,
      "eSportsMap": eSportsData.value,
      "chessMap": chessData.value,
      "fishing": fishingData.value,
      "eGameMAp": (bettingData.value = eGameData.value),
    },

  });
  payloads.value.sched.includes(date.value) &&
    payloads.value[events.value][date.value]();
    payloads.value.gamesDatas[events.value]

};

const selectedPlatform = (selected) => {
  platform.value = selected;
  console.log(selected);

  const gameData = {
    kymap: {
      "KY chess": "KY",
      "LEG": "LEG",
      "V8 chess": "V8POKER",
    },
    games: [
      "lotteryMap",
      "sportsMap",
      "eSportsMap",
      "eGameMap",
      "chessMap",
      "fishingMap",
    ],
    newDate: [
      "Today",
      "Yesterday",
      "Last Week",
      "This Week",
      "Last Month",
      "This Month",
    ],
    platFormType: [
      (chessPayload.value.platform = platform.value),
      (chessPayloadLastWeek.value.platform = platform.value),
      (chessPayloadThisWeek.value.platform = platform.value),
      (chessPayloadLastMonth.value.platform = platform.value),
      (chessPayloadThisMonth.value.platform = platform.value),
      (eGamePayload.value.platform = platform.value),
      (eGamePayloadLastWeek.value.platform = platform.value),
      (eGamePayloadThisWeek.value.platform = platform.value),
      (eGamePayloadLastMonth.value.platform = platform.value),
      (eGamePayloadThisMonth.value.platform = platform.value),
      (eSportsPayload.value.platform = platform.value),
      (eSportsPayloadLastWeek.value.platform = platform.value),
      (eSportsPayloadThisWeek.value.platform = platform.value),
      (eSportsPayloadLastMonth.value.platform = platform.value),
      (eSportsPayloadThisMonth.value.platform = platform.value),
      (fishingPayload.value.platform = platform.value),
      (fishingPayloadLastWeek.value.platform = platform.value),
      (fishingPayloadThisWeek.value.platform = platform.value),
      (fishingPayloadLastMonth.value.platform = platform.value),
      (fishingPayloadThisMonth.value.platform = platform.value),
      (lotteryPayload.value.platform = platform.value),
      (lotteryPayloadLastWeek.value.platform = platform.value),
      (lotteryPayloadThisWeek.value.platform = platform.value),
      (lotteryPayloadLastMonth.value.platform = platform.value),
      (lotteryPayloadThisMonth.value.platform = platform.value),
      (sportsPayload.value.platform = platform.value),
      (sportsPayloadLastWeek.value.platform = platform.value),
      (sportsPayloadThisWeek.value.platform = platform.value),
      (sportsPayloadLastMonth.value.platform = platform.value),
      (sportsPayloadThisMonth.value.platform = platform.value),
    ],
    gamesDatas: {
      lottery: lotteryData.value,
      sports: sportsData.value,
      esports: eSportsData.value,
      chess: chessData.value,
      fishing: fishingData.value,
      eGame: eGameData.value,
    },

    payloads: {
      lotteryMap: {
        Today: () => lottery.mutate(lotteryPayload.value),
        Yesterday: () => lottery.mutate(lotteryPayloadYesterday.value),
        "This Week": () => lottery.mutate(lotteryPayloadThisWeek.value),
        "Last Week": () => lottery.mutate(lotteryPayloadLastWeek.value),
        "This Month": () => lottery.mutate(lotteryPayloadThisMonth.value),
        "Last Month": () => lottery.mutate(lotteryPayloadLastMonth.value),
      },
      sportsMap: {
        Today: () => sports.mutate(sportsPayload.value),
        Yesterday: () => sports.mutate(sportsPayloadYesterday.value),
        "This Week": () => sports.mutate(sportsPayloadThisWeek.value),
        "Last Week": () => sports.mutate(sportsPayloadLastWeek.value),
        "This Month": () => sports.mutate(sportsPayloadThisMonth.value),
        "Last Month": () => sports.mutate(sportsPayloadLastMonth.value),
      },
      eSportsMap: {
        Today: () => esports.mutate(eSportsPayload.value),
        Yesterday: () => esports.mutate(eSportsPayloadYesterday.value),
        "This Week": () => esports.mutate(eSportsPayloadThisWeek.value),
        "Last Week": () => esports.mutate(eSportsPayloadLastWeek.value),
        "This Month": () => esports.mutate(eSportsPayloadThisMonth.value),
        "Last Month": () => esports.mutate(eSportsPayloadLastMonth.value),
      },
      chessMap: {
        Today: () => chess.mutate(chessPayload.value),
        Yesterday: () => chess.mutate(chessPayloadYesterday.value),
        "This Week": () => chess.mutate(chessPayloadThisWeek.value),
        "Last Week": () => chess.mutate(chessPayloadLastWeek.value),
        "This Month": () => chess.mutate(chessPayloadThisMonth.value),
        "Last Month": () => chess.mutate(chessPayloadLastMonth.value),
      },
      fishingMap: {
        Today: () => fishing.mutate(fishingPayload.value),
        Yesterday: () => fishing.mutate(fishingPayloadYesterday.value),
        "This Week": () => fishing.mutate(fishingPayloadThisWeek.value),
        "Last Week": () => fishing.mutate(fishingPayloadLastWeek.value),
        "This Month": () => fishing.mutate(fishingPayloadThisMonth.value),
        "Last Month": () => fishing.mutate(fishingPayloadLastMonth.value),
      },
      eGameMap: {
        Today: () => eGame.mutate(eGamePayload.value),
        Yesterday: () => eGame.mutate(eGamePayloadYesterday.value),
        "This Week": () => eGame.mutate(eGamePayloadThisWeek.value),
        "Last Week": () => eGame.mutate(eGamePayloadLastWeek.value),
        "This Month": () => eGame.mutate(eGamePayloadThisMonth.value),
        "Last Month": () => eGame.mutate(eGamePayloadLastMonth.value),
      },
    },
  };

  gameData.newDate.includes(date.value) &&
    gameData.games.includes(events.value) &&
    gameData.kymap[platform.value] &&
    gameData.payloads[events.value][date.value]();
};

onMounted(() => {
  chess.mutate(chessPayloadThisMonth.value);
    esports.mutate(eSportsPayloadThisMonth.value);
  fishing.mutate(fishingPayloadThisMonth.value);
    lottery.mutate(lotteryPayloadThisMonth.value);
    sports.mutate(sportsPayloadThisMonth.value);
    eGame.mutate(eGamePayloadThisMonth.value);

});
</script>
