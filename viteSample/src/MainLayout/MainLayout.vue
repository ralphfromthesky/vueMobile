<template>
    <div class="flex flex-col">
        <div class="border-2 border-rose-700">
            <Header />
        </div>
        <div class="flex h-[50rem]">
            <div class="border-2 border-[blue] flex-none w-[10rem]">
                <Sidebar />
            </div>
            <div class="border-2 border-[brown] flex-1">
                <!-- <slot></slot> -->
                <!-- <h1>ralph</h1> -->
                <div>
                    <RouterView />
                </div>
     
                <!-- <router-view></router-view> -->

            </div>
        </div>
        <div class="flex border-2 border-[yellow]">
            <Footer />
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'
import Footer from '../MainLayout/Footer.vue'
import Header from '../MainLayout/Header.vue'
import Sidebar from '../MainLayout/Sidebar.vue'
const name = ref('rasfas')


</script>

<style lang="scss" scoped></style>