<template>
   <PageLayout>
        <div class="w-screen p-[.2rem]">
            <div class="flex gap-[.2rem] mb-[.2rem]">
                <div
                    class="flex items-center border rounded-full p-[.1rem] px-[.1rem] bg-[#05309F] h-[.5rem] w-[3.2rem]">
                    <input class="h-[.3rem] w-full  px-[.2rem] text-[0.22rem]  bg-transparent outline-none text-white"
                        type="text" placeholder="22/05/2024 - 22/05/2024" />
                </div>
                <div class="flex items-center border rounded-full p-[.1rem] px-[.1rem] bg-[#05309F] h-[.5rem] w-[2rem]">
                    <input class="h-[.3rem] w-full  px-[.2rem] text-[0.22rem]  bg-transparent outline-none text-white"
                        type="text" placeholder="Introduza o ID de Membro" />
                    <img src="/images/search.png" alt="" class="w-[.25rem] h-[.25rem]">
                </div>
            </div>
            <div class="flex flex-col overflow-auto h-[calc(100vh-2.8rem)]">
                <div class="flex flex-col items-center h-[calc(100vh-2.1rem)] justify-center">
                    <img class="w-[2.5rem]" src="/supportImages/noMessage.png" alt="">
                    <span class="text-[#6FA4EF] text-[.25rem]">Sem Mensagem</span>
                </div>
            </div>
        </div>
    </PageLayout>
</template>
<script setup>
import PageLayout from '../../components/layout/PageLayoutTab.vue';
</script>