<template>
  <div class="flex gap-1 justify-between ">
    <a-range-picker
      v-model:value="dateValue"
      @change="props.functionDate"
      :bordered="true"
      class="bg-transparent"
      popupClassName="customPicker"
      :popupStyle="customPopupStyle "


    />
    <!-- <div class="text-white">
      <div>Start Date: {{ startDate }}</div>
      <div>End Date: {{ endDate }}</div>
    </div> -->
    <div class="relative">
      <a-input
        v-model:value="value"
        placeholder="ID de Membro"
        class="bg-transparent text-[white] placeholder-[white]"
      />
      <img
        src="/images/search.png"
        alt=""
        class="w-[.25rem] h-[.25rem] absolute top-[.15rem] right-[.2rem]"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import dayjs from "dayjs";

const dateValue = ref([null, null]);
const startDate = ref();
const endDate = ref();
const customClasses = ref(true)
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

const emits = defineEmits(["startDate", "endDate"]);

watch(dateValue, (newval) => {
  if (newval && newval.length === 2) {
    startDate.value = dayjs(newval[0]).format("YYYY-MM-DD");
    endDate.value = dayjs(newval[1]).format("YYYY-MM-DD");
    emits("startDate", startDate.value);
    emits("endDate", endDate.value);
    console.log(startDate.value, endDate.value);
  } else {
    startDate.value = "fasdfasfsd";
    endDate.value = "fasdfasfsa";
  }
});
const customPopupStyle = {
  width: '4.7rem',
};

</script>

<style scoped>
::v-deep .ant-picker .ant-picker-input > input {
  color: #ffffff;
}

::v-deep .anticon .anticon-calendar > svg {
  color: white;
}
::v-deep .ant-picker .ant-picker-suffix > * {
  color: white;
}
::v-deep .anticon > * {
  color: white;
}

::v-deep .ant-picker-input input::placeholder {
  color: white;
}


</style>
