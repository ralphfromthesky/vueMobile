<template>
    <PageLayout title="Invite">
        <div class="w-screen">
            <div class="flex gap-[.2rem] px-[.2rem] pt-[.2rem]">
                <div
                    class="flex items-center border rounded-full p-[.1rem] px-[.1rem] bg-[#05309F] h-[.5rem] w-[3.2rem]">
                    <input class="h-[.3rem] w-full  px-[.2rem] text-[0.2rem]  bg-transparent outline-none text-white"
                        type="text" placeholder="22/05/2024 - 22/05/2024" />
                </div>
                <div class="flex items-center border rounded-full p-[.1rem] px-[.1rem] bg-[#05309F] h-[.5rem] w-[2rem]">
                    <input class="h-[.3rem] w-full  px-[.2rem] text-[0.2rem]  bg-transparent outline-none text-white"
                        type="text" placeholder="ID de Membro" />
                    <img src="/images/search.png" alt="" class="w-[.25rem] h-[.25rem]">
                </div>
            </div>
            <div class="flex flex-col h-[calc(100vh-4.1rem)] p-[.2rem] overflow-auto">
                <div v-for="(bettingValue, indexes) in BettingData?.content?.rows" :key=indexes
                    class="flex flex-col gap-[.1rem] leading-none p-[.25rem] rounded-[.1rem] odd:bg-[#05309F] relative">
                    <div
                        class="flex items-center bg-[#870000] absolute top-0 left-0 rounded-tl-[.05rem] rounded-br-[.05rem] px-[.1rem] py-[.05rem]">
                        <span class="text-[.15rem] text-white">V{{ bettingValue.level }}</span>
                    </div>
                    <div class="grid grid-cols-2 gap-[.2rem]">
                        <div class="flex flex-col gap-[.1rem]">
                            <div class="flex items-center gap-[.1rem]">
                                <span class="flex items-center text-[#fff] text-[.2rem]">{{ bettingValue.promotionCode ?
                                    bettingValue.promotionCode : "-" }}</span>
                                <span class="flex items-center text-[#fff] text-[.2rem]"><img
                                        src="/copyIcons/Cartier_copy.png" alt="" class="w-[.3rem]"></span>
                            </div>
                            <div class="flex items-center gap-[.1rem]">
                                <span class="flex items-center text-[#fff] text-[.2rem]">Total number of bets {{
                                    bettingValue.totalBetTimes }} (times)</span>
                            </div>
                        </div>
                        <div class="flex flex-col gap-[.1rem] justify-end">
                            <div class="flex items-center gap-[.1rem]">
                                <span class="flex items-center text-[#fff] text-[.2rem]">Profit and Loss</span>
                                <span class="flex items-center text-[#fff] text-[.2rem]">{{ bettingValue.winLostMoney
                                    }}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div v-if="BettingData?.content?.rows?.length == 0"
                    class="flex flex-col items-center h-full overflow-auto w-full/">
                    <div class="flex flex-col h-full justify-center items-center">
                        <img class="w-[2.5rem]" src="/nodataImages/img_none_jl.png" alt="">
                        <span class="text-[#6FA4EF] text-[.25rem]">Sem Registros</span>
                    </div>
                </div>
            </div>
            <div class="flex gap-[.2rem] fixed bottom-0 bg-[#05309F] h-[1.7rem] w-full p-[.2rem] items-center border-t-[.02rem] border-t-[#3a61c2]">
                <div class="flex gap-[.2rem]">
                    <div class="flex flex-col gap-[.1rem] w-fit leading-none">
                        <div class="flex gap-[.5rem] items-center">
                            <div class="flex items-center text-nowrap"><span class="text-[.2rem] text-white">Effective
                                    Bets</span></div>
                        </div>
                        <div class="flex gap-[.5rem] items-center">
                            <div class="flex items-center text-nowrap"><span class="text-[.2rem] text-white">Other
                                    Effective
                                    Bets</span></div>
                        </div>
                        <div class="flex gap-[.5rem] items-center">
                            <div class="flex items-center text-nowrap"><span class="text-[.2rem] text-white">Total
                                    Effective
                                    Bets</span></div>
                        </div>
                    </div>
                    <div class="flex flex-col gap-[.1rem] leading-none">
                        <div class="flex gap-[.5rem] items-center">
                            <div class="flex items-center"><span class="text-[.2rem] text-white">{{ BettingData?.content?.aggsData?.directValidBetNum ? BettingData?.content?.aggsData?.directValidBetNum : 0 }}</span></div>
                        </div>
                        <div class="flex gap-[.5rem] items-center">
                            <div class="flex items-center"><span class="text-[.2rem] text-white">{{ BettingData?.content?.aggsData?.otherBetNum ? BettingData?.content?.aggsData?.otherBetNum : 0 }}</span></div>
                        </div>
                        <div class="flex gap-[.5rem] items-center">
                            <div class="flex items-center"><span class="text-[.2rem] text-white">{{ BettingData?.content?.aggsData?.allBetNum ? BettingData?.content?.aggsData?.allBetNum : 0 }}</span></div>
                        </div>
                    </div>
                </div>
                <div class="flex gap-[.2rem]">
                    <div class="flex flex-col gap-[.1rem] leading-none">
                        <div class="flex gap-[.5rem] items-center">
                            <div class="flex items-center text-nowrap"><span class="text-[.2rem] text-white">Direct
                                    Subordinate Win/Win</span></div>
                        </div>
                        <div class="flex gap-[.5rem] items-center">
                            <div class="flex items-center text-nowrap"><span class="text-[.2rem] text-white">Other
                                    subordinate's winnings</span></div>
                        </div>
                        <div class="flex gap-[.5rem] items-center">
                            <div class="flex items-center text-nowrap"><span class="text-[.2rem] text-white">Total
                                    Win&Lose</span></div>
                        </div>
                    </div>
                    <div class="flex flex-col gap-[.1rem] leading-none">
                        <div class="flex gap-[.5rem] items-center">
                            <div class="flex items-center"><span class="text-[.2rem] text-white">{{ BettingData?.content?.aggsData?.directWinLostMoney ? BettingData?.content?.aggsData?.directWinLostMoney : 0 }}</span></div>
                        </div>
                        <div class="flex gap-[.5rem] items-center">
                            <div class="flex items-center"><span class="text-[.2rem] text-white">{{ BettingData?.content?.aggsData?.otherWinLostMoney ? BettingData?.content?.aggsData?.otherWinLostMoney : 0 }}</span></div>
                        </div>
                        <div class="flex gap-[.5rem] items-center">
                            <div class="flex items-center"><span class="text-[.2rem] text-white">{{ BettingData?.content?.aggsData?.allWinLostMoney ? BettingData?.content?.aggsData?.allWinLostMoney : 0 }}</span></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </PageLayout>
</template>
<script setup>
import PageLayout from '../../components/layout/PageLayoutTab.vue';
import { onMounted, ref } from "vue";
import { useMutation } from "@tanstack/vue-query"
import { axiosGet2, axiosPost2 } from '../../components/axios/AxiosHook.js'

const BettingData = ref([])
const Betting = useMutation({
    mutationFn: (payload) => axiosPost2('api/native/v2/getDirectSubBets.do', payload),
    onSuccess: (data) => {
        BettingData.value = data
    },
    onError: (error) => {
        console.log(`this error: ${error}`)
    }
})
onMounted(() => {
    Betting.mutate({
        startTime: "2024-06-13 00:00:00",
        endTime: "2024-06-13 23:59:59",
        id: "",
        pageSize: "100",
        pageNumber: "1",
        lan: "en"
    })
})
</script>