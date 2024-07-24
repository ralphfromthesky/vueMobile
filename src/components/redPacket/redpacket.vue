<template>
  <div>
    <div class="relative">
      <div class="relative flex justify-center heartbeat">
        <img src="/public/redfolderImages/pinkEnvelope.png" alt="" />
        <div
          class="absolute top-[50%] left-[.3rem] text-[.45rem] font-bold text-[white] text-center"
        >
          CRAZY TO GRAB ENVELOPES
        </div>
      </div>
      <a-button
        class="absolute bottom-[.7rem] left-[1.5rem] font-bold h-[.7rem] w-[3rem] bg-[#EC557C] text-bg border-0 rounded-[.2rem]"
        @click="red.mutate(payload,{onSuccess: (data) => {messageApi.info(data.msg)}})">GET IT NOW</a-button>
    </div>

  </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { redpacket } from "@/global/missionEvent.js";
import { messageApi } from "@/components/antUi/antMessage.js";
const { red, payload } = redpacket();

</script>

<style scoped>
.heartbeat {
  -webkit-animation: heartbeat 5s ease-in-out infinite;
  animation: heartbeat 5s ease-in-out infinite;
}

@-webkit-keyframes heartbeat {
  from {
    -webkit-transform: scale(1);
    transform: scale(1);
    -webkit-transform-origin: center center;
    transform-origin: center center;
    -webkit-animation-timing-function: ease-out;
    animation-timing-function: ease-out;
  }
  10% {
    -webkit-transform: scale(0.91);
    transform: scale(0.91);
    -webkit-animation-timing-function: ease-in;
    animation-timing-function: ease-in;
  }
  17% {
    -webkit-transform: scale(0.98);
    transform: scale(0.98);
    -webkit-animation-timing-function: ease-out;
    animation-timing-function: ease-out;
  }
  33% {
    -webkit-transform: scale(0.87);
    transform: scale(0.87);
    -webkit-animation-timing-function: ease-in;
    animation-timing-function: ease-in;
  }
  45% {
    -webkit-transform: scale(1);
    transform: scale(1);
    -webkit-animation-timing-function: ease-out;
    animation-timing-function: ease-out;
  }
}
@keyframes heartbeat {
  from {
    -webkit-transform: scale(1);
    transform: scale(1);
    -webkit-transform-origin: center center;
    transform-origin: center center;
    -webkit-animation-timing-function: ease-out;
    animation-timing-function: ease-out;
  }
  10% {
    -webkit-transform: scale(0.91);
    transform: scale(0.91);
    -webkit-animation-timing-function: ease-in;
    animation-timing-function: ease-in;
  }
  17% {
    -webkit-transform: scale(0.98);
    transform: scale(0.98);
    -webkit-animation-timing-function: ease-out;
    animation-timing-function: ease-out;
  }
  33% {
    -webkit-transform: scale(0.87);
    transform: scale(0.87);
    -webkit-animation-timing-function: ease-in;
    animation-timing-function: ease-in;
  }
  45% {
    -webkit-transform: scale(1);
    transform: scale(1);
    -webkit-animation-timing-function: ease-out;
    animation-timing-function: ease-out;
  }
}
</style>
