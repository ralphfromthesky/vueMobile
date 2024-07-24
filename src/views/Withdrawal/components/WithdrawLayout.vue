<template>
    <main>
        <div class="flex items-center fixed top-0 h-[.9rem] w-full bg-[#05309F] border-b border-b-[#3A61C2]">
            <div class="flex items-center relative w-screen p-[.2rem]">
                <div class="flex items-center bg-[#05309F] w-full">
                    <div class="mr-[.2rem]" @click="this.$router.go(-1)">
                        <img src="/images/return.png" class="w-[.4rem]" alt="">
                    </div>
                    <div class="flex gap-[.7rem] items-center overflow-x-auto text-white">
                        <router-link to="/withdraw">
                            <div class="flex link-content items-center justify-center w-full text-nowrap h-[.9rem]">
                                <span class="text-[.27rem] text-nowrap">Saque</span>
                            </div>
                        </router-link>
                        <router-link to="/withdrawrecord">
                            <div class="flex link-content items-center justify-center w-full text-nowrap h-[.9rem]">
                                <span class="text-[.27rem] text-nowrap">Registro de Saques</span>
                            </div>
                        </router-link>
                        <!-- <router-link to="/auditrecords">
                            <div class="flex link-content items-center justify-center w-full text-nowrap h-[.9rem]">
                                <span class="text-[.27rem] text-nowrap">Registros de Auditoria</span>
                            </div>
                        </router-link> -->
                        <router-link to="/manageaccount" @click="openCards">
                            <div class="flex link-content items-center justify-center w-full text-nowrap h-[.9rem]">
                                <span class="text-[.27rem] text-nowrap">Gerenciar Conta</span>
                            </div>
                        </router-link>
                    </div>
                </div>
            </div>
        </div>
        <div class="flex bg-[#1a45b1]">
            <section class="bg-[#1a45b1] h-[calc(100vh-.9rem)] mt-[.9rem] w-screen overflow-auto">
                <slot></slot>
            </section>
        </div>
    </main>
</template>
<script setup>
import { useGetBankAccounts } from '@/global/withdrawBankAccounts';
import { onMounted, watch, watchEffect } from 'vue';
import { useStore } from "@/store/store.js";
import { useQuery } from '@tanstack/vue-query';
import { axiosGet2 } from '@/components/axios/AxiosHook';

const { bankAccount } = useGetBankAccounts()

const store = useStore()

onMounted(() => {
    useQuery({
        queryKey: ["getWithdrawConfigs"],
        staleTime: 1000,
        enabled: true,
        queryFn: async () => await axiosGet2("/api/native/v2/withdrawConfig.do"),
        select: (data) => {
            store.commit("setWithdrawConfig", data);
            if (data?.content?.bankInfo?.receiptPwd === null) {
                window.location.href = "/withdrawpassword"
            }
        },
        onError: (error) => {
            console.log(`error: ${error}`);
        },
    });

})

function openCards() {
    bankAccount.refetch()
}
</script>
<style scoped>
.router-link-active .link-content {
    border-bottom: 3px solid hsl(47, 100%, 87%);
    color: hsl(47, 100%, 87%);
}
</style>