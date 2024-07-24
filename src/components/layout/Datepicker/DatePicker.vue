<template>
    <div class="w-[4rem] border-[.01rem] border-[#3A61C2] bg-[#05309F] flex items-center gap-[.2rem] rounded-full">
        <div class="w-full relative">
            <div @click="dateOption" class="flex items-center justify-between w-full h-[.5rem] p-[.2rem]">
                <div class="flex items-center gap-[.2rem]">
                    <!-- <img src="/images/bankCardInActive.png" alt="" class="w-[.3rem]"> -->
                    <span class="text-[#A0C5FB] text-[.22rem]">{{ dateName }}</span>
                </div>
                <img src="/images/return.png" alt=""
                    :class="showDate ? `w-[.25rem] rotate-90 transition-all` : `w-[.25rem] -rotate-90 transition-all`">
            </div>
            <div
                :class="showDate ? `transition-all z-10 flex flex-col w-full gap-[.2rem] h-auto border-[.01rem] border-[#3A61C2] bg-[#05309F] left-0 rounded-[.15rem] absolute p-[.2rem] mt-[.1rem]` : `hidden transition-all`">
                <span v-for="(valueData, index) in dates" @click="selectDate(valueData.value, valueData.label)" class="text-white">{{ valueData.label }}</span>
            </div>
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import { dateReducer } from '@/components/functions/Function'
import { useReducer } from 'vue-use-reducer'

const props = defineProps({
    initialDate: "initialDate",
});

const dates = [
    {value: "1", label: "Today"},
    {value: "2", label: "Yesterday"},
    {value: "3", label: "This Week"},
    {value: "4", label: "Last Week"},
    {value: "5", label: "This Month"},
    {value: "6", label: "Last Month"},
]

const showDate = ref(false)
const dateName = ref(dates.filter((entry)=>entry.value === props.initialDate.actionType)[0].label)

function dateOption() {
    showDate.value = !showDate.value
}
const [commonReducer, dispatch] = useReducer(dateReducer, props.initialDate);

function selectDate(value, dateTitle) {
    showDate.value = false
    dateName.value = dateTitle
    dispatch({ type: value, dates: { value: value, label: dateTitle } })
}

</script>