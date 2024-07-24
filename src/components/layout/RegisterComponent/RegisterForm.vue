<template>
    <Toast v-if="errorToastReg" :close="errorToastReg" :messageReg="msgReg" @closeReg="errorToastReg = false"
        class="absolute top-[-1.3rem]" />
    <form @submit.prevent="handleRegister">
        <div class="flex flex-col w-full">
            <div class="flex items-center justify-center gap-[.1rem]">
                <div class="flex items-center flex-col justify-center w-fit px-[.1rem]">
                    <div class="flex items-center gap-[.1rem]">
                        <!-- <div v-if="getAccountData && getAccountData.length">
                                <div v-for="(data, index) in getAccountData" :key="index" class="text-white">
                                    <input type="text" :name="data.eleName">
                                </div>
                            </div> -->
                        <img src="/images/1.png" alt="" class="w-[.3rem]" />
                        <span class="text-[.26rem] font-medium text-[#FFF0BB]">Register</span>
                    </div>
                    <div class="w-full bg-[#FFF0BB] p-[.021rem] px-[.62rem] rounded-full mt-[.1rem]"></div>
                </div>
            </div>
            <div class="flex flex-col mt-[.2rem] w-full">
                <div v-for="(regConfigData, index) in regConfig" :key=index class="flex flex-col">
                    <div v-if="regConfigData?.eleName === 'rpwd'" class=" flex items-center gap-[.1rem]">
                        <div class="text-white">Forca</div>
                        <div class="flex gap-[.1rem]">
                            <div :class="passwordStrength >= 1 ? 'bg-[#f04646]' : 'bg-[#3A61C2]'"
                                class="h-[.10rem] w-[1rem] rounded">
                            </div>
                            <div :class="passwordStrength >= 2 ? 'bg-[#faee42]' : 'bg-[#3A61C2]'"
                                class="h-[.10rem] w-[1rem] rounded">
                            </div>
                            <div :class="passwordStrength >= 3 ? 'bg-[#fcff43]' : 'bg-[#3A61C2]'"
                                class="h-[.10rem] w-[1rem] rounded">
                            </div>
                            <div :class="passwordStrength >= 4 ? 'bg-[#40ff40]' : 'bg-[#3A61C2]'"
                                class="h-[.10rem] w-[1rem] rounded">
                            </div>
                        </div>
                    </div>
                    <div class="flex items-center w-full gap-[.2rem] my-[.25rem] relative"
                        :class="regConfigData?.eleName === 'rpwd' && `mt-0`">
                        <div class="flex items-center absolute left-[.15rem] gap-[.05rem]">
                            <img :src="`/images/` + regConfigData?.eleName + `.png`" alt="" class="w-[.3rem]" />
                            <span class="relative top-[.06rem] text-[#FF4A4A]">*</span>
                        </div>
                        <input
                            :type="regConfigData?.eleName === 'pwd' || regConfigData?.eleName === 'rpwd' ? `password` : `text`"
                            :placeholder="regConfigData.name" :name="regConfigData.eleName" @change="(e) => handleChange(e)"
                            class="w-full outline-none bg-transparent text-white border border-[#3a61c2] rounded-[.1rem] p-[.1rem] pl-[.7rem] pr-[.6rem] focus:border-[#FFF0BB] focus:font-bold placeholder:text-[#6FA4EF]" />
                        <img v-if="regConfigData?.eleName === 'captcha'" :src="registerCode" alt=""
                            class="w-[1rem] absolute right-[.15rem] rounded-[.11rem]" />
                        <img v-if="regConfigData?.eleName === 'pwd' || regConfigData?.eleName === 'rpwd'"
                            src="/profileImages/eye-1.png" alt="" class="w-[.4rem] absolute right-[.15rem]" />
                        <!-- <div class="flex items-center gap-[.1rem] absolute -bottom-[.3rem]" v-if="regNameInput">
                            <img src="/images/warning.png" alt="." class="w-[.18rem] h-[.184rem] mt-[.03rem]" />
                            <span class="text-[#FF4A4A] text-[.18rem]">4-16 caráter bit, suporte em
                                inglês/números</span>
                        </div> -->
                    </div>
                </div>
            </div>
            <div class="flex justify-between">
                <div class="flex items-center">
                    <input
                        class="relative h-[.3rem] w-[.3rem] rounded-[.02rem] appearance-none border-[.01rem] border-solid border-[#3A61C2] outline-none before:pointer-events-none before:absolute before:h-[0.875rem] before:w-[0.875rem] before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-checkbox before:shadow-transparent before:content-[''] checked:border-[#04BE02] checked:bg-[#04BE02] checked:before:opacity-[0.16] checked:after:absolute checked:after:block checked:after:h-[0.2rem] checked:after:w-[0.1rem] checked:after:ml-[.08rem] checked:after:mt-[.02rem] checked:after:rotate-45 checked:after:border-[0.04rem] checked:after:border-l-0 checked:after:border-t-0 checked:after:border-solid checked:after:border-white checked:after:bg-transparent checked:after:content-[''] hover:cursor-pointer"
                        type="checkbox" value="" id="rememberCheckBox" />
                    <label class="inline-block ps-[0.15rem] hover:cursor-pointer text-white text-[.22rem]"
                        for="rememberCheckBox">
                        Lembrar Senha
                    </label>
                </div>
                <span class="text-[.22rem] text-[#FFF0BB] cursor-pointer">Esqueceu a Senha?</span>
            </div>
            <div class="flex w-full my-[.2rem]">
                <button @click="register"
                    class="w-full bg-[#FFF0BB] border border-[#FFF0BB] text-[.24rem] h-[.7rem] text-[#05309F] rounded-[.14rem]">
                    Login
                </button>
            </div>
            <div class="flex justify-around">
                <span class="text-[#FFF0BB] text-[.22rem]">Suporte</span>
                <span class="text-[#FFF0BB] text-[.22rem]" @click="regGuest">Jogar Grátis</span>
                <span class="text-[#FFF0BB] text-[.22rem]" data-twe-toggle="modal" data-twe-target="#exampleModalCenter"
                    data-twe-ripple-init>Login uma Conta</span>
            </div>
        </div>
    </form>
</template>
<script setup>
import Toast from "@/components/ToastComponent/Toast.vue";
import { useRegister } from "@/global/registerQuery.js";
import {useGetUserInfo} from '@/global/getUserInfo.js'
const {query } = useGetUserInfo();

import { useStore } from "@/store/store.js";
import { onMounted, ref, watchEffect } from 'vue';
import { useGetGlobalConfigInfo } from "@/global/globalConfigInformation.js";
import {registerGuest} from '@/global/missionEvent.js'
const {guest} = registerGuest()
const regGuest = () => {
    guest.mutate();
    query.refetch()
}
const store = useStore()

const regConfig = ref([])
const { registration } = useGetGlobalConfigInfo()
const { registerCode } = useGetGlobalConfigInfo()

var formData = {}

watchEffect(() => {
    regConfig.value = store.state.registerConfig.content
})

function handleChange(e) {
    formData = ({ ...formData, [e.target.name]: e.target.value })
}

function register() {
    registration.mutate(formData)
}
</script>