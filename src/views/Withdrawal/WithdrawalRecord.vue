<template>
    <WithdrawLayout>
        <div class="flex flex-col w-full p-[.2rem] gap-[.2rem]">
            <div class="flex w-full justify-between items-center">
                <DatePicker :initialDate="initialMonth" />
                <div class="flex w-full justify-end gap-[.1rem]">
                    <span class="text-[#6FA4EF] text-[.22rem]">Total Withdrawal</span>
                    <span class="text-white text-[.22rem]">{{ userConfig.money_unit }}{{
                        WithdrawRecordData?.content?.aggsData?.totalMoney ? WithdrawRecordData?.content?.aggsData?.totalMoney : "0" }}</span>
                </div>
            </div>
            <div class="flex flex-col h-[calc(100vh-2.09rem)] overflow-auto">
                <div v-for="(withdrawRecordValue, indexes) in WithdrawRecordData?.content?.rows" :key=indexes
                    class="flex flex-col gap-[.1rem] leading-none p-[.25rem] rounded-[.1rem] odd:bg-[#3a61c2] relative">
                    <div class="flex flex-col gap-[.05rem]">
                        <div class="flex justify-between">
                            <span class="text-[.22rem] text-white">Order No</span>
                            <span class="text-[.22rem] text-white">{{ withdrawRecordValue?.recordId }}</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-[.22rem] text-white">Application Amount</span>
                            <span class="text-[.22rem] text-white">{{ withdrawRecordValue?.money }}</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-[.22rem] text-white">Charge fee</span>
                            <span class="text-[.22rem] text-white">{{ withdrawRecordValue?.feeMoney }}</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-[.22rem] text-white">Withdrawal status</span>
                            <span class="text-[.22rem] text-amber-500">{{ withdrawType(withdrawRecordValue?.status)
                                }}</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-[.22rem] text-white">Withdrawal time</span>
                            <span class="text-[.22rem] text-white">{{ withdrawRecordValue?.betdate }} {{
                                withdrawRecordValue?.bettime }}</span>
                        </div>
                        <div class="flex justify-between">
                            <span class="text-[.22rem] text-white">Remark</span>
                            <span class="text-[.22rem] text-white">{{ withdrawRecordValue?.remark ?
                                withdrawRecordValue?.remark : "-" }}</span>
                        </div>
                    </div>
                </div>

                <div v-if="WithdrawRecordData?.content?.rows?.length == 0"
                    class="flex flex-col items-center h-full overflow-auto w-full/">
                    <div class="flex flex-col h-full justify-center items-center">
                        <img class="w-[2.5rem]" src="/nodataImages/img_none_jl.png" alt="">
                        <span class="text-[#6FA4EF] text-[.25rem]">Sem Registros</span>
                    </div>
                </div>
            </div>
        </div>
    </WithdrawLayout>
</template>
<script setup>
    import WithdrawLayout from './components/WithdrawLayout.vue'
    import Table from '../../components/TableComponent/Table.vue'
    import Header from '../../components/TableComponent/TableHead.vue'
    import HeaderRow from '../../components/TableComponent/HeaderRow.vue'
    import HeaderCell from '../../components/TableComponent/HeaderCell.vue'
    import Body from '../../components/TableComponent/TableBody.vue'
    import BodyRow from '../../components/TableComponent/BodyRow.vue'
    import BodyCell from '../../components/TableComponent/BodyCell.vue'
    import { onMounted, ref, watchEffect } from "vue";
    import { useMutation } from "@tanstack/vue-query"
    import { axiosGet2, axiosPost2 } from '../../components/axios/AxiosHook.js'
    import { useStore } from '@/store/store'
    import { dateReducer } from '@/components/functions/Function'
    import { useReducer } from 'vue-use-reducer'
    import { initialDate, initialMonth } from '@/components/functions/Function'
    import DatePicker from '@/components/layout/Datepicker/DatePicker.vue'

    const store = useStore()
    const userConfig = store.state.userConfig.content

    const [commonReducer, dispatch] = useReducer(dateReducer, initialMonth);

    const WithdrawRecordData = ref([])
    const WithdrawRecord = useMutation({
        mutationFn: (payload) => axiosPost2('api/native/v2/tradeRecord.do', payload),
        onSuccess: (data) => {
            WithdrawRecordData.value = data
        },
        onError: (error) => {
            console.log(`this error: ${error}`)
        }
    })


    watchEffect(() => {
        WithdrawRecord.mutate({
            startTime: commonReducer.startDate,
            endTime: commonReducer.endDate,
            queryType: "withdraw",
            pageSize: "50",
            pageNumber: " 1"
        })
    })

    const withdrawType = (type) => {
        if (type === 1) {
            return "In Progress";
        } else if (type === 2) {
            return "Successful";
        } else if (type === 3) {
            return "Failed";
        } else {
            return "Invalid";
        }
    }
</script>