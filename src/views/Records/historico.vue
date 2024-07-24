<template>
  <Layout>
    <div class="w-screen">
      <div class="flex justify-between px-1 mt-1 items-center mb-[.5rem]">
        <div class="flex gap-1">
          <Select
            :pass="dates"
            title="Today"
            widthSize="2rem"
            @selected-Item="handleSelectedItem"
          />
          <Select
            :pass="events"
            title="Event Center"
            widthSize="2.2rem"
            @selected-Event="handleSelectedEvents"
          />
        </div>
        <div>
          <span class="text-white text-[.3rem]">Bonus</span>
          <span class="text-[#ffaa09]">0,00</span>
        </div>
      </div>

      <div
        class="flex flex-col h-[calc(100vh-2.9rem)] overflow-auto gap-[.2rem]"
      >
        <div
          v-for="(bettingValue, indexes) in historyData?.data?.content?.rows"
          :key="indexes"
          class="flex flex-col gap-[.1rem] leading-none p-[.2rem] rounded-[.1rem] odd:bg-[#05309F]"
          
        >
          <div class="grid grid-cols-2 gap-[.2rem] ">
            <div class="flex flex-col gap-[.1rem]">
              <div class="flex gap-[.1rem]">
                <span class="text-[#fff] text-[.2rem]">id:</span>
                <span class="text-[#fff] text-[.2rem]">{{
                  bettingValue.id
                }}</span>
              </div>
              <div class="flex gap-[.1rem]">
                <span class="text-[#fff] text-[.2rem]">Money:</span>
                <span class="text-[#fff] text-[.2rem]">{{
                  bettingValue.money
                }}</span>
              </div>
              <div class="flex gap-[.1rem]">
                <span class="text-[#fff] text-[.2rem]">Remark:</span>
                <span class="text-[#fff] text-[.2rem]">{{
                  bettingValue.remark
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
                <span class="text-[#fff] text-[.2rem]">UserName:</span>
                <span class="text-[#fff] text-[.2rem]">{{
                  bettingValue.username
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
          class="flex flex-col items-center h-full overflow-auto w-full"
          v-if="hasData"
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
      </div>

    </div>
  </Layout>
</template>

<script setup>
import { onMounted, ref, watchEffect } from "vue";
import Select from "@/components/antUi/select.vue";
import Layout from "../../components/layout/Layout.vue";
import NoData from "@/components/NoData/NoData.vue";
import Table from "../../components/TableComponent/Table.vue";
import Header from "../../components/TableComponent/TableHead.vue";
import HeaderRow from "../../components/TableComponent/HeaderRow.vue";
import HeaderCell from "../../components/TableComponent/HeaderCell.vue";
import Body from "../../components/TableComponent/TableBody.vue";
import BodyRow from "../../components/TableComponent/BodyRow.vue";
import BodyCell from "../../components/TableComponent/BodyCell.vue";
import { useGetUserInfo, getHistory } from "@/global/getUserInfo.js";

import { eventDatePayload } from "@/global/bettingRecords.js";
const { today, yesterday, thisWeek, lastWeek, lastMonth, thisMonth } =
  eventDatePayload();
const { userHistory, historyData, hasData } = getHistory();
const bettingData = ref([]);
const dateLabel = ref("");
const eventLabel = ref("");
const dates = ref([
  { name: "Today" },
  { name: "Yesterday" },
  { name: "This Week" },
  { name: "Last Week" },
  { name: "This Month" },
  { name: "Last Month" },
]);

const events = ref([
  { name: "Event Center" },
  { name: "Mission Center" },
  { name: "Balance Bonus" },
  { name: "Vip" },
]);

const handleSelectedItem = (date) => {
  dateLabel.value = date;
  console.log(dateLabel.value);

  const dateEvent = ref({
    Today: () => userHistory.mutate(today.value),
    Yesterday: () => userHistory.mutate(yesterday.value),
    "This Week": () => userHistory.mutate(thisWeek.value),
    "Last Week": () => userHistory.mutate(lastWeek.value),
    "This Month": () => userHistory.mutate(thisMonth.value),
    "Last Month": () => userHistory.mutate(lastMonth.value),
  });
  dateEvent.value[dateLabel.value]();
  bettingData.value = historyData.value;
  console.log(bettingData.value);
};

const handleSelectedEvents = (event) => {
  eventLabel.value = event;
  console.log(eventLabel.value);
  const secTypes = ref({
    "Event Center": 1,
    "Balance Bonus": 3,
    "Mission Center": 2,
    "Vip": 5,
  });

  const typeDate = ref({
    Today: {
      secType: secTypes.value[eventLabel.value],
      startTime: today.value?.startTime,
      endTime: today.value?.endTime,
    },
    Yesterday: {
      secType: secTypes.value[eventLabel.value],
      startTime: yesterday.value?.startTime,
      endTime: yesterday.value?.endTime,
    },
    "This Week": {
      secType: secTypes.value[eventLabel.value],
      startTime: thisWeek.value?.startTime,
      endTime: thisWeek.value?.endTime,
    },
    "Last Week": {
      secType: secTypes.value[eventLabel.value],
      startTime: lastWeek.value?.startTime,
      endTime: lastWeek.value?.endTime,
    },
    "This Month": {
      secType: secTypes.value[eventLabel.value],
      startTime: thisMonth.value?.startTime,
      endTime: thisMonth.value?.endTime,
    },
    "Last Month": {
      secType: secTypes.value[eventLabel.value],
      startTime: lastMonth.value?.startTime,
      endTime: lastMonth.value?.endTime,
    },
  });
  const eventType = ref({
    "Event Center": () => userHistory.mutate(typeDate.value[dateLabel.value]),
    "Balance Bonus": () => userHistory.mutate(typeDate.value[dateLabel.value]),
    "Mission Center": () => userHistory.mutate(typeDate.value[dateLabel.value]),
    "Vip": () => userHistory.mutate(typeDate.value[dateLabel.value]),
  });

  eventType.value[eventLabel.value]();

};

</script>
