import { axiosPost, axiosGet, axiosPost2 } from "@/components/axios/AxiosHook";
import { useMutation, useQuery } from "@tanstack/vue-query";
import { ref, computed } from "vue";
import store from "@/store/store";
import { useRouter } from "vue-router";
import { useGetUserInfo } from '@/global/getUserInfo.js'

export const useRegister = () => {
  const getAccountData = ref([]);
  const msgReg = ref("");
  const errorToastReg = ref(false);
  const timestamp = ref(Date.now());
  const regNameInput = ref(false);
  const regPasswordInput = ref(false);
  const cfPwInput = ref(false);
  const regCaptcha = ref(false);
  const emailInput = ref(false);
  const cfPwInputSame = ref(false);
  const showPW = ref(false);
  const regShowPW = ref(false);
  const cfRegShowPW = ref(false);
  const route = useRouter();
  const { query } = useGetUserInfo()

  const regiterMutation = useMutation({
    mutationFn: (payload) => axiosPost2("api/register.do", payload),
    onSuccess: (data) => {
      msgReg.value = data.msg;
      errorToastReg.value = true;
      if (data.success) {
        msgReg.value = "succesfully resgister";
        document.querySelector(".registerModalButton").click()
        query.refetch()
      } else if (!data.success) {
        setTimeout(() => {
          errorToastReg.value = false;
        }, 3000);
        refreshVerifyCode();
      }
    },
    onError: (error) => {
      console.log(`this error: ${error}`);
    },
  });

  const refreshVerifyCode = () => {
    timestamp.value = Date.now();
  };
  const verifyCodeUrl = computed(() => {
    return `api/registerVerifycode.do?time=${Date.now()}`;
  });

  const passwordLakas = (password) => {
    let lakas = 0;
    if (password.length >= 6) lakas++;
    if (/[A-Z]/.test(password)) lakas++;
    if (/[0-9]/.test(password)) lakas++;
    if (/[^A-Za-z0-9]/.test(password)) lakas++;
    return lakas;
  };

  return {
    regiterMutation,

    getAccountData,
    msgReg,
    errorToastReg,
    refreshVerifyCode,
    verifyCodeUrl,
    regNameInput,
    regPasswordInput,
    cfPwInput,
    regCaptcha,
    emailInput,
    cfPwInputSame,
    showPW,
    regShowPW,
    cfRegShowPW,
    passwordLakas,
  };
};
