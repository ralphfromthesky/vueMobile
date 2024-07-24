<template>
    <PageLayout title="Centro de mensagens">
        <div class="flex flex-col p-[.2rem] w-full gap-[.2rem]">
            <!-- do not delete this commented part -->
            <!-- <div class="flex justify-between w-full bg-[#05309F] rounded-[.1rem] p-[.2rem]">
                <div class="flex items-center gap-[.2rem]">
                    <img src="/images/openEnvblue.png" alt="" class="w-[.5rem]">
                    <div class="flex flex-col">
                        <span class="text-white text-[.24rem]">Bonus de Afiliado - Siga a Pagina lnicial</span>
                        <span class="text-[#6FA4EF] text-[.22rem]">19/04/2024 11:00:00</span>
                    </div>
                </div>
                <div class="flex items-center gap-[.2rem]">
                    <span class="text-[#6FA4EF] text-[.25rem]">Lidos</span>
                    <img src="/images/return.png" alt="" class="rotate-180 w-[.3rem]">
                </div>
            </div>
            <div class="flex justify-between w-full bg-[#05309F] rounded-[.1rem] p-[.2rem]">
                <div class="flex items-center gap-[.2rem]">
                    <img src="/images/openEnvblue.png" alt="" class="w-[.5rem]">
                    <div class="flex flex-col">
                        <span class="text-white text-[.24rem]">Bonus de Afiliado - Siga a Pagina lnicial</span>
                        <span class="text-[#6FA4EF] text-[.22rem]">19/04/2024 11:00:00</span>
                    </div>
                </div>
                <div class="flex items-center gap-[.2rem]">
                    <span class="text-[#6FA4EF] text-[.25rem]">Lidos</span>
                    <img src="/images/return.png" alt="" class="rotate-180 w-[.3rem]">
                </div>
            </div> -->
            <!-- do not delete this commented part -->

            <div class="flex flex-col items-center h-[calc(100vh-2.1rem)] justify-center">
                <img class="w-[2.5rem]" src="/supportImages/noMessage.png" alt="">
                <span class="text-[#6FA4EF] text-[.25rem]">Sem Mensagem</span>
            </div>
        </div>
    </PageLayout>
</template>
<script setup>
    import PageLayout from '@/components/layout/MessageCenterLayout.vue';
</script>