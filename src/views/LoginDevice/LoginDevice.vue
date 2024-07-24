<template>
    <PageLayout title="LoginDevice">
        <div class="flex flex-col p-[.2rem]  w-full relative">
            <div class="flex flex-col gap-[.2rem]">
                <div class="flex flex-col gap-[.2rem] p-[.2rem]  bg-[#05309F] w-full rounded-[.1rem]">
                    <div class="flex items-center justify-center">
                        <img src="/images/logo.png" alt="" class="w-.5rem h-[.66rem]" />
                    </div>
                    <div class="flex items-center justify-around">
                        <div class="flex items-center gap-[.1rem]">
                            <span class="text-[#6FA4EF] text-[.22rem]">ID:</span>
                            <span class="text-[.22rem] text-white">448469079</span>
                        </div>
                        <div class="flex gap-[.1rem] items-center">
                            <span class="text-[#6FA4EF] text-[.22rem]">Conta:</span>
                            <span class="text-[.22rem] text-white">nilo26</span>
                        </div>
                    </div>
                </div>
                <div class="flex flex-col bg-[#05309F] w-full rounded-[.1rem]">
                    <div class="flex p-[.2rem]">
                        <span class="text-white text-[.22rem]">Dispositivo atual</span>
                    </div>
                    <div class="bg-[#3A61C2] w-full h-[.01rem]"></div>
                    <div class="flex gap-[.5rem] p-[.2rem]">
                        <div class="w-[1rem]">
                            <div
                                class="flex items-center justify-center w-[.8rem] h-[.8rem] border-[.01rem] rounded-[.1rem]">
                                <img src="/profileImages/icon_TelephoneNumber.png" alt="" class="h-[.45rem]">
                            </div>
                        </div>


                        <div class="flex flex-col gap-[.2rem] w-full">
                            <div class="flex items-center gap-[.8rem] w-full">
                                <div class="w-[2rem] flex justify-end text-center"><span
                                        class="text-[#6FA4EF] text-[.22rem]">Aplicativo</span></div>
                                <div class="w-full "><span class="text-white text-[.22rem]">H5</span></div>
                            </div>
                            <div class="flex items-center gap-[.8rem] w-full">
                                <div class="w-[2rem] flex justify-end text-center"><span
                                        class="text-[#6FA4EF] text-[.22rem]">Versão</span></div>
                                <div class="w-full"><span class="text-white text-[.22rem]">v4.0.415</span></div>
                            </div>
                            <div class="flex items-center gap-[.8rem] w-full">
                                <div class="w-[2rem] flex justify-end text-center"><span
                                        class="text-[#6FA4EF] text-[.22rem]">Tipo de equipamento</span></div>
                                <div class="w-full"><span class="text-white text-[.22rem]">Safari604.1</span></div>
                            </div>
                            <div class="flex items-center gap-[.8rem] w-full">
                                <div class="w-[2rem] flex justify-end text-center"><span
                                        class="text-[#6FA4EF] text-[.22rem]">Sistema</span></div>
                                <div class="w-full"><span class="text-white text-[.22rem]">iOS 16.6</span></div>
                            </div>
                            <div class="flex items-center gap-[.8rem] w-full">
                                <div class="w-[2rem] flex justify-end text-center"><span
                                        class="text-[#6FA4EF] text-[.22rem] text-nowrap">Área IP</span></div>
                                <div class="w-full"><span class="text-white text-[.22rem]">125.252.99.42 Hong Kong/Wan
                                        Chai-Wan Chai</span></div>
                            </div>
                            <div class="flex items-center gap-[.8rem] w-full">
                                <div class="w-[2rem] flex justify-end text-center"><span
                                        class="text-[#6FA4EF] text-[.22rem]">Horário de login</span></div>
                                <div class="w-full"><span class="text-white text-[.22rem]">UTC+-3 2024-07-02
                                        03:03:31</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="fixed bottom-0 bg-[#05309F] h-[1.2rem] w-full left-0 p-[.2rem]">
            <button class="bg-[#FFF0BB] w-full h-[.7rem] rounded-[.1rem] text-[#05309F] text-[.24rem]">Salvar Foto</button>
            </div>
        </div>
    </PageLayout>
</template>
<script setup>
import PageLayout from '@/components/layout/PageLayout.vue';
</script>