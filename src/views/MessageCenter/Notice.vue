<template>
  <PageLayout title="Centro de mensagens">
    <div class="flex h-[calc(100vh-2.9rem)] items-center flex-col p-[.2rem] w-full gap-[.2rem]"
      v-if="showData">
      <div class="flex w-full bg-[#05309F] rounded-[.1rem] p-[.2rem]" v-for="(message, index) in messageData"
        :key="index">
        <div class="flex items-center gap-[.2rem]" v-if="showData">
          <img src="/images/openEnvblue.png" alt="" class="w-[.5rem]" />
          <div class="flex flex-col max-w-[4.5rem] min-w-[4.5rem]">
            <span class="text-white text-[.24rem]">{{ message.title }}</span>
            <span class="text-[#6FA4EF] text-[.22rem]">{{
              message.createTime
            }}</span>
          </div>
        </div>
        <div class="flex items-center gap-[.2rem]" @click="showContent(message.content)">
          <span class="text-[#6FA4EF] text-[.25rem]">Lidos</span>
          <img src="/images/return.png" alt="" class="rotate-180 w-[.3rem]" />
        </div>
      </div>
      <div v-if="Object.keys(messageData).length == 0" class="flex flex-col items-center h-full overflow-auto w-full/">
        <div class="flex flex-col h-full justify-center items-center">
          <img class="w-[2.5rem]" src="/nodataImages/img_none_jl.png" alt="">
          <span class="text-[#6FA4EF] text-[.25rem]">Sem Registros</span>
        </div>
      </div>
    </div>
    <div v-if="messages" class="text-white m-[.2rem] w-full">
      <div class="bg-[#05309F] rounded-[.1rem] p-[.2rem]">
        <span> {{ messages }} </span>
      </div>
    </div>
  </PageLayout>
</template>
<script setup>
import { onMounted, ref } from "vue";
import PageLayout from "@/components/layout/MessageCenterLayout.vue";
import { useMessage } from "@/global/messageCenter.js";
const { messageList, messageData } = useMessage();
const showMsg = ref(null);
const showData = ref(true);

const messages = ref('')

const showContent = (data) => {
  messages.value = data;
  showData.value = false;
};

onMounted(() => {
  messageList.refetch();
});
</script>
