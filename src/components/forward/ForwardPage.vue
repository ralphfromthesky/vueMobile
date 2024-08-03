<template>
  <div>
    <div v-if="nowShowingGames" class="relative">
      <div class="absolute top-[1rem] left-[.1rem]" @click="backlush">
        <img src="/public/home.png" alt="" srcset="" class="h-[1rem]"/>
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
          <span class="text-[.5rem]"><</span>
          <span class="text-[.5rem]">Slots</span>
          <span></span>
        </div>
        <div class="border-3"></div>

        <div
          class="text-white h-screen overflow-auto w-screen p-[.2rem] bg-[#1A45B1]"
        >
          <div class="flex justify-center my-[.1rem]">
            <a-input-search
              v-model:value="value"
              placeholder="Pesquisar"
              style="width: 7rem"
              @search="onSearch"
            />
          </div>
          <div class="flex">
            <div class="flex flex-col overflow-auto h-[13rem]">
              <!-- <span class="h-[3rem]"> Slot</span> -->

              <div
                v-for="(btn, index) in gamesData?.content"
                :key="index"
                class="h-[1rem] w-[1.5rem] border-1 border-[#3a61c2] rounded-[.1rem] flex justify-center items-center my-[.1rem]"
                @click="getTypes(btn.gameType, index)"
                :class="
                  activeBtn === index
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
              <div class="flex justify-center gap-[.3rem]">
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
                class="w-[5.3rem] flex flex-wrap gap-1 p-[.2rem] h-[12rem] overflow-auto"
              >
                <div
                  class="w-[1.45rem]"
                  v-for="(tab, index) in gameTabs?.content"
                  :key="index"
                  @click="showGames(tab.finalRelatveUrl)"
                >
                  <div class="">
                    <!-- <span class="absolute">{{ tab.name }}</span> -->
                    <span
                      ><img
                        :src="`/api/${tab.buttonImagePath}`"
                        alt=""
                        srcset=""
                    /></span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <SpinLoader v-if="isLoading" />

  </div>
</template>

<script setup>
import { ref, onMounted, watch, computed } from "vue";
import SpinLoader from "../antUi/spinLoader.vue";
import { getGamesTab } from "@/global/games.js";
import { useQuery } from "@tanstack/vue-query";
import { axiosGet2 } from "../axios/AxiosHook";
import {useStore} from "@/store/store";
const store = useStore()
const { gamesData, getGame } = getGamesTab();
const gameType = ref("");
const gameTabs = ref([]);
const activeBtn = ref(null);
const hideMain = ref(true);
const nowShowingGames = ref(false);
const gameUrl = ref("");
const liveGameUrl = ref("");
const spinLoads = ref(false)


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
const { refetch: refetchPg } = useQuery({
  queryFn: ["slots"],
  queryFn: () =>
    axiosGet2(
      "/api/native/v2/get_game_datas_v2.do?gameType=pg&lan=en&pageSize=30&pageIndex=1"
    ),
  enabled: false,
  select: (data) => {
    gameTabs.value = data;
  },
  onError: (err) => console(err),
});

const { refetch, } = useQuery({
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
  queryFn: () => axiosGet2("/api/getGames.do?type=11&limitNum=50&lang=en"),
  select: (data) => {},
  onError: (err) => console.log(err),
});

const { refetch: fetchGames, isLoading } = useQuery({
  queryKey: ["liveGames"],
  queryFn: () => axiosGet2(`/api${gameUrl.value}`),
  enabled: false,
  select: (data) => {
    liveGameUrl.value = data.url;
    if (data) {
      hideMain.value = false;
      nowShowingGames.value = true;
    }
  },

  onError: (err) => alert(err),
});

const {refetch: transOut} = useQuery({
  queryKey: ['transOut'],
  queryFn: () => axiosGet2('/api/native/v2/autoTranout.do?lan=en'),

})

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
  if(!store.state.userInfo.isLogin){
    alert('huy!')
    return
  } 
  fetchGames();

};
const backlush = () => {
  hideMain.value = true
  nowShowingGames.value = false
  transOut()
}

const showIframGames = computed(() => {
  return liveGameUrl.value;
});

onMounted(() => {
  refetchPg();
  refetchGetGame();
});
</script>
