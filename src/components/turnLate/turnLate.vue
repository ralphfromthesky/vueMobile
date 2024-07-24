<template>
  <div>
    <div v-for="(act, index) in store.state.userTurnLateActivity" :key="index">
      <div class="flex justify-center text-txt">
        <div class="my-[.01rem] font-bold">{{ act.title }}</div>
      </div>
    </div>

    <transition name="fade">
      <!-- v-if="turnTableMessage -->
      <div v-if="store.state.userConfigValues">
        <div class="flex items-center justify-center gap-[.1rem] my-[.2rem]">
          <span><img src="/money.png" class="h-[.4rem]" /></span>
          <span class="text-txt text-[.4rem] font-bold">{{
            store.state.userPlayTurn.content.awardName
          }}</span>

          <span>
            <a-button class="bg-bg text-txt font-bold" @click="showModal"
              >Details</a-button
            >
          </span>
        </div>
        <div class="w-full flex justify-center">
          <div class="w-[4.5rem]">
            <a-progress
              :percent="store.state.userPlayTurn.content.currentAwardValue"
              status="active"
            />
          </div>
        </div>
        <div>
          <span
            class="flex justify-center items-center mb-[.4rem] text-txt font-bold"
            >i still need
            <img src="/turnlateImages/img_zphdjp_s1.png" class="h-[.5rem]" /> to
            extract wallet</span
          >
        </div>
      </div>
    </transition>
    <!-- {{ eventData.data.content.awards }} -->
    <div class="relative">
      <!-- <div class="relative">
        <div
          class="relative"
          :class="rotate ? 'img-rotate' : ''"
          ref="turnTable"
        >
          <img src="/turnlateImages/img_s3_8.png" />

          <div
            v-for="(act, index) in store.state.userTurnLateActivity.awards"
            :key="index"
          >
            <div
              class="flex justify-center absolute"
              :style="absolutePosition(index)"
            >
              <div class="flex flex-col items-center">
                <span class="text-[white] font-bold"> {{ act.awardName }}</span>
                <span
                  ><img
                    src="/turnlateImages/img_zphdjp_s1.png"
                    class="h-[1rem]"
                /></span>
              </div>
            </div>
          </div>
        </div>
      </div> -->
      <div
        class="relative overflow-hidden rounded-[5rem] border-2 border-[white]"
      >
      <div
          v-for="(data, index) in store.state.userTurnLateActivity.awards"
          :key="index"
          class="absolute z-10 bottom-[5rem] right-[2rem] text-white font-bold flex justify-center flex-col items-center"
          :style="absolutePosition(index)"
        >
          <span class="font-[1rem]">{{ data.awardName }}</span>
          <span
                  ><img
                    src="/turnlateImages/img_zphdjp_s1.png"
                    class="h-[1rem]"
                /></span>
        </div>
        <img src="/turnlateImages/round.png" class="z-50" />
        <div
          class="h-[4rem] border-2 border-white absolute right-0 w-[3rem] transform bg-[#28b5fe] top-[-1.5rem]"
          style="transform: rotate(0deg) skewY(-20deg)"
        ></div>
        <div
          class="h-[4rem] border-2 border-white absolute left-0 w-[3rem] transform bg-[#28b5fe] top-[-1.5rem]"
          style="transform: rotate(0deg) skewY(20deg)"
        ></div>
        <div
          class="h-[4rem] border-2 border-white absolute left-[-1.2rem] w-[3rem] transform bg-[#327dff] bottom-[-.2rem]"
          style="transform: rotate(216deg) skewY(-10deg)"
        ></div>
        <div
          class="h-[4rem] border-2 border-white absolute right-[-80px] w-[3rem] transform bg-[#327dff] bottom-[.4rem]"
          style="transform: rotate(67deg) skewY(-16deg)"
        ></div>
        <div
          class="h-[4rem] border-2 border-white absolute right-[1.1rem] w-[3rem] transform bg-[#28b5fe] bottom-[-2rem]"
          style="transform: rotate(144deg) skewY(-18deg)"
        ></div>
      </div>
      <div>
        <img src="/turnlateImages/round.png" class="absolute top-0" />
      </div>
      <img
        src="/turnlateImages/zphd_ljcj_s3.png"
        class="h-[1.5rem] absolute top-[37%] left-[39%]"
        @click="rotateThisShit()"
      />
    </div>
    <div class="flex justify-center flex-col w-full items-center my-[.2rem]">
      <div>
        <span
          class="text-txt my-[.4rem] w-full flex font-bold items-center gap-[.1rem]"
          >end Date in: <van-count-down :time="time" class="text-txt" />
        </span>
      </div>
      <div>
        <a-button
          type="primary"
          class="flex items-center h-[.7rem] bg-[#FFF0BB] text-[#1A45B1]"
          @click="showThisDrawer"
          >Invites Friend to help <ShareAltOutlined
        /></a-button>
      </div>
    </div>
    <div>
      <a-tabs>
        <a-tab-pane
          key="1"
          tab="Prize Notification"
          class="h-[4rem] overflow-hidden overscroll-contain relative"
        >
          <div v-for="(fake, index) in store.state.userFakeData" :key="index">
            <div
              class="text-[#1A45B1] flex items-center gap-1 my-[.1rem] scrollContent"
            >
              <span><img src="/spin.png" class="h-[.5rem]" /></span>
              <span>{{ fake.winTime }}</span>
              <span>{{ fake.username }}</span>
              <span>{{ fake.itemName }}</span>
            </div>
          </div>
        </a-tab-pane>

        <a-tab-pane key="2" tab="My Records" force-render>
          <div
            class="text-[#1A45B1] flex w-full justify-between gap-1 my-[.1rem] px-[.1rem] h-[.7rem] items-center bg-[#FFF0BB]"
          >
            <span>username</span>
            <span>Date</span>
            <span>Award Value</span>
            <span>TurnTable</span>
          </div>
          <div
            v-for="(turn, index) in turnRecord?.data?.content"
            :key="index"
            class="rounded-[.1rem] flex justify-center items-center flex-col"
          >
            <div
              class="text-txt flex w-full justify-between gap-1 my-[.1rem] px-[.1rem]"
            >
              <span>{{ turn.username }}</span>
              <span>{{ timeCreated(turn.createDatetime) }}</span>
              <span>{{ turn.awardValue }}</span>
              <span>{{ turn.turntableId }}</span>
            </div>
          </div>
          <div
            class="bg-bg flex justify-center flex-col items-center h-[1rem]"
            v-if="turnRecord?.data?.content == 0"
          >
            <img
              class="w-[2.5rem] text-txt"
              src="/nodataImages/img_none_jl.png"
              alt=""
            />
            <span class="text-txt">No Data at this TIme</span>
          </div>
        </a-tab-pane>
      </a-tabs>
    </div>
    <AntDrawer
      :isOpen="showDrawer"
      :imageData="socialImage"
      :headerTitle="title"
    />
    <AntModal :isOpen="openModal" />
  </div>
</template>

<script setup>
import { ref, onMounted, watch, computed } from "vue";
import { messageApi } from "@/components/antUi/antMessage.js";
import AntDrawer from "../antUi/antDrawer.vue";
import { turnLateActivity } from "@/global/missionEvent.js";
const { activity, activityData } = turnLateActivity();
import { getFakeData } from "@/global/missionEvent.js";
const { fake, fakeData } = getFakeData();
import { ShareAltOutlined } from "@ant-design/icons-vue";
import { getTurnRecord, playTurnLate } from "@/global/missionEvent.js";
import { useStore } from "@/store/store";
const time = ref(4 * 20 * 20 * 1000);
const store = useStore();
const turnTable = ref(null);
const turnTableMessage = ref(false);
const openModal = ref(false);
const { playTurn, play } = playTurnLate();
const showDrawer = ref(false);
const { turn, turnRecord, payload } = getTurnRecord();
const rotate = ref(false);
const eventData = ref([]);
const showModal = () => {
  openModal.value = true;
};

const showReward = computed(() => {
  return playTurn.value.data?.content?.awardName;
});

const randomAward = () => {
  const selectedAward = eventData.value.data?.content?.awards;
  console.log(selectedAward);
  // console.log(selectedAward.find((a) => a.awardName === showReward.value));
  console.log(newReward.value);
};
const newReward = ref(playTurn.value.data?.content?.awardName);

const socialImage = ref([
  {
    title: "Telegram",
    image: "/public/facebook.png",
    link: "https://t.me/Azz365official",
  },
  {
    title: "Instagram",
    image: "/public/telegram.png",
    link: "https://ig.me/m/mygojvqyhu",
  },
  {
    title: "WhatsApp",
    image: "/public/whatsapp.png",
    link: "https://wa.me/917740946497",
  },
  {
    title: "Facebook",
    image: "/public/twitter.png",
    link: "https://www.facebook.com/",
  },
  { title: "Twitter", image: "/public/instagram.png", link: "https://x.com/" },
]);
const absolutePosition = (index) => {
  const positions = ref([
    { top: ".6rem", left: "3.1rem", transform: "rotate(20deg)" },
    { top: ".6rem", left: "1.8rem", transform: "rotate(-20deg)" },
    { top: "1.5rem", right: ".8rem", transform: "rotate(60deg)" },
    { top: "2.9rem", right: ".8rem", transform: "rotate(120deg)" },
    { bottom: ".6rem", right: "1.7rem", transform: "rotate(150deg)" },
    { bottom: ".6rem", left: "1.7rem", transform: "rotate(205deg)" },
    { bottom: "1.6rem", left: ".7rem", transform: "rotate(-1200deg)" },
    { top: "1.5rem", left: ".7rem", transform: "rotate(-60deg)" },
  ]);

  const newPositions = ref([
    { top: "1.8rem", right: "1.5rem", transform: "rotate(40deg)", width: '1rem'},
    { top: "1.8rem", left: ".4rem", transform: "rotate(-40deg)" },
    { top: "3.5rem", right: "3.4rem", transform: "rotate(-110deg)", width: '2rem', textAlign: 'center'},
    { top: "3.4rem", right: ".9rem", transform: "rotate(110deg)" },
    { bottom: ".7rem", right: "2.2rem", transform: "rotate(180deg)" },
  ]);
  if(store.state.userTurnLateActivity.awards.length === 5) {
  return newPositions.value[index] || { top: "0", left: "0" };
  }
  if(store.state.userTurnLateActivity.awards.length === 8) {
  return positions.value[index] || { top: "0", left: "0" };
  }
};
const title = ref("Invites friends to help");

const rotateThisShit = () => {
  if (!store.state.userPlayTurn.success) {
    rotate.value = true;
    play.refetch();
    randomAward();
  } else {
    messageApi.info("Better luck next time!");
  }
};

const showThisDrawer = () => {
  showDrawer.value = !showDrawer.value;
};

const timeCreated = (time) => {
  const date = new Date(time);
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  return `${day}/${month}/${year}`;
};
onMounted(() => {
  turn.mutate(payload.value);
  if (turnTable.value) {
    turnTable.value.addEventListener("animationend", () => {
      turnTableMessage.value = true;
      store.commit("setUserConfigValues", true);
    });
  }
});
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.img-rotate {
  animation: slowDown 10s ease-out forwards;
  
  
}

@keyframes slowDown {
  0% {
    transform: rotate(0deg);
  }

  90% {
    transform: rotate(18000deg);
  }
  93% {
    transform: rotate(18000deg);
  }
  95% {
    transform: rotate(18000deg);
  }
  97% {
    transform: rotate(18000deg);
  }
  99% {
    transform: rotate(18000deg);
  }

  100% {
    transform: rotate(18000deg);
  }
}

.scrollContent {
  animation: scrollUp 10s linear infinite;
}

@keyframes scrollUp {
  0% {
    transform: translateY(100%);
  }
  100% {
    transform: translateY(-100%);
  }
}
:where(.css-dev-only-do-not-override-19iuou).ant-btn-primary:not(
    :disabled
  ):hover {
  color: #1a45b1;
  background-color: #fff0bb;
}
</style>
