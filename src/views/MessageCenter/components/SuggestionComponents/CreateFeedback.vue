<template>
  <div class="flex flex-col p-[.2rem] pt-0 mb-[1rem]">
    <div class="flex flex-col w-full p-[.2rem] bg-[#05309F] rounded-[.1rem] gap-[.2rem] h-[9.3rem] overflow-auto">
      <div class="flex w-full">
        <span class="text-[.24rem] text-white">Conteúdo do Feedback
          <span class="text-[.24rem] text-[#6FA4EF]">(Relate os problemas e farei melhorias)</span></span>
      </div>
      <div class="flex flex-col items-end gap-[.1rem]">
        <textarea
          class="w-full p-[.2rem] pb-[.3rem] text-[.22rem] rounded-[.1rem] bg-transparent border-[.01rem] border-[#3A61C2] outline-none focus:border-[#FFF0BB] text-white"
          placeholder="Suas opiniões são valiosas para nós. Qualquer sugestão valiosa será considerada, e uma vez adotada, o nível de importância determinará a recompensa em dinheiro. Sinta-se à vontade para fazer sugestões!"
          name="" id="" cols="30" rows="5" v-model="adviceObj.content"></textarea>
        <Toast class="absoute right-3 top-[4.5rem]" :message="toastMsg" v-if="showToast" />
        <span class="text-[#6FA4EF] text-[.2rem]">0/200</span>
      </div>
      <div class="flex flex-col gap-[.2rem]">
        <span class="text-[.24rem] text-white">As imagens não mentem
          <span class="text-[.24rem] text-[#6FA4EF]">(Mais fácil de adotar)</span></span>
        <div
          class="flex flex-col items-center justify-center border-[#3A61C2] border-[.01rem] w-[1.25rem] h-[1.25rem] relative">
          <span class="h-[.37rem] w-[.02rem] bg-[#3A61C2] absolute"></span>
          <span class="w-[.37rem] h-[.02rem] bg-[#3A61C2] absolute"></span>
          <input type="file" name="" id="" class="w-full h-full opacity-0"
            accept="image/png,image/jpeg,image/jpg,image/gif,video/mp4,video/mp4" />
        </div>
        <span class="text-[.24rem] text-[#6FA4EF]">O envio de imagens e vídeos é suportado (com até 50MB)</span>
      </div>
      <div class="flex flex-col mt-[.1rem]">
        <span class="text-[.24rem] text-white">Regras para recompensas</span>
        <span class="text-[.24rem] text-[#6FA4EF]">Estabelecemos bônus substanciais especificamente para coletar
          feedback, a fim de otimizar o sistema e recursos para proporcionar uma
          melhor experiência a você! Uma vez aceitas, as recompensas serão
          concedidas com base na utilidade (exceto aquelas não aceitas).</span>
      </div>
    </div>
  </div>
  <div class="flex items-baseline absolute bottom-0 w-full p-[.2rem] pb-[.4rem] bg-[#05309F]">
    <button
      class="text-[.24rem] text-[#05309F] bg-[#FFF0BB] border border-[#FFF0BB] w-full h-[.7rem] leading-[.22rem] rounded-[.1rem]"
      @click="saveAdvice.mutate(adviceObj.value)">
      Enviar feedback
    </button>
  </div>
</template>

<script setup>
import Toast from "@/components/ToastComponent/Toast.vue";
import { useAdvice } from "@/global/messageCenter.js";
const { adviceObj, saveAdvice, showToast, toastMsg } = useAdvice();
</script>
