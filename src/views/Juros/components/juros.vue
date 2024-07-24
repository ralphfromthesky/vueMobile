<template>
  <div class="flex justify-between p-[.2rem]">
    <div class="flex w-auto max-w-[3.15rem] min-w-[1.6rem] gap-[.2rem]">
      <!-- <input
                class="h-[0.5rem] w-[1.5rem] rounded-full px-[.2rem] text-[0.2rem] border-[.01rem] border-[#3A61C2]  bg-[#05309F]"
                type="text" placeholder="Hoje" />
            <input
                class="h-[0.5rem] w-[1.5rem] rounded-full px-[.2rem] text-[0.2rem] border-[.01rem] border-[#3A61C2]  bg-[#05309F]"
                type="text" placeholder="Tudos" /> -->
      <Select :pass="dates" title="Today" @selectedItem="handleSelectedDate" />
    </div>
    <div class="flex gap-[.1rem] items-center justify-center">
      <span class="text-[.22rem] text-[#6FA4EF]">Renda Acumulada</span>
      <span class="text-[.22rem] text-[#FFAA09] text-center">0,00</span>
    </div>
  </div>
  <div
    class="flex flex-col h-[calc(100vh-6.58rem)] p-[.2rem] pt-0 overflow-auto"
  >
    <Table>
      <Header>
        <HeaderRow>
          <HeaderCell>Time</HeaderCell>
          <HeaderCell>Interest Rate</HeaderCell>
        </HeaderRow>
      </Header>
      <Body>
        <BodyRow v-for="(rateItems, indexes) in bonusData.scale" :key="indexes">
          <BodyCell>{{ bonusData.statDate[indexes].value }}</BodyCell>
          <BodyCell>{{ rateItems.value }}</BodyCell>
        </BodyRow>
      </Body>
    </Table>
    <div
      v-if="bonusData.scale == '' || bonusData.statDate == ''"
      class="flex flex-col items-center h-[calc(100vh-2.8rem)] overflow-auto w-full"
    >
      <div class="flex jay flex-col h-full justify-center items-center">
        <img class="w-[2.5rem]" src="/nodataImages/img_none_jl.png" alt="" />
        <span class="text-[#6FA4EF] text-[.25rem]">Sem Registros</span>
      </div>
    </div>
  </div>
</template>
<script setup>
import Table from "../../../components/TableComponent/Table.vue";
import Header from "../../../components/TableComponent/TableHead.vue";
import HeaderRow from "../../../components/TableComponent/HeaderRow.vue";
import HeaderCell from "../../../components/TableComponent/HeaderCell.vue";
import Body from "../../../components/TableComponent/TableBody.vue";
import BodyRow from "../../../components/TableComponent/BodyRow.vue";
import BodyCell from "../../../components/TableComponent/BodyCell.vue";
import { useMutation } from "@tanstack/vue-query";
import { onMounted, ref } from "vue";
import { axiosPost2 } from "../../../components/axios/AxiosHook.js";
import {dateChartPayload} from '@/global/bettingRecords.js'

import Select from "@/components/antUi/select.vue";
const dateLabel = ref([]);

const dates = ref([
  { name: "Today" },
  { name: "Yesterday" },
  { name: "This Week" },
  { name: "Last Week" },
  { name: "This Month" },
  { name: "Last Month" },
]);

const handleSelectedDate = (date) => {
  console.log(date);
  dateLabel.value = date
  
  const dateChart = ref({
     "Today": () => juros.mutate(dateChartPayload.value.today),
     "Yesterday": () => juros.mutate(dateChartPayload.value.yesterday),
     "This Week": () => juros.mutate(dateChartPayload.value.thisWeek),
     "Last Week": () => juros.mutate(dateChartPayload.value.lastWeek),
     "This Month": () => juros.mutate(dateChartPayload.value.thisMonth),
     "Last Month": () => juros.mutate(dateChartPayload.value.lastMonth) 
});
  dateChart.value[dateLabel.value]()
};

const bonusData = ref([]);
const juros = useMutation({
  mutationFn: (payload) =>
    axiosPost2("api/userCenter/userCenterBill/eChartData.do", payload),
  onSuccess: (data) => {
    bonusData.value = data;
  },
  onError: (error) => {
    console.log(`this error: ${error}`);
  },
});

onMounted(() => {
  juros.mutate({
    startTime: "2024-06-01 00:00:00",
    endTime: "2024-06-10 23:59:59",
  });
});
</script>
