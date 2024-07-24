<template>
    <WithdrawLayout>
        <div class="flex flex-col">
            <div class="flex p-[.2rem] bg-[#05309F] border-b border-b-[#3A61C2]">
                <div class="flex w-full items-center">
                    <div class="flex flex-col w-full">
                        <div class="flex items-center gap-[.1rem]">
                            <span class="text-white text-[.25rem]">Saldo da Conta</span>
                            <span class="text-[#FFAA09] text-[.25rem]">{{ withdrawConfigValue?.accountBalance }}</span>
                            <img class="w-[.3rem]" src="/images/shuaxin.png" alt="">
                        </div>
                        <div class="flex">
                            <span class="text-[#6FA4EF] text-[.22rem]">The amount of betting for the withdrawal is {{
                                userConfig?.money_unit }}{{ withdrawConfigValue?.betNum?.drawNeed }}</span>
                        </div>
                    </div>
                    <div class="flex">
                        <button
                            class="bg-[#FFF0BB] h-[.5rem] w-[1.2rem] border border-[#FFF0BB] rounded-[.1rem] text-[#05309F] relative">
                            Juros
                            <div class="h-[.32rem] w-fit left-[40%] right-0 -top-[.23rem] absolute z-10">
                                <p
                                    class="bg-[#FF4A4A] rounded-[.126rem] rounded-bl-none text-white p-[.07rem] pt-0 h-[.26rem] w-full leading-[.26rem] text-[.16rem]">
                                    {{ (userRateValue?.sevendayRate)?.toFixed(2) }}%</p>
                                <p
                                    class="border-b-[.07rem] border-b-transparent border-l-[.07rem] border-l-[#FF4A4A] border-r-[.07rem] border-r-transparent">
                                </p>
                            </div>
                        </button>
                    </div>
                </div>
            </div>
            <div class="flex p-[.2rem] bg-[#05309F] border-b border-b-[#3A61C2]">
                <div class="w-full">
                    <div class="border border-[#FFF0BB] rounded-[.1rem] p-[.2rem] relative overflow-hidden">
                        <div class="flex items-center justify-center w-full">
                            <span class="text-white text-[.2rem]">Retirada normal</span>
                        </div>
                        <div
                            class="flex items-center bg-[#FFF0BB] w-[.5rem] h-[.5rem] absolute -right-[.25rem] -bottom-[.25rem] rotate-[45deg]">
                            <img src="/images/check.png" class="-rotate-[45deg] w-[.2rem]" alt="">
                        </div>
                    </div>
                </div>
            </div>
            <div class="flex flex-col w-full p-[.2rem] gap-[.5rem]">
                <router-link v-if="userBankValue?.content?.length === 0" @click="bankAccount.refetch()" to="/manageaccount">
                    <div
                        class="flex items-center justify-between w-full h-[.7rem] p-[.2rem] border border-[#3A61C2] bg-[#05309F] rounded-[.15rem]">
                        <div class="flex items-center gap-[.2rem]">
                            <img class="w-[.4rem]" src="/images/bank_card.png" alt="">
                            <span class="text-[#6FA4EF] text-[.23rem]">Adicionar Conta</span>
                        </div>
                        <div class="flex items-center">
                            <img class="rotate-180 w-[.3rem]" src="/images/return.png" alt="">
                        </div>
                    </div>
                </router-link>

                <div v-if="userBankValue?.content?.length > 0"
                    class="w-full border-[.01rem] border-[#3A61C2] bg-[#05309F] flex items-center gap-[.2rem] rounded-[.1rem]">
                    <div class="w-full relative">
                        <div @click="bankOption" class="flex items-center justify-between w-full p-[.2rem]">
                            <div class="flex items-center gap-[.2rem]">
                                <img src="/images/bankCardInActive.png" alt="" class="w-[.3rem]">
                                <span class="text-[#A0C5FB] text-[.22rem]">{{ bankName }} ({{ cardNo }})</span>
                            </div>
                            <img src="/images/return.png" alt=""
                                :class="showBank ? `w-[.25rem] rotate-90 transition-all` : `w-[.25rem] -rotate-90 transition-all`">
                        </div>
                        <div
                            :class="showBank ? `transition-all overflow-auto flex flex-col w-full py-[.2rem] h-auto max-h-[7rem] border-[.01rem] border-[#3A61C2] bg-[#05309F] left-0 rounded-[.1rem] absolute mt-[.2rem]` : `hidden transition-all`">
                            <span v-for="(userBankData, index) in userBankValue?.content"
                                @click="selectBankOption(userBankData)"
                                :class="userBankData?.id === bankId ? `text-white font-bold p-[.2rem] bg-[#505050]` : `text-white p-[.2rem]`">{{
                                    userBankData?.bankName }} ({{
        userBankData?.cardNo }})</span>
                        </div>
                    </div>
                </div>
                <div
                    class="flex items-center justify-between w-full h-[.7rem] p-[.2rem] border border-[#3A61C2] bg-[#05309F] rounded-[.15rem]">
                    <div class="flex items-center gap-[.2rem] w-full">
                        <span class="text-white text-[.23rem]">{{ userConfig?.money_unit }}</span>
                        <input v-model="money" class="h-[.5rem] text-white text-[.23rem] bg-transparent outline-none w-full"
                            :placeholder="`Minimum amount ` + withdrawConfigValue?.minPickMoney + `, Maximum amount ` + withdrawConfigValue?.maxPickMoney"
                            type="text">
                    </div>
                </div>
                <div class="bg-[#3A61C2] w-full p-[.005rem] mt-[.5rem]" />
                <div class="flex flex-col gap-[.1rem]">
                    <div class="flex justify-between">
                        <span class="text-[.22rem] text-white">Senha de Saque</span>
                        <img v-if="viewPassValue" @click="viewPass" src="/profileImages/eye.png" class="w-[.4rem]">
                        <img v-if="!viewPassValue" @click="viewPass" src="/profileImages/eye-slash-1.png" class="w-[.4rem]">
                    </div>
                    <VOtpInput v-if="viewPassValue" tabindex="1" ref="otpInput"
                        input-classes="otpInputs disabled:cursor-no-drop caret-transparent"
                        :conditionalClass="['one', 'two', 'three', 'four', 'five', 'six']" separator="" inputmode="numeric"
                        input-type="letter-numeric" :num-inputs="6" v-model:value="withdrawPassword"
                        :should-auto-focus="false" :should-focus-order="true" @on-change="handleOnChange"
                        :is-disabled="!userBankValue?.content?.length > 0" @on-complete="handleOnComplete" />
                    <VOtpInput v-if="!viewPassValue" tabindex="1" ref="otpInput"
                        input-classes="otpInputs disabled:cursor-no-drop  !text-[.8rem] caret-transparent"
                        :conditionalClass="['one', 'two', 'three', 'four', 'five', 'six']" separator="" inputmode="numeric"
                        input-type="password" :num-inputs="6" v-model:value="withdrawPassword" :should-auto-focus="false"
                        :should-focus-order="true" @on-change="handleOnChange"
                        :is-disabled="!userBankValue?.content?.length > 0" @on-complete="handleOnComplete" />
                </div>
                <button @click="withdraw()"
                    class="w-full h-[.7rem] bg-[#FFF0BB] text-[#05309F] rounded-[.1rem] text-[.2rem]">Confirmar</button>
            </div>
        </div>
        <AlertBox>
            {{ showAlertMessages }}
        </AlertBox>
    </WithdrawLayout>
</template>
<script setup>
import AlertBox from '@/components/ModalComponent/AlertBox.vue';
import WithdrawLayout from './components/WithdrawLayout.vue'
import { ref } from "vue";
import { useQuery, useMutation } from "@tanstack/vue-query";
import VOtpInput from "vue3-otp-input";
import { axiosGet2, axiosPost2, axiosPost3 } from '../../components/axios/AxiosHook.js'
import { useStore } from "@/store/store.js";
import { useGetBankAccounts } from '@/global/withdrawBankAccounts';

const { bankAccount } = useGetBankAccounts()

const store = useStore()
const userConfig = store.state.userConfig.content

const withdrawPassword = ref('')
const handleOnChange = (value) => {
    withdrawPassword.value = value
}

const showBank = ref(false)
function bankOption() {
    showBank.value = !showBank.value
}

const viewPassValue = ref(false)
function viewPass() {
    viewPassValue.value = !viewPassValue.value
}

const bankCode = ref('')
const bankName = ref('')
const bankId = ref('')
const cardNo = ref('')
const money = ref('')

const showAlert = ref(false)
const showAlertMessages = ref("")

const withdrawConfigValue = store?.state?.withdrawConfig?.content?.configData

const userBankValue = ref([])
const isLoading = useQuery({
    queryKey: ["getUserBanks"],
    queryFn: async () =>
        await axiosGet2("/api/native/v2/userBanks.do"),
    staleTime: 1000,
    select: (data) => {
        userBankValue.value = data;
        bankName.value = data.content[0].bankName
        bankId.value = data.content[0].id
        cardNo.value = data.content[0].cardNo
    },
});
const userRateValue = ref([])
const isRate = useQuery({
    queryKey: ["getUserRate"],
    queryFn: async () =>
        await axiosGet2("/api/native/v2/userBillIndex.do"),
    staleTime: 1000,
    select: (data) => {
        userRateValue.value = data
    },
});

const withdrawCash = useMutation({
    mutationFn: (payload) => axiosPost3('api/native/v2/withdrawForWap.do', payload),
    onSuccess: (data) => {
        if (data.success === true) {
            money.value = ''
            withdrawPassword.value = ''
            document.querySelector(".AlertBox").click()
            showAlertMessages.value = "Operation Successful!"
        } else if (data.success === false) {
            document.querySelector(".AlertBox").click()
            showAlertMessages.value = data.msg
        }
    }
})

function withdraw() {
    withdrawCash.mutate({
        bankId: bankId.value,
        money: money.value,
        repPwd: withdrawPassword.value,
    })
}

function selectBankOption(data) {
    showBank.value = false
    bankName.value = data.bankName
    bankCode.value = data.bankCode
    bankId.value = data.id
    cardNo.value = data.cardNo
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