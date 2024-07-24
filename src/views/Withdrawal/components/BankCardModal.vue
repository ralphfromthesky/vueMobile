<template>
    <Modal>
        <div class="flex flex-col gap-[.5rem] p-[.2rem]">
            <div class="flex items-center justify-center">
                <span class="text-white text-[.3rem]">Please enter your withdrawal password</span>
            </div>
            <div class="flex flex-col">
                <div class="flex items-center justify-between mb-[.2rem]">
                    <span class="text-white text-[.22rem]">Withdrawal password</span>
                    <img v-if="viewPassValue" @click="viewPass" src="/profileImages/eye-slash.png" class="w-[.4rem]">
                    <img v-if="!viewPassValue" @click="viewPass" src="/profileImages/eye.png" class="w-[.4rem]">
                </div>
                <VOtpInput v-if="viewPassValue" tabindex="1" ref="otpInput" input-classes="otpInputs caret-transparent"
                    :conditionalClass="['one', 'two', 'three', 'four', 'five', 'six']" separator="" inputmode="numeric"
                    input-type="letter-numeric" :num-inputs="6" v-model:value="withdrawPassword" :should-auto-focus="false"
                    :should-focus-order="true" @on-change="handleOnChange" @on-complete="handleOnComplete" />
                <VOtpInput v-if="!viewPassValue" tabindex="1" ref="otpInput"
                    input-classes="otpInputs !text-[.8rem] caret-transparent"
                    :conditionalClass="['one', 'two', 'three', 'four', 'five', 'six']" separator="" inputmode="numeric"
                    input-type="password" :num-inputs="6" v-model:value="withdrawPassword" :should-auto-focus="false"
                    :should-focus-order="true" @on-change="handleOnChange" @on-complete="handleOnComplete" />
                <div v-if="showAlert" class="mt-[.05rem]">
                    <span class="text-amber-500 text-[.22rem]">{{ showAlertMessage }}</span>
                </div>
            </div>
            <div class="flex items justify-between">
                <span class="text-white text-[.2rem]">For the security of your account, please enter the withdrawal
                    password</span>
                <span class="text-white text-[.2rem]">Forgot Password</span>
            </div>
            <button @click="withdraw"
                class="text-white text-[.24rem] w-full h-[.7rem] bg-amber-500 rounded-[.2rem] font-bold">Confirm</button>
        </div>
    </Modal>
    <CardBankModal>
        <div class="flex flex-col items-center justify-center gap-[.5rem] p-[.2rem] relative">
            <div v-if="userConfig.recent_card_validate === 'on' && bankAccounts.length !== 0"
                class="flex flex-col gap-[.1rem]">
                <span class="text-white text-[.2rem]">Remark: To add the new bank card, the most up-to-date information
                    of the bank card registered for the game shall be provided.</span>
                <div class="flex flex-col gap-[.5rem]">
                    <div
                        class="w-full border-[.01rem] border-[#3A61C2] bg-[#05309F] flex items-center gap-[.2rem] rounded-[.1rem] p-[.2rem]">
                        <img src="/images/realName.png" alt="" class="w-[.3rem]">
                        <input v-model="lastRealName"
                            class="text-[#A0C5FB] text-[.22rem] bg-transparent outline-none w-full"
                            placeholder="The last account name of the bank card registered for the game" type="text">
                    </div>
                    <div
                        class="w-full border-[.01rem] border-[#3A61C2] bg-[#05309F] flex items-center gap-[.2rem] rounded-[.1rem] p-[.2rem]">
                        <img src="/withdrawImages/bankIcon.png" alt="" class="w-[.3rem]">
                        <input v-model="lastCardNo" class="text-[#A0C5FB] text-[.22rem] bg-transparent outline-none w-full"
                            placeholder="The last bank card number registered for the game" type="text">
                    </div>
                </div>

            </div>
            <div
                class="w-full border-[.01rem] border-[#3A61C2] bg-[#05309F] flex items-center gap-[.2rem] rounded-[.1rem] p-[.2rem]">
                <img src="/images/realName.png" alt="" class="w-[.3rem]">
                <input v-model="userName" class="text-[#A0C5FB] text-[.22rem] bg-transparent outline-none w-full"
                    placeholder="Account name" type="text">
            </div>
            <div class="w-full border-[.01rem] border-[#3A61C2] bg-[#05309F] flex items-center gap-[.2rem] rounded-[.1rem]">
                <div class="w-full relative">
                    <div @click="bankOption" class="flex items-center justify-between w-full p-[.2rem]">
                        <div class="flex items-center gap-[.2rem]">
                            <img src="/images/bankCardInActive.png" alt="" class="w-[.3rem]">
                            <span class="text-[#A0C5FB] text-[.22rem]">{{ bankName }}</span>
                        </div>
                        <img src="/images/return.png" alt=""
                            :class="showBank ? `w-[.25rem] rotate-90 transition-all` : `w-[.25rem] -rotate-90 transition-all`">
                    </div>
                    <div
                        :class="showBank ? `transition-all flex flex-col w-full gap-[.2rem] h-auto border-[.01rem] border-[#3A61C2] bg-[#05309F] left-0 rounded-[.1rem] absolute p-[.2rem] mt-[.2rem]` : `hidden transition-all`">
                        <span v-for="(bankData, index) in bankValue?.content?.filter((entry) => entry.code !== 'USDT')"
                            :key=index :class="bankData.name === bankName ? `text-amber-500` : `text-white`"
                            @click="selectBankOption(bankData)">{{ bankData.name }}</span>
                    </div>
                </div>
            </div>
            <div
                class="w-full border-[.01rem] border-[#3A61C2] bg-[#05309F] flex items-center gap-[.2rem] rounded-[.1rem] p-[.2rem]">
                <img src="/withdrawImages/bankIcon.png" alt="" class="w-[.3rem]">
                <input v-model="cardNo" class="text-[#A0C5FB] text-[.22rem] bg-transparent outline-none w-full"
                    placeholder="Please enter your bank card number" type="text">
            </div>
            <div
                class="w-full border-[.01rem] border-[#3A61C2] bg-[#05309F] flex items-center gap-[.2rem] rounded-[.1rem] p-[.2rem]">
                <img src="/withdrawImages/bankIcon.png" alt="" class="w-[.3rem]">
                <input v-model="addr" class="text-[#A0C5FB] text-[.22rem] bg-transparent outline-none w-full"
                    placeholder="Please enter the bank card number again" type="text">
            </div>
            <div
                class="w-full border-[.01rem] border-[#3A61C2] bg-[#05309F] flex items-center gap-[.2rem] rounded-[.1rem] p-[.2rem]">
                <img src="/withdrawImages/bankIcon.png" alt="" class="w-[.3rem]">
                <input v-model="bankExtraInfo" class="text-[#A0C5FB] text-[.22rem] bg-transparent outline-none w-full"
                    placeholder="Please enter IFSC" type="text">
            </div>

            <div class="flex flex-col gap-[.3rem] items-center">
                <span class="text-[.2rem] text-white">Please check your name and card number carefully, otherwise you
                    will not be able to make a withdrawal</span>

                <button @click="submitCard"
                    class="text-white text-[.24rem] w-full h-[.7rem] bg-amber-500 rounded-[.2rem] font-bold">Confirm</button>
            </div>

        </div>
    </CardBankModal>
    <AlertBox>
        {{ showAlertMessage }}
    </AlertBox>
</template>

<script setup>
import Modal from '@/components/ModalComponent/Modal.vue';
import AlertBox from '@/components/ModalComponent/AlertBox.vue';
import CardBankModal from '@/components/ModalComponent/CardBankModal.vue'
import { onMounted, ref, watchEffect } from "vue";
import { useMutation } from "@tanstack/vue-query"
import { axiosGet2, axiosPost2, axiosPost3 } from '../../../components/axios/AxiosHook.js'
import VOtpInput from "vue3-otp-input";
import { useQuery } from "@tanstack/vue-query";
import { useGetBankAccounts } from '@/global/withdrawBankAccounts';
import { useStore } from "@/store/store.js";

const store = useStore()
const userConfig = store.state.userConfig.content
const bankAccounts = store.state.withdrawBankAccounts.content

const { bankAccount } = useGetBankAccounts()

const showAlert = ref(false)
const showAlertMessage = ref("")

const withdrawPassword = ref('')
const handleOnChange = (password) => {
    withdrawPassword.value = password
};

function withdraw() {
    withdrawMoney.mutate({
        type: "2",
        pwd: withdrawPassword.value
    })
}
const viewPassValue = ref(false)
function viewPass() {
    viewPassValue.value = !viewPassValue.value
}

const withdrawMoney = useMutation({
    mutationFn: (payload) => axiosPost2('api/native/v2/checkUserPwd.do', payload),
    onSuccess: (data) => {
        if (data.success == true) {
            document.querySelector(".myEcho").click()
            document.querySelector(".openAddCard").click()
            withdrawPassword.value = ''
            showAlert.value = false
            showAlertMessage.value = ''
        } else if (data.success === false) {
            showAlert.value = true
            showAlertMessage.value = data.msg
        }
    },
    onError: (error) => {
        console.log(`this error: ${error}`)
    }
})

const bankValue = ref([])
const isLoading = useQuery({
    queryKey: ["getBanks"],
    queryFn: async () =>
        await axiosGet2("/api/native/v2/getBanks.do"),
    staleTime: 1000,
    select: (data) => {
        bankValue.value = data;
        bankName.value = data.content[0].name
        bankCode.value = data.content[0].code
    },
});

watchEffect(() => {
    isLoading.refetch()
})


const addCard = useMutation({
    mutationFn: (payload) => axiosPost3('api/native/v2/post_bank_data.do', payload),
    onSuccess: (data) => {
        if (data.success === true) {
            bankAccount.refetch()
            document.querySelector(".myEchoCard").click()
            document.querySelector(".AlertBox").click()
            showAlertMessage.value = "Operation Successful"
            addr.value = ""
            bankCode.value = ""
            bankExtraInfo.value = ""
            cardNo.value = ""
            lastCardNo.value = ""
            lastRealName.value = ""
            userName.value = ""
        } else if (data.success === false) {
            document.querySelector(".AlertBox").click()
            showAlertMessage.value = data.msg
        }
    }
})

const addr = ref('')
const bankCode = ref('')
const bankExtraInfo = ref('')
const bankName = ref('')
const cardNo = ref('')
const lastCardNo = ref('')
const lastRealName = ref('')
const userName = ref('')


const showBank = ref(false)
function bankOption() {
    showBank.value = !showBank.value
}

function selectBankOption(data) {
    showBank.value = false
    bankName.value = data.name
    bankCode.value = data.code
}

function submitCard() {
    addCard.mutate({
        addr: addr.value,
        bankCode: bankCode.value,
        bankExtraInfo: bankExtraInfo.value ? bankExtraInfo.value : void (0),
        bankName: bankName.value,
        cardNo: cardNo.value,
        lastCardNo: lastCardNo.value,
        lastRealName: lastRealName.value,
        userName: userName.value,
    })
}
</script>