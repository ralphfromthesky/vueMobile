<template>
    <main>
        <div class="flex flex-col items-center fixed top-0 w-full">
            <div
                class="flex items-center relative w-screen h-[.9rem] p-[.2rem] bg-[#05309F] border-b-[.03rem] border-b-[#3A61C2]">
                <div class="absolute" @click="this.$router.go(-1)">
                    <img src="/images/return.png" class="w-[.3rem]" alt="">
                </div>
                <div class="flex justify-center w-full">
                    <span class="text-white text-[.3rem]">{{ props.title }}</span>
                </div>
            </div>
            <TabContainer bg="#05309F">
                <Tabs title="Conta" link="/accountdetails" />
                <Tabs title="Apostas" link="/bettingrecords" />
                <Tabs title="Relatório" link="/accountdetailsrecord" />
            </TabContainer>
        </div>
        <div class="flex bg-[#1a45b1]">
            <section class="bg-[#1a45b1] h-[calc(100vh-1.6rem)] mt-[1.6rem] w-screen overflow-auto">
                <div class="flex items-center justify-center w-full">
                    <slot></slot>
                </div>
            </section>
        </div>
    </main>
</template>
<script setup>
import Tabs from './Tabs/TabPage.vue'
import TabContainer from './Tabs/TabContainer.vue'
const props = defineProps({
    title: { type: String, required: true }
})
</script>
<style scoped>
.router-link-active .link-content {
    border-bottom: 3px solid hsl(47, 100%, 87%);
    color: hsl(47, 100%, 87%);
}
</style>