<template>
    <PageLayout title="Invite">
        <div class="bg-[#1A45B1] w-screen h-auto">

            <div class="flex gap-[.2rem] mb-[.2rem] w-full h-[calc(100vh-2.1rem)] p-[.2rem]">
                <div class="flex flex-col gap-[.2rem] items-center h-[calc(100vh-2.1rem)]">
                    <div class="h-[calc(100vh-2.1rem)] overflow-auto">
                        <div class="flex flex-col gap-[.2rem]">
                            <div @click="commissionClick(2)"
                                :class="activeTab == 2 ? `w-[1.5rem] h-[1rem] rounded-[.1rem] bg-amber-100 flex flex-col justify-center items-center relative` : `bg-[#05309F] w-[1.5rem] h-[1rem] rounded-[.1rem] flex flex-col justify-center items-center relative`">
                                <img src="/commissionImages/dianzi_tab_icon_active.png" alt="" class="w-[.5rem] ">
                                <span
                                    :class="activeTab == 2 ? `text-[.2rem] text-blue-900 text-center` : `text-[.2rem] text-[#A0C5FB] text-center`">egame</span>
                                <img src="/images/btn_zc1_jr.png" alt="" class="absolute w-[.5rem] top-0 left-0">
                                <img src="/images/btn_zc1_jr2.png" alt="" class="absolute w-[.5rem] bottom-0 right-0">
                            </div>
                            <div @click="commissionClick(4)"
                                :class="activeTab == 4 ? `w-[1.5rem] h-[1rem] rounded-[.1rem] bg-amber-100 flex flex-col justify-center items-center relative` : `bg-[#05309F] w-[1.5rem] h-[1rem] rounded-[.1rem] flex flex-col justify-center items-center relative`">
                                <img src="/commissionImages/duyu_tab_icon_active.png" alt="" class="w-[.5rem] ">
                                <span
                                    :class="activeTab == 4 ? `text-[.2rem] text-blue-900 text-center` : `text-[.2rem] text-[#A0C5FB] text-center`">fishing</span>
                                <img src="/images/btn_zc1_jr.png" alt="" class="absolute w-[.5rem] top-0 left-0">
                                <img src="/images/btn_zc1_jr2.png" alt="" class="absolute w-[.5rem] bottom-0 right-0">
                            </div>
                            <div @click="commissionClick(6)"
                                :class="activeTab == 6 ? `w-[1.5rem] h-[1rem] rounded-[.1rem] bg-amber-100 flex flex-col justify-center items-center relative` : `bg-[#05309F] w-[1.5rem] h-[1rem] rounded-[.1rem] flex flex-col justify-center items-center relative`">
                                <img src=" /commissionImages/sport_tab_icon_active.png" alt="" class="w-[.5rem] ">
                                <span
                                    :class="activeTab == 6 ? `text-[.2rem] text-blue-900 text-center` : `text-[.2rem] text-[#A0C5FB] text-center`">sport</span>
                                <img src="/images/btn_zc1_jr.png" alt="" class="absolute w-[.5rem] top-0 left-0">
                                <img src="/images/btn_zc1_jr2.png" alt="" class="absolute w-[.5rem] bottom-0 right-0">
                            </div>
                            <div @click="commissionClick(1)"
                                :class="activeTab == 1 ? `w-[1.5rem] h-[1rem] rounded-[.1rem] bg-amber-100 flex flex-col justify-center items-center relative` : `bg-[#05309F] w-[1.5rem] h-[1rem] rounded-[.1rem] flex flex-col justify-center items-center relative`">
                                <img src=" /commissionImages/real_tab_icon_active.png" alt="" class="w-[.5rem] ">
                                <span
                                    :class="activeTab == 1 ? `text-[.2rem] text-blue-900 text-center` : `text-[.2rem] text-[#A0C5FB] text-center`">live</span>
                                <img src="/images/btn_zc1_jr.png" alt="" class="absolute w-[.5rem] top-0 left-0">
                                <img src="/images/btn_zc1_jr2.png" alt="" class="absolute w-[.5rem] bottom-0 right-0">
                            </div>
                            <div @click="commissionClick(7)"
                                :class="activeTab == 7 ? `w-[1.5rem] h-[1rem] rounded-[.1rem] bg-amber-100 flex flex-col justify-center items-center relative` : `bg-[#05309F] w-[1.5rem] h-[1rem] rounded-[.1rem] flex flex-col justify-center items-center relative`">
                                <img src=" /commissionImages/official_tab_icon_active.png" alt="" class="w-[.5rem] ">
                                <span
                                    :class="activeTab == 7 ? `text-[.2rem] text-blue-900 text-center` : `text-[.2rem] text-[#A0C5FB] text-center`">lottery</span>
                                <img src="/images/btn_zc1_jr.png" alt="" class="absolute w-[.5rem] top-0 left-0">
                                <img src="/images/btn_zc1_jr2.png" alt="" class="absolute w-[.5rem] bottom-0 right-0">
                            </div>
                        </div>
                    </div>
                </div>
                <div class="flex flex-col w-full h-[calc(100vh-2.1rem)] overflow-auto">
                    <Table>
                        <Header>
                            <HeaderRow>
                                <HeaderCell>
                                    <div class="flex items-center gap-[.1rem]">
                                        <span
                                            class="text-white text-[0.24rem] text-center  flex items-center justify-center">Válidos</span>
                                        <img src="/images/question1.png" alt="" class="w-[.2rem] h-[.2rem] ">
                                    </div>
                                </HeaderCell>
                                <HeaderCell>
                                    <div class="flex flex-col">
                                        <span class="text-white text-[0.24rem] text-center">Desempenho</span>
                                        <span class="text-[#A0C5FB] text-[0.2rem] text-center">(Unid:
                                            10,000)</span>
                                    </div>
                                </HeaderCell>
                                <HeaderCell>
                                    Comissão por 10,000
                                </HeaderCell>
                            </HeaderRow>
                        </Header>

                        <Body>
                            <BodyRow v-for="(commissionValue, indexes) in commissionData.content" :key=indexes>
                                <BodyCell>{{ indexes + 1 }}</BodyCell>
                                <BodyCell>{{ commissionValue.minBet * 100 }}</BodyCell>
                                <BodyCell> <span class="text-[#FFAA09]">0.3%</span></BodyCell>
                            </BodyRow>
                        </Body>
                    </Table>

                    <!-- <div class="flex flex-col items-center h-full justify-center">
                        <img class="w-[2.5rem]" src="/images/noRecord.png" alt="">
                        <span class="text-[#6FA4EF] text-[.25rem]">Sem Registros</span>
                    </div> -->
                </div>

            </div>


        </div>




    </PageLayout>
</template>
<script setup>
import PageLayout from '../../components/layout/PageLayoutTab.vue';
import Table from '../../components/TableComponent/Table.vue'
import Header from '../../components/TableComponent/TableHead.vue'
import HeaderRow from '../../components/TableComponent/HeaderRow.vue'
import HeaderCell from '../../components/TableComponent/HeaderCell.vue'
import Body from '../../components/TableComponent/TableBody.vue'
import BodyRow from '../../components/TableComponent/BodyRow.vue'
import BodyCell from '../../components/TableComponent/BodyCell.vue'
import { onMounted, ref } from "vue";
import { useMutation } from "@tanstack/vue-query"
import { axiosGet2, axiosPost2 } from '../../components/axios/AxiosHook.js'

const activeTab = ref(2)
const commissionData = ref([])
function commissionClick(event) {
    activeTab.value = event
    commission.mutate({ platform: event })
}

const commission = useMutation({
    mutationFn: (payload) => axiosPost2('api/native/v2/getTeamProxyRebateStrategy.do', payload),
    onSuccess: (data) => {
        commissionData.value = data
    },
    onError: (error) => {
        console.log(`this error: ${error}`)
    }
})
onMounted(() => {
    commission.mutate({ platform: 2 })
})
</script>
