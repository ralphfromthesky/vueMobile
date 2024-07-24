<template>
  <div class="overflow-auto h-[calc(100vh-5.7rem)] flex flex-col w-full justify-between">
    <div class="flex flex-col gap-[.2rem] w-full">
      <div class="flex flex-col w-full gap-[.1rem] items-end">
        <div class="flex">
          <span class="text-[.24rem] text-white">Conteúdo do Feedback
            <span class="text-[.24rem] text-[#6FA4EF]">{{
              adviceData?.advice?.createTime
            }}</span></span>
        </div>
        <div class="bg-[#05309F] rounded-[.1rem] px-[.2rem] py-[.1rem] w-fit relative mr-[.1rem]">
          <span class="inline-flex text-[.24rem] text-[#6FA4EF] tail">{{
            adviceData.advice?.content
          }}</span>
        </div>
      </div>
      <div v-for="(FeedbackData, index) in adviceData?.adviceList"
        :class="`flex flex-col w-full gap-[.1rem] scrollInto${(index + 1)}`">
        <input type="hidden" class="myLastIndex" :value="Object.keys(adviceData?.adviceList).length">
        <div v-if="FeedbackData.contentType === 1">
          <div class="flex">
            <span class="text-[.24rem] text-white">Conteúdo do Feedback
              <span class="text-[.24rem] text-[#6FA4EF]">{{
                FeedbackData?.createTime
              }}</span></span>
          </div>
          <div class="bg-[#05309F] rounded-[.1rem] px-[.2rem] py-[.1rem] w-fit relative ml-[.1rem]">
            <span class="inline-flex text-[.24rem] text-[#6FA4EF] tailOdd">{{
              FeedbackData?.content
            }}</span>
          </div>
        </div>
        <div v-if="FeedbackData.contentType === 2" class="flex flex-col w-full gap-[.1rem] items-end">
          <div class="flex">
            <span class="text-[.24rem] text-white">Conteúdo do Feedback
              <span class="text-[.24rem] text-[#6FA4EF]">{{
                FeedbackData?.createTime
              }}</span></span>
          </div>
          <div class="bg-[#05309F] rounded-[.1rem] px-[.2rem] py-[.1rem] w-fit relative mr-[.1rem]">
            <span class="inline-flex text-[.24rem] text-[#6FA4EF] tail">{{
              FeedbackData?.content
            }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="fixed p-[.2rem] w-full bottom-0 left-0 bg-[#05309F] border-none">
    <textarea cols="30" rows="3" class="w-full rounded-[.1rem] p-[.2rem] bg-[#1a45b1] resize-none text-white focus:border-[#FFF0BB] focus:border-[.01rem] outline-none" v-model="content"></textarea>
    <button class="bg-[#FFF0BB] text-[.3rem] text-[#1A45B1] rounded-[.1rem] w-full p-[.15rem]" @click="mutateNow()">Submit
      Reply</button>
  </div>
</template>
<script setup>
import { onMounted, ref, watchEffect, onUpdated } from "vue";
import { useViewAdvice, useViewAdviceReply } from "@/global/messageCenter.js";

const { adviceData, ViewAdvice } = useViewAdvice();
const { viewAdviceReply, repltStatus } = useViewAdviceReply();
const content = ref("");
const props = defineProps({
  id: "id",
});

watchEffect(() => {
  ViewAdvice.mutate({ adviceId: props.id });
  setTimeout(() => {
    var lastValue = document.querySelector(".myLastIndex").value
    document.querySelector(".scrollInto" + lastValue).scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" })
  }, 500);
})

const mutateNow = () => {
  viewAdviceReply.mutate({ content: content.value, adviceId: props.id });
  setTimeout(() => {
    ViewAdvice.mutate({ adviceId: props.id });
    if (repltStatus.value === true) {
      content.value = ""
    }
    setTimeout(() => {
      var lastValue = document.querySelector(".myLastIndex").value
      document.querySelector(".scrollInto" + lastValue).scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" })
    }, 300);
  }, 300);
};
</script>

<style scoped>
.tail::after {
  border-color: transparent transparent transparent #05309f;
  border-style: solid;
  border-width: 0.1rem 0 0.1rem 0.1rem;
  content: "";
  height: 0;
  position: absolute;
  right: -0.09rem;
  top: 50%;
  -webkit-transform: translateY(-50%);
  transform: translateY(-50%);
  width: 0;
}

.tailOdd::after {
  border-color: transparent transparent transparent #05309f;
  border-style: solid;
  border-width: 0.1rem 0 0.1rem 0.1rem;
  content: "";
  height: 0;
  position: absolute;
  left: -0.09rem;
  top: 50%;
  -webkit-transform: translateY(-50%);
  transform: translateY(50%);
  width: 0;
  rotate: 180deg;
}
</style>
