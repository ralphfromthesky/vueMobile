<template>
    <div>
      <div>
        <div class="text-txt text-[.3rem] font-bold text-center">
          <!-- {{ getAppData?.data?.content?.title }} -->
          test
        </div>
  
        <div class="h-[1.5rem] overflow-scroll ">
          <!-- <div><img :src="getAppData?.data?.content?.titleImg" alt="" /></div> -->
          <div class="text-txt text-center font-bold">
            <!-- {{ getAppData?.data?.content?.actDesc }} -->
            <div>
                <div class="flex justify-center gap-[1rem] bg-gray-100 p-[.2rem] mb-[.2rem]">
                    <div>First time recharge</div><div>Award List</div>
                </div>
                <div class="flex justify-around">

                    <div>≥1000</div><div>30</div>
                </div>
            </div>

          </div>
        </div>
      </div>
      <div class="flex justify-between items-center my-[.2rem] bg-gray-100 p-[.2rem]">
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
  import {defineEmits, ref } from "vue";
  const emits = defineEmits(['close'])
  const checked = ref(false)
  const check = ref(false)
  
  const closeModal = () => {
      emits('close')
  }
  </script>
  
  <style lang="scss" scoped></style>
  