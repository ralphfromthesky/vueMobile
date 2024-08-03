<template>
  <div>
    <div class="flex flex-col justify-center items-center w-[2rem]">
      <div
        class="text-[#252525] flex flex-col justify-center items-center"
        @click="goToLink"
      >
        <img
          src="/supportImages/supportProfile.png"
          class="h-[1.3rem]"
          srcset=""
        />
        <span class="bg-[#3A61C2] p-[.05rem] text-white rounded-[.1rem]">service</span>
      </div>
      <div class="mt-[.3rem]" v-if="store.state.userInfo.isLogin" @click="goChat">
        <a-badge :count="54">
          <MessageFilled style="color: white; font-size: .6rem" />
        </a-badge>
      </div>
      <div class="w-[1.5rem] relative">
        <a-carousel autoplay :dots="false">
          <div @click="() => (openVipLogin = !openVipLogin)">
            <img
              src="/turnlateImages/coinBox.png"
              class="h-[1.3rem]"
              srcset=""
            />
          </div>
          <div>
            <img
              src="/turnlateImages/activeTurnTable.gif"
              class="h-[1.3rem]"
              srcset=""
            />
          </div>
          <div @click="() => (openRedpacket = !openRedpacket)">
            <img
              src="/turnlateImages/envelop.gif"
              class="h-[1.3rem]"
              srcset=""
            />
          </div>

          <div @click="() => router.push('/task')">
            <img src="/turnlateImages/shout.png" class="h-[1.3rem]" srcset="" />
          </div>
        </a-carousel>
        <span
          class="absolute text-[#FFF0BB] text-[.2rem] top-[1rem] right-0 border-[.01rem] border-[#FFF0BB] rounded-[1rem] p-[.03rem]"
          ><CloseOutlined /></span
        >
      </div>
      <div class="mt-[.2rem]">
        <div class="h-[1rem] w-[1rem] border-2  border-[#3a61c2] flex justify-center items-center rounded-[.1rem]" v-if="showScrollTop" @click="scrollToTop">
            <!-- <img src="/public/rocket.png" alt=""> -->
            <span class=" text-txt2 text-[.2rem]">Top</span>
        </div>
      </div>
    </div>

    <AntModal
      :isOpen="openRedpacket"
      :componentPass="RedPacket"
      :bgColor="true"
    />
    <AntModal
      :isOpen="openVipLogin"
      :componentPass="VipLoginBonus"
      :bgColor="true"
    />
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted  } from "vue";
import { MessageFilled } from "@ant-design/icons-vue";
import { CloseOutlined } from "@ant-design/icons-vue";

import router from "@/router";
import { useStore } from "@/store/store";
import RedPacket from "@/components/redPacket/redpacket.vue";
import VipLoginBonus from "../VipLoginBonus/VipLoginBonus.vue";
const openRedpacket = ref(false);
const openVipLogin = ref(false);
const store = useStore();
const countBadge = ref(0)
const showScrollTop = ref(false);
const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

const handleScroll = () => {
  showScrollTop.value = window.scrollY > 300; // Adjust scroll position as needed
};

// const handleScroller = () => {
//     alert(window.screenY)
// }
const goToLink = () => {
  window.open("https://www.live700.vip/Chat/PreInquiryForm", "_blank");
};
const goChat = () => {
  window.open("https://mt0.yibo22.com/api/chatroom/goChat.do?isPc=true", "_blank");
};
onMounted(() => {
    window.addEventListener('scroll', handleScroll);

})
onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});

</script>

<style scoped>
/* For demo */
:deep(.slick-slide) {
  text-align: center;
  line-height: 160px;
  background: transparent;
  overflow: hidden;
}
:deep(.slick-slide h3) {
  color: #fff;
}

</style>
