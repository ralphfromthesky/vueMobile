<template>
    <main>
        <div class="flex bg-[#1a45b1]">
            <section class="h-screen w-screen overflow-auto my-[1.32rem]">
                <div class="flex items-center justify-center w-full">
                    <slot></slot>
                </div>
            </section>
        </div>
        <BottomNavbar></BottomNavbar>
    </main>
</template>
<script setup>
import BottomNavbar from './Navigation/BottomNavbar.vue'
</script>