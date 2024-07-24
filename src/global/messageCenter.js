import {
  axiosGet,
  axiosGet2,
  axiosPost,
  axiosPost2,
  axiosPost3,
} from "@/components/axios/AxiosHook";
import { useMutation, useQuery, useQueryClient } from "@tanstack/vue-query";
import { ref, computed } from "vue";
import { useStore } from "@/store/store.js";
const store = useStore();

const advanceId = ref();

export const useMessage = () => {
  const messageData = ref([]);

  const messageList = useQuery({
    queryKey: ["messageList"],
    staleTime: 1000,
    enabled: false,
    queryFn: async () =>
      axiosGet2("/api/native/v2/message_list.do?pageNumber=1&pageSize=50"),
    select: (data) => {
      store.commit("setMessageList", data);
      messageData.value = store.state.userMessage.content.datas;
    },
    onError: () => { },
  });

  return {
    messageList,
    messageData,
  };
};

export const useNotice = () => {
  const noticeData = ref([]);
  const noticeList = useQuery({
    queryKey: ["notice"],
    enabled: false,
    queryFn: async () =>
      await axiosGet2("/api/native/v2/new_notice_v2.do?type=13"),
    select: (data) => {
      store.commit("setNotice", data);
      noticeData.value = store.state.useNotice.content;
    },
  });
  return {
    noticeData,
    noticeList,
  };
};

export const useAdvice = () => {
  const showToast = ref(false);
  const toastMsg = ref("");
  const client = useQueryClient();
  const adviceObj = ref({
    sendType: 1,
    content: "",
  });

  const saveAdvice = useMutation({
    mutationFn: async () =>
      await axiosPost("/api/native/v2/saveAdvice.do", adviceObj.value),
    onSuccess: (data) => {
      showToast.value = true;
      toastMsg.value = data.data.msg;
      client.invalidateQueries({ queryKey: ["advice"] });
      setTimeout(() => {
        showToast.value = false;
      }, 3000);
    },
  });

  return {
    adviceObj,
    saveAdvice,
    showToast,
    toastMsg,
  };
};
export const useAdviceList = () => {
  const adviceData = ref([]);

  const adviceList = useQuery({
    queryKey: ["advice"],
    queryFn: async () => axiosGet("/api/native/v2/adviceList.do"),
    staleTime: 1000,
    enabled: false,
    select: (data) => {
      adviceData.value = data.data.content.rows;
      advanceId.value = data.data.content.id;
    },
    onError: () => { },
  });

  return {
    adviceList,
    adviceData,
  };
};

export const useViewAdvice = () => {
  const adviceData = ref([]);
  //   const adviceId = ref(advanceId.value)
  // const feedback = useQuery({
  //   queryKey: ["feedback"],
  //   enabled: false,
  //   queryFn: async () => axiosGet("api/native/v2/viewAdvice.do", adviceId.value),
  //   select: (data) => {
  //     adviceData.value = data.data.content.adviceList;
  //     console.log(data)
  //     console.log(adviceId.value)
  //   },
  //   onError: () => {},
  // });

  const ViewAdvice = useMutation({
    mutationFn: (payload) => axiosPost2("api/native/v2/viewAdvice.do", payload),
    onSuccess: (data) => {
      adviceData.value = data.content;
      adviceLength.value = data.content.adviceList.length
    },
  });
  return {
    ViewAdvice,
    adviceData,
  };
};

export const useViewAdviceReply = () => {
  const repltStatus = ref(false)
  
  const viewAdviceReply = useMutation({
    mutationFn: async (payload) =>
      axiosPost2("/api/native/v2/updateAdvice.do", payload),
    onSuccess: (data) => {
      repltStatus.value = data.success
    },
  });
  return {
    viewAdviceReply,
    repltStatus,
  };
};
