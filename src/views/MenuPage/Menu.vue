<template>
  <MenuLayout>
    <div class="bg-[#05309F] w-screen bg-[url('/images/menu_bg.png')] bg-no-repeat bg-right-top bg-[length:100%]">
      <div class="flex flex-col p-[.2rem]">
        <div class="flex gap-[.2rem] w-full justify-end">
          <router-link to="/support">
            <div class="flex flex-col items-center">
              <img class="w-[.35rem]" src="/menuImages/icon_suporte.png" alt="" />
              <span class="text-white text-[.2rem]">Suporte</span>
            </div>
          </router-link>
          <router-link to="/notification">
            <div class="flex flex-col items-center">
              <img class="w-[.35rem]" src="/menuImages/icon_message.png" alt="" />
              <span class="text-white text-[.2rem]">Mensahe</span>
            </div>
          </router-link>
          <router-link to="/profile">
            <div class="flex flex-col items-center">
              <img class="w-[.35rem]" src="/menuImages/icon_dados.png" alt="" />
              <span class="text-white text-[.2rem]">Dados</span>
            </div>
          </router-link>
        </div>
        <div class="flex items-center gap-[.2rem] my-[.2rem]">
          <div class="flex items-center">
            <img class="w-[1.1rem] rounded-full" src="/avatarImages/Masculine/20.png" alt="" />
          </div>
          <div class="flex flex-col">
            <div class="flex gap-[.1rem]">
              <span class="text-[#A0C5FB] text-[.3rem]">Conta:</span>
              <span class="text-white text-[.3rem]">{{
                store.state.userInfo.username
              }}</span>
            </div>
            <div class="flex gap-[.2rem] items-center">
              <div class="flex items-center gap-[.1rem]">
                <span class="text-[#A0C5FB] text-[.35rem]">ID:</span>
                <span class="text-white text-[.35rem]">{{
                  store.state.userInfo.userId
                }}</span>
                <img class="w-[.32rem]" src="/copyIcons/copy.png" alt="" />
              </div>
              <div class="h-[.3rem] p-[.01rem] bg-[#A0C5FB]"></div>
              <div class="flex items-center gap-[.1rem]">
                <img class="w-[.4rem]" src="/images/br.png" alt="" />
                <span class="text-[.35rem] text-white">
                  <van-rolling-text :start-num="0" :target-num="store.state.userInfo.money" class="van" />
                </span>

                <img :class="{ rotateThis: isRotate }" class="w-[.4rem]" src="/images/shuaxin.png" alt=""
                  @click="toggleRotate" />
              </div>
            </div>
          </div>
        </div>
        <div class="flex justify-around my-[.3rem]">
          <router-link to="/withdraw">
            <div class="flex flex-col gap-[.1rem] items-center">
              <img src="/menuImages/card.png" alt="" class="w-[.55rem]" />
              <span class="text-white text-[.25]">Saque</span>
            </div>
          </router-link>
          <div class="flex flex-col gap-[.1rem] items-center">
            <img src="/menuImages/card2.png" alt="" class="w-[.55rem]" />
            <span class="text-white text-[.25]">Depositar</span>
          </div>
          <router-link to="/juros">
            <div class="flex flex-col gap-[.1rem] items-center">
              <img src="/menuImages/pig.png" alt="" class="w-[.55rem]" />
              <span class="text-white text-[.25]">Juros</span>
            </div>
          </router-link>
        </div>
        <div class="bg-[#FFF0BB] rounded-[.2rem] p-[.2rem]">
          <router-link to="/vip">
            <div class="flex justify-between">
              <div class="flex gap-[.2rem] items-center">
                <div
                  class="flex items-center bg-[#24b299] p-[.05rem] leading-none w-[.77rem] h-[.32rem] rounded-tl-[.15rem] rounded-br-[.15rem] justify-center">
                  <img src="/vipImages/pin.png" alt="" class="h-[.15rem] w-[.32rem] mt-[.05rem]" />
                  <span class="text-[.16rem] italic font-bold text-sha text-[#e5b952] drop-shadow-md">{{
                    vipCurrentLevel?.curDegreeLevel }}</span>
                </div>
                <div class="flex gap-[.1rem] items-center leading-none w-fit flex-wrap">
                  <span class="text-[#A0C5FB] text-[.26rem]">Restantes</span>
                  <span class="text-[#05309F] text-[.26rem]">{{
                    vipCurrentLevel?.curDegreeName
                  }}</span>
                  <span class="text-[#A0C5FB] text-[.26rem]">Valor restante para aposta</span>
                  <span class="text-[#05309F] text-[.26rem]">{{
                    vipCurrentLevel?.type === 1
                      ? vipCurrentLevel?.nextDegreeDepositMoney
                      : vipCurrentLevel?.nextDegreeBetNum
                  }}</span>
                </div>
              </div>
              <div class="flex items-center">
                <img src="/images/return.png" class="rotate-180 w-[.3rem] min-w-[.3rem]" alt="" />
              </div>
            </div>
          </router-link>
          <div class="w-full h-[.01rem] bg-[#1A45B140] my-[.2rem]"></div>
          <div class="flex items-leading gap-[.2rem]">
            <div class="flex w-[2rem] items-center justify-center relative">
              <img class="w-[1.2rem]" :src="`/vipImages/medalLevel` +
                (vipCurrentLevel?.curDegreeLevel == 0
                  ? 0
                  : vipCurrentLevel?.curDegreeLevel < 6
                    ? 1
                    : vipCurrentLevel?.curDegreeLevel < 11
                      ? 2
                      : vipCurrentLevel?.curDegreeLevel < 14
                        ? 3
                        : vipCurrentLevel?.curDegreeLevel < 41
                          ? 4
                          : 0) +
                `.png`
                " alt="" />
              <img class="w-[1.2rem] absolute" :src="`/vipImages/ribbonLevel` +
                vipCurrentLevel?.curDegreeLevel +
                `.png`
                " alt="" />
              <div class="absolute">
                <span :data-text="vipCurrentLevel?.curDegreeLevel" class="text-[.45rem] vipLevelSpan">{{
                  vipCurrentLevel?.curDegreeLevel }}</span>
              </div>
            </div>
            <div class="leading-none w-[3rem]">
              <span class="">Aposta para promoção</span>
            </div>
            <div class="flex items-center bg-[#00000014] w-full h-[.25rem] relative rounded-full overflow-hidden">
              <div :style="`width:` +
                (vipCurrentLevel?.type == 1
                  ? (100 * vipCurrentLevel?.curDegreeDepositMoney) /
                  vipCurrentLevel?.newDegreeDepositMoney +
                  `%`
                  : (vipCurrentLevel?.curDegreeBetNum * 100) /
                  vipCurrentLevel?.nextDegreeBetNum +
                  `%`)
                " class="flex items-center bg-[#04BE02] w-[50%] h-[.25rem] rounded-full">
                <span class="flex items-center justify-center absolute w-full text-[.22rem] text-white">{{
                  vipCurrentLevel?.type === 1
                    ? vipCurrentLevel?.curDegreeDepositMoney
                    : vipCurrentLevel?.curDegreeBetNum
                }}
                  /
                  {{
                    vipCurrentLevel?.type === 1
                      ? vipCurrentLevel?.newDegreeDepositMoney
                      : vipCurrentLevel?.nextDegreeBetNum -
                      vipCurrentLevel?.curDegreeBetNum
                  }}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="flex flex-col">
          <router-link to="/recoverbalance">
            <div class="flex items-center justify-between p-[.2rem]">
              <div class="flex items-center leading-none gap-[.2rem]">
                <img src="/menuImages/search2.png" alt="" class="w-[.45rem]" />
                <span class="text-white text-[.26rem]">Recuperar o saldo</span>
              </div>
              <div class="flex items-center">
                <img src="/images/return.png" alt="" class="rotate-180 w-[.3rem]" />
              </div>
            </div>
          </router-link>
          <router-link to="/accountdetails">
            <div class="flex items-center justify-between p-[.2rem]">
              <div class="flex items-center leading-none gap-[.2rem]">
                <img src="/menuImages/poker2.png" alt="" class="w-[.45rem]" />
                <span class="text-white text-[.26rem]">Detalhes da Conta</span>
              </div>
              <div class="flex items-center">
                <img src="/images/return.png" alt="" class="rotate-180 w-[.3rem]" />
              </div>
            </div>
          </router-link>
          <router-link to="/bettingrecords">
            <div class="flex items-center justify-between p-[.2rem]">
              <div class="flex items-center leading-none gap-[.2rem]">
                <img src="/menuImages/poker.png" alt="" class="w-[.45rem]" />
                <span class="text-white text-[.26rem]">Recordes de Apostas</span>
              </div>
              <div class="flex items-center">
                <img src="/images/return.png" alt="" class="rotate-180 w-[.3rem]" />
              </div>
            </div>
          </router-link>
          <router-link to="/accountdetailsrecord">
            <div class="flex items-center justify-between p-[.2rem]">
              <div class="flex items-center leading-none gap-[.2rem]">
                <img src="/menuImages/serch.png" alt="" class="w-[.45rem]" />
                <span class="text-white text-[.26rem]">Relatório</span>
              </div>
              <div class="flex items-center">
                <img src="/images/return.png" alt="" class="rotate-180 w-[.3rem]" />
              </div>
            </div>
          </router-link>
          <router-link to="/manageaccount" @click="bankAccount.refetch()">
            <div class="flex items-center justify-between p-[.2rem]">
              <div class="flex items-center leading-none gap-[.2rem]">
                <img src="/menuImages/card3.png" alt="" class="w-[.45rem]" />
                <span class="text-white text-[.26rem]">Gestão de saque</span>
              </div>
              <div class="flex items-center">
                <img src="/images/return.png" alt="" class="rotate-180 w-[.3rem]" />
              </div>
            </div>
          </router-link>
        </div>
      </div>
      <div class="bg-[#1A45B1] w-full h-[.25rem]"></div>
      <div class="flex flex-col p-[.2rem]">
        <div class="flex flex-col">
          <router-link to="/invite">
            <div class="flex items-center justify-between p-[.2rem]">
              <div class="flex items-center leading-none gap-[.2rem]">
                <img src="/menuImages/icon_music.png" alt="" class="w-[.45rem]" />
                <span class="text-white text-[.26rem]">Convidar</span>
              </div>
              <div class="flex items-center">
                <img src="/images/return.png" alt="" class="rotate-180 w-[.3rem]" />
              </div>
            </div>
          </router-link>
          <router-link to="/profile">
            <div class="flex items-center justify-between p-[.2rem]">
              <div class="flex items-center leading-none gap-[.2rem]">
                <img src="/menuImages/icon_ProfileInformation.png" alt="" class="w-[.45rem]" />
                <span class="text-white text-[.26rem]">Dados</span>
              </div>
              <div class="flex items-center">
                <img src="/images/return.png" alt="" class="rotate-180 w-[.3rem]" />
              </div>
            </div>
          </router-link>
          <router-link to="/securitycenter">
            <div class="flex items-center justify-between p-[.2rem]">
              <div class="flex items-center leading-none gap-[.2rem]">
                <img src="/menuImages/icon_SecurityCenter.png" alt="" class="w-[.45rem]" />
                <span class="text-white text-[.26rem]">Centro de Segurança</span>
              </div>
              <div class="flex items-center">
                <img src="/images/return.png" alt="" class="rotate-180 w-[.3rem]" />
              </div>
            </div>
          </router-link>
          <router-link to="/support">
            <div class="flex items-center justify-between p-[.2rem]">
              <div class="flex items-center leading-none gap-[.2rem]">
                <img src="/menuImages/icon_help.png" alt="" class="w-[.45rem]" />
                <span class="text-white text-[.26rem]">FAQ</span>
              </div>
              <div class="flex items-center">
                <img src="/images/return.png" alt="" class="rotate-180 w-[.3rem]" />
              </div>
            </div>
          </router-link>
          <router-link to="/suggestion">
            <div class="flex items-center justify-between p-[.2rem]">
              <div class="flex items-center leading-none gap-[.2rem]">
                <img src="/menuImages/icon_Suggestion1.png" alt="" class="w-[.43rem] h-[.45rem]" />
                <span class="text-white text-[.26rem]">Bônus de Sugestão</span>
              </div>
              <div class="flex items-center">
                <img src="/images/return.png" alt="" class="rotate-180 w-[.3rem]" />
              </div>
            </div>
          </router-link>
          <router-link to="/deviceinfo">
            <div class="flex items-center justify-between p-[.2rem]">
              <div class="flex items-center leading-none gap-[.2rem]">
                <img src="/menuImages/login_Device.png" alt="" class="w-[.43rem] h-[.45rem]" />
                <span class="text-white text-[.26rem]">Faça login no dispositivo</span>
              </div>
              <div class="flex items-center">
                <img src="/images/return.png" alt="" class="rotate-180 w-[.3rem]" />
              </div>
            </div>
          </router-link>
          <div class="flex items-center justify-between p-[.2rem]" data-twe-toggle="modal"
            data-twe-target="#logOutModal" data-twe-ripple-init>
            <div class="flex items-center leading-none gap-[.2rem]">
              <img src="/menuImages/icon_Logout.png" alt="" class="w-[.45rem]" />
              <span class="text-white text-[.26rem]">Sair</span>
            </div>
            <div class="flex items-center">
              <img src="/images/return.png" alt="" class="rotate-180 w-[.3rem]" />
            </div>
          </div>
        </div>
      </div>
      <LogOutModal>
        <div class="text-white text-center">
          <div class="text-[.5rem] text-[#a0c5fb]">Lembrette</div>
          <div class="text-[.4rem]">Log out kana?</div>
          <div class="flex justify-center gap-[.2rem] mt-[.5rem] mb-1">
            <button @click="logOutUser.mutate()"
              class="text-nowrap w-[3rem] py-[.25rem] rounded-[.15rem] text-[.3rem] bg-transparent border border-[#FFF0BB] text-[#FFF0BB]">
              Cponfirmar Saida
            </button>
            <button class="w-[3rem] py-[.25rem] rounded-[.15rem] text-[.3rem] bg-[#FFF0BB] text-[#1A45B1]"
              data-twe-modal-dismiss aria-label="Close">
              Cancelar
            </button>
          </div>
        </div>
      </LogOutModal>
    </div>
  </MenuLayout>
</template>
<script setup>
import MenuLayout from "../../components/layout/MenuLayout.vue";
import LogOutModal from "@/components/ModalComponent/LogOutModal.vue";
import { useStore } from "@/store/store.js";
import { ref, onMounted } from "vue";
import { useQuery } from "@tanstack/vue-query";
import {
  axiosGet,
  axiosPost2,
  axiosPost3,
} from "../../components/axios/AxiosHook.js";
import { useGetUserInfo } from "@/global/getUserInfo.js";
import { useMutation } from "@tanstack/vue-query";
import { getSecurityInfo } from "@/global/getUserInfo.js";
import { useGetBankAccounts } from "@/global/withdrawBankAccounts";

const { bankAccount } = useGetBankAccounts();
const { useSecurity } = getSecurityInfo();
const { query, userData } = useGetUserInfo();
const store = useStore();
const vipCurrentLevel = ref([]);
const isRotate = ref(false);

onMounted(() => {
  vipCurrentLevel.value = store.state.degreeInfo.content;
});

const toggleRotate = () => {
  isRotate.value = !isRotate.value;
  query.refetch();
};

// const logOutUser = () => {
//     const { isLoading } = useQuery({
//         queryKey: ["userGames"],
//         queryFn: async () =>
//             await axiosPost3("/api/native/v2/logout.do"),
//         staleTime: 0,
//         select: (data) => {

//         },
//     });
// }

const logOutUser = useMutation({
  mutationFn: () => axiosPost2("api/native/v2/logout.do"),
  onSuccess: (data) => {
    console.log(data.success);
    if (data.success === true) {
      query.refetch();
      document.querySelector(".logOutModalButton").click();
      window.location.href = "/";
    }
  },
  onError: (error) => {
    console.log(`this error: ${error}`);
  },
});

onMounted(() => {
  query.refetch();
  useSecurity.refetch();
});
</script>
<style scoped>
.vipLevelSpan {
  color: transparent;
  display: inline-block;
  font-style: normal;
  font-weight: 700;
  position: relative;
  text-shadow: 0 0.01rem 0 rgba(0, 0, 0, 0.4);
  font-family: Arial, Helvetica, sans-serif;
}

.vipLevelSpan::before {
  -webkit-background-clip: text;
  background-clip: text;
  background-image: -webkit-gradient(linear,
      left top,
      left bottom,
      from(#f7ea94),
      color-stop(51%, #e5b952),
      to(#ce9510));
  background-image: linear-gradient(180deg, #f7ea94 0, #e5b952 51%, #ce9510);
  content: attr(data-text);
  background-size: cover;
  height: 100%;
  left: 0;
  position: absolute;
  text-shadow: none;
  top: 0;
  width: 100%;
  z-index: 0;
}

@keyframes rotatePause {
  0% {
    transform: rotate(0deg);
  }

  10% {
    transform: rotate(360deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

.rotateThis {
  animation: rotatePause 10s linear;
}

.van {
  --van-rolling-text-color: white;
  --van-rolling-text-font-size: .35rem;
  --van-rolling-text-item-width: .2rem;
}
</style>
