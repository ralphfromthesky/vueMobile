<template>
    <PageLayoutAccountDetails>
        <div class="w-screen h-auto bg-[#1A45B1] p-[.2rem]">
            <div class="w-fullflex  p-[.2rem]">
                <div class="flex gap-[.2rem]">
                    <input
                        class="h-[0.5rem] w-[1.5rem]  rounded-full px-[.2rem] text-[0.2rem] border border-[#A0C5FB] bg-[#05309F]"
                        type="text" placeholder="Hoje" />
                    <input
                        class="h-[0.5rem] w-[2rem] rounded-full px-[.2rem] text-[0.2rem] border border-[#A0C5FB] bg-[#05309F]"
                        type="text" placeholder="Todos os tipos" />
                    <input
                        class="h-[0.5rem] rounded-full px-[.2rem] text-[0.2rem] border border-[#A0C5FB] bg-[#05309F] "
                        type="text" placeholder="Detalhes de Todos os Tipos" />
                </div>
            </div>

            <div class="flex flex-col items-center justify-center h-[10rem]">
                <NoData />
            </div>
        </div>

    </PageLayoutAccountDetails>
</template>
<script setup>
import PageLayoutAccountDetails from '@/components/layout/PageLayoutAccountDetails.vue';
import NoData from '@/components/NoData/NoData.vue';
</script>