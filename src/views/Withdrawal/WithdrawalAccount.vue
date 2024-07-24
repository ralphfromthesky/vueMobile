<template>
    <WithdrawLayout>
        <div class="flex flex-col w-full p-[.2rem] gap-[.2rem]">
            <div class="h-[calc(100vh-2.6rem)] w-full">
                <div
                    class="flex justify-center flex-col p-[.2rem] bg-[#05309F] rounded-[.1rem] max-h-[calc(100vh-2.5rem)] gap-[.2rem] w-full">
                    <div class="flex flex-item justify-between">
                        <div class="flex items-center">
                            <span class="text-white text-[.22rem]">Conta de Retirada <span
                                    class="text-[#6FA4EF] text-[.22rem]">(0/4)</span></span>
                        </div>
                        <div class="flex items center gap-[.1rem]" @click="openEye">
                            <img v-if="!eyeOpen" src="/profileImages/eye-slash-1.png" alt=""
                                class="w-[.4rem] h-[.35rem]">
                            <img v-if="eyeOpen" src="/profileImages/eye.png" alt="" class="w-[.4rem] h-[.35rem]">
                            <span class="text-[.22rem] text-[#FFF0BB]">Ocultar</span>
                        </div>
                    </div>
                    <div class="flex flex-col overflow-auto gap-[.2rem] w-full">
                        <div v-for="(bankAccountValue, indexes) in bankAccounts.filter((entry) => entry.bankCode !== 'USDT')"
                            @click="setActiveAccount(indexes)" class="flex w-full items-center">
                            <div
                                :class="activeAccount === indexes?`flex border border-[#FFF0BB] rounded-[.15rem] p-[.2rem] pl-[.1rem] h-[.8rem] relative overflow-hidden w-full`:`flex border border-[#1a68b1] rounded-[.15rem] p-[.2rem] pl-[.1rem] h-[.8rem] relative overflow-hidden w-full`">
                                <div class="flex items-center gap-[.2rem]">
                                    <div class="flex items-center">
                                        <img src="/withdrawImages/bankIcon.png" alt="" class="w-[.6rem]">
                                    </div>
                                    <div class="flex flex-col leading-none gap-[.05rem]">
                                        <span class="text-white text-[.22rem]">{{ bankAccountValue?.realName }} <span
                                                class="text-[#6FA4EF] text-[.22rem]">/ {{ bankAccountValue?.bankName
                                                }}</span></span>
                                        <div class="flex items-center gap-[.1rem]">
                                            <span class="text-[#6FA4EF] text-[.22rem]">{{ eyeOpen ?
                                                bankAccountValue?.cardNo : masAccountNum(bankAccountValue?.cardNo)
                                                }}</span>
                                            <img v-if="eyeOpen" @click="copyText(bankAccountValue?.cardNo)"
                                                src="/copyIcons/Dior_copy.png" alt="" class="w-[.25rem]">
                                        </div>

                                    </div>
                                </div>
                                <div v-if="activeAccount === indexes"
                                    class="flex items-center bg-[#FFF0BB] w-[.6rem] h-[.6rem] absolute -right-[.29rem] -bottom-[.29rem] rotate-[45deg]">
                                    <img src="/images/check.png" class="-rotate-[45deg] w-[.2rem]" alt="">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="flex items-baseline absolute bottom-0 w-full p-[.2rem] bg-[#05309F] rounded-t-[.1rem]">
            <div data-twe-toggle="modal" data-twe-target="#exampleModalCenter" data-twe-ripple-init
                class="flex border border-[#3A61C2] rounded-[.1rem] p-[.2rem] h-[.8rem] relative overflow-hidden w-full">
                <div class="flex items-center gap-[.2rem] w-full">
                    <div class="flex items-center">
                        <img src="/withdrawImages/bankIcon.png" alt="" class="w-[.6rem]">
                    </div>
                    <div class="flex items-center justify-between leading-none w-full">
                        <span class="text-white text-[.22rem]">PIX</span>
                        <div class="flex items-center gap-[.2rem] leading-none">
                            <span class="text-white text-[.22rem]">Adicionar</span>
                            <img src="/images/return.png" alt="" class="w-[.25rem] rotate-180">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </WithdrawLayout>
    <BankCardModal />
</template>
<script setup>
import WithdrawLayout from './components/WithdrawLayout.vue'
import AlertBox from '@/components/ModalComponent/AlertBox.vue';
import { useQuery } from "@tanstack/vue-query";
import { onMounted, ref, watchEffect } from "vue";
import { axiosGet2, axiosPost2, axiosPost3 } from '../../components/axios/AxiosHook.js'
import BankCardModal from './components/BankCardModal.vue';
import { useGetBankAccounts } from '@/global/withdrawBankAccounts';
import { useStore } from "@/store/store.js";


const store = useStore()
const { bankAccount } = useGetBankAccounts()
const bankAccounts = ref([])

watchEffect(() => {
    bankAccounts.value = store.state.withdrawBankAccounts.content
})

const eyeOpen = ref(false)

function openEye() {
    eyeOpen.value = !eyeOpen.value
}

function copyText(text) {
    navigator.clipboard.writeText(text);
    // document.querySelector(".AlertBox").click()
}

function masAccountNum(accNum) {
    return "******" + accNum.slice(6)
}

const activeAccount = ref(0)
function setActiveAccount(data) {
    activeAccount.value = data
}
</script>