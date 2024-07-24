<template>
  <PageLayoutAccountDetails title="Relatório">
    <div class="w-screen h-auto bg-[#1A45B1] p-[.2rem]">
      <div class="w-fullflex p-[.2rem]">
        <div class="flex gap-[.2rem] items-center justify-start">
          <!-- <input
                        class="h-[0.5rem] w-[1.5rem]  rounded-full px-[.2rem] text-[0.2rem] border border-[#A0C5FB] bg-[#05309F]"
                        type="text" placeholder="Hoje" />
                    <input
                        class="h-[0.5rem] w-[2rem] rounded-full px-[.2rem] text-[0.2rem] border border-[#A0C5FB] bg-[#05309F]"
                        type="text" placeholder="Todos os tipos" />
                    <input
                        class="h-[0.5rem] rounded-full px-[.2rem] text-[0.2rem] border border-[#A0C5FB] bg-[#05309F] "
                        type="text" placeholder="Detalhes de Todos os Tipos" /> -->
          <Select
            :pass="dates"
            title="Today"
            @selected-item="handleSelecteditem"
          />
          <h1></h1>
          <Select
            :pass="event"
            widthSize="3rem"
            title="All"
            @selected-Event="handleSelectedEvent"
          />
        </div>
      </div>
      <div
        class="flex flex-col h-[calc(100vh-2.9rem)] overflow-auto gap-[.2rem]"
      >
        <div
          v-for="(accountValue, indexes) in accountData?.content?.page?.rows"
          :key="indexes"
          class="flex flex-col gap-[.1rem] leading-none p-[.2rem] rounded-[.1rem] odd:bg-[#05309F]"
        >
          <div class="grid grid-cols-2">
            <div class="flex gap-[.1rem]">
              <span class="text-[#fff] text-[.2rem]">Type:</span>
              <span class="text-[#fff] text-[.2rem]">{{
                accountValue.typeCn
              }}</span>
            </div>
            <div class="flex gap-[.1rem]">
              <span class="text-[#fff] text-[.2rem]">Change Amount:</span>
              <span class="text-[#fff] text-[.2rem]">{{
                accountValue.money
              }}</span>
            </div>
          </div>
          <div class="flex flex-col gap-[.1rem] leading-none">
            <div class="flex gap-[.1rem] leading-none">
              <span class="text-[#fff] text-[.2rem]"
                >Amount before change:</span
              >
              <span class="text-[#fff] text-[.2rem]">{{
                accountValue.beforeMoney
              }}</span>
            </div>
            <div class="flex gap-[.1rem] leading-none">
              <span class="text-[#fff] text-[.2rem]">Amount after change:</span>
              <span class="text-[#fff] text-[.2rem]">{{
                accountValue.afterMoney
              }}</span>
            </div>
            <div class="flex gap-[.1rem] leading-none">
              <span class="text-[#fff] text-[.2rem]">Date:</span>
              <span class="text-[#fff] text-[.2rem]">{{
                accountValue.createDatetimetr
              }}</span>
            </div>
            <div class="flex gap-[.1rem] leading-none">
              <span class="text-[#fff] text-[.2rem]">Remark:</span>
              <span class="text-[#fff] text-[.2rem]">{{
                accountValue.remark
              }}</span>
            </div>
          </div>
        </div>

      <div
          v-if="accountData?.content?.page?.rows == 0"
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
      </div>
  

      <!-- <div class="flex flex-col items-center h-[calc(100vh-2.9rem)] overflow-auto">
                <Table>
                    <Header>
                        <HeaderRow>
                            <HeaderCell>
                                Account
                            </HeaderCell>
                            <HeaderCell>
                                Date
                            </HeaderCell>
                            <HeaderCell>
                               Income
                            </HeaderCell>
                        </HeaderRow>
                    </Header>
                    <Body>
                        <BodyRow v-for="(value,index) in acct" :key="index"> 
                            <BodyCell>{{ value.account }}</BodyCell>
                            <BodyCell>{{ value.DateStart }}</BodyCell>
                            <BodyCell> <span class="text-[#FFAA09]">{{ value.income }}</span></BodyCell>
                        </BodyRow>
                    </Body>
                </Table>
                <div class="flex flex-col items-center h-full justify-center">
                        <img class="w-[2.5rem]" src="/images/noRecord.png" alt="">
                        <span class="text-[#6FA4EF] text-[.25rem]">Sem Registros</span>
                    </div>
            </div> -->
      <SpinLoader v-if="spin" />
    </div>
  </PageLayoutAccountDetails>
</template>
<script setup>
import PageLayoutAccountDetails from "@/components/layout/PageLayoutAccountDetails.vue";
import Table from "../../components/TableComponent/Table.vue";
import Header from "../../components/TableComponent/TableHead.vue";
import HeaderRow from "../../components/TableComponent/HeaderRow.vue";
import HeaderCell from "../../components/TableComponent/HeaderCell.vue";
import Body from "../../components/TableComponent/TableBody.vue";
import BodyRow from "../../components/TableComponent/BodyRow.vue";
import BodyCell from "../../components/TableComponent/BodyCell.vue";
import select from "@/components/antUi/select.vue";
import SpinLoader from "@/components/antUi/spinLoader.vue";
import { datePayload } from "@/global/bettingRecords.js";
const spin = ref(false);
const { today, yesterday, thisWeek, lastWeek, lastMonth, thisMonth } =
  datePayload();
// /native/v2/accountChangeRecord.do?type=&startTime=2024-05-01+00:00:00&endTime=2024-05-31+23:59:59&pageNumber=1&pageSize=20
import { useMutation } from "@tanstack/vue-query";
import { onMounted, ref } from "vue";
import { axiosGet2 } from "../../components/axios/AxiosHook.js";
import {useStore} from "@/store/store";
const store = useStore()

const dates = ref([
  { name: "Today" },
  { name: "Yesterday" },
  { name: "This Week" },
  { name: "Last Week" },
  { name: "This Month" },
  { name: "Last Month" },
]);
const event = ref([
  { name: "System Add Money" },
  { name: "System reduce money" },
  { name: "Online withdrawal failed" },
  { name: "Online withdrawal" },
]);
const dateLabel = ref("");
const eventLabel = ref("");
const handleSelecteditem = (date) => {
  dateLabel.value = date;
  console.log(dateLabel.value);
  const payloadDates = ref({
    Today: () => account.mutate(today.value),
    Yesterday: () => account.mutate(yesterday.value),
    "This Week": () => account.mutate(thisWeek.value),
    "Last Week": () => account.mutate(lastWeek.value),
    "This Month": () => account.mutate(thisMonth.value),
    "Last Month": () => account.mutate(lastMonth.value),
  });

  payloadDates.value[dateLabel.value]();
};
const handleSelectedEvent = (event) => {
  eventLabel.value = event;
  console.log(eventLabel.value);

  const types = ref({
    "Online withdrawal failed": 1,
    "System Add Money": 2,
    "System reduce money": 3,
    "Online withdrawal": 4,
  });

  const typeDate = ref({
    Today: {
      type: types.value[eventLabel.value],
      startTime: today.value?.startTime,
      endTime: today.value?.endTime,
      pageSize: "20",
      pageNumber: " 1",
    },
    Yesterday: {
      type: types.value[eventLabel.value],
      startTime: yesterday.value?.startTime,
      endTime: yesterday.value?.endTime,
      pageSize: "20",
      pageNumber: " 1",
    },
    "This Week": {
      type: types.value[eventLabel.value],
      startTime: thisWeek.value?.startTime,
      endTime: thisWeek.value?.endTime,
      pageSize: "20",
      pageNumber: " 1",
    },
    "Last Week": {
      type: types.value[eventLabel.value],
      startTime: lastWeek.value?.startTime,
      endTime: lastWeek.value?.endTime,
      pageSize: "20",
      pageNumber: " 1",
    },
    "This Month": {
      type: types.value[eventLabel.value],
      startTime: thisMonth.value?.startTime,
      endTime: thisMonth.value?.endTime,
      pageSize: "20",
      pageNumber: " 1",
    },
    "Last Month": {
      type: types.value[eventLabel.value],
      startTime: lastMonth.value?.startTime,
      endTime: lastMonth.value?.endTime,
      pageSize: "20",
      pageNumber: " 1",
    },
  });

  const events = ref({
    "Online withdrawal failed": () =>
      account.mutate(typeDate.value[dateLabel.value]),
    "System Add Money": () => account.mutate(typeDate.value[dateLabel.value]),
    "System reduce money": () =>
      account.mutate(typeDate.value[dateLabel.value]),
    "Online withdrawal": () => account.mutate(typeDate.value[dateLabel.value]),
  });

  typeDate.value[dateLabel.value] &&
    events.value[eventLabel.value] &&
    events.value[eventLabel.value]();

  console.log(typeDate.value[dateLabel.value]);
};

const accountData = ref([]);
const account = useMutation({
  mutationFn: (payload) =>
    axiosGet2("api/native/v2/accountChangeRecord.do", payload),
  onSuccess: (data) => {
    accountData.value = data;
    spin.value = false;
    store.commit('setUserRecords', accountData.value)
  },
  onMutate: () => {
    spin.value = true;
  },
  onError: (error) => {
    console.log(`this error: ${error}`);
  },
});
</script>
