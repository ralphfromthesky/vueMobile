<template>
    <Layout>
        <div class="w-screen px-[.2rem]">
            <div class="flex justify-end px-1 mt-1 items-center">
                <div>
                    <span class="text-white text-[.3rem]">Bonus</span> <span class="text-[#ffaa09]">0,00</span>
                </div>
            </div>

            <!-- <div class="text-white grid grid-cols-5 mt-[.2rem] text-center p-[.2rem] bg-[#05309F]">
                <div>Horario</div>
                <div>Tipos</div>
                <div>Bonus De</div>
                <div>Origem</div>
                <div>Status</div>
            </div> -->
            <!-- <div class="flex justify-center">
                <div
                    class="text-white grid grid-cols-5 mt-[.25rem] text-center p-[.2rem] bg-[#05309F] items-center w-[6.5rem]">
                    <div>2024-5-20</div>
                    <div>Ativida</div>
                    <div>7</div>
                    <div>Eventos</div>
                    <div>
                        <button class="bg-[#3AA929] h-[.5rem] w-[1rem] rounded-[.1rem] border-[none]">receber</button>
                    </div>
                </div>
            </div> -->
            <Table>
                    <Header>
                        <HeaderRow>
                            <HeaderCell>Claim time</HeaderCell>
                            <HeaderCell>name</HeaderCell>
                            <HeaderCell>Bonus</HeaderCell>
                            <HeaderCell>Task</HeaderCell>
                            <HeaderCell>Status</HeaderCell>
                        </HeaderRow>
                    </Header>

                    <Body>
                        <BodyRow v-for="(value, index) in pendingData" :key="index" class="text-white">
            
                            <BodyCell>{{ value.createDatetime }}</BodyCell>
                            <BodyCell>{{ value.actName }}</BodyCell>
                            <BodyCell>{{ value.money }}</BodyCell>
                            <BodyCell> <span class="text-[#FFAA09]">{{ value.income }}</span></BodyCell>
                            <BodyCell> <span class="text-[#FFAA09]">{{ value.incpickStatusme }}</span></BodyCell>
                        </BodyRow>
                    </Body>
                </Table>
            <!-- <div class="w-screen h-screen flex justify-center items-center">
                <NoData />
            </div> -->
        </div>
    </Layout>
</template>

<script setup>
import {onMounted} from 'vue'
import GlobalButton from '@/components/layout/GlobalButton.vue';
import Layout from '../../components/layout/Layout.vue'
// import NoData from '@/components/NoData/NoData.vue';
import Table from '../../components/TableComponent/Table.vue'
import Header from '../../components/TableComponent/TableHead.vue'
import HeaderRow from '../../components/TableComponent/HeaderRow.vue'
import HeaderCell from '../../components/TableComponent/HeaderCell.vue'
import Body from '../../components/TableComponent/TableBody.vue'
import BodyRow from '../../components/TableComponent/BodyRow.vue'
import BodyCell from '../../components/TableComponent/BodyCell.vue'
import { useGetUserInfo } from "@/global/getUserInfo.js";
const { getPending, } = useGetUserInfo();
const { usePending, pendingData, } = getPending();

onMounted(() => {
    usePending.refetch();
});

</script>
