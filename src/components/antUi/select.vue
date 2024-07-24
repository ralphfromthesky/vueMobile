<template>
  <a-space>
    <a-select
      ref="select"
      v-model:value="value1"
      :style="{ width: widthSize }"
      @change="handleChange"
    >
      <a-select-option
        v-for="item in props.pass"
        :key="item.name"
        :value="item.name"
        >{{ item.name }}</a-select-option
      >
    </a-select>
  </a-space>
</template>

<script setup>
import { ref, watchEffect, onMounted } from "vue";
var date, name, event = ref('')

const value1 = ref("");
onMounted(() => {
  value1.value = props.title;
  emits
});

const props = defineProps({
  pass: {
    type: Array,
    required: true,
  },
  title: {
    type: String,
    default: "",
  },
  widthSize: {
    type: String,
    default: "120px",
  },
});
const emits = defineEmits(["selectedItem", 'selectedEvent', 'selectedPlatform']);

const handleChange = (date) => {
  const selectedItem = props.pass.find((item) => item.name === date);
  if (selectedItem) {
  //  selectedItem.func();
    emits("selectedItem", selectedItem.name);
    emits("selectedEvent", selectedItem.name);
    emits('selectedPlatform', selectedItem.name)
  }
};



</script>

<style scoped>
::v-deep
  :where(.css-dev-only-do-not-override-19iuou).ant-select:not(
    .ant-select-disabled
  ):not(.ant-select-customize-input):not(.ant-pagination-size-changer):hover
  .ant-select-selector {
  color: #a0c5fb;
  border-color: #3a61c2;
  border-radius: 5rem;
  font-size: 0.3rem;
}

::v-deep
  :where(.css-dev-only-do-not-override-19iuou).ant-select-single:not(
    .ant-select-customize-input
  )
  .ant-select-selector {
  background: #05309f;
  border-radius: 5rem;
  border-color: #a0c5fb;
  border: 0.01rem;
  color: #a0c5fb;
  height: 0.48rem;
}

::v-deep
  .ant-select-dropdown
  .css-dev-only-do-not-override-19iuou
  .ant-select-dropdown-placement-bottomLeft {
  background-color: red;
  background: red;
}

::v-deep .ant-select-arrow {
  color: #a0c5fb;
}
</style>
