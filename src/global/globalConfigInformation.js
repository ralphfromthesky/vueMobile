import { axiosGet2, axiosPost2, axiosPost3 } from "@/components/axios/AxiosHook";
import { useQuery, useMutation } from "@tanstack/vue-query";
import { useStore } from "@/store/store.js";
import { useGetUserInfo } from '@/global/getUserInfo.js'



export const useGetGlobalConfigInfo = () => {
    const store = useStore()
    const accountInfo = useGetUserInfo()

    const registerCode = `api/registerVerifycode.do?timestamp=` + Date.now()

    const withdrawPassword = useMutation({
        mutationFn: (payload) => axiosPost3('api/native/v2/initPickPwd.do', payload),
        onSuccess: (data) => {
            if (data.success === true) {
                window.location.href = "/withdraw"
            } else if (data.success === false) {
                console.log(data.msg)
            }
        }
    });
    const registration = useMutation({
        mutationFn: (payload) => axiosPost2('api/register.do', payload),
        onSuccess: (data) => {
            if (data.success === true) {
                window.location.href = "/"
                document.querySelector(".registerModalButton").click()
                accountInfo.refetch()
            } else if (data.success === false) {
                console.log(data.msg)
                return registerCode;
            }
        }
    });
    const registerConfig = useQuery({
        queryKey: ["getRegisterConfig"],
        staleTime: 1000,
        enabled: false,
        queryFn: async () => await axiosGet2("/api/native/v2/regconfig.do?platform=120&lan=en"),
        select: (data) => {
            store.commit("setRegisterConfig", data);
        },
        onError: (error) => {
            console.log(`error: ${error}`);
        },
    });

    return {
        registerConfig,
        withdrawPassword,
        registration,
        registerCode,
    };
};
