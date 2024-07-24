import {
  axiosGet,
  axiosGet2,
  axiosPost,
  axiosPost3,
  axiosPost2,
} from "@/components/axios/AxiosHook";
import { useMutation, useQuery } from "@tanstack/vue-query";
import { ref } from "vue";
import { dateReducer } from "@/components/functions/Function";
import {
  initialDate,
  initialWeek,
  lastWeeks,
  yesterday,
  lastMonths,
  initialMonth,
} from "@/components/functions/Function";
import { useReducer } from "vue-use-reducer";
const [commonReducer] = useReducer(dateReducer, initialDate);
const [commonReducerYesteday] = useReducer(dateReducer, yesterday);
const [commonReducerThisWeek] = useReducer(dateReducer, initialWeek);
const [commonReducerLastweek] = useReducer(dateReducer, lastWeeks);
const [commonReducerThisMonth] = useReducer(dateReducer, initialMonth);
const [commonReducerLastMonth] = useReducer(dateReducer, lastMonths);

export const useChessRecords = () => {
  const chessPayload = ref({
    platform: "",
    startTime: commonReducer.startDate,
    endTime: commonReducer.endDate,
    pageSize: "50",
    pageNumber: " 1",
  });
  const chessPayloadYesterday = ref({
    platform: "",
    startTime: commonReducerYesteday.startDate,
    endTime: commonReducerYesteday.endDate,
    pageSize: "50",
    pageNumber: " 1",
  });
  const chessPayloadThisWeek = ref({
    platform: "",
    startTime: commonReducerThisWeek.startDate,
    endTime: commonReducerThisWeek.endDate,
    pageSize: "50",
    pageNumber: " 1",
  });
  const chessPayloadLastWeek = ref({
    platform: "",
    startTime: commonReducerLastweek.startDate,
    endTime: commonReducerLastweek.endDate,
    pageSize: "50",
    pageNumber: " 1",
  });
  const chessPayloadThisMonth = ref({
    platform: "",
    startTime: commonReducerThisMonth.startDate,
    endTime: commonReducerThisMonth.endDate,
    pageSize: "50",
    pageNumber: " 1",
  });

  const chessPayloadLastMonth = ref({
    platform: "",
    startTime: commonReducerLastMonth.startDate,
    endTime: commonReducerLastMonth.endDate,
    pageSize: "50",
    pageNumber: " 1",
  });

  const chessData = ref([]);
  const chess = useMutation({
    mutationFn: async (payload) =>
      axiosPost("/api/native/v2/chessRecord.do?", payload),
    onSuccess: (data) => {
      chessData.value = data;
    },
    onError: (err) => {},
  });

  return {
    chess,
    chessData,
    chessPayload,
    chessPayloadYesterday,
    chessPayloadThisWeek,
    chessPayloadLastWeek,
    chessPayloadThisMonth,
    chessPayloadLastMonth,
  };
};

export const useEgame = () => {
  const spinLoad = ref(false);
  const eGamePayload = ref({
    startTime: commonReducer.startDate,
    endTime: commonReducer.endDate,
    pageSize: "50",
    pageNumber: " 1",
  });
  const eGamePayloadYesterday = ref({
    platform: "",
    startTime: commonReducerYesteday.startDate,
    endTime: "",
    pageSize: "50",
    pageNumber: " 1",
  });
  const eGamePayloadThisWeek = ref({
    platform: "",
    startTime: commonReducerThisWeek.startDate,
    endTime: commonReducerThisWeek.endDate,
    pageSize: "50",
    pageNumber: " 1",
  });
  const eGamePayloadLastWeek = ref({
    platform: "",
    startTime: commonReducerLastweek.startDate,
    endTime: commonReducerLastweek.endDate,
    pageSize: "50",
    pageNumber: " 1",
  });
  const eGamePayloadThisMonth = ref({
    platform: "",
    startTime: commonReducerThisMonth.startDate,
    endTime: commonReducerThisMonth.endDate,
    pageSize: "50",
    pageNumber: " 1",
  });

  const eGamePayloadLastMonth = ref({
    platform: "",
    startTime: commonReducerLastMonth.startDate,
    endTime: commonReducerLastMonth.endDate,
    pageSize: "50",
    pageNumber: " 1",
  });
  const eGameData = ref([]);
  const eGame = useMutation({
    mutationFn: async (payload) =>
      axiosPost2("/api/native/v2/egameRecord.do", payload),
    onMutate: () => {
      spinLoad.value = true;
    },
    onSuccess: (data) => {
      eGameData.value = data;
      console.log(eGameData.value);
      spinLoad.value = false;
    },
    onError: (err) => {},
  });

  return {
    eGame,
    eGameData,
    eGamePayload,
    eGamePayloadYesterday,
    eGamePayloadThisWeek,
    eGamePayloadLastWeek,
    eGamePayloadThisMonth,
    eGamePayloadLastMonth,
    spinLoad
  };
};

export const useEsports = () => {
  const eSportsPayloadYesterday = ref({
    platform: "",
    startTime: commonReducerYesteday.startDate,
    endTime: "",
    pageSize: "50",
    pageNumber: " 1",
  });
  const eSportsPayloadThisWeek = ref({
    platform: "",
    startTime: commonReducerThisWeek.startDate,
    endTime: commonReducerThisWeek.endDate,
    pageSize: "50",
    pageNumber: " 1",
  });
  const eSportsPayloadLastWeek = ref({
    platform: "",
    startTime: commonReducerLastweek.startDate,
    endTime: commonReducerLastweek.endDate,
    pageSize: "50",
    pageNumber: " 1",
  });
  const eSportsPayloadThisMonth = ref({
    platform: "",
    startTime: commonReducerThisMonth.startDate,
    endTime: commonReducerThisMonth.endDate,
    pageSize: "50",
    pageNumber: " 1",
  });

  const eSportsPayloadLastMonth = ref({
    platform: "",
    startTime: commonReducerLastMonth.startDate,
    endTime: commonReducerLastMonth.endDate,
    pageSize: "50",
    pageNumber: " 1",
  });
  const eSportsData = ref([]);
  const eSportsPayload = ref({
    startTime: commonReducer.startDate,
    endTime: commonReducer.endDate,
    pageSize: "50",
    pageNumber: " 1",
  });
  const esports = useMutation({
    mutationFn: async (payload) =>
      axiosPost2("/api/native/v2/esportRecord.do", payload),
    onSuccess: (data) => {
      eSportsData.value = data;
    },
    onError: (err) => console.log(err),
  });
  return {
    esports,
    eSportsData,
    eSportsPayload,
    eSportsPayloadYesterday,
    eSportsPayloadThisWeek,
    eSportsPayloadLastWeek,
    eSportsPayloadThisMonth,
    eSportsPayloadLastMonth,
  };
};

export const useFishing = () => {
  const fishingPayload = ref({
    startTime: commonReducer.startDate,
    endTime: commonReducer.endDate,
    pageSize: "50",
    pageNumber: " 1",
  });
  const fishingPayloadYesterday = ref({
    platform: "",
    startTime: commonReducerYesteday.startDate,
    endTime: "",
    pageSize: "50",
    pageNumber: " 1",
  });
  const fishingPayloadThisWeek = ref({
    platform: "",
    startTime: commonReducerThisWeek.startDate,
    endTime: commonReducerThisWeek.endDate,
    pageSize: "50",
    pageNumber: " 1",
  });
  const fishingPayloadLastWeek = ref({
    platform: "",
    startTime: commonReducerLastweek.startDate,
    endTime: commonReducerLastweek.endDate,
    pageSize: "50",
    pageNumber: " 1",
  });
  const fishingPayloadThisMonth = ref({
    platform: "",
    startTime: commonReducerThisMonth.startDate,
    endTime: commonReducerThisMonth.endDate,
    pageSize: "50",
    pageNumber: " 1",
  });

  const fishingPayloadLastMonth = ref({
    platform: "",
    startTime: commonReducerLastMonth.startDate,
    endTime: commonReducerLastMonth.endDate,
    pageSize: "50",
    pageNumber: " 1",
  });

  const fishingData = ref([]);
  const fishing = useMutation({
    mutationFn: async (payload) =>
      axiosPost2("/api/native/v2/fishingRecord.do", payload),
    onSuccess: (data) => {
      fishingData.value = data;
    },
    onError: (err) => console.log(err),
  });
  return {
    fishing,
    fishingData,
    fishingPayload,
    fishingPayloadYesterday,
    fishingPayloadThisWeek,
    fishingPayloadLastWeek,
    fishingPayloadThisMonth,
    fishingPayloadLastMonth,
  };
};

export const useLottery = () => {
  const lotteryData = ref([]);
  const lotteryPayload = ref({
    platform: "",
    startTime: commonReducer.startDate,
    endTime: commonReducer.endDate,
    pageSize: "50",
    pageNumber: " 1",
  });
  const lotteryPayloadYesterday = ref({
    platform: "",
    startTime: commonReducerYesteday.startDate,
    endTime: "",
    pageSize: "50",
    pageNumber: " 1",
  });
  const lotteryPayloadThisWeek = ref({
    platform: "",
    startTime: commonReducerThisWeek.startDate,
    endTime: commonReducerThisWeek.endDate,
    pageSize: "50",
    pageNumber: " 1",
  });
  const lotteryPayloadLastWeek = ref({
    platform: "",
    startTime: commonReducerLastweek.startDate,
    endTime: commonReducerLastweek.endDate,
    pageSize: "50",
    pageNumber: " 1",
  });
  const lotteryPayloadThisMonth = ref({
    platform: "",
    startTime: commonReducerThisMonth.startDate,
    endTime: commonReducerThisMonth.endDate,
    pageSize: "50",
    pageNumber: " 1",
  });

  const lotteryPayloadLastMonth = ref({
    platform: "",
    startTime: commonReducerLastMonth.startDate,
    endTime: commonReducerLastMonth.endDate,
    pageSize: "50",
    pageNumber: " 1",
  });

  const lottery = useMutation({
    mutationFn: async (payload) =>
      axiosPost2(`/api/native/v2/lotRecord.do`, payload),
    onSuccess: (data) => {
      lotteryData.value = data;
    },
  });
  return {
    lottery,
    lotteryData,
    lotteryPayload,
    lotteryPayloadYesterday,
    lotteryPayloadThisWeek,
    lotteryPayloadLastWeek,
    lotteryPayloadThisMonth,
    lotteryPayloadLastMonth,
  };
};
export const useSportsRecord = () => {
  const sportsData = ref([]);
  const sportsPayload = ref({
    platform: "",
    startTime: commonReducer.startDate,
    endTime: commonReducer.endDate,
    pageSize: "50",
    pageNumber: " 1",
  });
  const sportsPayloadYesterday = ref({
    platform: "",
    startTime: commonReducerYesteday.startDate,
    endTime: "",
    pageSize: "50",
    pageNumber: " 1",
  });
  const sportsPayloadThisWeek = ref({
    platform: "",
    startTime: commonReducerThisWeek.startDate,
    endTime: commonReducerThisWeek.endDate,
    pageSize: "50",
    pageNumber: " 1",
  });
  const sportsPayloadLastWeek = ref({
    platform: "",
    startTime: commonReducerLastweek.startDate,
    endTime: commonReducerLastweek.endDate,
    pageSize: "50",
    pageNumber: " 1",
  });
  const sportsPayloadThisMonth = ref({
    platform: "",
    startTime: commonReducerThisMonth.startDate,
    endTime: commonReducerThisMonth.endDate,
    pageSize: "50",
    pageNumber: " 1",
  });

  const sportsPayloadLastMonth = ref({
    platform: "",
    startTime: commonReducerLastMonth.startDate,
    endTime: commonReducerLastMonth.endDate,
    pageSize: "50",
    pageNumber: " 1",
  });
  const sports = useMutation({
    mutationFn: async (payload) =>
      axiosPost2("/api/native/v2/sportRecord.do", payload),
    onSuccess: (data) => {
      sportsData.value = data;
    },
    onError: (err) => console.log(err),
  });
  return {
    sports,
    sportsData,
    sportsPayload,
    sportsPayloadYesterday,
    sportsPayloadThisWeek,
    sportsPayloadLastWeek,
    sportsPayloadThisMonth,
    sportsPayloadLastMonth,
  };
};
export const datePayload = () => {
  const today = ref({
    type: "",
    startTime: commonReducer.startDate,
    endTime: commonReducer.endDate,
    pageSize: "50",
    pageNumber: " 1",
  });
  const Yesterday = ref({
    type: "",
    startTime: commonReducerYesteday.startDate,
    endTime: commonReducerYesteday.endDate,
    pageSize: "50",
    pageNumber: " 1",
  });
  const thisWeek = ref({
    type: "",
    startTime: commonReducerThisWeek.startDate,
    endTime: commonReducerThisWeek.endDate,
    pageSize: "50",
    pageNumber: " 1",
  });
  const lastWeek = ref({
    type: "",
    startTime: commonReducerLastweek.startDate,
    endTime: commonReducerLastweek.endDate,
    pageSize: "50",
    pageNumber: " 1",
  });
  const thisMonth = ref({
    type: "",
    startTime: commonReducerThisMonth.startDate,
    endTime: commonReducerThisMonth.endDate,
    pageSize: "50",
    pageNumber: " 1",
  });

  const lastMonth = ref({
    type: "",
    startTime: commonReducerLastMonth.startDate,
    endTime: commonReducerLastMonth.endDate,
    pageSize: "50",
    pageNumber: " 1",
  });
  return {
    today,
    yesterday,
    thisWeek,
    lastWeek,
    lastMonth,
    thisMonth,
  };
};

export const eventDatePayload = () => {
  const today = ref({
    sectType: "",
    startTime: commonReducer.startDate,
    endTime: commonReducer.endDate,
  });
  const yesterday = ref({
    sectType: "",
    startTime: commonReducerYesteday.startDate,
    endTime: commonReducerYesteday.endDate,
  });
  const thisWeek = ref({
    sectType: "",
    startTime: commonReducerThisWeek.startDate,
    endTime: commonReducerThisWeek.endDate,
  });
  const lastWeek = ref({
    sectType: "",
    startTime: commonReducerLastweek.startDate,
    endTime: commonReducerLastweek.endDate,
  });
  const thisMonth = ref({
    sectType: "",
    startTime: commonReducerThisMonth.startDate,
    endTime: commonReducerThisMonth.endDate,
  });

  const lastMonth = ref({
    sectType: "",
    startTime: commonReducerLastMonth.startDate,
    endTime: commonReducerLastMonth.endDate,
  });
  return {
    today,
    yesterday,
    thisWeek,
    lastWeek,
    lastMonth,
    thisMonth,
  };
};
export const dateChartPayload = ref({
  today: {
    startTime: commonReducer.startDate,
    endTime: commonReducer.endDate,
  },
  yesterday: {
    sectType: "",
    startTime: commonReducerYesteday.startDate,
    endTime: commonReducerYesteday.endDate,
  },
  thisWeek: {
    startTime: commonReducerThisWeek.startDate,
    endTime: commonReducerThisWeek.endDate,
  },
  lastWeek: {
    startTime: commonReducerLastweek.startDate,
    endTime: commonReducerLastweek.endDate,
  },
  thisMonth: {
    startTime: commonReducerThisMonth.startDate,
    endTime: commonReducerThisMonth.endDate,
  },
  lastMonth: {
    startTime: commonReducerLastMonth.startDate,
    endTime: commonReducerLastMonth.endDate,
  },
});
