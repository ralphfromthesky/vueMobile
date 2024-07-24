<template>
    <PageLayout title="Senha de Saque">
        <div class="bg-[#1a45b1] w-screen">
            <div class="p-[.2rem]">
                <div class="flex flex-col  space-y-[.3rem] my-[.3rem]">
                    <div class="flex justify-center w-full">
                        <span class="text-[.22rem] text-[#04BE02] text-center">É o seu primeiro saque. Você precisa
                            configurar uma senha de saque</span>
                    </div>
                    <div class="flex w-full">
                        <span class="text-[.3rem] text-white">Defina sua senha de saque</span>
                    </div>
                </div>
                <div class="flex flex-col gap-[.4rem]">
                    <div v-if="withdrawConfig?.receiptPwd !== null" class="flex flex-col gap-[.1rem]">
                        <div class="flex justify-between">
                            <span class="text-[.22rem] text-white">Enter Old Password</span>
                            <img src="/images/eye.png" class="w-[.4rem] h-[.36rem]" alt="">
                            <!-- <img v-if="viewPassValue" @click="viewPass" src="/profileImages/eye.png" class="w-[.4rem]">
                            <img v-if="!viewPassValue" @click="viewPass" src="/profileImages/eye-slash-1.png"
                                class="w-[.4rem]"> -->

                        </div>
                        <VOtpInput tabindex="1" ref="otpInput" input-classes="otpInputs !text-[.7rem] caret-transparent"
                            :conditionalClass="['one', 'two', 'three', 'four', 'five', 'six']" separator=""
                            inputmode="numeric" input-type="password" :num-inputs="6" v-model:value="opwd"
                            :should-auto-focus="false" :should-focus-order="true" @on-change="getOldPassword"
                            @on-complete="handleOnComplete" />
                        <!-- <VOtpInput v-if="viewPassValue" tabindex="1" ref="otpInput"
                            input-classes="otpInputs disabled:cursor-no-drop caret-transparent"
                            :conditionalClass="['one', 'two', 'three', 'four', 'five', 'six']" separator=""
                            inputmode="numeric" input-type="letter-numeric" :num-inputs="6"
                            v-model:value="opwd" :should-auto-focus="false" :should-focus-order="true"
                            @on-change="getOldPassword" :is-disabled="!userBankValue?.content?.length > 0"
                            @on-complete="handleOnComplete" />
                        <VOtpInput v-if="!viewPassValue" tabindex="1" ref="otpInput"
                            input-classes="otpInputs disabled:cursor-no-drop  !text-[.8rem] caret-transparent"
                            :conditionalClass="['one', 'two', 'three', 'four', 'five', 'six']" separator=""
                            inputmode="numeric" input-type="password" :num-inputs="6" v-model:value="opwd"
                            :should-auto-focus="false" :should-focus-order="true" @on-change="getOldPassword"
                            :is-disabled="!userBankValue?.content?.length > 0" @on-complete="handleOnComplete" /> -->
                    </div>
                    <div class="flex flex-col gap-[.1rem]">
                        <div class="flex justify-between">
                            <span class="text-[.22rem] text-white">Nova Senha de Saque</span>
                            <img src="/images/eye.png" class="w-[.4rem] h-[.36rem]" alt="">
                        </div>
                        <VOtpInput tabindex="1" ref="otpInput" input-classes="otpInputs !text-[.7rem] caret-transparent"
                            :conditionalClass="['one', 'two', 'three', 'four', 'five', 'six']" separator=""
                            inputmode="numeric" input-type="password" :num-inputs="6" v-model:value="pwd"
                            :should-auto-focus="false" :should-focus-order="true" @on-change="getPassword"
                            @on-complete="handleOnComplete" />
                    </div>
                    <div class="flex flex-col gap-[.1rem]">
                        <div class="flex justify-between">
                            <span class="text-[.22rem] text-white">Nova Senha de Saque</span>
                            <img src="/images/eye.png" class="w-[.4rem] h-[.36rem]" alt="">
                        </div>
                        <VOtpInput tabindex="2" ref="otpInput" input-classes="otpInputs !text-[.7rem] caret-transparent"
                            :conditionalClass="['one', 'two', 'three', 'four', 'five', 'six']" separator=""
                            inputmode="numeric" input-type="password" :num-inputs="6" v-model:value="confirmPwd"
                            :should-auto-focus="false" :should-focus-order="true" @on-change="confirmPassword"
                            @on-complete="handleOnComplete" />
                    </div>
                </div>
                <div class="mt-[.3rem] leading-[1.1]">
                    <span class="text-[.22rem] text-[#FFAA09]">Atenção: A senha de saque protege seus fundos e é
                        extremamente importante. Mantenha-a em segredo para evitar qualquer perda financeira.</span>
                </div>
            </div>
            <div class="flex items-center justify-center fixed bottom-0 p-[.2rem] w-full bg-[#05309F]">
                <button @click="setWithdrawPassword"
                    class="w-[6rem] h-[.7rem] bg-[#FFF0BB] border-[#FFF0BB] text-[#05309F] rounded-[.15rem]">Confirmar</button>
            </div>
        </div>
    </PageLayout>
</template>
<script setup>
import { useGetGlobalConfigInfo } from "@/global/globalConfigInformation";
import PageLayout from "../../../components/layout/PageLayout.vue";
import { useStore } from "@/store/store.js";
import { ref } from "vue";
import VOtpInput from "vue3-otp-input";

const { withdrawPassword } = useGetGlobalConfigInfo()
const store = useStore()

const withdrawConfig = store.state.withdrawConfig.content.bankInfo

const pwd = ref('')
const confirmPwd = ref('')
const opwd = ref('')

const getPassword = (value) => {
    pwd.value = value
};
const confirmPassword = (value) => {
    confirmPwd.value = value
};
const getOldPassword = (value) => {
    opwd.value = value
};

// const viewPassValue1 = ref(false)
// function viewPass1() {
//     viewPassValue1.value = !viewPassValue1.value
// }
// const viewPassValue2 = ref(false)
// function viewPass2() {
//     viewPassValue2.value = !viewPassValue2.value
// }
// const viewPassValue3 = ref(false)
// function viewPass3() {
//     viewPassValue3.value = !viewPassValue3.value
// }

function setWithdrawPassword() {
    if (pwd.value === '' || confirmPwd.value === '' || (withdrawConfig?.receiptPwd !== null && opwd.value === '')) {
        console.log("Password cannot be empty!")
    } else {
        if (pwd.value !== confirmPwd.value) {
            console.log("Password do not match!")
        } else {
            withdrawPassword.mutate({
                pwd: pwd.value,
                confirmPwd: confirmPwd.value,
                opwd: opwd.value ? opwd.value : void (0),
            })
        }
    }
    // else if (withdrawConfig?.receiptPwd !== null) {
    //     if (pwd.value === '' || confirmPwd.value === '' || opwd.value === '') {

    //     } else {
    //         if (pwd.value !== confirmPwd.value) {

    //         } else {
    //             withdrawPassword.mutate({
    //                 pwd: pwd.value,
    //                 confirmPwd: confirmPwd.value,
    //                 opwd: opwd.value,
    //             })
    //         }
    //     }
    // }

}





</script>
<style>
.otpInputs {
    @apply w-full h-[1rem];
    @apply outline-none text-center bg-[#05309F] text-white text-[.3rem];
}

.one {
    @apply rounded-l-[.1rem] border border-[#3A61C2];
    @apply focus:border-[#FFF0BB]
}

.two, .three, .four, .five {
    @apply border border-[#3A61C2] border-l-0;
    @apply focus:border-[#FFF0BB] focus:border;
}

.six {
    @apply rounded-r-[.1rem] border border-[#3A61C2] border-l-0;
    @apply focus:border-[#FFF0BB] focus:border;
}
</style>