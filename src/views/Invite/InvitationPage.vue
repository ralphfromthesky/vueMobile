<template>
    <PageLayout title="Invite">
        <div class="flex flex-col gap-[.2rem] p-[.2rem] w-full">
            <div class="flex bg-[#05309F] w-full rounded-[.1rem]">
                <div class="flex w-[2.5rem] justify-center items-baseline relative">
                    <img src="/inviteImages/VIP1.png" class="w-[1.6rem]" alt="">
                    <img src="/inviteImages/question.png" class="w-[.3rem] absolute right-[.1rem] top-[.02rem]" alt="">
                </div>
                <div class="flex p-[.2rem] pl-0 gap-[.2rem] justify-between w-full">
                    <div class="flex flex-col leading-[.31rem] gap-[.2rem]">
                        <div class="flex flex-col">
                            <div class="flex">
                                <span class="text-[#6FA4EF] text-[.27rem]">Minha identidade</span>
                            </div>
                            <div class="flex items-center gap-[.1rem]">
                                <span class="text-white text-[.27rem]">{{ store.state.userInfo.promCode }}</span>
                                <img src="/copyIcons/Gucci_copy.png" alt="" class="w-[.35rem]">
                            </div>
                        </div>
                        <div class="flex flex-col">
                            <div class="flex items-center gap-[.1rem]">
                                <span class="text-white text-[.27rem]">I.D. Superior</span>
                                <span class="text-amber-500 text-[.27rem]">{{ invitationData?.proxyId ? invitationData?.proxyId : "No" }}</span>
                                <img v-if="invitationData?.proxyId" src="/copyIcons/Gucci_copy.png" alt="" class="w-[.35rem]">
                            </div>
                        </div>

                    </div>
                    <div class="flex flex-col gap-[.1rem] leading-none items-end">
                        <button
                            class="w-[1.2rem] bg-[#FFF0BB] text-[#05309F] text-[.22rem] rounded-[.1rem] h-[.5rem]">One
                            Click</button>
                        <button class="w-[1.2rem] bg-[#999] text-white text-[.22rem] rounded-[.1rem] h-[.5rem]">Award
                            List</button>
                        <span class="text-[.28rem] text-[#FFAA09]">{{ userData?.money ? userData?.money : "0.00"
                            }}</span>
                    </div>
                </div>
            </div>
            <div class="flex flex-col bg-[#05309F] w-full rounded-[.1rem]">
                <div class="flex p-[.2rem]">
                    <span class="text-white text-[.24rem]">Informações da promoção</span>
                </div>
                <div class="w-full h-[.01rem] bg-[#3A61C2]"></div>
                <div class="flex p-[.2rem] w-full">
                    <div class="flex flex-col w-full gap-[.2rem]">
                        <div class="flex gap-[.2rem] w-full">
                            <div class="flex flex-col rounded-[.15rem] overflow-hidden w-[2.2rem]">
                                <div class="bg-white p-[.15rem]">
                                    <img src="/images/sample_qr.png" class="h-[1.3rem] w-[1.3rem]" alt="">
                                </div>
                                <div class="flex items-center bg-[#FFF0BB] p-[.1rem] pt-0 leading-none">
                                    <span class="text-[#05309F] text-center">Clique para Salvar</span>
                                </div>
                            </div>
                            <div class="flex flex-col w-full gap-[.2rem]">
                                <div class="flex items-center justify-between w-full">
                                    <span class="text-[#6FA4EF]">Meu Link</span>
                                    <img src="/inviteImages/share.png" class="h-[.4rem]" alt="">
                                </div>
                                <div class="border-[.01rem] border-[#3a61c2] rounded-[.1rem] p-[.15rem] h-full">
                                    <div class="flex w-full">
                                        <div class="flex items-start gap-[.2rem] justify-between w-full">
                                            <img src="/images/return.png" class="-rotate-90 min-w-[.25rem]" alt="">
                                            <span class="text-[.24rem] text-[#A0C5FB] break-all">{{
                                                invitationData?.prompInfo?.linkUrl }}</span>
                                            <img src="/copyIcons/Gucci_copy.png" class="min-w-[.4rem]" alt="">
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="flex w-full gap-[.2rem]">
                            <div class="flex flex-col items-center justify-center">
                                <img src="/images/img_facebook.png" alt="" class="w-[.7rem]">
                                <span class="text-[#A0C5FB] text-[.25rem]">Facebook</span>
                            </div>
                            <div class="flex flex-col items-center justify-center">
                                <img src="/images/img_tg.png" alt="" class="w-[.7rem]">
                                <span class="text-[#A0C5FB] text-[.25rem]">Telegram</span>
                            </div>
                            <div class="flex flex-col items-center justify-center">
                                <img src="/images/img_wa.png" alt="" class="w-[.7rem]">
                                <span class="text-[#A0C5FB] text-[.25rem]">WhatsApp</span>
                            </div>
                            <div class="flex flex-col items-center justify-center">
                                <img src="/images/img_line.png" alt="" class="w-[.7rem]">
                                <span class="text-[#A0C5FB] text-[.25rem]">Line</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="flex flex-col bg-[#05309F] w-full rounded-[.1rem]">
                <div class="flex w-full border-b-[.01rem] border-b-[#3A61C2]">
                    <div class="flex justify-between p-[.2rem] w-full">
                        <span class="text-white text-[.24rem]">Comissão</span>
                        <router-link to="/commission">
                            <div class="flex gap-[.15rem] items-center">
                                <span class="text-[#e5dcb8] text-[.24rem]">More</span>
                                <img src="/images/return.png" alt="" class="rotate-180 w-[.2rem]">
                            </div>
                        </router-link>
                    </div>
                </div>
                <div class="flex w-full border-b-[.01rem] border-b-[#3A61C2]">
                    <div class="flex justify-between p-[.2rem] w-full">
                        <span class="text-[#6FA4EF] text-[.24rem]">Comissão total</span>
                        <div class="flex gap-[.15rem] items-center">
                            <span class="text-[#FFAA09] text-[.24rem]">{{ invitationData?.newInfo?.rebatePrompActBonus }}</span>
                        </div>
                    </div>
                </div>
                <div class="flex w-full border-b-[.01rem] border-b-[#3A61C2]">
                    <div class="flex justify-between p-[.2rem] w-full">
                        <span class="text-[#6FA4EF] text-[.24rem]">Comissão recebida</span>
                        <div class="flex gap-[.15rem] items-center">
                            <span class="text-[#FFAA09] text-[.24rem]">{{ invitationData?.newInfo?.todayRebatePrompActBonus }}</span>
                        </div>
                    </div>
                </div>
                <div class="flex w-full">
                    <div class="flex justify-between p-[.2rem] w-full">
                        <span class="text-[#6FA4EF] text-[.24rem]">Última Comissão</span>
                        <div class="flex gap-[.15rem] items-center">
                            <span class="text-[#FFAA09] text-[.24rem]">{{ invitationData?.newInfo?.lastBonus }}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div class="flex flex-col bg-[#05309F] w-full rounded-[.1rem]">
                <div class="flex w-full border-b-[.01rem] border-b-[#3A61C2]">
                    <div class="flex justify-between p-[.2rem] w-full">
                        <span class="text-white text-[.24rem]">Desempenho</span>
                        <router-link to="/performance">
                            <div class="flex gap-[.15rem] items-center">
                                <span class="text-[#e5dcb8] text-[.24rem]">More</span>
                                <img src="/images/return.png" alt="" class="rotate-180 w-[.2rem]">
                            </div>
                        </router-link>
                    </div>
                </div>
                <div class="flex w-full border-b-[.01rem] border-b-[#3A61C2]">
                    <div class="flex justify-between p-[.2rem] w-full">
                        <span class="text-[#6FA4EF] text-[.24rem]">Subordinados diretos</span>
                        <div class="flex gap-[.15rem] items-center">
                            <span class="text-white text-[.24rem]">{{ invitationData?.newInfo?.teamRegCount }}</span>
                        </div>
                    </div>
                </div>
                <div class="flex w-full border-b-[.01rem] border-b-[#3A61C2]">
                    <div class="flex justify-between p-[.2rem] w-full">
                        <span class="text-[#6FA4EF] text-[.24rem]">Rendimento Total</span>
                        <div class="flex gap-[.15rem] items-center">
                            <span class="text-white text-[.24rem]">{{ invitationData?.newInfo?.directSubRegCount }}</span>
                        </div>
                    </div>
                </div>
                <div class="flex w-full border-b-[.01rem] border-b-[#3A61C2]">
                    <div class="flex justify-between p-[.2rem] w-full">
                        <span class="text-[#6FA4EF] text-[.24rem]">D. direto</span>
                        <div class="flex gap-[.15rem] items-center">
                            <span class="text-white text-[.24rem]">{{ invitationData?.newInfo?.otherSubRegCount }}</span>
                        </div>
                    </div>
                </div>
                <div class="flex w-full">
                    <div class="flex justify-between p-[.2rem] w-full">
                        <span class="text-[#6FA4EF] text-[.24rem]">D. dos outros</span>
                        <div class="flex gap-[.15rem] items-center">
                            <span class="text-white text-[.24rem]">{{ invitationData?.newInfo?.totalBetBateMoney }}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div class="flex flex-col bg-[#05309F] w-full rounded-[.1rem]">
                <div class="flex w-full border-b-[.01rem] border-b-[#3A61C2]">
                    <div class="flex justify-between p-[.2rem] w-full">
                        <span class="text-white text-[.24rem]">Apostas dos Subordinados</span>
                        <router-link to="/directBet">
                            <div class="flex gap-[.15rem] items-center">
                                <span class="text-[#e5dcb8] text-[.24rem]">Mais</span>
                                <img src="/images/return.png" alt="" class="rotate-180 w-[.2rem]">
                            </div>
                        </router-link>
                    </div>
                </div>
                <div class="flex w-full border-b-[.01rem] border-b-[#3A61C2]">
                    <div class="flex justify-between p-[.2rem] w-full">
                        <span class="text-[#6FA4EF] text-[.24rem]">Total de apostas válidas</span>
                        <div class="flex gap-[.15rem] items-center">
                            <span class="text-white text-[.24rem]">{{ invitationData?.newInfo?.totalBetMoney }}</span>
                        </div>
                    </div>
                </div>
                <div class="flex w-full border-b-[.01rem] border-b-[#3A61C2]">
                    <div class="flex justify-between p-[.2rem] w-full">
                        <span class="text-[#6FA4EF] text-[.24rem]">Total de apostas</span>
                        <div class="flex gap-[.15rem] items-center">
                            <span class="text-white text-[.24rem]">{{ invitationData?.newInfo?.totalBetOrderNum }}</span>
                        </div>
                    </div>
                </div>
                <div class="flex w-full">
                    <div class="flex justify-between p-[.2rem] w-full">
                        <span class="text-[#6FA4EF] text-[.24rem]">Total de V/D</span>
                        <div class="flex gap-[.15rem] items-center">
                            <span class="text-[#FF4A4A] text-[.24rem]">{{ invitationData?.newInfo?.totalWinLost }}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </PageLayout>
</template>
<script setup>
import PageLayout from '../../components/layout/PageLayoutTab.vue';
import { onMounted, ref } from "vue";
import { useMutation } from "@tanstack/vue-query"
import { axiosGet2, axiosPost2 } from '../../components/axios/AxiosHook.js'
import { DateToStr } from '../../components/functions/Function.js'
import { useStore } from '@/store/store.js'

const store = useStore()
const invitationData = ref([])
const Invitation = useMutation({
    mutationFn: (payload) => axiosGet2('api/native/v2/inviteOverview2.do', payload),
    onSuccess: (data) => {
        invitationData.value = data?.content
    },
    onError: (error) => {
        console.log(`this error: ${error}`)
    }
})
onMounted(() => {
    Invitation.mutate({
        ver: "3",
        lan: "en"
    })
})

</script>