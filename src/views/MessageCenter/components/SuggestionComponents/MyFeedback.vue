<template>
  <div class="p-[.2rem] pt-0 overflow-auto h-[calc(100vh-2.9rem)]">
    <div class="flex flex-col" v-if="hideFeedback">
      <div class="flex flex-col gap-[.2rem]">
        <div class="flex flex-col w-full p-[.2rem] bg-[#05309F] rounded-[.1rem] gap-[.2rem] h-[2rem] overflow-auto"
          v-for="(message, index) in adviceData" :key="index">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-[.1rem]">
              <span class="text-[.24rem] text-[#6FA4EF]">ID de feedback:</span>
              <span class="text-[.24rem] text-white">{{ message.id }}</span>
              <img src="/copyIcons/Gucci_copy.png" alt="" class="w-[.3rem]" />
            </div>
            <div class="flex items-center gap-[.1rem]">
              <span class="text-[#FFAA09] text-[.24rem]" @click="showReply(message.id)">Pendente</span>
              <img src="/images/return.png" alt="" class="rotate-180 w-[.24rem]" />
            </div>
          </div>
          <div class="flex flex-col justify-between">
            <div class="flex justify-between">
              <span class="text-[#6FA4EF] text-[.24rem]">Conteúdo do Feedback:</span>
              <span class="text-[#6FA4EF] text-[.24rem]">{{ message.createTime }}</span>
            </div>
            <div class="flex w-full">
              <span class="text-[#6FA4EF] text-[.24rem]">{{ message.content }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <MyReply v-if="showReplies" :id="FeedbackId" />
    <div v-if="Object.keys(adviceData).length == 0" class="flex flex-col items-center h-full overflow-auto w-full/">
      <div class="flex flex-col h-full justify-center items-center">
        <img class="w-[2.5rem]" src="/nodataImages/img_none_jl.png" alt="">
        <span class="text-[#6FA4EF] text-[.25rem]">Sem Registros</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import MyReply from "./MyFeedbackReply.vue";
import { reactive, ref, onMounted } from "vue";
import Toast from "@/components/ToastComponent/Toast.vue";
import { useAdviceList } from '@/global/messageCenter.js'

const { adviceData, adviceList } = useAdviceList();
const FeedbackId = ref('')
const showReplies = ref(false);
const hideFeedback = ref(true);

onMounted(() => {
  adviceList.refetch()
})

const showReply = (id) => {
  showReplies.value = true;
  hideFeedback.value = false;
  FeedbackId.value = id;
};

const props = defineProps({
  toggle: { type: Boolean },
});
</script>
