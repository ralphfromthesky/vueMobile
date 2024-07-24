import { axiosGet2 } from "@/components/axios/AxiosHook";
import { useQuery } from "@tanstack/vue-query";
import { useStore } from "@/store/store.js";

const store = useStore()

export const useGetBankAccounts = () => {
    const bankAccount = useQuery({
        queryKey: ["getbankAccounts"],
        staleTime: 1000,
        enabled: false,
        queryFn: async () => await axiosGet2("/api/native/v2/userBanks.do"),
        select: (data) => {
            store.commit("setWithdrawBank", data);
        },
        onError: (error) => {
            console.log(`error: ${error}`);
        },
    });

    return {
        bankAccount,
    };
};