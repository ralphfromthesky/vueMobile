<template>
    <PageLayout title="Google Authenticator">
        <div class="flex flex-col gap-[.5rem] w-full p-[.2rem]">
            <div class="">
                <span class="text-white text-[.24rem]">Vincular o e-mail</span>
            </div>
            <div class="flex flex-col gap-[.2rem]">
                <span class="text-white text-[.2rem]">Passo 1: Transferir o Autenticador do Google</span>

                <div class="w-full border-b-[.01rem] border-b-[#3A61C2] flex items-center gap-[.2rem]">
                    <span class="text-[.18rem] text-[#6FA4EF] mb-[.2rem]">Pesquise "Google Authenticator" ou "Google
                        Authenticator"
                        em
                        cada loja de aplicativos para baixar o aplicativo</span>
                </div>
            </div>

            <div class="flex flex-col gap-[.2rem]">
                <div class="">
                    <span class="text-white text-[.2rem]">Passo 2: Abra a aplicação do Autenticador e adicione um código
                        QR</span>
                </div>
                <div class="flex items-center justify-center p-[.2rem]">
                    <img src="/profileImages/googleqr.png" alt="" class="w-[3rem]">
                </div>

                <div class="flex items-center justify-center w-full border-b-[.01rem] border-b-[#3A61C2]">
                    <span class="text-[#FFF0BB] text-[.18rem] mb-[.2rem]">Não é possível fazer a leitura, introduza a
                        chave</span>
                </div>
                <div class="flex items-center justify-center">
                    <span class="text-white text-[.2rem]">
                        Passo 3: Introduza o número de seis dígitos na aplicação do Autenticador para verificar
                    </span>
                </div>

                <div
                    class="w-full border-[.01rem] border-[#3A61C2] bg-[#05309F] flex items-center gap-[.2rem] rounded-[.1rem] p-[.2rem] justify-between">
                    <div class="flex items-center gap-[.1rem]">
                        <img class="w-[.3rem]" src="/profileImages/icon_GoogleAuthenticator.png" alt="">
                        <input placeholder="Insira o código de verificação do Google"
                            class="text-[.22rem] text-[#6FA4EF] h-full w-full bg-transparent outline-none "></input>
                    </div>
                    <div class="flex items-center gap-[.1rem]">
                        <span class="text-[.18rem] text-[#FFF0BB]">Colar</span>
                    </div>
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
import PageLayout from '@/components/layout/PageLayout.vue';
</script>