<template>
  <PageLayout title="Centro de mensagens">
    <div class="flex flex-col p-[.2rem] w-full gap-[.2rem]">
      <div @click="showNotice(notice.content)" class="flex justify-between w-full bg-[#05309F] rounded-[.1rem] p-[.2rem] h-[1.2rem]"
        v-for="(notice, index) in noticeData" :key="index" v-if="hideNotice">
        <div class="flex items-center gap-[.2rem]">
          <img src="/supportImages/speaker.png" alt="" class="w-[.5rem]" />
          <div class="flex flex-col overflow-hidden w-[5.2rem]">
            <span class="text-[#ffff00] text-[.3rem] text-wrap" v-html="notice.title"></span>
          </div>
        </div>
        <div class="flex items-center gap-[.2rem]">
          <img src="/images/return.png" alt="" class="rotate-180 w-[.3rem]"  />
        </div>
      </div>
      <div v-if="announcement">
        <div class="text-[#ffff00] bg-[#05309F] rounded-[.1rem] p-[.2rem]">
          <span v-html="announcement" />
        </div>
      </div>
    </div>
  </PageLayout>
</template>
<script setup>
import { onMounted, ref } from "vue";
import PageLayout from "@/components/layout/MessageCenterLayout.vue";
import { useNotice } from "@/global/messageCenter";
const hideNotice = ref(true);
const showNtc = ref(null);
const { noticeData, noticeList } = useNotice();

const announcement = ref('')

const showNotice = (data) => {
  hideNotice.value = false;
  announcement.value = data;
};

onMounted(() => {
  noticeList.refetch();
});
</script>
