import {
  axiosGet,
  axiosGet2,
  axiosPost,
  axiosPost3,
  axiosPost2,
} from "@/components/axios/AxiosHook";
// here
import { useStore } from "@/store/store";
const store = useStore();
import { useMutation, useQuery } from "@tanstack/vue-query";
import { dateReducer } from "@/components/functions/Function";
import { initialDate, initialMonth } from "@/components/functions/Function";
import { useReducer } from "vue-use-reducer";
const [commonReducerThisMonth] = useReducer(dateReducer, initialMonth);
import { ref } from "vue";

export const getTask = () => {
  const taskData = ref([]);
  const spinLoad = ref(false);
  const task = useMutation({
    onMutate: () => {
      spinLoad.value = true;
    },
    mutationFn: (payload) =>
      axiosPost("/api/native/v2/getTaskDetail.do", payload),
    onSuccess: (data) => {
      taskData.value = data;
      console.log(data);
      spinLoad.value = false;
    },

    onError: (err) => console.log(`this is error: ${err}`),
  });
  return {
    task,
    taskData,
    spinLoad,
  };
};

export const getFakeData = () => {
  const fakeData = ref([]);
  const fake = useQuery({
    queryFn: async () => await axiosGet("/api/native/v2/turnFakeData.do"),
    enabled: true,
    queryKey: ["fake"],
    select: (data) => {
      fakeData.value = data;
      store.commit("setUserFakeData", fakeData.value.data.content);
    },
    onError: (err) => console.log(err),
  });
  return {
    fake,
    fakeData,
  };
};

export const getTurnRecord = () => {
  const payload = ref({
    startTime: commonReducerThisMonth.startDate,
    endTime: commonReducerThisMonth.endDate,
    pageSize: "50",
    joinType: 5,
    pageNumber: " 1",
  });
  const turnRecord = ref([]);
  const turn = useMutation({
    mutationFn: (payload) =>
      axiosPost("/api/native/v2/getTurnRecord.do", payload),
    onSuccess: (data) => {
      turnRecord.value = data;
      store.commit("setUserTurnRecord", turnRecord.value.data);
    },
    onError: (err) => console.log(err),
  });
  return {
    turnRecord,
    turn,
    payload,
  };
};

export const playTurnLate = () => {
  const playTurn = ref([]);
  const play = useQuery({
    queryFn: () => axiosGet("/api/native/v2/playTurnlate.do?activeId=89"),
    queryKey: ["play"],
    enabled: false,
    select: (data) => {
      playTurn.value = data;
      store.commit("setUserPlayturn", playTurn.value.data);
    },

    onError: (err) => console.log(err),
  });
  return {
    playTurn,
    play,
  };
};

export const redpacket = () => {
  const payload = ref({
    packetId: 937,
  });
  const red = useMutation({
    mutationFn: (payload) =>
      axiosPost3("/api/native/v2/actionRedPacket2.do", payload),
    onSucces: (data) => {},
    onError: (err) => {
      console.log(err);
    },
  });
  return {
    red,
    payload,
  };
};

export const getAppLogin = () => {
  const getAppData = ref([]);
  const getApp = useQuery({
    queryFn: async () =>
      await axiosGet("/api/native/v2/getAppLoginTask.do?lan=en"),
    enabled: true,
    queryKey: ["appget"],
    select: (data) => {
      getAppData.value = data;
      store.commit("setUserGetAppLogin", getAppData.value.data.content);
    },
    onError: (err) => {
      console.log(err);
    },
  });
  return {
    getApp,
    getAppData,
  };
};

export const turnLateActivity = () => {
  const activityData = ref([]);
  const activity = useQuery({
    queryFn: () => axiosGet("/api/native/v2/getTurnlateActivity.do?type=5"),
    queryKey: ["turnLate"],
    enabled: true,
    select: (data) => {
      activityData.value = data;
      store.commit("setUserTurnLateActivity", activityData.value.data.content);
    },
    onError: (err) => console.log(err),
  });

  return {
    activityData,
    activity,
  };
};

export const registerGuest = () => {
  const guest = useMutation({
    mutationFn: () => axiosPost("/api/native/v2/registerGuest.do"),
    onSuccess: (data) => {
      console.log(data);
    },
  });
  return {
    guest,
  };
};
