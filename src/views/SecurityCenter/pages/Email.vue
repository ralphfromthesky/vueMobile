<template>
  <PageLayout title="Endereço de e-mail">
    <div class="flex flex-col gap-[.5rem] w-full p-[.2rem]">
      <div class="">
        <span class="text-white text-[.24rem]">Vincular o e-mail</span>
      </div>
      <div
        class="w-full border-[.01rem] border-[#3A61C2] bg-[#05309F] flex items-center gap-[.2rem] rounded-[.1rem] p-[.2rem]"
      >
        <img src="/profileImages/bluemail.icon.png" alt="" class="w-[.25rem]" />
        <input
          class="text-[#A0C5FB] text-[.2rem] bg-transparent outline-none w-full"
          :placeholder="store.state.userProfile.userData.email"
          type="text"
          v-model="obj.email"
        />
      </div>
      <Toast
        v-if="updated"
        :updateMessage="msgInfo"
        class="absolute top-[5rem] right-[.5rem]"
      />
    </div>
    <div class="w-full bg-[#05309F] bottom-0 fixed">
      <div class="flex p-[.2rem] items-center justify-center w-full">
        <button
          className="rounded-[.1rem] h-[.7rem] w-full text-[.24rem] text-center text-[#05309F] border-[#FFF0BB] border bg-[#FFF0BB]"
          @click="mutateProfile.mutate(obj.email)"
        >
          Seguintes
        </button>
      </div>
    </div>
  </PageLayout>
</template>
<script setup>
import { onUpdated } from "vue";
import Toast from "@/components/ToastComponent/Toast.vue";
import { getSecurityInfo } from "@/global/getUserInfo.js";
const { useSecurity } = getSecurityInfo();
import PageLayout from "@/components/layout/PageLayout.vue";
import store from "@/store/store";
import { updateAccount } from "@/global/getUserInfo.js";
const { mutateProfile, obj, updated, msgInfo } = updateAccount();

onUpdated(() => {
  if (mutateProfile.isSuccess) {
    useSecurity.refetch();
  }
});
</script>
