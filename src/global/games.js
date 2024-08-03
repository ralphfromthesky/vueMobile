import { axiosGet2, axiosPost } from "@/components/axios/AxiosHook";
import { useMutation, useQuery } from "@tanstack/vue-query";
import { ref } from "vue";

export const getGamesTab = () => {
  const gamesData = ref([]);
  const getGame = useQuery({
    queryKey: ["forwardGames"],
    queryFn: async () =>
      await axiosGet2("/api/native/v2/getGame2.do?type=2&limitNum=50&lan=en"),
      
    enabled: true,
    select: (data) => {
      gamesData.value = data;
    },
  });
  return {
    getGame,
    gamesData,
  };
};

// export const setGameTab = () => {
//   const gameTabs = ref([]);
//   const gameButtons = useQuery({
//     queryKey: ["gameButton"],
//     queryFn: () =>
//       axiosGet2('/api/native/v2/get_game_datas_v2.do?gameType=pg&lan=en&pageSize=30&pageIndex=1'),
//       enabled: true,
//     select: (data) => {
//       gameTabs.value = data;

//     },
//   });

//   return {
//     gameTabs,
//     gameButtons
//   }

//};
