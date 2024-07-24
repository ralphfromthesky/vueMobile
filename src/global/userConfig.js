import { axiosGet2 } from "@/components/axios/AxiosHook";
import { useQuery } from "@tanstack/vue-query";
import { useStore } from "@/store/store.js";
import { ref } from "vue";

const store = useStore()

export const useGetUserConfig = () => {
    const configData = ref([])
    const userConfig = useQuery({
        queryKey: ["getUserConfig"],
        staleTime: 1000,
        enabled: false,
        queryFn: async () => await axiosGet2("/api/native/config.do?lan=en"),
        select: (data) => {
            store.commit("setUserConfig", data);
            configData.value = data;
            
        },
        onError: (error) => {
            console.log(`error: ${error}`);
        },
    });

    return {
        userConfig,
        configData
    };
};