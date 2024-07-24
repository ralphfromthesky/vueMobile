<template>
  <div>
    <van-date-picker
      v-model="currentDate"
      title="Selecione"
      :min-date="minDate"
      :max-date="maxDate"
      confirm-button-text="Confirmar"
      cancel-button-text="Cancelar"
    />
  </div>
</template>

<script setup>
import { ref } from "vue";

const currentDate = ref(["2021", "01", "01"]);
const minDate = ref(new Date(1950, 0, 1));
const maxDate = ref(new Date(3000, 5, 1));
</script>

<style scoped>
::v-deep .van-ellipsis {
  font-size: 0.4rem;
  background-color: #1a45b1;
}
::v-deep .van-picker-column {
  background-color: #1a45b1;
}
::v-deep .van-picker__mask {
  background-image: none;
}
::v-deep .van-picker__toolbar {
  background-color: #1a45b1;
  height: 1rem;
}

::v-deep .van-picker-column__item {
  color: #6fa4ef;
}

::v-deep .van-picker-column__item--selected {
  color: white;
}
::v-deep .van-picker__title {
  color: white;
}
::v-deep .van-picker__frame {
  left: 0;
  right: 0;
}
::v-deep .van-picker__confirm {
  font-size: 0.35rem;
  color: #fff0bb;
}
::v-deep .van-picker__cancel {
  font-size: 0.35rem;
  color: #6fa4ef;
}
</style>
