<template>
    <div>
        <div class="text-white w-screen h-screen px-1 bg-[#05309F] mt-[.89rem] rounded-t-[.2rem]">
            <div class="flex justify-between items-center mt-[.5rem]">
                <span @click="closeDeposit"><img src="/images/back.png" alt="" class="w-[.3rem]"></span>
                <span class="text-[.35rem] absolute left-[2.8rem]">Deposito</span>
                <span class="pb-[.5rem] text-[#fff0bb]">Registro de recarga</span>
            </div>
            <div class="border-b-[.01rem] border-[#3a61c2]">
                <span class="flex items-center text-[.25rem] border-b-[.05rem] gap-[.1rem] w-[2.4rem] pb-[.1rem]">
                    <img src="/34X34.png" alt="" class="h-[.4rem]" />
                    Deposito on-line
                </span>
            </div>
            <div class="h-[calc(100vh-2.56rem)] overflow-auto">
                <div class="grid grid-cols-2 my-[.2rem] gap-[.2rem]">
                    <div v-for="(depositValue, index) in depositData.filter((entry) => entry.depositType == 1)"
                        :key=depositValue
                        @click="setActivePaytype(depositData, depositValue?.payType, depositValue?.id, index)"
                        :class="['flex items-center p-[.12rem] border-[.02rem] border-[#3a61c2] relative overflow-hidden w-full rounded-sm justify-between', { 'active-button': activePayTypeButton === index }]">
                        <span><img src="/y.png" alt="" class="rounded-sm" /></span>
                        <span class="text-[.25rem] mr-[.4rem]">{{ depositValue?.payType }}</span>
                        <div v-if="activePayTypeButton === index"
                            class="h-[.6rem] -rotate-45 bg-[#fff0bb] w-[.6rem] absolute right-[-.29rem] bottom-[-.29rem]">
                            <img src="/check.png" class="relative -top-[.05rem] left-[.12rem] w-[.35rem] z-10 rotate-45"
                                alt="" />
                        </div>
                    </div>
                </div>
                <div class="flex gap-1 flex-wrap border-y-[.01rem] py-[.3rem] border-[#3a61c2] ">
                    <div v-for="(counterValue, index) in checkoutCounterByType" :key="index"
                        :class="['flex justify-center overflow-hidden p-[.12rem] relative border-[.02rem] border-[#3a61c2] w-[2rem] rounded-sm text-[.25rem]', { 'active-button': activeButton === index }]"
                        @click="setActive(checkoutCounterByType, counterValue?.payName, counterValue?.id, index)">
                        {{ counterValue?.payName }}
                        <div v-if="activeButton === index"
                            class="h-[.6rem] -rotate-45 bg-[#fff0bb] w-[.6rem] absolute right-[-.29rem] bottom-[-.29rem]">
                            <img src="/check.png" class="relative -top-[.05rem] left-[.12rem] w-[.35rem] z-10 rotate-45"
                                alt="" />
                        </div>
                    </div>
                </div>
                <div>
                    <div v-if="amounts.length > 1" class="flex justify-between my-1 items-center">
                        <span class="text-[.3rem]">Deposito</span>
                        <span class="text-[.25rem] text-[#fff0bb]">Detalhes adicionais do evento de bonus</span>
                    </div>
                    <div class="grid grid-cols-4 gap-[.25rem] relative">
                        <span class="relative" v-for="(amount, index) in amounts" :key="amount"
                            @click="setActiveAmount(index, amount)">
                            <div v-if="amount"
                                :class="['flex justify-center overflow-hidden p-[.12rem] w-full relative border-[.02rem] border-[#3a61c2] w-[1.5rem] rounded-sm text-[.25rem]', { 'active-button': activeAmount === index }]">
                                {{ amount }}
                                <img v-if="activeAmount === index" src="/check.png"
                                    class="h-[.5rem] p-[.1rem] absolute right-[-.2rem] bottom-[-.15rem] z-10" alt="" />
                                <div v-if="activeAmount === index"
                                    class="h-[.4rem] -rotate-45 bg-[#fff0bb] w-[.4rem] absolute right-[-.2rem] bottom-[-.2rem]">
                                </div>
                            </div>
                            <!-- <div
                                :class="amount.data === 20 ? `hidden` : `h-[.32rem] w-fit left-[1rem] right-0 -top-[.2rem] absolute z-50`">
                                <p
                                    class="bg-[#ff4a4a] rounded-[.126rem] rounded-bl-none text-white p-[.07rem] pt-0 h-[.26rem] w-full leading-[.26rem] text-[.16rem] text-nowrap">
                                    {{ amount.label }}</p>
                                <p
                                    class="border-b-[.07rem] border-b-transparent border-l-[.07rem] border-l-[#ff4a4a] border-r-[.07rem] border-r-transparent">
                                </p>
                            </div> -->
                        </span>
                    </div>
                </div>
                <div class="my-[.3rem] flex justify-center hover:border-[white] border-2 border-[#3a61c2] rounded-sm">
                    <span class="text-[.45rem] pl-[.1rem] mr-1">R$</span>
                    <input type="text" :placeholder="`Minimo ${setMinMax.minFee}, Maximo ${setMinMax.maxFee}`"
                        class="input-no-border w-[6.5rem] bg-[#05309F] text-white h-[.7rem] rounded-sm" v-model="amount">
                </div>
                <div>
                    <button @click="depositGo"
                        class="w-full p-[.2rem] bg-[#fff0bb] text-[#05309F] text-[.27rem] rounded-[.2rem]">Deposit</button>
                </div>
            </div>
        </div>
    </div>
    <Toast v-if="showAlert" :close="showAlert" :message="showAlertMessage" @close="showAlert = false"
        class="flex items-center justify-center h-screen w-full" />
</template>


<script setup>
import Toast from "@/components/ToastComponent/Toast.vue";
import { onMounted, ref } from "vue";
import { useMutation } from "@tanstack/vue-query"
import { axiosGet2, axiosPost2, axiosPost3 } from '../../components/axios/AxiosHook.js'
import { DateToStr } from '../../components/functions/Function.js'
import { useStore } from '@/store/store.js'

const store = useStore()
const depositData = ref([])
const activeButton = ref(null);
const activePayTypeButton = ref(0);
const activeAmount = ref(null)
const checkoutCounterByType = ref([])
const setMinMax = ref([])
const amounts = ref([])
const emits = defineEmits(['close'])

const payId = ref('')
const amount = ref('')
const bankCode = ref('')
const joinDepositGift = ref(2)
const showAlert = ref(false)
const showAlertMessage = ref("")

const closeDeposit = () => {
    emits('close', false)
}
const setActive = (checkoutCounterByType, payName, id, index) => {
    activeButton.value = index;
    amounts.value = (checkoutCounterByType.filter((entry) => entry.payName === payName))[0].fixedAmount.split(',')
    payId.value = id
};
const setActivePaytype = (data, payType, id, index) => {
    activePayTypeButton.value = index
    checkoutCounterByType.value = data.filter((entry) => entry.payType === payType)
    var depoData = data.filter((entry) => entry.depositType === 1)
    setMinMax.value = depoData[index]
    activeButton.value = 0
    amounts.value = data.filter((entry) => entry.payType === payType)[0].fixedAmount.split(',')
    payId.value = id
    bankCode.value = payType
};
const setActiveAmount = (index, amounts) => {
    activeAmount.value = index
    amount.value = amounts
}

const Deposit = useMutation({
    mutationFn: (payload) => axiosGet2('api/native/v2/rn_pay_methods.do', payload),
    onSuccess: (data) => {
        depositData.value = data?.content
        var depositType
        depositType = data.content.filter((entry) => entry.depositType === 1)
        checkoutCounterByType.value = data.content.filter((entry) => entry.payType === depositType[0].payType)
        setMinMax.value = depositType[0]
    },
    onError: (error) => {
        console.log(`this error: ${error}`)
    }
})

const DepositMoney = useMutation({
    mutationFn: (payload) => axiosPost3('api/native/v2/onlinePay.do', payload),
    onSuccess: (data) => {
        if (data.success === true) {
            if (data.returnType === "href") {
                window.location.replace(data.url)
            }
        } else if (data.success === false) {
            showAlert.value = true
            showAlertMessage.value = data.msg
        }
    },
    onError: (error) => {
        console.log(`this error: ${error}`)
    }
})

function depositGo() {
    DepositMoney.mutate({
        amount: amount.value,
        bankCode: bankCode.value,
        joinDepositGift: joinDepositGift.value,
        payId: payId.value,
    })
}

onMounted(() => {
    Deposit.mutate({
        ver: "2",
    })
})

</script>


<style scoped>
.input-no-border:focus {
    outline: none;
    border: none;
}

.active-button {
    border: .02rem solid #fff0bb;
}
</style>