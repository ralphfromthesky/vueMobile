<template>
  <div v-if="showGames" class="relative">
    <div class="absolute top-[.5rem] left-[.1rem]" @click="backlush">
      <img src="/public/home.png" alt="" srcset="" class="h-[1rem]" />
    </div>
    <iframe
      :src="showIframe"
      frameborder="0"
      class="w-screen h-screen"
    ></iframe>
  </div>
  <MainLayout v-if="hideMain">
    <div class="flex flex-col w-screen gap-[.2rem] my-[.2rem]">
      <div class="flex flex-col gap-[.2rem] w-full p-[.2rem] pb-0 pt-0">
        <div
          class="flex w-full h-[2rem] rounded-[.2rem] bg-[#1A45B1] overflow-hidden"
        >
          <div v-if="store.state?.userInfo?.isLogin">
            <!-- <AntModal
              :isOpen="openModal"
              :pass="dataPass"
              :title="titles"
              :componentPass="TurnLate"
            /> -->
          </div>
          <Carousel />
        </div>
        <div class="relative">
          <img
            src="/images/cjc1_style_1_bg.png"
            class="w-full h-[2rem] rounded-[.2rem"
          />

          <div class="bg-transparent absolute top-[1rem] right-[1.5rem]">
            <CountUp />
          </div>
        </div>
        <div
          class="flex justify-between items-center w-full h-[.6rem] rounded-[.1rem]"
        >
          <img src="/images/icon_dt_pmd.png" class="w-[.4rem]" alt="" />
          <div class="flex relative overflow-x-hidden items-center mx-[.1rem]">
            <div
              class="flex items-center animate-marquee whitespace-nowrap gap-[.2rem]"
            >
              <span class="text-[#ffff00] text-[.3rem]"
                >Convide amigos para enviar R$20 Entre no canal oficial de
                Telegram, receberá as últimas informações sobre desconto e
                recompensa na primeira mão.</span
              >
            </div>
          </div>
          <img src="/images/unread.png" class="w-[.4rem]" alt="" />
        </div>
      </div>
      <div
        class="flex items-center w-full bg-[#05309f] border-b border-b-[#3A61C2] overflow-auto sticky top-0 left-0 z-10 h-[1.06rem]"
      >
        <div class="flex items-center gap-[.7rem] mx-[.2rem]">
          <div
            v-for="({ games, tab }, index) in games"
            :key="index"
            class="flex flex-col items-center p-[.1rem]"
          >
            <img
              :src="`/logo/` + tab.code + `_active.png`"
              class="h-[.46rem]"
            />
            <div class="text-white text-[.25rem] text-nowrap">
              {{ tab.name }}
            </div>
          </div>
          <!-- <div class="flex flex-col items-center p-[.1rem]">
            <img src="/images/slots.png" class="h-[.55rem]" />
            <div class="text-white text-[.25rem] text-nowrap">Slots</div>
          </div>
          <div class="flex flex-col items-center p-[.1rem]">
            <img src="/images/fishing.png" class="h-[.55rem]" />
            <div class="text-white text-[.25rem] text-nowrap">Fishing</div>
          </div>
          <div class="flex flex-col items-center p-[.1rem]">
            <img src="/images/blockchain.png" class="h-[.55rem]" />
            <div class="text-white text-[.25rem] text-nowrap">Blockchain</div>
          </div>
          <div class="flex flex-col items-center p-[.1rem]">
            <img src="/images/recent.png" class="h-[.55rem]" />
            <div class="text-white text-[.25rem] text-nowrap">Recent</div>
          </div>
          <div class="flex flex-col items-center p-[.1rem]">
            <img src="/images/favorite.png" class="h-[.55rem]" />
            <div class="text-white text-[.25rem] text-nowrap">Favorites</div>
          </div> -->
        </div>
      </div>
      <div class="flex flex-col gap-[.2rem] w-full p-[.2rem] pb-0 pt-0">
        <div
          v-for="({ games, tab }, index) in games"
          :key="index"
          class="flex flex-col gap-[.2rem]"
          @click="getTabName(tab.name)"
        >
          <div class="flex items-center w-full justify-between">
            <div class="flex items-center gap-[.2rem]">
              <img
                :src="`/logo/` + tab.code + `_active.png`"
                class="h-[.55rem]"
              />
              <div class="text-white text-[.3rem]">{{ tab.name }}</div>
            </div>
            <div class="flex">
              <span class="text-[#6FA4EF] text-[.27rem]">Tudos</span>
            </div>
          </div>
          <div class="grid grid-cols-3 gap-[.2rem] justify-items-center">
            <div
              v-for="(gameItems, indexes) in games"
              class="flex w-[2.1rem] h-[2.792rem] rounded-[.2rem] bg-[#1A45B1c] bg-[url('/images/BG.png')] bg-[length:1.2rem] bg-no-repeat bg-center relative"
            >
              <img
                :src="
                  gameItems.imgUrl.match('https')
                    ? gameItems.imgUrl
                    : `api` + gameItems.imgUrl
                "
                class="w-[2.1rem] h-[2.792rem] rounded-[.2rem]"
                @click="() => fetchGames(gameItems?.forwardUrl)"
              />
              <img
                src="/images/star.png"
                alt=""
                class="absolute top-0 right-0 w-[.4rem] h-[.4rem] m-[.1rem]"
              />
            </div>
            <!-- <div class="w-[2.1rem] h-[2.792rem] rounded-[.2rem] bg-[#1A45B1]"> Lorem ipsum dolor sit amet.</div>
            <div class="w-[2.1rem] h-[2.792rem] rounded-[.2rem] bg-[#1A45B1]"> </div>
            <div class="w-[2.1rem] h-[2.792rem] rounded-[.2rem] bg-[#1A45B1]"> </div>
            <div class="w-[2.1rem] h-[2.792rem] rounded-[.2rem] bg-[#1A45B1]"> </div>
            <div class="w-[2.1rem] h-[2.792rem] rounded-[.2rem] bg-[#1A45B1]"> </div>
            <div class="w-[2.1rem] h-[2.792rem] rounded-[.2rem] bg-[#1A45B1]"> </div>
            <div class="w-[2.1rem] h-[2.792rem] rounded-[.2rem] bg-[#1A45B1]"> </div>
            <div class="w-[2.1rem] h-[2.792rem] rounded-[.2rem] bg-[#1A45B1]"> </div> -->
          </div>
          <div class="flex flex-col w-full items-center justify-center">
            <span class="text-[#6FA4EF] text-[.26rem]"
              >A exibir 9 jogos entre 21 Popular jogos</span
            >
            <div class="flex gap-[.1rem] items-center">
              <span class="text-[#A0C5FB] text-[.26rem]">Carregar mais</span>
              <img class="w-[.25rem]" src="/images/arrow-down.png" alt="" />
            </div>
          </div>
        </div>

        <!-- <div class="flex flex-col gap-[.2rem]">
          <div class="flex items-center gap-[.2rem]">
            <img src="/images/slots.png" class="h-[.55rem]" />
            <div class="text-white text-[.3rem]">Slots</div>
          </div>
          <div class="grid grid-cols-3 gap-[.2rem] justify-items-center">
            <div class="w-[2.1rem] h-[2.792rem] rounded-[.2rem] bg-[#1A45B1]"></div>
            <div class="w-[2.1rem] h-[2.792rem] rounded-[.2rem] bg-[#1A45B1]"></div>
            <div class="w-[2.1rem] h-[2.792rem] rounded-[.2rem] bg-[#1A45B1]"></div>
            <div class="w-[2.1rem] h-[2.792rem] rounded-[.2rem] bg-[#1A45B1]"></div>
            <div class="w-[2.1rem] h-[2.792rem] rounded-[.2rem] bg-[#1A45B1]"></div>
            <div class="w-[2.1rem] h-[2.792rem] rounded-[.2rem] bg-[#1A45B1]"></div>
          </div>
        </div>
        <div class="flex flex-col gap-[.2rem]">
          <div class="flex items-center gap-[.2rem]">
            <img src="/images/fishing.png" class="h-[.55rem]" />
            <div class="text-white text-[.3rem]">Fishing</div>
          </div>
          <div class="grid grid-cols-3 gap-[.2rem] justify-items-center">
            <div class="w-[2.1rem] h-[2.792rem] rounded-[.2rem] bg-[#1A45B1]"></div>
            <div class="w-[2.1rem] h-[2.792rem] rounded-[.2rem] bg-[#1A45B1]"></div>
          </div>
        </div>
        <div class="flex flex-col gap-[.2rem]">
          <div class="flex items-center gap-[.2rem]">
            <img src="/images/blockchain.png" class="h-[.55rem]" />
            <div class="text-white text-[.3rem]">Blockchain</div>
          </div>
          <div class="grid grid-cols-3 gap-[.2rem] justify-items-center">
            <div class="w-[2.1rem] h-[2.792rem] rounded-[.2rem] bg-[#1A45B1]"></div>
            <div class="w-[2.1rem] h-[2.792rem] rounded-[.2rem] bg-[#1A45B1]"></div>
            <div class="w-[2.1rem] h-[2.792rem] rounded-[.2rem] bg-[#1A45B1]"></div>
          </div>
        </div> -->
        <!-- <Toast/> -->
        <div class="absolute top-[7rem] right-0">
          <SupportLink />
        </div>
      </div>
      <div v-if="store.state?.userInfo?.isLogin">
        <AntModal :isOpen="true" :componentPass="RedPacket" :bgColor="true" />
      </div>
      <AntModal :isOpen="true" :componentPass="GetApplogin" />
      <AntModal :isOpen="true" :componentPass="Test" />

      <SpinLoader v-if="isFetching" />

      <AntModal
        :isOpen="loginModal"
        :componentPass="Login"
        :backGrounds="true"
        v-if="!store.state.userInfo.isLogin"
      />
      <AntModal
        :isOpen="regModal"
        :componentPass="Register"
        :backGrounds="true"
      />
    </div>
  </MainLayout>
</template>

<script setup>
import Register from "@/components/layout/RegisterComponent/RegisterForm.vue";
import SupportLink from "@/components/SupportLink/SupportLink.vue";
import Login from "@/components/layout/LoginComponent/LoginForm.vue";
const loginModal = ref(false);
const regModal = ref(false);
import SpinLoader from "@/components/antUi/spinLoader.vue";
import MainLayout from "../components/layout/MainLayout.vue";
import TurnLate from "@/components/turnLate/turnLate.vue";
import { ref, onMounted, computed, watch } from "vue";
import { useQuery } from "@tanstack/vue-query";
import { axiosGet2 } from "../components/axios/AxiosHook.js";
import Toast from "@/components/ToastComponent/Toast.vue";
import { getOnlineStatus } from "@/global/userConfig";
const { getOnline } = getOnlineStatus();
import CountUp from "@/components/antUi/countUp.vue";
import { useGetUserInfo } from "@/global/getUserInfo.js";
const { query } = useGetUserInfo();
import { Dropdown, Ripple, initTWE } from "tw-elements";
import Carousel from "@/components/carousel/carousel.vue";
import RedPacket from "@/components/redPacket/redpacket.vue";
import GetApplogin from "@/components/getApplogin/getApplogin.vue";
import Test from "@/components/test/tested.vue";
import { useLogin } from "@/global/loginQuery.js";
const { mutation } = useLogin();
const forwardGame = ref([]);
import { useStore } from "@/store/store.js";
const store = useStore();
const openModal = ref(true);
const dataPass = ref("fsdfasfsdfasfa");
const titles = ref("this is the new title");
const showGames = ref(false);
const hideMain = ref(true);
const gameUrl = ref("");
const gameType = ref("");
const gameButtons = ref([]);
import router from "@/router";
const games = ref([]);

const backlush = () => {
  transOut();
  hideMain.value = true;
  showGames.value = false;
};
const { refetch: transOut } = useQuery({
  queryKey: ["transOut"],
  queryFn: () => axiosGet2("/api/native/v2/autoTranout.do?lan=en"),
});

const {} = useQuery({
  queryKey: ["userGames"],
  queryFn: async () =>
    await axiosGet2("/api/getGames.do?type=11&limitNum=50&lang=en"),
  staleTime: 1000,
  select: (data) => {
    games.value = data;
    store.commit("setGetGames", data);
  },
});

const fetchGames = (url) => {
  gameUrl.value = url;
  if (!store.state.userInfo.isLogin) {
    loginModal.value = !loginModal.value;
    return;
  }
  refetch();
};

const getTabName = (tabName) => {
  tabName === "Slots" ? router.push("/Slots") : "";
  tabName === "Fishing" ? router.push("/fishing") : "";
  tabName === "Live Casino" ? router.push("/livecasino") : "";
  tabName === "Sports" ? router.push("/sports") : "";
  //  alert(tabName)
};

const { refetch, isLoading, isFetching } = useQuery({
  queryKey: ["games", gameUrl.value],
  queryFn: async () => await axiosGet2(`/api${gameUrl.value}`),
  select: (data) => {
    forwardGame.value = data;
    if (gameUrl.value) {
      hideMain.value = false;
      showGames.value = true;
    }
  },
});

watch(gameUrl, (newUrl) => {
  if (newUrl) {
  }
});

const showIframe = computed(() => {
  return forwardGame.value?.url || "";
});

onMounted(() => {
  initTWE({ Dropdown, Ripple });
  getOnline.refetch();
});
</script>
