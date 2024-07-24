<template>
  <Layout>
    <div class="flex flex-col w-screen gap-[.2rem] p-[.2rem]">
      <div class="flex items-center bg-[#05309F] rounded-[.1rem] p-[.2rem] relative w-full h-[2rem]">
        <div
          class="flex items-center justify-center p-[.05rem] bg-[#FF4A4A] top-0 left-0 w-[1.5rem] rounded-tl-[.1rem] rounded-br-[.1rem] absolute">
          <span class="text-white text-[.2rem] font-bold">Actual Level</span>
        </div>
        <div class="flex items-end justify-between w-full">
          <div class="flex gap-[.2rem] items-center">
            <div class="flex items-center justify-center relative">
              <img class="w-[1.2rem]" :src="`/vipImages/medalLevel` + (vipCurLevel?.content?.curDegreeLevel == 0 ? 0 : vipCurLevel?.content?.curDegreeLevel < 6 ? 1 : vipCurLevel?.content?.curDegreeLevel < 11 ? 2 : vipCurLevel?.content?.curDegreeLevel < 14 ? 3 : vipCurLevel?.content?.curDegreeLevel < 41 ? 4 : 0) + `.png`" alt="">
              <img class="w-[1.2rem] absolute" :src="`/vipImages/ribbonLevel` + vipCurLevel?.content?.curDegreeLevel + `.png`" alt="">
              <div class="absolute">
                <span :data-text="vipCurLevel?.content?.curDegreeLevel" class="text-[.45rem] vipLevelSpan">{{
                  vipCurLevel?.content?.curDegreeLevel }}</span>
              </div>
            </div>
            <div class="flex justify-center flex-col leading-none">
              <span class="flex items-center gap-[.1rem] text-[.28rem] text-[#A0C5FB]">Restantes<span
                  class="italic font-bold text-[.25rem] text-[#FF4A4A]">{{ vipCurLevel?.content?.newDegreeName
                  }}</span></span>
              <span class="flex items-center gap-[.1rem] text-[.28rem] text-[#A0C5FB]">aposte mais <span
                  class="font-bold text-[.25rem] text-white">{{ vipCurLevel?.content?.nextDegreeDepositMoney
                  }}</span></span>
            </div>
          </div>
          <div class="flex flex-col gap-[.2rem]">
            <button
              class="flex w-[1.5rem] bg-[#999] rounded-[.15rem] h-[.6rem] p-[.1rem] items-center justify-center leading-none text-white">Coletar
              Tudo</button>
            <button
              class="flex w-[1.5rem] bg-[#FFF0BB] rounded-[.15rem] h-[.6rem] p-[.1rem] items-center justify-center leading-none text-[#05309F]">History</button>
          </div>
        </div>
      </div>

      <div class="flex flex-col">
        <div class="flex mb-[.4rem]">
          <span class="text-white text-[.4rem]">Lista de níveis VIP</span>
        </div>
        <div class="flex flex-nowrap gap-[.5rem] w-full overflow-auto border-b border-b-[#3A61C2]">
          <div class="flex border-b-[.05rem] border-b-[#FFF0BB] pb-[.25rem]">
            <span class="text-nowrap text-[#FFF0BB] text-[.25rem]">Bônus De Aumento De Nível</span>
          </div>
          <!-- <div class="flex">
            <span class="text-nowrap text-white text-[.25rem] pb-[.25rem]">Bônus Semanal</span>
          </div>
          <div class="flex">
            <span class="text-nowrap text-white text-[.25rem] pb-[.25rem]">Bônus Mensal</span>
          </div>
          <div class="flex">
            <span class="text-nowrap text-white text-[.25rem] pb-[.25rem]">Privilégio VIP</span>
          </div> -->
        </div>
        <div
          class="my-[.2rem] max-h-[calc(100vh-5rem)] min-h-auto overflow-y-auto border-b-[.02rem] border-b-[#3A61C2]">
          <div class="grid grid-cols-3 gap-[.2rem] border border-[#3A61C2] rounded-[.1rem] p-[.15rem]">
            <div class="flex justify-center items-center">
              <span class="text-center text-white text-[.25rem] leading-none">Nivel</span>
            </div>
            <div class="flex justify-center items-center">
              <span class="text-center text-white text-[.25rem] leading-none text-nowrap">Aposta para promoção</span>
            </div>
            <div class="flex justify-center items-center">
              <span class="text-center text-white text-[.25rem] leading-none">Bônus De Aumento De Nível</span>
            </div>
          </div>
          <!-- start of table body -->
          <div v-for="(vipItems, indexes) in vipLevels.content"
            class="grid grid-cols-3 gap-[.2rem] even:bg-[#05309F] rounded-[.1rem] p-[.15rem]" :style="vipItems.level == vipCurLevel.content.curDegreeLevel && `border: .02rem solid; border-color: #FFF0BB`">
            <!-- border border-[#FFF0BB] -->
            <div class="flex justify-center items-center">
              <div class="flex items-center justify-center relative">
                <img class="w-[.9rem]" :src="`/vipImages/medalLevel` + (vipItems.level == 0 ? 0 : vipItems.level < 6 ? 1 : vipItems.level < 11 ? 2 : vipItems.level < 14 ? 3 : vipItems.level < 41 ? 4 : 0) + `.png`" alt="">
                <img class="w-[.9rem] absolute" :src="`/vipImages/ribbonLevel` + vipItems.level + `.png`" alt="">
                <div class="absolute">
                  <span :data-text="vipItems.level" class="text-[.35rem] vipLevelSpan">{{ vipItems.level }}</span>
                </div>
              </div>
            </div>
            <div class="flex justify-center items-center">
              <span class="text-center text-white text-[.25rem] leading-none text-nowrap">
                <div v-if="vipItems.depositMoney == 0" class="w-[.2rem] bg-[#6FA4EF] rounded-[.02rem] h-[.03rem] m-auto" />
                <div class="text-center flex items-center justify-center flex-col w-[3rem]">
                  <span v-if="vipItems.depositMoney > 0" class="text-center text-white text-[.25rem] leading-none text-nowrap">{{ vipItems.depositMoney }}</span>
                  <div v-if="vipCurLevel.content?.newDegreeLevel == vipItems?.level" class="bg-white w-full rounded-full overflow-hidden relative flex">
                    <div :style="`width:` + (100 * vipCurLevel.content?.curDegreeDepositMoney) / vipCurLevel.content?.newDegreeDepositMoney + `%`" class="flex bg-amber-500  rounded-full  items-center h-[.25rem]">
                      <span class="flex justify-center items-center absolute w-full text-[#000] text-[.18rem]">{{ vipCurLevel.content.curDegreeDepositMoney }} / {{ vipCurLevel.content.newDegreeDepositMoney }}</span>
                    </div>
                  </div>
                </div>
              </span>
            </div>
            <div class="flex justify-center items-center">
              <span class="text-center text-white text-[.25rem] leading-none">
                <div v-if="vipItems.upgradeMoney == 0" class="w-[.2rem] bg-[#6FA4EF] rounded-[.02rem] h-[.03rem]" />
                <span v-if="vipItems.upgradeMoney > 0" class="text-center text-white text-[.25rem] leading-none text-nowrap">{{ vipItems.depositMoney }}</span>
              </span>
            </div>
          </div>
          <!-- end of table body -->
        </div>
        <div class="flex flex-col mt-[.2rem]">
          <div class="InstructionTitle">
            <span class="text-white text-[.35rem] p-[.2rem]">Instruções sobre regras VIP</span>
          </div>
          <div class="bg-[#3A61C2] w-full h-[.01rem] my-[.25rem]" />
          <div class="p-[.2rem] pt-0">
            <span class="text-[#A0C5FB] text-[.265rem] leading-2">
              1.Padrão de promoção: atenda aos requisitos da promoção VIP (ou seja, a recarga ou apostas eficazes podem
              atender às condições), você pode avançar para o nível VIP correspondente e obter o bônus de promoção
              correspondente.O bônus pode ser recebido de tempos em tempos;
              <br />
              2.Salário diário: Se a recarga diária e as apostas válidas atenderem aos requisitos salariais diários do
              nível atual, você poderá obter o bônus salarial diário correspondente. Se você avançar para vários níveis
              consecutivos, só poderá obter o bônus salarial diário do atual nível.O bônus pode ser recebido de tempos
              em tempos;
              <br />
              3.Salário Semanal: Se a recarga semanal e as apostas válidas atenderem ao nível atual de requisitos
              salariais semanais, você poderá obter o bônus salarial semanal correspondente. Se você avançar para vários
              níveis consecutivos, poderá obter apenas o nível atual de bônus salarial semanal.O bônus pode ser recebido
              de tempos em tempos;
              <br />
              4.Lulu mensal: recarga mensal e apostas efetivas para atender ao nível atual do Lulu mensal, e você pode
              obter o bônus de prêmio mensal correspondente.O bônus pode ser recebido de tempos em tempos;
              <br />
              5.Tempo de Expiração da Recompensa: O bônus recebido fica disponível por %d dias. Se não for resgatado
              ativamente durante esse período, ele será automaticamente creditado na conta. Por exemplo: se uma
              recompensa for obtida em 1º de janeiro e retida por %d dias, será automaticamente creditada na conta em %d
              de janeiro às 00:00:00.
              <br />
              6.Instruções para auditoria: o bônus VIP oferecido pode ser levantado apenas após o cumprimento do
              requisito de rollover 1x (ou seja, auditoria, apostas ou apostas válidas), independentemente da plataforma
              em que joga;
              <br />
              7.Declarações: Esta função está limitada às operações normais dos titulares de contas. É proibido alugar
              contas, efetuar apostas sem risco (apostas com contas diferentes, swiping mútuo e swiping de odds baixas),
              arbitragem viciosa, utilizar plug-ins, robôs, exploração de acordos, lacunas, interfaces, controlo de
              grupo ou outros meios técnicos de participação; caso contrário, uma vez provado, a plataforma tem o
              direito de proibir os membros de iniciar sessão, suspender a utilização do nosso website, e confiscar o
              bônus e os ganhos indevidos, sem qualquer aviso especial;
              <br />
              8.Instruções: Ao reclamar o bônus VIP, considera-se que os membros aceitam e cumprem as regras
              correspondentes. A fim de evitar diferenças na compreensão do texto, a plataforma reserva o direito final
              de interpretar esta atividade.
            </span>
          </div>
        </div>
      </div>
    </div>
  </Layout>
</template>

<script setup>
import Layout from "../../components/layout/Layout.vue";
// import Tabs from "../../components/layout/Tabs/TabPage.vue";
// import TabContainer from "../../components/layout/Tabs/TabContainer.vue";

import { ref } from "vue";
import { useQuery } from "@tanstack/vue-query";
import { axiosGet2 } from '../../components/axios/AxiosHook.js'

const vipLevels = ref([]);
const vipCurLevel = ref([]);
const { isLoading } = useQuery({
  queryKey: ["vipLevels"],
  queryFn: async () => await axiosGet2("/api/native/v2/getVips.do?lan=en&pageSize=30"),
  staleTime: 1000,
  select: (data) => {
    vipLevels.value = data;
  },
});
const { isLevelLoading } = useQuery({
  queryKey: ["vipCurLevel"],
  queryFn: async () => await axiosGet2("/api/native/v2/getDegreeInfo.do?lan=en"),
  staleTime: 1000,
  select: (data) => {
    vipCurLevel.value = data;
  },
});
</script>

<style scoped>
.vipLevelSpan {
  color: transparent;
  display: inline-block;
  font-style: normal;
  font-weight: 700;
  position: relative;
  text-shadow: 0 .01rem 0 rgba(0, 0, 0, .4);
  font-family: Arial, Helvetica, sans-serif;
}

.vipLevelSpan::before {
  -webkit-background-clip: text;
  background-clip: text;
  background-image: -webkit-gradient(linear, left top, left bottom, from(#f7ea94), color-stop(51%, #e5b952), to(#ce9510));
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
</style>