<template>
    <PageLayout title="Centro de Segurança">
        <div class="flex flex-col gap-[.2rem] p-[.2rem] w-full">
            <div class="w-full bg-[#05309F] flex flex-col px-[.2rem] rounded-[.1rem]">
                <div class="w-full flex items-center justify-between border-b-[.01rem] border-[#3A61C2] py-[.2rem]">
                    <div class="flex items-center gap-[.1rem]">
                        <img class="w-[.3rem]" src="/images/03395d.png" alt="">
                        <span class="text-white text-[.22rem]">Nome de Usuário</span>
                    </div>
                    <div class="flex items-center">
                        <span class="text-[.22rem] text-[#6FA4EF]">{{ store.state.userInfo.username }}</span>
                    </div>
                </div>
                <div class="w-full flex items-center justify-between border-b-[.01rem] border-[#3A61C2] py-[.2rem]">
                    <div class="flex items-center gap-[.1rem]">
                        <img class="w-[.3rem]" src="/profileImages/icon_TelephoneNumber.png" alt="">
                        <span class="text-white text-[.22rem]">Nº de Telefone</span>
                    </div>
                    <div class="flex items-center">
                        <span class="text-[.22rem] text-[#6FA4EF]">{{store.state.userProfile.userData.phone ? '' : 'No Phone'}}</span>
                    </div>
                </div>
                <router-link to="/securityemail">
                    <div class="w-full flex items-center justify-between border-b-[.01rem] border-[#3A61C2] py-[.2rem]">
                        <div class="flex items-center gap-[.1rem]">
                            <img class="w-[.3rem]" src="/profileImages/icon_Gmail.png" alt="">
                            <span class="text-white text-[.22rem]">Endereço de e-mail</span>
                        </div>
                        <div class="flex items-center gap-[.1rem]">
                            <span class="text-[.22rem] text-[#6FA4EF]">{{store.state.userProfile.userData.email}}</span>
                            <img class="rotate-180 w-[.25rem]" src="/images/return.png" alt="">
                        </div>
                    </div>
                </router-link>
                <router-link to="/googleauthenticator">
                    <div class="w-full flex items-center justify-between py-[.2rem]">
                        <div class="flex items-center gap-[.1rem]">
                            <img class="w-[.3rem]" src="/profileImages/icon_GoogleAuthenticator.png" alt="">
                            <span class="text-white text-[.22rem]">Google Authenticator</span>
                        </div>
                        <div class="flex items-center gap-[.1rem]">
                            <span class="text-[.22rem] text-[#6FA4EF]">Desvincular</span>
                            <img class="rotate-180 w-[.25rem]" src="/images/return.png" alt="">
                        </div>
                    </div>
                </router-link>
            </div>

            <div class="w-full bg-[#05309F] flex flex-col px-[.2rem] rounded-[.1rem]">
                <router-link to="loginpassword">
                    <div class="w-full flex items-center justify-between border-b-[.01rem] border-[#3A61C2] py-[.2rem]">
                        <div class="flex items-center gap-[.1rem]">
                            <img class="w-[.3rem]" src="/profileImages/icon_LoginPassword.png" alt="">
                            <span class="text-white text-[.22rem]">Senha de Login</span>
                        </div>
                        <div class="flex items-center gap-[.1rem]">
                            <img class="rotate-180 w-[.25rem]" src="/images/return.png" alt="">
                        </div>
                    </div>
                </router-link>


                <router-link to="/withdrawpassword">
                    <div class="w-full flex items-center justify-between border-b-[.01rem] border-[#3A61C2] py-[.2rem]">
                        <div class="flex items-center gap-[.1rem]">
                            <img class="w-[.3rem]" src="/profileImages/icon_WithdrawPassword.png" alt="">
                            <span class="text-white text-[.22rem]">Senha de Saque</span>
                        </div>
                        <div class="flex items-center gap-[.1rem]">
                            <span class="text-[.22rem] text-[#6FA4EF]">não configurado</span>
                            <img class="rotate-180 w-[.25rem]" src="/images/return.png" alt="">
                        </div>
                    </div>
                </router-link>
                
                <!-- <router-link to="securityquestion">
                    <div class="w-full flex items-center justify-between py-[.2rem]">
                        <div class="flex items-center gap-[.1rem]">
                            <img class="w-[.3rem]" src="/profileImages/icon_question.png" alt="">
                            <span class="text-white text-[.22rem]">Pergunta de Segurança</span>
                        </div>
                        <div class="flex items-center gap-[.1rem]">
                            <span class="text-[.22rem] text-[#6FA4EF]">não configurado</span>
                            <img class="rotate-180 w-[.25rem]" src="/images/return.png" alt="">
                        </div>
                    </div>
                </router-link> -->


            </div>

            <div class="w-full bg-[#05309F] flex flex-col px-[.2rem] rounded-[.1rem]">
                <div class="w-full flex items-center justify-between py-[.2rem]">
                    <div class="flex items-center gap-[.1rem]">
                        <img class="w-[.3rem]" src="/profileImages/icon_tripartite.png" alt="">
                        <span class="text-white text-[.22rem]">Vincular Login de Terceiros</span>
                    </div>
                    <div class="flex items-center gap-[.1rem]">
                        <span class="text-[.22rem] text-[#6FA4EF]">não configurado</span>
                    </div>
                </div>
            </div>

        </div>

    </PageLayout>
</template>
<script setup>
import PageLayout from '@/components/layout/PageLayout.vue';
import store from '@/store/store';
</script>