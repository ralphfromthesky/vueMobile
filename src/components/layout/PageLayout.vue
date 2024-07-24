<template>
    <main>
        <div class="flex items-center fixed top-0 h-[.9rem] w-full bg-[#05309F] border-b border-b-[#3A61C2]">
            <div class="flex items-center relative w-screen p-[.2rem]">
                <div class="absolute" @click="this.$router.go(-1)">
                    <img src="/images/return.png" class="w-[.3rem]" alt="">
                </div>
                <div class="flex justify-center w-full">
                    <span class="text-white text-[.3rem]">{{ props.title }}</span>
                </div>
            </div>
        </div>
        <div class="flex bg-[#1a45b1]">
            <section class="bg-[#1a45b1] h-[calc(100vh-.9rem)] mt-[.9rem] w-screen overflow-auto">
                <div class="flex items-center justify-center w-full">
                    <slot></slot>
                </div>
            </section>
        </div>
    </main>
</template>
<script setup>
const props = defineProps({
    title: { type: String, required: true }
})
</script>