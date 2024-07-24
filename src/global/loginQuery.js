import { axiosPost, axiosPost2 } from "@/components/axios/AxiosHook";
import { useMutation } from "@tanstack/vue-query";
import store from "@/store/store";
import { ref, computed, watch } from "vue";
import { useGetUserInfo } from "@/global/getUserInfo.js";
import { useGetGlobalConfigInfo } from "./globalConfigInformation";
import { useStore } from "@/store/store.js";

export const useLogin = () => {
  const userLogin = ref({
    username: "",
    password: "",
    verifyCode: "",
  });
  const msg = ref("");
  const errorToast = ref(false);
  const userNameInput = ref(false);
  const passwordInput = ref(false);
  const verifyInput = ref(false);
  const loginTimeStamp = ref(Date.now());
  const { query } = useGetUserInfo();
  const { withdrawConfig } = useGetGlobalConfigInfo();
  const store = useStore();

  const userConfig = store.state.userConfig.content;

  const loginMutation = useMutation({
    mutationFn: () => axiosPost2("/api/login.do", userLogin.value),
    onSuccess: (data) => {
      msg.value = data.msg;
      errorToast.value = true;
      query.refetch();
      if (data.success === true) {
        document.querySelector(".myEcho").click();
        store.dispatch("updateUser", userLogin.value);

      } else if (!data.success) {
        refreshLoginCode();
        setTimeout(() => {
          errorToast.value = false;
        }, 4000);
      }
    },
    onMutate: () => {
      query.refetch();
    }
  });
  const refreshLoginCode = () => {
    loginTimeStamp.value = Date.now();
  };
  const loginVerifyCodeUrl = computed(() => {
    return `api/loginVerifycode.do?timestamp=${loginTimeStamp.value}`;
  });

  const handleSubmit = () => {
    if (userLogin.value.username === "") {
      userNameInput.value = true;
      return;
    }
    if (userLogin.value.password === "") {
      passwordInput.value = true;
      return;
    }
    if (
      userLogin.value.verifyCode === "" &&
      userConfig.captcha_vertify_switch === true
    ) {
      verifyInput.value = true;
      return;
    }

    loginMutation.mutate(useLogin.value);
  };

  watch(
    userLogin,
    (newVal) => {
      if (newVal.password.length > 15) {
        userLogin.value.password = newVal.password.slice(0, 15);
      }
    },
    { deep: true }
  );

  return {
    userLogin,
    handleSubmit,
    userNameInput,
    passwordInput,
    verifyInput,
    loginVerifyCodeUrl,
    msg,
    errorToast,
    mutate: loginMutation.mutate,
    isLoading: loginMutation.isLoading,
    error: loginMutation.error,
    data: loginMutation.data,
    loginMutation
  };
};
