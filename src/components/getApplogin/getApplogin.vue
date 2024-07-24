<template>
  <div>
    <div>
      <div class="text-txt text-[.3rem] font-bold text-center">
        {{ store.state.userGetAppLogin.title }}
      </div>

      <div class="h-[8rem] overflow-scroll">
        <div><img :src="store.state.userGetAppLogin.titleImg" alt="" /></div>
        <div class="text-txt text-center font-bold">
          {{ store.state.userGetAppLogin.actDesc }}
        </div>
      </div>
    </div>
    <div class="flex justify-between items-center my-[.2rem]">
      <div>
        <div>
          <a-radio v-model:checked="checked" class="text-txt">Dont pop up again today</a-radio>
        </div>
        <div><a-radio v-model:checked="check" class="text-txt">Hide Permanently</a-radio></div>
      </div>
      <div>
        <a-button class="bg-bg text-txt font-bold p-[.3rem] flex items-center" @click="closeModal">Continue</a-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, defineEmits, ref } from "vue";
import { useStore } from "@/store/store";
const store = useStore()
import { getAppLogin } from "@/global/missionEvent.js";
const {getAppData } = getAppLogin();
const emits = defineEmits(['close'])
const checked = ref(false)
const check = ref(false)

const closeModal = () => {
    emits('close')
}
</script>

<style lang="scss" scoped></style>
