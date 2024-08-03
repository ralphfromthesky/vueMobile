<template>
    <div class="flex items-center bg-[#032B92] w-full h-[1.32rem] fixed bottom-0 p-[.2rem]">
        <div class="grid grid-cols-5 gap-[.5rem] justify-between w-full">
            <router-link to="/">
                <div class="flex flex-col items-center">
                    <!-- <div class="w-[.55rem] h-[.55rem] bg-[#1A45B1] rounded-[.1rem]"></div> -->
                    <img src="/bottomNavImages/1.png" alt="" class="w-[.6rem]">
                    <div class="text-[#6FA4EF] text-[.25rem]">Home</div>
                </div>
            </router-link>
            <router-link to="/event">
                <div class="flex flex-col items-center">
                    <!-- <div class="w-[.55rem] h-[.55rem] bg-[#1A45B1] rounded-[.1rem]"></div> -->
                    <img src="/bottomNavImages/3.png" alt="" class="w-[.6rem]">
                    <div class="text-[#6FA4EF] text-[.25rem]">Promotion</div>
                </div>
            </router-link>
            <div class="flex flex-col items-center" data-twe-toggle="modal" data-twe-target="#exampleModalCenter"
                data-twe-ripple-init v-if="!store.state.userInfo.isLogin">
                <!-- <div class="w-[.55rem] h-[.55rem] bg-[#1A45B1] rounded-[.1rem]"></div> -->
                <img src="/bottomNavImages/12.png" alt="" class="w-[.6rem]">
                <div class="text-[#6FA4EF] text-[.25rem]">Login</div>
            </div>
            <div class="flex flex-col items-center" @click="showDeposit" v-if="store.state.userInfo.isLogin">
                <!-- <div class="w-[.55rem] h-[.55rem] bg-[#1A45B1] rounded-[.1rem]"></div> -->
                <img src="/bottomNavImages/9.png" alt="" class="w-[.6rem]">
                <div class="text-[#6FA4EF] text-[.25rem]">Deposit</div>
            </div>
            <router-link to="/withdraw" v-if="store.state.userInfo.isLogin">
                <div class="flex flex-col items-center">
                    <!-- <div class="w-[.55rem] h-[.55rem] bg-[#1A45B1] rounded-[.1rem]"></div> -->
                    <img src="/bottomNavImages/10.png" alt="" class="w-[.6rem]">
                    <div class="text-[#6FA4EF] text-[.25rem]">Saque</div>
                </div>
            </router-link>
            <router-link to="/support" v-if="!store.state.userInfo.isLogin">
                <div class="flex flex-col items-center">
                    <!-- <div class="w-[.55rem] h-[.55rem] bg-[#1A45B1] rounded-[.1rem]"></div> -->
                    <img src="/bottomNavImages/15.png" alt="" class="w-[.6rem]">
                    <div class="text-[#6FA4EF] text-[.25rem]">Help</div>
                </div>
            </router-link>
            <div v-if="!store.state.userInfo.isLogin" class="flex flex-col items-center" @click="loginModal = !loginModal">
                <!-- <div class="w-[.55rem] h-[.55rem] bg-[#1A45B1] rounded-[.1rem]"></div> -->
                <img src="/bottomNavImages/5.png" alt="" class="w-[.6rem]">
                <div class="text-[#6FA4EF] text-[.25rem]">My</div>
            </div>
            <router-link v-if="store.state.userInfo.isLogin" to="/menu">
                <div class="flex flex-col items-center">
                    <!-- <div class="w-[.55rem] h-[.55rem] bg-[#1A45B1] rounded-[.1rem]"></div> -->
                    <img src="/bottomNavImages/5.png" alt="" class="w-[.6rem]">
                    <div class="text-[#6FA4EF] text-[.25rem]">My</div>
                </div>
            </router-link>
        </div>
    </div>
    <AntModal :isOpen="loginModal" :componentPass=Login :backGrounds=true />
    <div v-if="isLogin" class="w-screen h-screen bg-[#000000b3] fixed top-0 z-20">
        <div v-if="isLogin" class="flex flex-col slide-in-bottom absolute top-0 right-0 ease-in-out">
            <Deposit @close="closeDeposit" />
        </div>
    </div>
</template>

<script setup>
import { onMounted, ref, watchEffect } from 'vue'
import Deposit from '@/components/deposit/Deposit.vue';
import { useStore } from '@/store/store.js'
import Modal from '../../../components/ModalComponent/Modal.vue'
import Login from "../LoginComponent/LoginForm.vue";
const loginModal = ref(false)
const store = useStore()


const isLogin = ref(false)

const showDeposit = () => {
    isLogin.value = !isLogin.value
}
const closeDeposit = () => {
    isLogin.value = false;
    // hideThis()
}

</script>

<style>
.slide-in-bottom {
    -webkit-animation: slide-in-bottom 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
    animation: slide-in-bottom 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
}

@keyframes slide-in-bottom {
    0% {
        -webkit-transform: translateY(1000px);
        transform: translateY(1000px);
        opacity: 0;
    }

    100% {
        -webkit-transform: translateY(0);
        transform: translateY(0);
        opacity: 1;
    }
}
</style>
