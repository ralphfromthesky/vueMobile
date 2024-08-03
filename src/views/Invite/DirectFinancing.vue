<template>
  <PageLayoutTab title="Invite">
    <div
      class="flex flex-col gap-[.2rem] w-screen h-[calc(100vh-1.7rem)] bg-[#05309F] text-white p-[.2rem]"
    >
      <div class="flex gap-[.2rem]">
        <!-- <div
                    class="flex items-center border-[.01rem] border-[#3a61c2] rounded-full p-[.1rem] px-[.1rem] bg-[#05309F] h-[.5rem] w-[3.2rem]">
                    <input
                        class="h-[.3rem] w-full  px-[.2rem] text-[0.22rem] placeholder-[#6fa4ef]  bg-transparent outline-none text-white"
                        type="text" placeholder="22/05/2024 - 22/05/2024" />
                </div>
                <div
                    class="flex items-center border-[.01rem] border-[#3a61c2] rounded-full p-[.1rem] px-[.1rem] bg-[#05309F] h-[.5rem] w-[2rem]">
                    <input
                        class="h-[.3rem] w-full  px-[.2rem] text-[0.22rem] placeholder-[#6fa4ef] bg-transparent outline-none text-white"
                        type="text" placeholder="ID de Membro" />
                    <img src="/images/search.png" alt="" class="w-[.25rem] h-[.25rem]">
                </div> -->
        <div>
          <AntCalendar @startDate="handleStartDate" @endDate="handleEndDate" />
        </div>
      </div>
      <div class="flex flex-col h-[calc(100vh-4.3rem)] overflow-auto">
        <div
          v-for="(financingValue, indexes) in FinancingData?.content?.rows"
          :key="indexes"
          class="flex flex-col gap-[.1rem] leading-none p-[.25rem] rounded-[.1rem] odd:bg-[#3a61c2] relative"
        >
          <div
            class="flex items-center bg-[#870000] absolute top-0 left-0 rounded-tl-[.05rem] rounded-br-[.05rem] px-[.1rem] py-[.05rem]"
          >
            <span class="text-[.15rem] text-white"
              >V{{ financingValue.level }}</span
            >
          </div>
          <div class="grid grid-cols-2 gap-[.2rem]">
            <div class="flex flex-col gap-[.1rem]">
              <div class="flex items-center gap-[.1rem]">
                <span class="flex items-center text-[#fff] text-[.2rem]">{{
                  financingValue.promotionCode
                    ? financingValue.promotionCode
                    : "-"
                }}</span>
                <span class="flex items-center text-[#fff] text-[.2rem]"
                  ><img
                    src="/copyIcons/Cartier_copy.png"
                    alt=""
                    class="w-[.3rem]"
                /></span>
              </div>
              <div class="flex items-center gap-[.1rem]">
                <span class="flex items-center text-[#fff] text-[.2rem]"
                  >Deposit
                  {{
                    financingValue.depositTimes
                      ? financingValue.depositTimes
                      : "0"
                  }}
                  (times)</span
                >
              </div>
              <div class="flex flex-col gap-[.1rem] justify-end">
                <div class="flex items-center gap-[.1rem]">
                  <span class="flex items-center text-[#fff] text-[.2rem]"
                    >Price difference</span
                  >
                  <span class="flex items-center text-[#04be02] text-[.2rem]"
                    >-{{
                      financingValue.totalMoney - financingValue.totalDrawMoney
                    }}</span
                  >
                </div>
              </div>
            </div>
            <div class="flex flex-col gap-[.1rem] justify-end">
              <div class="flex items-center gap-[.1rem]">
                <span class="flex items-center text-[#fff] text-[.2rem]"
                  >Withdrawal</span
                >
                <span class="flex items-center text-[#fff] text-[.2rem]">{{
                  financingValue.totalDrawMoney
                    ? financingValue.totalDrawMoney
                    : "0"
                }}</span>
              </div>
              <div class="flex items-center gap-[.1rem]">
                <span class="flex items-center text-[#fff] text-[.2rem]"
                  >Balance</span
                >
                <span class="flex items-center text-[#fff] text-[.2rem]">{{
                  financingValue.totalMoney ? financingValue.totalMoney : "0"
                }}</span>
              </div>
            </div>
          </div>
        </div>
        <div
          v-if="FinancingData?.content?.rows?.length == 0"
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
    <div
      class="flex gap-[.2rem] fixed bottom-0 bg-[#05309F] h-[1.7rem] w-full p-[.2rem] items-center border-t-[.02rem] border-t-[#3a61c2]"
    >
      <div class="flex gap-[.2rem]">
        <div class="flex flex-col gap-[.1rem] w-fit leading-none">
          <div class="flex gap-[.5rem] items-center">
            <div class="flex items-center text-nowrap">
              <span class="text-[.2rem] text-white">Total recharge amount</span>
            </div>
          </div>
          <div class="flex gap-[.5rem] items-center">
            <div class="flex items-center text-nowrap">
              <span class="text-[.2rem] text-white"
                >The number of deposits</span
              >
            </div>
          </div>
        </div>

        <div class="flex flex-col gap-[.1rem] leading-none">
          <div class="flex gap-[.5rem] items-center">
            <div class="flex items-center">
              <span class="text-[.2rem] text-white">{{
                FinancingData?.content?.aggsData?.directTotalDeposit
                  ? FinancingData?.content?.aggsData?.directTotalDeposit
                  : 0
              }}</span>
            </div>
          </div>
          <div class="flex gap-[.5rem] items-center">
            <div class="flex items-center">
              <span class="text-[.2rem] text-white">{{
                FinancingData?.content?.aggsData?.directDepositTimes
                  ? FinancingData?.content?.aggsData?.directDepositTimes
                  : 0
              }}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="flex gap-[.2rem]">
        <div class="flex flex-col gap-[.1rem] leading-none">
          <div class="flex gap-[.5rem] items-center">
            <div class="flex items-center text-nowrap">
              <span class="text-[.2rem] text-white">Total Withdrawal</span>
            </div>
          </div>
          <div class="flex gap-[.5rem] items-center">
            <div class="flex items-center text-nowrap">
              <span class="text-[.2rem] text-white"
                >Number of direct registered persons</span
              >
            </div>
          </div>
        </div>
        <div class="flex flex-col gap-[.1rem] leading-none">
          <div class="flex gap-[.5rem] items-center">
            <div class="flex items-center">
              <span class="text-[.2rem] text-white">{{
                FinancingData?.content?.aggsData?.directTotalDraw
                  ? FinancingData?.content?.aggsData?.directTotalDraw
                  : 0
              }}</span>
            </div>
          </div>
          <div class="flex gap-[.5rem] items-center">
            <div class="flex items-center">
              <span class="text-[.2rem] text-white">{{
                FinancingData?.content?.aggsData?.directRegCount
                  ? FinancingData?.content?.aggsData?.directRegCount
                  : 0
              }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </PageLayoutTab>
</template>

<script setup>
import PageLayoutTab from "@/components/layout/PageLayoutTab.vue";
import { onMounted, ref } from "vue";
import { useMutation } from "@tanstack/vue-query";
import { axiosGet2, axiosPost2 } from "../../components/axios/AxiosHook.js";
import dayjs from "dayjs";

const startdates = ref();
const endDates = ref();

const handleStartDate = (start) => {
  startdates.value = dayjs(start).format("YYYY-DD-MM") + " " + "00:00:00";
};
const handleEndDate = (end) => {
  endDates.value = dayjs(end).format("YYYY-MM-DD") + " " + "23:59:59";
  Financing.mutate({
    startTime: startdates.value,
    endTime: endDates.value,
    id: "",
    pageSize: "100",
    pageNumber: "1",
    lan: "en",
  });
};

const FinancingData = ref([]);
const Financing = useMutation({
  mutationFn: (payload) =>
    axiosPost2("api/native/v2/getDirectSubDeposits.do", payload),
  onSuccess: (data) => {
    FinancingData.value = data;
  },
  onError: (error) => {
    console.log(`this error: ${error}`);
  },
});
onMounted(() => {
  Financing.mutate({
    startTime: "2024-06-13 00:00:00",
    endTime: "2024-06-13 23:59:59",
    id: "",
    pageSize: "100",
    pageNumber: "1",
    lan: "en",
  });
});
</script>
<style scoped></style>
