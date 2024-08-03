<template>
  <PageLayout title="Invite">
    <div class="w-screen p-[.2rem]">
      <div class="flex gap-[.2rem] mb-[.2rem]">
        <!-- <div
                    class="flex items-center border rounded-full p-[.1rem] px-[.1rem] bg-[#05309F] h-[.5rem] w-[3.2rem]">
                    <input class="h-[.3rem] w-full  px-[.2rem] text-[0.2rem]  bg-transparent outline-none text-white"
                        type="text" placeholder="22/05/2024 - 22/05/2024" />
                </div>
                <div class="flex items-center border rounded-full p-[.1rem] px-[.1rem] bg-[#05309F] h-[.5rem] w-[2rem]">
                    <input class="h-[.3rem] w-full  px-[.2rem] text-[0.2rem]  bg-transparent outline-none text-white"
                        type="text" placeholder="ID de Membro" />
                    <img src="/images/search.png" alt="" class="w-[.25rem] h-[.25rem]">
                </div> -->
        <div>
          <AntCalendar @startDate="handleStartDate" @endDate="handleEndDate" />
        </div>
      </div>
      <div class="flex flex-col h-[calc(100vh-2.8rem)] overflow-auto">
        <div
          v-for="(subordinateValue, indexes) in subordinateData?.content?.rows"
          :key="indexes"
          class="flex flex-col gap-[.1rem] leading-none p-[.25rem] rounded-[.1rem] odd:bg-[#05309F] relative"
        >
          <div
            class="flex items-center bg-[#870000] absolute top-0 left-0 rounded-tl-[.05rem] rounded-br-[.05rem] px-[.1rem] py-[.05rem]"
          >
            <span class="text-[.15rem] text-white"
              >V{{ subordinateValue.level }}</span
            >
          </div>
          <div class="grid grid-cols-2 gap-[.2rem]">
            <div class="flex flex-col gap-[.1rem]">
              <div class="flex items-center gap-[.1rem]">
                <span class="flex items-center text-[#fff] text-[.2rem]">{{
                  subordinateValue.promotionCode
                    ? subordinateValue.promotionCode
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
                  >Promo Bonus</span
                >
                <span class="flex items-center text-[#fff] text-[.2rem]">{{
                  subordinateValue.actBonus
                }}</span>
              </div>
              <div class="flex items-center gap-[.1rem]">
                <span class="flex items-center text-[#fff] text-[.2rem]"
                  >Rebate Commission</span
                >
                <span class="flex items-center text-[#fff] text-[.2rem]">{{
                  subordinateValue.waterBackBonus
                }}</span>
              </div>
              <div class="flex items-center gap-[.1rem]">
                <span class="flex items-center text-[#fff] text-[.2rem]"
                  >Affiliate Rebate Commission</span
                >
                <span class="flex items-center text-[#fff] text-[.2rem]">{{
                  subordinateValue.rebateBonus
                }}</span>
              </div>
            </div>
            <div class="flex flex-col gap-[.1rem]">
              <div class="flex items-center gap-[.1rem]">
                <span class="flex items-center text-[#fff] text-[.2rem]"
                  >Total Received</span
                >
                <span class="flex items-center text-[#fff] text-[.2rem]">{{
                  subordinateValue.money
                }}</span>
              </div>
              <div class="flex items-center gap-[.1rem]">
                <span class="flex items-center text-[#fff] text-[.2rem]"
                  >mission rewards</span
                >
                <span class="flex items-center text-[#fff] text-[.2rem]">{{
                  subordinateValue.taskBonus
                }}</span>
              </div>
              <div class="flex items-center gap-[.1rem]">
                <span class="flex items-center text-[#fff] text-[.2rem]"
                  >Vip Upgrade Bonus</span
                >
                <span class="flex items-center text-[#fff] text-[.2rem]">{{
                  subordinateValue.vipUpgradeBonus
                }}</span>
              </div>
              <div class="flex items-center gap-[.1rem]">
                <span class="flex items-center text-[#fff] text-[.2rem]"
                  >Balance Bonus</span
                >
                <span class="flex items-center text-[#fff] text-[.2rem]">{{
                  subordinateValue.rateBonus
                }}</span>
              </div>
            </div>
          </div>
        </div>
        <div
          v-if="subordinateData?.content?.rows?.length == 0"
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

    <!-- <div class="flex flex-col items-center h-[calc(100vh-2.8rem)] overflow-auto w-full/">
                    <div class="flex flex-col h-full justify-center items-center">
                        <img class="w-[2.5rem]" src="/nodataImages/img_none_jl.png" alt="">
                        <span class="text-[#6FA4EF] text-[.25rem]">Sem Registros</span>
                    </div>
                </div> -->
  </PageLayout>
</template>?""
<script setup>
import PageLayout from "../../components/layout/PageLayoutTab.vue";
import { onMounted, ref } from "vue";
import { useMutation } from "@tanstack/vue-query";
import { axiosGet2, axiosPost2 } from "../../components/axios/AxiosHook.js";
import dayjs from 'dayjs'

const startDates = ref();
const endDates = ref();

const handleStartDate = (start) => {
    startDates.value = dayjs(start).format("YYYY-MM-DD") + ' ' + '00:00:00';
}
const handleEndDate = (end) => {
    endDates.value = dayjs(end).format("YYYY-MM-DD") + " " + '23:59:59';
    subordinate.mutate({
    startTime: startDates.value,
    endTime: endDates.value,
    id: "",
    pageSize: "100",
    pageNumber: "1",
    lan: "en",
  });
}

const subordinateData = ref([]);
const subordinate = useMutation({
  mutationFn: (payload) =>
    axiosPost2("api/native/v2/getDirectBonusData.do", payload),
  onSuccess: (data) => {
    subordinateData.value = data;
  },
  onError: (error) => {
    console.log(`this error: ${error}`);
  },
});
onMounted(() => {
  subordinate.mutate({
    startTime: "2024-06-13 00:00:00",
    endTime: "2024-06-13 23:59:59",
    id: "",
    pageSize: "100",
    pageNumber: "1",
    lan: "en",
  });
});
</script>
