<template>
  <div class="text-white">
    <a-range-picker
      v-model:value="dateValue"
      @change="props.functionDate"
      :bordered="true"
      class="customCalendar"
    />
    <!-- <div class="text-white">
      <div>Start Date: {{ startDate }}</div>
      <div>End Date: {{ endDate }}</div>
    </div> -->
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import dayjs from "dayjs";

const dateValue = ref([null, null]);
const startDate = ref();
  const endDate = ref();

const props = defineProps({
  parentObject: {
    type: Object,
    default: () => {},
  },
//   functionDate: {
//     type: Function,
//     required: true,
//   },
});

// watch(dateValue, (newValue) => {
//   if (newValue && newValue.length === 2) {
//     startDate.value = newValue[0]
//       ? dayjs(newValue[0]).format("YYYY-MM-DD")
//       : "";
//     endDate.value = newValue[1] ? dayjs(newValue[1]).format("YYYY-MM-DD") : "";
//   } else {
//     startDate.value = "";
//     endDate.value = "";
//   }
// });
const emits = defineEmits(["startDate", "endDate"]);

watch(dateValue, (newval) => {
    if (newval && newval.length === 2) {
      startDate.value = dayjs(newval[0]).format("YYYY-MM-DD");
      endDate.value = dayjs(newval[1]).format("YYYY-MM-DD");
      emits('startDate', startDate.value)
      emits('endDate', endDate.value)
      console.log(startDate.value, endDate.value)

    } else {
      startDate.value = "fasdfasfsd";
      endDate.value = "fasdfasfsa";
    }
  });


</script>

<style scoped></style>
