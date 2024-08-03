<template>
  <div class="p-1 flex justify-center relative">
    <div class="text-[gray] bg-[white] rounded-[.2rem] p-1">
      <div class="flex justify-between my-1">
        <img src="/public/crown.png" alt="" srcset="" />
        <span>VIP Login bonus</span>
        <img src="/public/checked.png" alt="" @click="() => signRules = true"/>
      </div>
      <div class="grid grid-cols-3 gap-[.2rem] w-[6rem]">
        <div
          v-for="(vip, index) in vips"
          :key="index"
          :class="[
            'flex flex-col rounded-[.2rem] relative overflow-hidden',
            index === 0 ? 'bg-[#f1ba53]' : ' bg-[#e0e1e2]',
          ]"
          @click="mutate({ signType: 1 })"
        >
          <img
            src="/turnlateImages/background-sign.png"
            class="spinRound absolute top-0 h-[3rem] w-[3rem]"
            v-if="index === 0"
          />

          <div
            class="p-[.04rem] custom-border bg-[#ffaa09] w-[.8rem] rounded-[.2rem]"
          >
            No.{{ vip.num }}
          </div>
          <div class="flex justify-center flex-col items-center h-[2.1rem]">
            <div>
              <img :src="vip.img" alt="" />
            </div>
            <div class="flex justify-center items-center gap-1 my-1">
              <span>
                <img :src="vip.img2" alt="" class="h-[.4rem]" />
              </span>
              <span>{{ vip.win }}</span>
            </div>
          </div>
        </div>
      </div>
      <div
        class="my-[.1rem] text-[gray] bg-[#e0e1e2] rounded-[.2rem] overflow-hidden"
      >
        <span
          class="p-[.04rem] custom-border bg-[#ffaa09] w-[.8rem] rounded-[.2rem]"
        >
          No.7
        </span>
        <div class="flex justify-center gap-3 items-center">
          <img src="/turnlateImages/sign-money6.png" alt="" />
          <img src="/turnlateImages/dollar.png" alt="" />
          <span>100</span>
        </div>
      </div>
      <span class="flex justify-center" @click="checkin = true"
        >Check-in records</span
      >
    </div>
    <transition name="fade">
      <div
        v-if="checkin"
        class="h-[10rem] absolute top-0 w-[6.5rem] bg-[white] rounded-[.2rem]"
      >
        <div class="flex flex-col justify-center">
          <span class="text-center text-[.5rem] my-[.7rem]"
            >Check-in record</span
          >
          <div class="flex justify-around text-[red]">
            <span>Time</span><span>Account</span><span>Bonus</span>
          </div>
          <span
            class="border-[.02rem] border-[gray] font-bold my-[.2rem] mx-[.3rem]"
          ></span>
          <div class="flex justify-around text-[gray]">
            <span>{{dayjs(store.state.userInfo.lastLoginTime).format('YYYY-MM-DD')}}</span><span>{{store.state.userInfo.username}}</span><span>{{store.state.userSignInRule.content.money}}</span>

          </div>
        </div>
        <CloseOutlined
          @click="() => (checkin = false)"
          class="text-bg text-[.3rem] border-4 border-bg p-[.1rem] absolute bottom-[-.85rem] left-[2.9rem] z-10 rounded-[50%]"
        />
      </div>
    </transition>
    <transition name="fade">
      <div
        v-if="signRules"
        class=" absolute top-0 w-[6.5rem] bg-[#f6f6f6] rounded-[.2rem]"
      >
        <div class="flex flex-col justify-center">
          <span class="text-center text-[.4rem] my-[.7rem]">Sign in rules</span>
          <div class="flex justify-around">
            <img
              class="w-[2.5rem] bg-[#4b4b4b]"
              src="/nodataImages/img_none_2.png"
              alt=""
            />
          </div>
          <span class="text-[gray] font-bold my-[.4rem] text-center">
            No data at this time</span
          >
          <div class="flex justify-center items-center my-[.2rem]">
            <img src="/turnlateImages/dollar.png" alt="" srcset="">
            <span class="text-[.3rem]"> : Bonus</span>
          </div>
        </div>
        <CloseOutlined
          @click="() => (signRules = false)"
          class="text-bg text-[.3rem] border-4 border-bg p-[.1rem] absolute bottom-[-.85rem] left-[2.9rem] z-10 rounded-[50%]"
        />
      </div>
    </transition>
  </div>
</template>

<script setup>
import {ref, onMounted} from 'vue'
import { useMutation, useQuery } from "@tanstack/vue-query";
import { CloseOutlined } from "@ant-design/icons-vue";
import { useStore } from "vuex";
const  store = useStore()

import { axiosGet2, axiosPost2, axiosPost3 } from "../axios/AxiosHook";
import { messageApi } from "@/components/antUi/antMessage.js";
import dayjs from 'dayjs';

const checkin = ref(false);
const signRules = ref(false)
const vips = ref([
  {
    num: 1,
    img: "/turnlateImages/sign-money0.png",
    img2: "/turnlateImages/dollar.png",
    win: 100,
  },
  {
    num: 2,
    img: "/turnlateImages/sign-money0.png",
    img2: "/turnlateImages/dollar.png",
    win: 100,
  },
  {
    num: 3,
    img: "/turnlateImages/sign-money0.png",
    img2: "/turnlateImages/dollar.png",
    win: 100,
  },
  {
    num: 4,
    img: "/turnlateImages/sign-money0.png",
    img2: "/turnlateImages/dollar.png",
    win: 100,
  },
  {
    num: 5,
    img: "/turnlateImages/sign-money0.png",
    img2: "/turnlateImages/dollar.png",
    win: 100,
  },
  {
    num: 6,
    img: "/turnlateImages/sign-money0.png",
    img2: "/turnlateImages/dollar.png",
    win: 100,
  },
]);

const { refetch } = useQuery({
  queryKey: ["vips"],
  enabled: false,
  queryFn: () => axiosGet2("/api/native/v2/getSignRuleConfig.do"),
  select: (data) => {
    store.commit('setSignInRule', data);
    if (data?.content?.money <= 100) {
      messageApi.info(
        "The cumulative deposit is less than 100 cant participate in the sign-in event"
      );
    }
  },
  onError: (err) => {
    console.log(err);
  },
});

const { mutate } = useMutation({
  mutationFn: (payload) => axiosPost3("/api/native/v2/userSignIn2.do", payload),
  onSuccess: (data) => {
    data ? messageApi.info(data.msg) : "";
  },
  onError: (err) => alert(err),
});

onMounted(() => {
  refetch();
});
</script>

<style scoped>
.custom-border {
  -webkit-border-radius: 1px;
  -webkit-border-top-left-radius: 10px;
  -webkit-border-bottom-right-radius: 10px;
  -moz-border-radius: 1px;
  -moz-border-radius-topleft: 10px;
  -moz-border-radius-bottomright: 10px;
  border-radius: 1px;
  border-top-left-radius: 10px;
  border-bottom-right-radius: 10px;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.spinRound {
  animation: rotate infinite ease-in-out 10s;
 
}
@keyframes rotate {
  0% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
