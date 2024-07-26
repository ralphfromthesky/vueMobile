<template>
  <PageLayout title="Invite">
    <div class="w-screen">
      <div class="flex gap-[.2rem] p-[.2rem]">
        <!-- <div
                    class="flex items-center border-[.01rem] border-[#3A61C2] rounded-full p-[.1rem] px-[.1rem] bg-[#05309F] h-[.5rem] w-[3.2rem]">
                    <input class="h-[.3rem] w-full  px-[.2rem] text-[0.2rem]  bg-transparent outline-none text-white"
                        type="text" placeholder="22/05/2024 - 22/05/2024" />
                </div>
                <div
                    class="flex items-center border-[.01rem] border-[#3A61C2] rounded-full p-[.1rem] px-[.1rem] bg-[#05309F] h-[.5rem] w-[2rem]">
                    <input class="h-[.3rem] w-full  px-[.2rem] text-[0.2rem]  bg-transparent outline-none text-white"
                        type="text" placeholder="ID de Membro" />
                    <img src="/images/search.png" alt="" class="w-[.25rem] h-[.25rem]">
                </div> -->
        <div>
          <AntCalendar @startDate="handleStartDate" @endDate="handleEndDate" />
        </div>
        <div class="relative">
          <a-input v-model:value="value" placeholder="ID de Membro" />
          <img
            src="/images/search.png"
            alt=""
            class="w-[.25rem] h-[.25rem] absolute top-[.15rem] right-[.2rem]"
          />
        </div>
      </div>
      <div class="flex flex-col h-[calc(100vh-4.3rem)] overflow-auto p-[.2rem]">
        <div
          v-for="(dataValue, indexes) in AllData?.content?.rows"
          :key="indexes"
          class="flex flex-col gap-[.1rem] leading-none p-[.25rem] rounded-[.1rem] odd:bg-[#3a61c2] relative"
        >
          <div
            class="flex items-center bg-[#870000] absolute top-0 left-0 rounded-tl-[.05rem] rounded-br-[.05rem] px-[.1rem] py-[.05rem]"
          >
            <span class="text-[.15rem] text-white">V{{ dataValue.level }}</span>
          </div>
          <div class="grid grid-cols-2 gap-[.2rem]">
            <div class="flex flex-col gap-[.1rem]">
              <div class="flex items-center gap-[.1rem]">
                <span class="flex items-center text-[#fff] text-[.2rem]">{{
                  dataValue.promotionCode ? dataValue.promotionCode : "-"
                }}</span>
                <span class="flex items-center text-[#fff] text-[.2rem]"
                  ><img
                    src="/copyIcons/Cartier_copy.png"
                    alt=""
                    class="w-[.3rem]"
                /></span>
              </div>
              <div class="flex items-center gap-[.1rem]">
                <span class="flex items-center text-[#fff] text-[.2rem]">{{
                  dataValue.createDatetime
                    ? DateToStr(dataValue.createDatetime)
                    : "-"
                }}</span>
              </div>
            </div>
            <div class="flex flex-col gap-[.1rem] justify-end">
              <div class="flex items-center gap-[.1rem]">
                <span class="flex items-center text-[#fff] text-[.2rem]"
                  >Valid Bets</span
                >
                <span class="flex items-center text-[#fff] text-[.2rem]">{{
                  dataValue.validBetnum ? dataValue.validBetnum : "0"
                }}</span>
              </div>
              <div class="flex items-center gap-[.1rem]">
                <span class="flex items-center text-[#fff] text-[.2rem]"
                  >Deposit</span
                >
                <span class="flex items-center text-[#fff] text-[.2rem]">{{
                  dataValue.totalMoney ? dataValue.totalMoney : "0"
                }}</span>
              </div>
            </div>
          </div>
        </div>
        <div
          v-if="AllData?.content?.rows?.length == 0"
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
      <div
        class="flex gap-[.2rem] fixed bottom-0 bg-[#05309F] h-[1.7rem] w-full items-center border-t-[.02rem] border-t-[#3a61c2] p-[.2rem]"
      >
        <div class="flex gap-[.2rem]">
          <div class="flex flex-col gap-[.1rem] w-fit leading-none">
            <div class="flex gap-[.5rem] items-center justify-between">
              <div class="flex items-center">
                <span class="text-[.2rem] text-white"
                  >Total amount of direct recharge</span
                >
              </div>
              <div class="flex items-center">
                <span class="text-[.2rem] text-white">{{
                  AllData?.content?.aggsData?.directDepositMoney
                    ? AllData?.content?.aggsData?.directDepositMoney
                    : 0
                }}</span>
              </div>
            </div>
            <div class="flex gap-[.5rem] items-center justify-between">
              <div class="flex items-center text-nowrap">
                <span class="text-[.2rem] text-white"
                  >Other total recharge amount</span
                >
              </div>
              <div class="flex items-center">
                <span class="text-[.2rem] text-white">{{
                  AllData?.content?.aggsData?.otherDepositMoney
                    ? AllData?.content?.aggsData?.otherDepositMoney
                    : 0
                }}</span>
              </div>
            </div>
            <div class="flex gap-[.5rem] items-center justify-between">
              <div class="flex items-center text-nowrap">
                <span class="text-[.2rem] text-white"
                  >Total recharge amount</span
                >
              </div>
              <div class="flex items-center">
                <span class="text-[.2rem] text-white">{{
                  AllData?.content?.aggsData?.allDepositMoney
                    ? AllData?.content?.aggsData?.allDepositMoney
                    : 0
                }}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="flex gap-[.2rem]">
          <div class="flex flex-col gap-[.1rem] leading-none">
            <div class="flex gap-[.5rem] items-center justify-between">
              <div class="flex items-center">
                <span class="text-[.2rem] text-white"
                  >Number of people directly under first charge</span
                >
              </div>
              <div class="flex items-center">
                <span class="text-[.2rem] text-white">{{
                  AllData?.content?.aggsData?.firstDepositTimes
                    ? AllData?.content?.aggsData?.firstDepositTimes
                    : 0
                }}</span>
              </div>
            </div>
            <div class="flex gap-[.5rem] items-center justify-between">
              <div class="flex items-center text-nowrap">
                <span class="text-[.2rem] text-white">Other first-timers</span>
              </div>
              <div class="flex items-center">
                <span class="text-[.2rem] text-white">{{
                  AllData?.content?.aggsData?.otherFirstDepositTimes
                    ? AllData?.content?.aggsData?.otherFirstDepositTimes
                    : 0
                }}</span>
              </div>
            </div>
            <div class="flex gap-[.5rem] items-center justify-between">
              <div class="flex items-center text-nowrap">
                <span class="text-[.2rem] text-white"
                  >Total number of recharges</span
                >
              </div>
              <div class="flex items-center">
                <span class="text-[.2rem] text-white">{{
                  AllData?.content?.aggsData?.otherDepositMoney
                    ? AllData?.content?.aggsData?.otherDepositMoney
                    : 0
                }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </PageLayout>
</template>
<script setup>
import PageLayout from "../../components/layout/PageLayoutTab.vue";
import { onMounted, ref } from "vue";
import { useMutation } from "@tanstack/vue-query";
import { axiosGet2, axiosPost2 } from "../../components/axios/AxiosHook.js";
import { DateToStr } from "../../components/functions/Function.js";
import dayjs from "dayjs";
const startdates = ref();
const endDates = ref();
const handleStartDate = (start) => {
  startdates.value = dayjs(start).format("YYYY-MM-DD") + " " + "00:00:00";
};
const handleEndDate = (end) => {
  endDates.value = dayjs(end).format("YYYY-MM-DD") + " " + "23:59:59";
  console.log(startdates.value, endDates.value);
  Datas.mutate({
    startTime: startdates.value,
    endTime: endDates.value,
    id: "",
    pageSize: "100",
    pageNumber: "1",
    lan: "en",
  });
};
const AllData = ref([]);
const Datas = useMutation({
  mutationFn: (payload) =>
    axiosPost2("api/native/v2/getDirectSubDeposits.do", payload),
  onSuccess: (data) => {
    AllData.value = data;
  },
  onError: (error) => {
    console.log(`this error: ${error}`);
  },
});
onMounted(() => {
  Datas.mutate({
    startTime: "2024-06-13 00:00:00",
    endTime: "2024-06-13 23:59:59",
    id: "",
    pageSize: "100",
    pageNumber: "1",
    lan: "en",
  });
});

function timestampToTime(timestamp) {
  var date = new Date(timestamp);
  var Y = date.getFullYear() + "-";
  var M =
    (date.getMonth() + 1 < 10
      ? "0" + (date.getMonth() + 1)
      : date.getMonth() + 1) + "-";
  var D = (date.getDate() < 10 ? "0" + date.getDate() : date.getDate()) + " ";
  var h =
    (date.getHours() < 10 ? "0" + date.getHours() : date.getHours()) + ":";
  var m =
    (date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()) +
    ":";
  var s = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
  const strDate = Y + M + D + h + m + s;
  return strDate;
}

// import Table from '../../components/TableComponent/Table.vue'
// import Header from '../../components/TableComponent/TableHead.vue'
// import HeaderRow from '../../components/TableComponent/HeaderRow.vue'
// import HeaderCell from '../../components/TableComponent/HeaderCell.vue'
// import Body from '../../components/TableComponent/TableBody.vue'
// import BodyRow from '../../components/TableComponent/BodyRow.vue'
// import BodyCell from '../../components/TableComponent/BodyCell.vue'

// const acct = [{ DateStart: "2024/05/24", member: "nilo", income: "1000" }, { DateStart: "2024/05/24", member: "nilo", income: "1000" }, { DateStart: "2024/05/24", member: "nilo", income: "1000" }]
</script>
