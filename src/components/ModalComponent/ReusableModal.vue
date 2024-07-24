<template>
  <div
    class="w-screen h-full bg-[#000000b3] absolute top-0 backdrop-blur-[.1rem] bg-opacity-10"
    @click="closeModal"
  >
  <div>
    {{  }}
  </div>
    <div class="relative w-screen h-full flex justify-center items-end">
      <div @click.stop class="w-screen">
        <component :is="componentPass"></component>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  show: Boolean,
  msg: String,
  componentPass: Object,
});
const emits = defineEmits(["close"]);
const closeModal = () => {
  emits("close", false);
};
</script>

<style lang="scss" scoped></style>
