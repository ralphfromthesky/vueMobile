import { axiosGet2 } from "@/components/axios/AxiosHook";
import { useQuery } from "@tanstack/vue-query";
import { useStore } from "@/store/store.js";

const store = useStore()

export const useGetDegreeInfo = () => {
    const degreeInfo = useQuery({
        queryKey: ["getDegreeInfo"],
        staleTime: 1000,
        enabled: false,
        queryFn: async () => await axiosGet2("/api/native/v2/getDegreeInfo.do?lan=en"),
        select: (data) => {
            store.commit("setDegreeInfo", data);
        },
        onError: (error) => {
            console.log(`error: ${error}`);
        },
    });

    return {
        degreeInfo,
    };
};
