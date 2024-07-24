<template>
    <PageLayout title="Pergunta de Segurança">
        <div class="flex flex-col gap-[.5rem] w-full p-[.2rem]">
            <div class="">
                <span class="text-white text-[.24rem]">Alterar Senha</span>
            </div>
            <div
                class="w-full border-[.01rem] border-[#3A61C2] bg-[#05309F] flex items-center gap-[.2rem] rounded-[.1rem] p-[.2rem] justify-between">

                <div class="flex w-full gap-[.1rem]">
                    <img src="/images/icon_question.png" alt="" class="w-[.3rem]">
                    <input readonly class="text-[#A0C5FB] text-[.22rem] bg-transparent outline-none"
                        placeholder="Quem é o teu pai?" type="text">
                </div>
                <div class="flex">
                    <img class="-rotate-90 w-[.25rem]" src="/images/return.png" alt="">
                </div>

            </div>
            <div
                class="w-full border-[.01rem] border-[#3A61C2] bg-[#05309F] flex items-center gap-[.2rem] rounded-[.1rem] p-[.2rem]">
                <div class="flex w-full gap-[.1rem]">
                    <img src="/images/question_secure.png" alt="" class="w-[.3rem]">
                    <input class="text-[#A0C5FB] text-[.22rem] bg-transparent outline-none"
                        placeholder="Digite a Resposta" type="text">
                </div>
            </div>
            <div
                class="w-full border-[.01rem] border-[#3A61C2] bg-[#05309F] flex items-center gap-[.2rem] rounded-[.1rem] p-[.2rem]">
                <div class="flex w-full gap-[.1rem]">
                    <img src="/images/question_secure.png" alt="" class="w-[.3rem]">
                    <input class="text-[#A0C5FB] text-[.22rem] bg-transparent outline-none"
                        placeholder="Introduza novamente a resposta à pergunta de segurança" type="text">
                </div>
            </div>
        </div>
        <div class="w-full bg-[#05309F] bottom-0 fixed">
            <div class="flex p-[.2rem] items-center justify-center w-full">
                <button
                    className="rounded-[.1rem] h-[.7rem] w-full text-[.24rem] text-center text-[#05309F] border-[#FFF0BB] border bg-[#FFF0BB]">Seguintes</button>
            </div>
        </div>

    </PageLayout>
</template>
<script setup>
import PageLayout from '@/components/layout/PageLayout.vue'
</script>