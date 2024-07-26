<template>
  <PageLayoutTab title="Invite">
    <div
      class="flex flex-col gap-[.2rem] w-screen h-[calc(100vh-1.7rem)] bg-[#05309F] text-white p-[.2rem]"
    >
      <div class="flex gap-[.2rem]">
        <!-- <div
                    class="flex items-center border-[.01rem] border-[#3a61c2] rounded-full p-[.1rem] px-[.1rem] bg-[#05309F] h-[.5rem] w-[3.2rem]">
                    <input
                        class="h-[.3rem] w-full  px-[.2rem] text-[0.22rem] placeholder-[#6fa4ef] bg-transparent outline-none text-white"
                        type="text" placeholder="22/05/2024 - 22/05/2024" />
                </div>
                <div
                    class="flex items-center border-[.01rem] border-[#3a61c2] rounded-full p-[.1rem] px-[.1rem] bg-[#05309F] h-[.5rem] w-[2rem]">
                    <input
                        class="h-[.3rem] w-full  px-[.2rem] text-[0.22rem] placeholder-[#6fa4ef] bg-transparent outline-none text-white"
                        type="text" placeholder="Introduza o ID de Membro" />
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
      <div class="flex flex-col h-[calc(100vh-2.8rem)] overflow-auto">
        <div
          v-for="(reportValue, indexes) in reportData?.content?.rows"
          :key="indexes"
          class="flex flex-col gap-[.1rem] leading-none p-[.25rem] rounded-[.1rem] odd:bg-[#3a61c2] relative"
        >
          <div
            class="flex items-center bg-[#870000] absolute top-0 left-0 rounded-tl-[.05rem] rounded-br-[.05rem] px-[.1rem] py-[.05rem]"
          >
            <span class="text-[.15rem] text-white"
              >V{{ reportValue.level }}</span
            >
          </div>
          <div class="grid grid-cols-2 gap-[.2rem]">
            <div class="flex flex-col gap-[.1rem]">
              <div class="flex items-center gap-[.1rem]">
                <span class="flex items-center text-[#fff] text-[.2rem]">{{
                  reportValue.promotionCode ? reportValue.promotionCode : "-"
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
                  >Initial Deposit:</span
                >
                <span class="flex items-center text-[#fff] text-[.2rem]">{{
                  reportValue.firstDeposit
                }}</span>
              </div>
              <div class="flex items-center gap-[.1rem]">
                <span class="flex items-center text-[#fff] text-[.2rem]"
                  >Current:</span
                >
                <span class="flex items-center text-[#fff] text-[.2rem]">{{
                  reportValue.onlineStatus
                }}</span>
              </div>
              <div class="flex items-center gap-[.1rem]">
                <span class="flex items-center text-[#fff] text-[.2rem]"
                  >State:</span
                >
                <span class="flex items-center text-[#fff] text-[.2rem]">{{
                  reportValue.status
                }}</span>
              </div>
            </div>
            <div class="flex flex-col gap-[.1rem]">
              <div class="flex items-center gap-[.1rem]">
                <span class="flex items-center text-[#fff] text-[.2rem]"
                  >Registration time:</span
                >
                <span class="flex items-center text-[#fff] text-[.2rem]">{{
                  reportValue.createDatetime
                }}</span>
              </div>
              <div class="flex items-center gap-[.1rem]">
                <span class="flex items-center text-[#fff] text-[.2rem]"
                  >Login last time:</span
                >
                <span class="flex items-center text-[#fff] text-[.2rem]">{{
                  reportValue.lastLoginDatetime
                    ? reportValue.lastLoginDatetime
                    : "-"
                }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        v-if="reportData?.content?.rows?.length == 0"
        class="flex flex-col items-center h-[calc(100vh-2rem)] overflow-auto w-full"
      >
        <div class="flex flex-col h-full justify-center items-center">
          <img class="w-[2.5rem]" src="/nodataImages/img_none_jl.png" alt="" />
          <span class="text-[#6FA4EF] text-[.25rem]">Sem Registros</span>
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
import dayjs from 'dayjs'
const startDates = ref();
const endDates = ref()

const handleStartDate = (start) => {
startDates.value = dayjs(start).format("YYYY-MM-DD") + ' ' + "00:00:00";
}
const handleEndDate = (end) => {
    endDates.value = dayjs(end).format("YYYY-MM-DD") + ' ' + '23:59:59'
    report.mutate({
    startTime: startDates.value,
    endTime: endDates.value,
    id: "",
    pageSize: "100",
    pageNumber: "1",
    lan: "en",
  });
}

const reportData = ref([]);
const report = useMutation({
  mutationFn: (payload) =>
    axiosPost2("api/native/v2/getDirectData.do", payload),
  onSuccess: (data) => {
    reportData.value = data;
  },
  onError: (error) => {
    console.log(`this error: ${error}`);
  },
});
onMounted(() => {
//   report.mutate({
//     startTime: "2024-06-13 00:00:00",
//     endTime: "2024-06-13 23:59:59",
//     id: "",
//     pageSize: "100",
//     pageNumber: "1",
//     lan: "en",
//   });
});
</script>
<style scoped></style>

<!-- <style scoped>
.fade-enter-from {
    opacity: 0;
}

.fade-enter-to {
    opacity: 1;
}

.fade-enter-active {
    transition: all 2s ease;
}

.fade-leave-from {
    opacity: 1;
}

.fade-leave-to {
    opacity: 0;
}

.fade-leave-active {
    transition: all 2s ease;
}
</style> -->
