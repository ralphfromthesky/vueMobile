<template>
  <PageLayout title="Invite">
    <div class="flex flex-col gap-[.2rem] p-[.2rem] w-screen">
      <div class="flex gap-[.2rem]">
        <!-- <div
                    class="flex items-center border-[.01rem] border-[#3A61C2] rounded-full p-[.1rem] px-[.1rem] bg-[#05309F] h-[.5rem] w-[3.2rem]">
                    <input class="h-[.3rem] w-full  px-[.2rem] text-[0.2rem]  bg-transparent outline-none text-white"
                        type="text" placeholder="22/05/2024 - 22/05/2024" />
                </div> -->
        <div>
          <AntCalendar @startDate="handleStartDate" @endDate="handleEndDate"/>
        </div>
      </div>
      <div class="flex flex-col h-[calc(100vh-4.3rem)] overflow-auto">
        <div
          v-for="(commissionValue, indexes) in commissionData?.data?.content
            ?.rows"
          :key="indexes"
          class="flex flex-col gap-[.1rem] leading-none p-[.25rem] rounded-[.1rem] odd:bg-[#3a61c2]"
        >
          <div class="grid grid-cols-2 gap-[.2rem]">
            <div class="flex flex-col gap-[.1rem]">
              <div class="flex items-center gap-[.1rem]">
                <span class="flex items-center text-[#fff] text-[.2rem]"
                  >Time of Settlement {{ commissionValue?.statDateStr }}</span
                >
              </div>
              <div class="flex items-center gap-[.1rem]">
                <span class="flex items-center text-[#fff] text-[.2rem]"
                  >My Income {{ commissionValue?.oriBetNum }}</span
                >
              </div>
            </div>
            <div class="flex flex-col gap-[.1rem] justify-end">
              <div class="flex items-center gap-[.1rem]">
                <span class="flex items-center text-[#fff] text-[.2rem]"
                  >Type Slot</span
                >
              </div>
              <div class="flex items-center gap-[.1rem]">
                <span class="flex items-center text-[#fff] text-[.2rem]"
                  >Commission</span
                >
                <span class="flex items-center text-[#ffaa09] text-[.2rem]">{{
                  commissionValue?.money ? commissionValue?.money : "0"
                }}</span>
              </div>
            </div>
          </div>
        </div>
        <div
          v-if="commissionData?.data?.content?.rows?.length == 0"
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
    </div>
  </PageLayout>
</template>
<script setup>
import AntCalendar from "@/components/antUi/antCalendar.vue";
import PageLayout from "../../components/layout/PageLayoutTab.vue";
import Table from "../../components/TableComponent/Table.vue";
import Header from "../../components/TableComponent/TableHead.vue";
import HeaderRow from "../../components/TableComponent/HeaderRow.vue";
import HeaderCell from "../../components/TableComponent/HeaderCell.vue";
import Body from "../../components/TableComponent/TableBody.vue";
import BodyRow from "../../components/TableComponent/BodyRow.vue";
import BodyCell from "../../components/TableComponent/BodyCell.vue";
import { onMounted, ref } from "vue";
import { useMutation } from "@tanstack/vue-query";
import { axiosGet2, axiosPost2 } from "../../components/axios/AxiosHook.js";
import { DateToStr } from "../../components/functions/Function.js";
import { commissions } from "@/global/commision.js";
const { commissionData, commy } = commissions();
const startdates = ref("");
const endDates = ref("");
import dayjs from "dayjs";

// const commissionData = ref([])
// const Commission = useMutation({
//     mutationFn: (payload) => axiosPost2('api/native/v2/getUserAwardPage.do', payload),
//     onSuccess: (data) => {
//         commissionData.value = data
//     },
//     onError: (error) => {
//         console.log(`this error: ${error}`)
//     }
// })
// onMounted(() => {
//     Commission.mutate({
//         startTime: "2024-03-01 00:00:00",
//         endTime: "2024-03-31 23:59:59",
//         id: "",
//         pageSize: "100",
//         pageNumber: "1",
//         lan: "en"
//     })
// })

// function timestampToTime(timestamp) {
//   var date = new Date(timestamp);
//   var Y = date.getFullYear() + "-";
//   var M =
//     (date.getMonth() + 1 < 10
//       ? "0" + (date.getMonth() + 1)
//       : date.getMonth() + 1) + "-";
//   var D = (date.getDate() < 10 ? "0" + date.getDate() : date.getDate()) + " ";
//   var h =
//     (date.getHours() < 10 ? "0" + date.getHours() : date.getHours()) + ":";
//   var m =
//     (date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()) +
//     ":";
//   var s = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
//   const strDate = Y + M + D + h + m + s;
//   return strDate;
// }

// const acct = [{ account: "neil", DateStart: "2024/05/24", income: "1000" }, { account: "mark", DateStart: "2024/05/24", income: "1000" }, { account: "atong", DateStart: "2024/05/24", income: "1000" }]
const handleEndDate = (end) => {
  endDates.value = dayjs(end).format("YYYY-MM-DD");

  commy.mutate({
    startDate: startdates.value + " " + "00:00:00",
    endDate: endDates.value + " " + "23:59:59",
    pageSize: 20,
    pageNumber: 1,
    lan: "en",
  });
};
const handleStartDate = (start) => {
  startdates.value = dayjs(start).format("YYYY-MM-DD");
};
</script>
