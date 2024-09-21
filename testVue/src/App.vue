<template>
  <div>
    <h1>your name is <input type="text" v-model="name" /></h1>
    <Test />

    <div :class="{'newC': newClass}">
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Ut praesentium,
      ullam dolor aliquid aperiam et magnam nihil, unde, aspernatur similique
      quibusdam commodi neque totam? Optio commodi reprehenderit laboriosam
      doloremque ipsa?
    </div>
    
  </div>
</template>

<script setup>
import Test from "./components/test.vue";
import { ref } from "vue";

const name = ref();
const newClass = ref(true)
</script>

<style scoped>
.newC {
  color: red;
}
.newB {
  color: blue;
}

</style>
