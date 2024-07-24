<template>
    <Toast v-if="errorToast" :close="errorToast" :message="msg" @close="errorToast = false"
        class="absolute top-[-1.3rem]" />
    <form @submit.prevent="handleSubmit">
        <div class="flex flex-col w-full">
            <div class="flex items-center justify-center gap-[.1rem]">
                <div class="flex items-center flex-col justify-center w-fit px-[.1rem]">
                    <div class="flex items-center gap-[.1rem]">
                        <img src="/images/1.png" alt="" class="w-[.3rem]" />
                        <span class="text-[.26rem] font-medium text-[#FFF0BB]">Login</span>
                    </div>
                    <div class="w-full bg-[#FFF0BB] p-[.021rem] px-[.62rem] rounded-full mt-[.1rem]"></div>
                </div>
            </div>
            <div class="flex flex-col mt-[.2rem] w-full">
                <div class="flex items-center w-full gap-[.2rem] mb-[.5rem] relative">
                    <div class="flex items-center absolute left-[.15rem] gap-[.05rem]">
                        <img src="/images/My_30X30.png" alt="" class="w-[.3rem]" />
                        <span class="relative top-[.06rem] text-[#FF4A4A]">*</span>
                    </div>
                    <input type="text" placeholder="Nome de Usuário" v-model="userLogin.username"
                        @input="userNameInput = false" :class="{ 'border-2 border-red-500': userNameInput }"
                        class="w-full outline-none bg-transparent text-white border border-[#3a61c2] rounded-[.1rem] p-[.1rem] pl-[.7rem] pr-[.6rem] focus:border-[#FFF0BB] focus:font-bold placeholder:text-[#6FA4EF]" />
                    <div class="flex items-center gap-[.1rem] absolute -bottom-[.3rem]" v-if="userNameInput">
                        <img src="/images/warning.png" alt="." class="w-[.18rem] h-[.184rem] mt-[.03rem]" />
                        <span class="text-[#FF4A4A] text-[.18rem]">4-16 caráter bit, suporte em inglês/números</span>
                    </div>
                </div>
                <div class="flex items-center w-full gap-[.2rem] mb-[.5rem] relative">
                    <div class="flex items-center absolute left-[.15rem] gap-[.05rem]">
                        <img src="/images/30X30.png" alt="" class="w-[.3rem]" />
                        <span class="relative top-[.06rem] text-[#FF4A4A]">*</span>
                    </div>
                    <input :type="showPW ? 'text' : 'password'" placeholder="Senha" v-model="userLogin.password"
                        @input="passwordInput = false" :class="{ 'border-2 border-red-500': passwordInput }"
                        class="w-full outline-none bg-transparent text-white border border-[#3a61c2] rounded-[.1rem] p-[.1rem] pl-[.7rem] pr-[.6rem] focus:border-[#FFF0BB] focus:font-bold placeholder:text-[#6FA4EF]" />
                    <img :src="showPW ? '/eye_30X30.png' : '/eye-slash_30X30.png'" alt=""
                        class="w-[.3rem] absolute right-[.15rem]" @click="showPW = !showPW" />
                    <div class="flex items-center gap-[.1rem] absolute -bottom-[.3rem]" v-if="passwordInput">
                        <img src="/images/warning.png" alt="." class="w-[.18rem] h-[.184rem] mt-[.03rem]" />
                        <span class="text-[#FF4A4A] text-[.18rem]">6-16 caracteres, incluindo pelo menos duas
                            letras/números/símbolos</span>
                    </div>
                </div>
                <div v-if="userConfig?.on_off_mobile_verify_code === 'on' " class="flex items-center w-full gap-[.2rem] mb-[.5rem] relative">
                    <div class="flex items-center absolute left-[.15rem] gap-[.05rem]">
                        <img src="/images/30X30.png" alt="" class="w-[.3rem]" />
                        <span class="relative top-[.06rem] text-[#FF4A4A]">*</span>
                    </div>
                    <input type="text" placeholder="verify Code" v-model="userLogin.verifyCode" @input="verifyInput = false"
                        :class="{ 'border-2 border-[red]': verifyInput }"
                        class="w-full outline-none bg-transparent text-white border border-[#3a61c2] rounded-[.1rem] p-[.1rem] pl-[.7rem] pr-[.6rem] focus:border-[#FFF0BB] focus:font-bold placeholder:text-[#6FA4EF]" />
                    <img :src="loginVerifyCodeUrl" alt="" class="w-[1rem] absolute right-[.15rem] rounded-[.11rem]" />
                    <div class="flex items-center gap-[.1rem] absolute -bottom-[.3rem]" v-if="verifyInput">
                        <img src="/images/warning.png" alt="." class="w-[.18rem] h-[.184rem] mt-[.03rem]" />
                        <span class="text-[#FF4A4A] text-[.18rem]">
                            Type Verification Code!</span>
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
                <button
                    class="w-full bg-[#FFF0BB] border border-[#FFF0BB] text-[.24rem] h-[.7rem] text-[#05309F] rounded-[.14rem]">
                    Login
                </button>
            </div>
            <div class="flex justify-around">
                <span class="text-[#FFF0BB] text-[.22rem]">Suporte</span>
                <span class="text-[#FFF0BB] text-[.22rem]" @click="regGuest">Jogar Grátis</span>
                <span class="text-[#FFF0BB] text-[.22rem]" data-twe-toggle="modal" data-twe-target="#exampleModalCenter2"
                    data-twe-ripple-init>Registra uma Conta</span>
            </div>
        </div>
    </form>
</template>

<script setup>
import Toast from "@/components/ToastComponent/Toast.vue";
import {useGetUserInfo} from '@/global/getUserInfo.js'
import { useStore } from "@/store/store.js";
import { useLogin } from "@/global/loginQuery.js";
import { ref } from "vue";
import {registerGuest} from '@/global/missionEvent.js'
const {guest} = registerGuest()
const isUp = ref(false);
const isRotate = ref(false);
const isLogin = ref(false)
const { userData, query } = useGetUserInfo();
const store = useStore();
const regGuest = () => {
    guest.mutate();
    query.refetch()
}
const userConfig = store.state.userConfig.content

const {
    userLogin,
    mutate,
    data,
    error,
    errorToast,
    msg,
    handleSubmit,
    userNameInput,
    passwordInput,
    verifyInput,
    loginVerifyCodeUrl,
} = useLogin();
</script>