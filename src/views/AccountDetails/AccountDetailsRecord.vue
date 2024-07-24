<template>
  <PageLayoutAccountDetails title="Relatório">
    <div
      class="flex flex-col gap-[.2rem] w-screen h-auto bg-[#1A45B1] p-[.2rem]"
    >
      <div class="flex gap-[.1rem] items-center justify-between mt-[.2rem]">
        <!-- <div class="flex gap-[.2rem] overflow-y-auto w-full">
                    <input
                        class="h-[0.5rem] w-[1.5rem]  rounded-full px-[.2rem] text-[0.2rem] border border-[#A0C5FB] bg-[#05309F]"
                        type="text" placeholder="Hoje" />
                    <input
                        class="h-[0.5rem] w-[2rem] rounded-full px-[.2rem] text-[0.2rem] border border-[#A0C5FB] bg-[#05309F]"
                        type="text" placeholder="Todos os tipos" />
                    <input
                        class="h-[0.5rem] w-[1.8rem] rounded-full px-[.2rem] text-[0.2rem] border border-[#A0C5FB] bg-[#05309F]"
                        type="text" placeholder="Plataformas" />
                </div>
                <div class="flex flex-col w-auto h-[.5rem] bg-[#1A45B1]">
                    <span class="text-[#6FA4EF] text-[.12rem]">Apostas/</span>
                    <span class="text-[#6FA4EF] text-[.12rem]">valor/</span>
                    <span class="text-[#6FA4EF] text-[.12rem]">Ganhos</span>
                </div> -->
        <Select
          :pass="dates"
          title="Today"
          @selected-item="handleSelecteditem"
        />
      </div>
      <div
        class="flex flex-col h-[calc(100vh-2.9rem)] overflow-auto gap-[.2rem]"
      >
        <div
          v-for="(reportValue, indexes) in reportData?.rows"
          :key="indexes"
          class="flex flex-col gap-[.1rem] leading-none p-[.2rem] rounded-[.1rem] odd:bg-[#05309F]"
        >
          <div class="grid grid-cols-2 gap-[.2rem]">
            <div class="flex flex-col gap-[.1rem]">
              <div class="flex gap-[.1rem]">
                <span class="text-[#fff] text-[.2rem]">Account:</span>
                <span class="text-[#fff] text-[.2rem]">{{
                  reportValue.username
                }}</span>
              </div>
              <div class="flex gap-[.1rem]">
                <span class="text-[#fff] text-[.2rem]">Deposit:</span>
                <span class="text-[#fff] text-[.2rem]">{{
                  reportValue.depositAmount
                }}</span>
              </div>
            </div>
            <div class="flex flex-col gap-[.1rem]">
              <div class="flex gap-[.1rem]">
                <span class="text-[#fff] text-[.2rem]">Date:</span>
                <span class="text-[#fff] text-[.2rem]">{{
                  reportValue.statDate
                }}</span>
              </div>
              <div class="flex gap-[.1rem]">
                <span class="text-[#fff] text-[.2rem]">Withdrawal:</span>
                <span class="text-[#fff] text-[.2rem]">{{
                  reportValue.withdrawAmount
                }}</span>
              </div>
            </div>
          </div>
        
        </div>
        <SpinLoader v-if="spinLoad"/>
        <div
          v-if="reportData?.rows?.length == 0"
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
  </PageLayoutAccountDetails>
</template>
<script setup>
import PageLayoutAccountDetails from "@/components/layout/PageLayoutAccountDetails.vue";
import { useMutation } from "@tanstack/vue-query";
import { onMounted, ref } from "vue";
import SpinLoader from "@/components/antUi/spinLoader.vue";
import { axiosGet2, axiosPost2 } from "../../components/axios/AxiosHook.js";
import { useChessRecords } from "@/global/bettingRecords";
const {chessPayload, chessPayloadLastWeek, chessPayloadYesterday, chessPayloadThisWeek, chessPayloadThisMonth, chessPayloadLastMonth} = useChessRecords()
import Select from "@/components/antUi/select.vue";
const dates = ref([
  { name: "Today" },
  { name: "Yesterday" },
  { name: "This Week" },
  { name: "Last Week" },
  { name: "This Month" },
  { name: "Last Month" },
]);

const reportData = ref([]);
const dateLabel = ref("");
const spinLoad = ref(false)
const report = useMutation({
  mutationFn: (payload) =>
    axiosPost2("api/userCenter/report/personReport.do", payload),
  onSuccess: (data) => {
    reportData.value = data;
    spinLoad.value = false

  },
onMutate: () => {
  spinLoad.value = true

},
  onError: (error) => {
    console.log(`this error: ${error}`);
  },
});

onMounted(() => {
  report.mutate(chessPayloadLastMonth.value);
});

const handleSelecteditem = (date) => {
  dateLabel.value = date;
  const personReport = {
    "Today": () => report.mutate(chessPayload.value),
    "Yesterday": () => report.mutate(chessPayloadYesterday.value),
    "This Week": () => report.mutate(chessPayloadThisWeek.value),
    "Last Week": () => report.mutate(chessPayloadLastWeek.value),
    "This Month": () => report.mutate(chessPayloadThisMonth.value),
    "Last Month": () => report.mutate(chessPayloadLastMonth.value),
  };
  personReport[dateLabel.value]()

};
</script>
