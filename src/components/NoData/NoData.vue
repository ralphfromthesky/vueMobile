<template>
    <div class="text-white">
        <div class="flex flex-col items-center">
            <img src="/exclamation-mark-v4.png" class="w-[2.1rem] h-[2.1rem]">
            <span>
                <h1 class="text-[#6fa4ef]">{{ title }}</h1>
            </span>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    title: {type: String, default: 'No Data'}
})
</script>

<style lang="scss" scoped></style>