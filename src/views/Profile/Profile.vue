<template>
  <PageLayout title="Dados">
    <div class="w-full bg-[#1A45B1] h-[100vh] gap-[.5rem]">
      <div class="flex gap-[.5rem] p-[.2rem]">
        <div class="flex items-center">
          <img src="/images/img_txn15.png" alt="" class="w-[1rem]" />
        </div>
        <div class="flex flex-col">
          <div class="">
            <span class="text-[#FFF0BB] text-[.2rem]">Configurar</span>
          </div>
          <div class="flex gap-[.1rem]">
            <span class="text-[#6FA4EF] text-[.2rem]"
              >ID: {{ store.state.userInfo.userId }}</span
            >
            <img
              src="/copyIcons/Gucci_copy.png"
              alt=""
              class="w-[.3rem] h-[.3rem]"
              @click="copyText('textCopy')"
            />
          </div>
        </div>
      </div>

      <div class="flex flex-col p-[.2rem] gap-[.5rem]">
        <div
          class="w-full border-[.01rem] border-[#3A61C2] flex items-center gap-[.2rem] rounded-[.1rem] p-[.2rem]"
        >
          <img src="/images/username.png" alt="" class="w-[.3rem]" />
          <input
            readonly
            class="text-white text-[.22rem] bg-transparent outline-none"
            :value="store.state.userInfo.username"
            type="text"
          />
        </div>
        <div
          class="w-full border-[.01rem] border-[#3A61C2] flex items-center gap-[.2rem] rounded-[.1rem] p-[.2rem]"
        >
          <img src="/images/phone.png" alt="" class="w-[.3rem]" />
          <input
            readonly
            class="text-white text-[.22rem] bg-transparent outline-none"
            type="text"
            :placeholder="
              store.state.userProfile.userData.phone
                ? store.state.userProfile.userData.phone
                : ''
            "
          />
        </div>
        <div
          class="w-full border-[.01rem] border-[#3A61C2] flex items-center gap-[.2rem] rounded-[.1rem] p-[.2rem]"
        >
          <img src="/images/email.png" alt="" class="w-[.3rem]" />
          <div class="flex justify-between w-full">
            <input
              readonly
              class="text-[#A0C5FB] text-[.22rem] bg-transparent outline-none"
              type="text"
              :placeholder="store.state.userProfile.userData.email"
            />
            <span
              class="text-[.22rem] text-[#fff0bb]"
              data-twe-toggle="modal"
              data-twe-target="#alertBox2"
              data-twe-ripple-init
              >Ir para Vinculação
            </span>
            <Toast
              v-if="updated"
              :updateMessage="msgInfo"
              class="absolute top-[5rem] right-[.5rem]"
            />
          </div>
        </div>
        <div
          class="w-full border-[.01rem] border-[#3A61C2] bg-[#05309F] flex items-center gap-[.2rem] rounded-[.1rem] p-[.2rem] active:border-white"
        >
          <img src="/images/whatsapp.png" alt="" class="w-[.3rem]" />
          <input
            class="text-[#A0C5FB] text-[.22rem] bg-transparent outline-none"
            v-model="obj.whatsapp"
            :placeholder="store.state.userProfile.userData.whatsapp"
            type="text"
          />
        </div>
        <div
          class="w-full border-[.01rem] border-[#3A61C2] bg-[#05309F] flex items-center gap-[.2rem] rounded-[.1rem] p-[.2rem] active:border-white"
        >
          <img src="/images/fbook.png" alt="" class="w-[.3rem]" />
          <input
            class="text-[#A0C5FB] text-[.22rem] bg-transparent outline-none w-full"
            v-model="obj.facebook"
            :placeholder="store.state.userProfile.userData.facebook"
            type="text"
          />
        </div>
        <div
          class="w-full border-[.01rem] border-[#3A61C2] bg-[#05309F] flex items-center gap-[.2rem] rounded-[.1rem] p-[.2rem]"
        >
          <img src="/images/telegram.png" alt="" class="w-[.3rem]" />
          <input
            class="text-[#A0C5FB] text-[.22rem] bg-transparent outline-none w-full"
            type="text"
            v-model="obj.telegram"
            :placeholder="store.state.userProfile.userData.telegram"
          />
        </div>
      </div>
      <div class="">
        <div class="flex items-center justify-center p-[.2rem]">
          <span class="text-white text-[.22rem]">
            Selecione a data de nascimento (depois de definida, não pode ser
            modificada)
          </span>
        </div>

        <div class="p-[.2rem] gap-[.2rem]">
          <div
            class="border-[.01rem] flex border-[#3A61C2] bg-[#05309F] rounded-[.1rem] p-[.2rem]"
          >
            <input
              class="text-[#A0C5FB] text-[.22rem] bg-transparent outline-none w-full"
              :placeholder="store.state.userProfile.userData.birthday"
              type="text"
              readonly
              @click="handleBirthday"
            />
            <div class="text-[#a0c5fb]">></div>
          </div>
        </div>
      </div>

      <div class="w-full bg-[#05309F] bottom-0 fixed">
        <div class="flex gap-[.2rem] p-[.2rem]">
          <button
            className=" rounded-[.1rem] h-[.7rem] w-[3.45rem] text-[.24rem] text-center text-[#FFF0BB] border-[#FFF0BB] border bg-transparent"
            data-twe-toggle="modal"
            data-twe-target="#logOutModal"
            data-twe-ripple-init
          >
            Retomar
          </button>
          <button
            className=" rounded-[.1rem] h-[.7rem] w-[3.45rem] text-[.24rem] text-center text-[#05309F] border-[#FFF0BB] bg-[#FFF0BB]"
            @click="mutateProfile.mutate(obj.value)"
          >
            Salvar
          </button>
        </div>
      </div>
      <LogOutModal>
        <div class="text-white text-center">
          <div class="text-[.3rem] text-[#a0c5fb]">Deseja mesmo retornar?</div>
          <div class="text-[.25rem]">
            As modificações atuais ainda não guardadas. Se voltar, as
            modificações não terão efeito
          </div>
          <div class="flex justify-center gap-[.2rem] mt-[.5rem] mb-1">
            <button
              class="text-nowrap w-[3rem] py-[.2rem] rounded-[.15rem] text-[.3rem] bg-transparent border border-[#FFF0BB] text-[#FFF0BB]"
              data-twe-modal-dismiss
            >
              Cancellar
            </button>
            <button
              class="w-[3rem] py-[.2rem] rounded-[.15rem] text-[.3rem] bg-[#FFF0BB] text-[#1A45B1]"
              @click="navigateTo('/menu')"
              data-twe-modal-dismiss
              aria-label="Close"
            >
              Confirmanr
            </button>
          </div>
        </div>
      </LogOutModal>
      <Alert>
        <div class="text-white text-center">
          <div class="text-[.3rem] text-[#a0c5fb]">Deseja mesmo retornar?</div>
          <div class="text-[.25rem]">
            As modificações atuais ainda não guardadas. Se voltar, as
            modificações não terão efeito
          </div>
          <div class="flex justify-center gap-[.2rem] mt-[.5rem] mb-1">
            <button
              class="text-nowrap w-[3rem] py-[.2rem] rounded-[.15rem] text-[.3rem] bg-transparent border border-[#FFF0BB] text-[#FFF0BB]"
              data-twe-modal-dismiss
            >
              Cancellar
            </button>
            <button
              class="w-[3rem] py-[.2rem] rounded-[.15rem] text-[.3rem] bg-[#FFF0BB] text-[#1A45B1]"
              @click="() => navigateTo('/securityemail')"
              data-twe-modal-dismiss
              aria-label="Close"
            >
              Confirman
            </button>
          </div>
        </div>
      </Alert>
      <ReusableModal
        :msg="message"
        v-if="showModal"
        @close="showModal = false"
        :component-pass="DatePicker"
      />
      <div></div>
    </div>
  </PageLayout>
</template>
<script setup>
import { ref } from "vue";
import DatePicker from "@/components/datePick/DatePicker.vue";
import LogOutModal from "@/components/ModalComponent/LogOutModal.vue";
import Alert from "@/components/ModalComponent/AlertBox2.vue";
import ReusableModal from "@/components/ModalComponent/ReusableModal.vue";
import { navigateTo } from "@/global/navigation.js";
import Toast from "@/components/ToastComponent/Toast.vue";
import PageLayout from "@/components/layout/PageLayout.vue";
import store from "@/store/store";
import { getSecurityInfo } from "@/global/getUserInfo.js";
const showModal = ref(false);
const message = ref("");
const { securityData, useSecurity } = getSecurityInfo();
import { updateAccount } from "@/global/getUserInfo.js";
const { mutateProfile, obj, updated, msgInfo } = updateAccount();

const handleBirthday = () => {
  if (!store.state.userProfile.hasBirthday) {
    showModal.value = true;
  }
};
</script>
