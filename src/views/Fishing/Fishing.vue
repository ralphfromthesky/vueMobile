<template>
  <div>
    <div v-if="nowShowingGames" class="relative">
      <div class="absolute top-[1rem] left-[.1rem]" @click="backlush">
        <img src="/public/home.png" alt="" srcset="" class="h-[1rem]" />
      </div>
      <iframe
        :src="showIframGames"
        frameborder="0"
        class="w-screen h-screen"
      ></iframe>
    </div>
    <div class="h-screen w-screen" v-if="hideMain">
      <div>
        <div class="p-[.3rem] text-white flex justify-between font-[1rem]">
          <router-link to="/"> <span class="text-[.5rem]"><</span></router-link>
          <span class="text-[.5rem]">Pescaria</span>
          <span></span>
        </div>
        <div class="border-3"></div>

        <div
          class="text-white h-screen overflow-auto w-screen p-[.2rem] bg-[#1A45B1]"
        >
          <div class="flex justify-center my-[.1rem] relative">
            <a-input
        v-model:value="value"
        placeholder="ID de Membro"
        class="bg-transparent text-[white] placeholder-[white]"
      />
      <img
        src="/images/search.png"
        alt=""
        class="w-[.25rem] h-[.25rem] absolute top-[.15rem] right-[.2rem]"
      />
          </div>
          <div class="flex">
            <div class="flex flex-col overflow-auto h-[13rem]">
              <!-- <span class="h-[3rem]"> Slot</span> -->

              <div
                v-for="(btn, index) in gamesData?.content"
                :key="index"
                class="h-[1rem] w-[1.5rem] border-2 border-[#3a61c2] rounded-[.1rem] flex justify-center items-center my-[.1rem]"
                @click="getTypes(btn.gameType, index)"
                :class="
                  activeBtn === index + 1
                    ? 'bg-[#FFF0BB] text-[black]'
                    : 'bg-[#05309F] text-[#a0c5fb]'
                "
              >
                <span class="h-[3rem] flex items-center">
                  {{ btn.czCode }}</span
                >
                <!-- <span><img :src="`/api${btn.imgUrl}`" alt="" srcset=""></span> -->
              </div>
            </div>
            <div>
              <div class="flex justify-center gap-[.1rem]">
                <span
                  class="p-[.2rem] rounded-[.2rem] bg-[#05309F] border-2 border-[#3a61c2]"
                  >Pppular</span
                >
                <span
                  class="p-[.2rem] rounded-[.2rem] bg-[#05309F] border-2 border-[#3a61c2]"
                  >Recente</span
                >
                <span
                  class="p-[.2rem] rounded-[.2rem] bg-[#05309F] border-2 border-[#3a61c2]"
                  >Favorites</span
                >
              </div>
              <div
                class="w-[5.3rem] flex flex-wrap gap-1 p-[.2rem] overflow-auto"
              >
                <div
                  class="w-[1.45rem] bg-[#1A45B1c] bg-[url('/images/BG.png')] bg-[length:1.2rem] bg-no-repeat bg-center"
                  v-for="(tab, index) in gameTabs?.content"
                  :key="index"
                  @click="showGames(tab.finalRelatveUrl)"
                >
                  <div class="relative">
                    <span class="bg-[red]">
                      <img
                        :src="`/api/${tab.buttonImagePath}`"
                        alt=""
                        srcset=""
                    /></span>
                    <img
                      src="/images/star.png"
                      alt=""
                      class="absolute top-0 right-0 w-[.4rem] h-[.4rem] m-[.1rem]"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

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
</template>

<script setup>
import { ref, onMounted, watch, computed } from "vue";
import SpinLoader from "@/components/antUi/spinLoader.vue";
import { useQuery } from "@tanstack/vue-query";
import { useStore } from "@/store/store";
import Register from "@/components/layout/RegisterComponent/RegisterForm.vue";
import Login from "@/components/layout/LoginComponent/LoginForm.vue";
import { axiosGet2 } from "@/components/axios/AxiosHook";
const store = useStore();
//   const { gamesData, getGame } = getGamesTab();
const gameType = ref("");
const gameTabs = ref([]);
const activeBtn = ref(null);
const hideMain = ref(true);
const nowShowingGames = ref(false);
const gameUrl = ref("");
const liveGameUrl = ref("");
const spinLoads = ref(false);
const loginModal = ref(false);
const regModal = ref(false);
const gamesData = ref([]);

const props = defineProps({
  gamePass: {
    type: String,
    required: true,
  },
  passive: {
    type: String,
    default: "",
  },
});

watch(gameType, (newVal) => {});
watch(liveGameUrl, (newVal) => {
  // if (newVal) {
  //   alert(newVal);
  // }
});
const { refetch: refetchBbin } = useQuery({
  queryFn: ["slots"],
  queryFn: () =>
    axiosGet2(
      "/api/native/v2/get_game_datas_v2.do?gameType=bbinFish&lan=en&pageSize=30&pageIndex=1"
    ),
  enabled: false,
  select: (data) => {
    gameTabs.value = data;
  },
  onError: (err) => console(err),
});

const { refetch } = useQuery({
  queryKey: ["gameTab"],
  queryFn: () =>
    axiosGet2(
      `/api/native/v2/get_game_datas_v2.do?gameType=${gameType.value}&lan=en&pageSize=30&pageIndex=1`
    ),
  enabled: false,
  select: (data) => {
    gameTabs.value = data;
  },
});

const { refetch: refetchGetGame } = useQuery({
  queryKey: ["getGame"],
  queryFn: () =>
    axiosGet2("/api/native/v2/getGame2.do?type=7&limitNum=50&lan=en"),
  select: (data) => {
    gamesData.value = data;
  },
  onError: (err) => console.log(err),
});

const { refetch: fetchGames, isFetching } = useQuery({
  queryKey: ["liveGames"],
  queryFn: () => axiosGet2(`/api${gameUrl.value}`),
  enabled: false,
  select: (data) => {
    if(data.url) {
      liveGameUrl.value = data.url
    }
    if(data.html) {
    liveGameUrl.value = data.html;
    }
    if (data) {
      hideMain.value = false;
      nowShowingGames.value = true;
    }
  },

  onError: (err) => alert(err),
});

const { refetch: transOut } = useQuery({
  queryKey: ["transOut"],
  queryFn: () => axiosGet2("/api/native/v2/autoTranout.do?lan=en"),
});

const getTypes = (gameTypes, index) => {
  gameType.value = gameTypes;
  activeBtn.value = index;
  refetch();
};

watch(gameUrl, (newVal) => {
  // if (newVal) {
  //   alert(newVal);
  // }
});
const showGames = (url) => {
  gameUrl.value = url;
  if (!store.state.userInfo.isLogin) {
    loginModal.value = !loginModal.value;
    return;
  }
  fetchGames();
};
const backlush = () => {
  hideMain.value = true;
  nowShowingGames.value = false;
  transOut();
};

const showIframGames = computed(() => {
  return liveGameUrl.value;
});

onMounted(() => {
  refetchBbin();
  refetchGetGame();
});
</script>
