import {ref} from 'vue'
import {
    axiosGet,
    axiosGet2,
    axiosPost,
    axiosPost3,
    axiosPost2,
  } from "@/components/axios/AxiosHook";
  import { useMutation, useQuery } from "@tanstack/vue-query";


  export const commissions  = () => {
    const commissionData = ref([])
    const commy = useMutation({
        mutationFn: async (payload) => await axiosPost('/api/native/v2/getUserAwardPage.do', payload),
        onSuccess: (data) => {commissionData.value = data}
    })
    return {
        commissionData,
        commy
    }
  }

  