<template>
    <PageLayout>
        <div class="w-screen h-[100vh-.9rem] ">
            <!-- <div class="bg-[#05309F] w-full h-auto">
                <div class="flex justify-between p-[.2rem]">
                    <div class="flex items-center gap-[.1rem] relative mt-[.2rem]">
                        <span class="text-[#6FA4EF] text-[0.2rem]">Depositado</span>
                        <span class="text-white text-[0.3rem] relative">0
                            <div class="h-[.32rem] w-fit left-[40%] right-0 -top-[.23rem] absolute z-10">
                                <p
                                    class="bg-[#FFAA09] rounded-[.126rem] rounded-bl-none text-white p-[.07rem] pt-0 h-[.26rem] w-full leading-[.26rem] text-[.16rem] text-nowrap">
                                    Taxa de juros anual 15%</p>
                                <p
                                    class="border-b-[.07rem] border-b-transparent border-l-[.07rem] border-l-[#FFAA09] border-r-[.07rem] border-r-transparent">
                                </p>
                            </div>
                        </span>

                    </div>
                    <div class="flex items-center justify-center gap-[.2rem]">
                        <button
                            class="w-[1rem] h-[.5rem] bg-[#FFAA09] rounded-[.1rem] text-white text-[0.2rem]">Deposito</button>
                        <button
                            class="w-[1rem] h-[.5rem] bg-[#A0C5FB] rounded-[.1rem] text-white text-[0.2rem]">Transferir</button>
                    </div>
                </div>

                <div class="flex justify-between p-[.2rem]">
                    <div class="flex flex-col flex-start">
                        <div class="flex flex-col flex-start">
                            <span class="text-[#6FA4EF] text-[0.2rem] ">Ciclo de assentamento</span>
                            <span class="text-white text-[0.2rem]">1horas</span>
                        </div>
                        <div class="flex flex-col  gap-[.1rem] flex-start">
                            <span class="text-[#6FA4EF] text-[0.2rem]">Coleção cumulativa</span>
                            <span class="text-[#6FA4EF] text-[0.2rem]">0,00</span>
                        </div>
                    </div>



                    <div class="flex items-center gap-[.2rem]">
                        <div class="flex flex-col items-end">
                            <span class="text-[#6FA4EF] text-[0.2rem]">Máximo de juros</span>
                            <span class="text-white text-[0.2rem]">1 ciclo</span>
                            <span class="text-[#6FA4EF] text-[0.2rem]">Pendente</span>
                            <span class="text-[#FFAA09] text-[0.24rem]">0,000000</span>
                        </div>

                        <div class="flex">
                            <button
                                class="w-[1rem] h-[.5rem] bg-[#A0C5FB] rounded-[.1rem] text-white text-[0.2rem]">Receber</button>
                        </div>
                    </div>
                </div>
                <div
                    class="flex gap-[0.3rem] p-[.2rem] pb-0 w-full bg-[#05309F] whitespace-nowrap overflow-x-auto border-b-[.01rem] border-[#3A61C2]">
                    <div :class="showOtherTable && `border-b-[.02rem] border-[#FFF0BB] h-[.6rem]`">
                        <span @click="showFirst" class="text-[#FFF0BB] text-[0.22rem]">Detalhes do registro</span>
                    </div>
                    <div :class="showSomeTable && `border-b-[.02rem] border-[#FFF0BB] h-[.6rem]`">
                        <span @click="showSecond" class="text-[#FFF0BB] text-[0.22rem]">Regras de juros</span>
                    </div>
                </div>
            </div> -->
            <div class="bg-[#05309F] w-full h-auto p-[.2rem]">
                <div class="flex justify-between leading-none">
                    <div class="flex flex-col gap-[.2rem]">
                        <span class="text-[#fff] text-[.18rem]">Yesterday's earnings (VND)</span>
                        <span class="text-[#ffaa09] text-[.18rem]">{{ jurosData?.yesterdayRecord != "" ?
                            jurosData?.yesterdayRecord?.income : "0" }}</span>
                        <span class="text-[#fff] text-[.18rem]">Earnings Rate <span
                                class="text-[#ef7a7b] text-[.2rem]">{{ jurosData?.yesterdayRecord != "" ?
                                    jurosData?.yesterdayRecord?.scale : "0" }}‱ </span> </span>
                        <span class="text-[#fff] text-[.18rem]">Earnings from the day before yesterday (VND)</span>
                        <span class="text-[#ffaa09] text-[.18rem]">{{ jurosData?.qiantianRecord != "" ?
                            jurosData?.yesterdayRecord?.income : "0" }}</span>
                        <span class="text-[#fff] text-[.18rem]">Earnings Rate <span class="text-[#ef7a7b] text-[.2rem]">
                                {{ jurosData?.qiantianRecord != "" ? yesterdayRecord?.scale : "0" }}‱</span> </span>
                    </div>
                    <div class="flex flex-col gap-[.2rem]">
                        <span class="text-[#fff] text-[.18rem]">Today's estimated earnings (VND)</span>
                        <span class="text-[#ffaa09] text-[.18rem]">{{ jurosData?.incomeStr }}~{{ jurosData?.incomeEnd
                            }}</span>
                        <span class="text-[#fff] text-[.18rem]">Interest rate range <span
                                class="text-[#ef7a7b] text-[.2rem]">{{ jurosData?.scaleStr }}‱~{{ jurosData?.scaleEnd
                                }}‱</span> </span>
                    </div>
                </div>

            </div>
            <div
                class="flex gap-[0.3rem] p-[.2rem] pb-0 w-full bg-[#05309F] whitespace-nowrap overflow-x-auto border-b-[.01rem] border-[#3A61C2]">
                <div :class="showOtherTable && `border-b-[.02rem] border-[#FFF0BB] h-[.6rem]`">
                    <span @click="showFirst" class="text-[#FFF0BB] text-[0.22rem]">Detalhes do registro</span>
                </div>
                <div :class="showSomeTable && `border-b-[.02rem] border-[#FFF0BB] h-[.6rem]`">
                    <span @click="showSecond" class="text-[#FFF0BB] text-[0.22rem]">Regras de juros</span>
                </div>
            </div>


            <!-- Start -->
            <Juros v-if="showOtherTable" />
            <InterestRules v-if="showSomeTable" />
            <!-- End -->
        </div>
    </PageLayout>
</template>
<script setup>
import Juros from './components/juros.vue';
import InterestRules from './components/InterestRules.vue';
import PageLayout from '@/components/layout/Layout.vue';
import NoData from '@/components/NoData/NoData.vue';
import { useMutation } from "@tanstack/vue-query"
import { onMounted, ref } from 'vue'
import { axiosGet2, axiosPost2 } from '../../components/axios/AxiosHook.js'

const showOtherTable = ref(true)
const showSomeTable = ref(false)

const showFirst = () => {
    showOtherTable.value = true
    showSomeTable.value = false
}
const showSecond = () => {
    showSomeTable.value = true
    showOtherTable.value = false
}

const jurosData = ref([])
const juros = useMutation({
    mutationFn: (payload) => axiosPost2('api/userCenter/userCenterBill/index.do'),
    onSuccess: (data) => {
        jurosData.value = data
    },
    onError: (error) => {
        console.log(`this error: ${error}`)
    }
})

onMounted(() => {
    juros.mutate()
})
</script>