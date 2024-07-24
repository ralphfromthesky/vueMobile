<template>
    <PageLayout title="Recuperar o saldo">
        <div class="flex flex-col">

            <router-link to="/profile"
                class="flex items-center justify-between w-full h-auto bg-[#05309F] border-b-[.01rem] border-b-[#1a45b1] p-[.2rem]">
                <div class="flex items-center gap-[.2rem]">
                    <div class="">
                        <img src="/avatarImages/Feminine/22.png" alt="" class="w-[1rem] rounded-full">
                    </div>
                    <div class="flex flex-col">
                        <span class="text-[#a89d81] text-[.25rem] font-bold">soapy143</span>
                        <span class="text-[#a89d81] text-[.25rem] font-bold">91040287</span>
                    </div>
                </div>
                <img src="/images/return.png" alt="" class="rotate-[180deg] w-[.3rem]">
            </router-link>
            <div class="w-full h-auto bg-[#05309F] p-[.2rem]">
                <div class="flex items-center justify-around">
                    <div class="flex flex-col items-center justify-center">
                        <span class="text-[#a89d81] text-[.25rem] font-bold">Balance</span>
                        <span class="text-[#a89d81] text-[.25rem] font-bold">VND 60.00</span>
                    </div>
                    <div class="flex flex-col items-center justify-center">
                        <span class="text-[#a89d81] text-[.25rem] font-bold">Bonus Wallet</span>
                        <span class="text-[#a89d81] text-[.25rem] font-bold">VND 50000</span>
                    </div>
                </div>
            </div>
            <div class="flex items-center justify-around px-[.2rem] pt-[.2rem]">
                <div class="">
                    <button
                        class="text-white w-[2.5rem] bg-[#f0c059] rounded-[.1rem] p-[.2rem] leading-none text-[.3rem]">Withdrawal</button>
                </div>
                <div class="">
                    <button
                        class="text-white w-[2.5rem] bg-[#f0c059] rounded-[.1rem] p-[.2rem] leading-none text-[.3rem]">Deposit</button>
                </div>
            </div>
            <div class="w-screen h-auto bg-[#1A45B1] p-[.2rem]">
                <!-- <div class="flex flex-col gap-[.1rem] p-[.2rem] w-full min-w-full h-auto rounded-[.1rem] bg-[#05309F]">
                <div class="flex justify-between">
                    <div class=" flex items-center gap-[.1rem]">
                        <span class="text-[.24rem] text-[#A0C5FB]">Saldo atual</span>
                        <span class="text-[.24rem] text-[#FFAA09]">0,00</span>
                        <img class="w-[.25rem]" src="/images/shuaxin.png" alt="">
                    </div>
                    <div class="flex items-center justify-center">
                        <button class="bg-[#FFF0BB] border-[#FFF0BB] h-[.5rem] w-[1.2rem] rounded-[.1rem]"
                            type="button">
                            <span
                                class="text-center text-[#05309F] text-[.2rem] w-full overflow-hidden text-ellipsis align-middle">
                                Um clique para recuperar
                            </span>
                        </button>
                    </div>
                </div>
                <div class="text-right w-full leading-[.2rem]">
                    <span class="text-[#6FA4EF] text-[.2rem]">
                        Você só pode recuperar o múltiplo inteiro do equilíbrio (ou seja, sem ponto decimal)
                    </span>
                </div>
            </div>

            <div class="flex gap-[.2rem] mt-[.2rem]">
                <div
                    class="w-[1.8rem] h-[.7rem] rounded-[.1rem] bg-amber-100 flex justify-center items-center relative">
                    <div class="flex gap-[.2rem]">
                        <img src="/images/shapelogo.png" alt="" class="w-[.3rem] ">
                        <span class="text-[.2rem] text-blue-900 text-center">Tudos</span>
                    </div>

                    <img src="/images/btn_zc1_jr.png" alt="" class="absolute w-[.5rem] top-0 left-0">
                    <img src="/images/btn_zc1_jr2.png" alt="" class="absolute w-[.5rem] bottom-0 right-0">

                </div>
                <div class="flex flex-col w-full">
                    <div class="flex items-center border rounded-full p-[.1rem] px-[.1rem]">
                        <input
                            class="h-[.3rem] w-full  px-[.2rem] text-[0.22rem]  bg-transparent outline-none text-white"
                            type="text" placeholder="Pesquisa de plataforma" />
                        <img src="/images/search.png" alt="" class="w-[.25rem] h-[.25rem]">
                    </div>
                    <div class="flex flex-col items-center justify-center h-[5rem]">
                        <div class="flex flex-col items-center h-[calc(100vh-2.8rem)] overflow-auto w-full/">
                            <div class="flex flex-col h-full justify-center items-center">
                                <img class="w-[2.5rem]" src="/nodataImages/img_none_jl.png" alt="">
                                <span class="text-[#6FA4EF] text-[.25rem]">Sem Registros</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div> -->

                <div class="flex gap-[.2rem] w-full">
                    <div class="flex flex-col gap-[.2rem] items-center">
                        <div class="h-[calc(100vh-4.81rem)] overflow-auto">
                            <div class="flex flex-col gap-[.2rem]">
                                <div v-for="(transferValue, indexes) in transferData?.content"
                                    @click="transferClick(transferValue.type)" :key=indexes
                                    :class="activeTab == transferValue.type ? `w-[1.5rem] h-[1rem] rounded-[.1rem] bg-amber-100 flex flex-col justify-center items-center relative` : `bg-[#05309F] w-[1.5rem] h-[1rem] rounded-[.1rem] flex flex-col justify-center items-center relative`">
                                    <img :src="`/transferImages/index_` + transferValue.code + `_active.png`" alt=""
                                        class="w-[.5rem] ">
                                    <span
                                        :class="activeTab == transferValue.type ? `text-[.25rem] font-bold leading-none text-[#687079] text-center` : `text-[.25rem] font-bold leading-none  text-[#687079] text-center`">{{
                                            transferValue.name }}</span>
                                    <img src="/images/btn_zc1_jr.png" alt="" class="absolute w-[.5rem] top-0 left-0">
                                    <img src="/images/btn_zc1_jr2.png" alt=""
                                        class="absolute w-[.5rem] bottom-0 right-0">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="flex flex-col w-full h-[calc(100vh-4.81rem)] overflow-auto gap-[.2rem]">
                        <div v-for="(transferGameValue, indexes) in transferGameData?.content" :key=indexes
                            class="flex gap-[.2rem] border border-[#f0c059] p-[.1rem] rounded-[.1rem] bg-[text-[.2rem] bg-[#fff]">
                            <div class="flex w-[1.2rem]">
                                <img :src="`api/` + transferGameValue.imgUrl" alt=""
                                    class="rounded-[.2rem] min-w-[1.2rem] max-w-[1.2rem] h-autos">
                            </div>
                            <div class="flex flex-col w-[1.6rem]">
                                <span class="text-[.25rem] text-[#687079] font-bold break-all">{{
                                    transferGameValue.title }}</span>
                                <span class="text-[.25rem] text-[#687079] font-bold">Balance: <span class="">{{
                                    transferGameValue.balance }}</span></span>
                            </div>
                            <div class="flex flex-col justify-center items-center w-[1.7rem] gap-[.2rem]">
                                <button
                                    class="text-white min-w-full bg-[#f0c059] rounded-[.1rem] p-[.2rem] leading-none text-[.2rem]">Transfer</button>
                                <button
                                    class="text-white min-w-full bg-[#f0c059] rounded-[.1rem] p-[.2rem] leading-none text-[.2rem]">Enter
                                    game</button>
                            </div>
                        </div>
                        <div v-if="transferGameData?.content?.length == 0"
                            class="flex flex-col items-center h-full overflow-auto w-full/">
                            <div class="flex flex-col h-full justify-center items-center">
                                <img class="w-[2.5rem]" src="/nodataImages/img_none_jl.png" alt="">
                                <span class="text-[#6FA4EF] text-[.25rem]">No Data At This Time</span>
                            </div>
                        </div>
                    </div>
                </div>


            </div>
        </div>
    </PageLayout>
</template>
<script setup>
import PageLayout from '@/components/layout/PageLayout.vue';
import { onMounted, ref } from "vue";
import { useMutation } from "@tanstack/vue-query"
import { axiosGet2, axiosPost2 } from '../../components/axios/AxiosHook.js'

const activeTab = ref(2)
const transferData = ref([])
const transferGameData = ref([])
function transferClick(event) {
    activeTab.value = event
    transfer.mutate({
        lan: "en",
        type: event
    })
}

const transferTab = useMutation({
    mutationFn: () => axiosGet2('api/native/v2/tabListsForTrans.do?lan=en'),
    onSuccess: (data) => {
        transferData.value = data
    },
    onError: (error) => {
        console.log(`this error: ${error}`)
    }
})

const transfer = useMutation({
    mutationFn: (payload) => axiosGet2('api/native/v2/getFeeConvertGames.do', payload),
    onSuccess: (data) => {
        transferGameData.value = data
    },
    onError: (error) => {
        console.log(`this error: ${error}`)
    }
})

onMounted(() => {
    transferTab.mutate()
    transfer.mutate({
        lan: "en",
        type: "2"
    })
})

</script>