import {
  axiosGet,
  axiosGet2,
  axiosPost,
  axiosPost3,
} from "@/components/axios/AxiosHook";
import { useMutation, useQuery, useQueryClient } from "@tanstack/vue-query";
import { ref, computed } from "vue";
import { useStore } from "@/store/store.js";
import { dateReducer } from "@/components/functions/Function";
import {
  initialDate,
  initialMonth,
  initialWeek,
  lastMonths,
  lastWeeks,
  yesterday
} from "@/components/functions/Function";
import { useReducer } from "vue-use-reducer";
const store = useStore();

export const useGetUserInfo = () => {
  const userData = ref({});
  const query = useQuery({
    queryKey: ["userDetails"],
    staleTime: 6000,
    refetchInterval: 1800000,
    enabled: false,
    queryFn: async () => await axiosGet2("/api/userCenter/info/getAccInfo.do"),
    select: (data) => {
      userData.value = data;

      store.commit("setUserInfo", userData.value);
    },
    onError: (error) => {
      console.log(`error: ${error}`);
    },
  });

  const getPending = () => {
    const pendingData = ref([]);
    const usePending = useQuery({
      enabled: false,
      queryFn: async () => await axiosGet("/api/native/v2/getWaitPickTasks.do"),
      queryKey: ["pendente"],
      select: (response) => {
        pendingData.value = response.data.content;
        return response.data;
      },
      onError: () => {},
    });

    return {
      usePending,
      pendingData,
    };
  };

  return {
    query,
    userData,
    getPending,
  };
};

export const getHistory = () => {
  const [commonReducer] = useReducer(dateReducer, initialDate);
  const [monthReducer] = useReducer(dateReducer, initialMonth);
  const [weekReducer] = useReducer(dateReducer, initialWeek);
  const [lastMonthReducer] = useReducer(dateReducer, lastMonths);
  const [lastWeekReducer] = useReducer(dateReducer, lastWeeks)
  const [yesterdayReducer] = useReducer(dateReducer, yesterday);
  ;

  const historyData = ref([]);
  const hasData = ref(true);
  const today = ref({
    secType: 1,
    startTime: commonReducer.startDate,
    endTime: commonReducer.endDate,
  });

  const week = ref({
    secType: 1,
    startTime: weekReducer.startDate,
    endTime: weekReducer.endDate,
  });
  const month = ref({
    secType: 1,
    startTime: monthReducer.startDate,
    endTime: monthReducer.endDate,
  });
  const lastMonth = ref({
    secType: 1,
    startTime: lastMonthReducer.startDate,
    endTime: lastMonthReducer.endDate,
  });
  const lastWeek = ref({
    secType: 1,
    startTime: lastWeekReducer.startDate,
    endTime: lastWeekReducer.endDate,
  });
  const yesterdays = ref({
    secType: 1,
    startTime: yesterdayReducer.startDate,
    endTime: yesterdayReducer.endDate,
  });
  const userHistory = useMutation({
    mutationFn: async (payload) =>
      axiosPost("/api/native/v2/getActPage.do", payload),
    onSuccess: (data) => {
      historyData.value = data
      if(data.data.content.rows) {
        hasData.value = false
      } else if(data.data.content.rows == 0) {
        hasData.value = true
      }
    },
    onError: (err) => console.log(`this erro: ${err}`),
  });


  return {
    historyData,
    userHistory,
    hasData,
    today,
    month,
    week,
    lastMonth,
    lastWeek,
    yesterdays
  };
};

export const getBanner = () => {
  const bannerImage = ref([]);

  const useBanner = useQuery({
    queryFn: async () => axiosGet("/api/native/v2/lunbo.do?code=5"),
    queryKey: ["banner"],
    enabled: true,
    select: (response) => {
      if (response.data) {
        bannerImage.value = response.data.content;
      }
    },
  });
  return {
    bannerImage,
    useBanner,
  };
};

export const getSecurityInfo = () => {
  const securityData = ref([]);
  const useSecurity = useQuery({
    queryFn: async () => axiosGet("/api/userCenter/getSecurityInfo.do"),
    queryKey: ["secure"],
    enabled: true,
    select: (response) => {
      if (response.data) {
        securityData.value = response.data;
        store.commit("setUserProfile", response.data);
      }
    },
  });
  return {
    securityData,
    useSecurity,
  };
};

export const updateAccount = () => {
  const updated = ref(false);
  const successMsg = ref("Operation success");
  const msgInfo = ref("");
  const obj = ref({
    lang: "en",
    whatsapp: "",
    facebook: "",
    telegram: "",
    email: "",
  });
  const client = useQueryClient();
  const mutateProfile = useMutation({
    mutationFn: async () =>
      axiosPost("/api/native/v2/updateAccountInfo2.do", obj.value),
    onMutate: (data) => {
      // updated.value = true;
    },
    onSuccess: (data) => {
      client.invalidateQueries({ queryKey: ["secure"] });
      updated.value = true;
      if (data.data.success) {
        msgInfo.value = successMsg.value;
      } else if (data.data.msg) {
        msgInfo.value = data.data.msg;
      }
      setTimeout(() => {
        updated.value = false;
      }, 3000);
    },
  });
  return {
    mutateProfile,
    obj,
    updated,
    msgInfo,
  };
};

export const changePassword = () => {
  const client = useQueryClient();
  const msg = ref("");
  const showPwdNotif = ref(false);
  const hideShow = ref(false);
  const hideShowNew = ref(false);
  const confirmShow = ref(false);

  const passwordLakas = (password) => {
    let lakas = 0;
    if (password.length >= 6) lakas++;
    if (/[A-Z]/.test(password)) lakas++;
    if (/[0-9]/.test(password)) lakas++;
    if (/[^A-Za-z0-9]/.test(password)) lakas++;
    return lakas;
  };
  const showPw = () => {
    hideShow.value = !hideShow.value;
  };
  const showPwNew = () => {
    hideShowNew.value = !hideShowNew.value;
  };
  const showConfirm = () => {
    confirmShow.value = !confirmShow.value;
  };
  const passwordStrength = computed(() =>
    passwordLakas(changeUserPw.value.opwd)
  );

  const changeUserPw = ref({
    opwd: "",
    pwd: "",
    confirmPwd: "",
  });
  const changePwd = useMutation({
    mutationFn: async () =>
      axiosPost3("/api/native/v2/updateLoginPwd.do", changeUserPw.value),
    onSuccess: (data) => {
      msg.value = data.msg || "Operaton Success";
      showPwdNotif.value = true;
      client.invalidateQueries({ queryKey: ["secure"] });
      setTimeout(() => {
        showPwdNotif.value = false;
      }, 3000);
    },
    onSettled: () => {
      changeUserPw.value = {
        opwd: "",
        pwd: "",
        confirmPwd: "",
      };
    },
  });
  return {
    changeUserPw,
    changePwd,
    msg,
    showPwdNotif,
    passwordStrength,
    showPw,
    hideShow,
    showPwNew,
    hideShowNew,
    confirmShow,
    showConfirm,
  };
};

export const withdrawalPassword = () => {
  const notif = ref(false);
  const msg = ref("");
  const client = useQueryClient();
  const withDrawalPw = ref({
    opwd: "",
    confirmPwd: "",
    pwd: "",
  });
  const mutatePw = useMutation({
    mutationFn: async () =>
      axiosPost3("api/native/v2/initPickPwd.do", withDrawalPw.value),
    onSuccess: (data) => {
      msg.value = data.msg || "Operation Success";
      notif.value = true;
      client.invalidateQueries({ queryKey: ["userDetails"] });
      setTimeout(() => {
        notif.value = false;
      }, 3000);
    },
    onSettled: () => {
      withDrawalPw.value = {
        opwd: "",
        pwd: "",
        confirmPwd: "",
      };
    },
  });
  return {
    mutatePw,
    notif,
    withDrawalPw,
    msg,
  };
};
