<template>
  <PageLayout title="Senha de Login">
    <div class="flex flex-col gap-[.5rem] w-full p-[.2rem]">
      <div class="">
        <span class="text-white text-[.24rem]">Alterar Senha</span>
      </div>
      <div
        class="w-full border-[.01rem] border-[#3A61C2] bg-[#05309F] flex items-center gap-[.2rem] rounded-[.1rem] p-[.2rem]"
      >
        <img src="/images/rpwd.png" alt="" class="w-[.25rem]" />

        <div class="flex w-full justify-between items-center">
          <div class="">
            <input
              class="text-[#A0C5FB] text-[.2rem] bg-transparent outline-none w-full"
              placeholder="Old Passwornd"
              :type="hideShow ? 'text' : 'password'"
              v-model="changeUserPw.opwd"
            />
          </div>
          <div class="">
            <img
              :src="hideShow ? '/eye_30X30.png' : '/eye-slash_30X30.png'"
              alt=""
              class="w-[.3rem]"
              @click="showPw"
            />
          </div>
        </div>
      </div>
      <div
        class="w-full border-[.01rem] border-[#3A61C2] bg-[#05309F] flex items-center gap-[.2rem] rounded-[.1rem] p-[.2rem]"
      >
        <img src="/images/rpwd.png" alt="" class="w-[.25rem]" />

        <div class="flex w-full justify-between items-center">
          <div class="">
            <input
              class="text-[#A0C5FB] text-[.2rem] bg-transparent outline-none w-full"
              placeholder="New Password"
              :type="hideShowNew ? 'text' : 'password'"
              v-model="changeUserPw.pwd"
            />
          </div>
          <div class="">
            <img
              :src="hideShowNew ? '/eye_30X30.png' : '/eye-slash_30X30.png'"
              alt=""
              class="w-[.3rem]"
              @click="showPwNew"
            />
          </div>
        </div>
      </div>
      <div class="flex flex-col gap-[.1rem]">
        <!-- <div class="flex gap-[.1rem] items-center">
                    <span class="text-white text-[.24rem]">Força</span>
                    <div class="w-[.8rem] h-[.12rem] rounded-[.12rem] bg-[#3A61C2] "></div>
                    <div class="w-[.8rem] h-[.12rem] rounded-[.12rem] bg-[#3A61C2] "></div>
                    <div class="w-[.8rem] h-[.12rem] rounded-[.12rem] bg-[#3A61C2] "></div>
                    <div class="w-[.8rem] h-[.12rem] rounded-[.12rem] bg-[#3A61C2] "></div>
                </div>  -->
        <div class="flex items-center gap-[.1rem]">
          <div class="text-white">Forca</div>
          <div class="flex gap-[.1rem]">
            <div
              :class="passwordStrength >= 1 ? 'bg-[#f04646]' : 'bg-[#3A61C2]'"
              class="h-[.10rem] w-[1rem] rounded"
            ></div>
            <div
              :class="passwordStrength >= 2 ? 'bg-[#faee42]' : 'bg-[#3A61C2]'"
              class="h-[.10rem] w-[1rem] rounded"
            ></div>
            <div
              :class="passwordStrength >= 3 ? 'bg-[#fcff43]' : 'bg-[#3A61C2]'"
              class="h-[.10rem] w-[1rem] rounded"
            ></div>
            <div
              :class="passwordStrength >= 4 ? 'bg-[#40ff40]' : 'bg-[#3A61C2]'"
              class="h-[.10rem] w-[1rem] rounded"
            ></div>
          </div>
        </div>
        <div
          class="w-full border-[.01rem] border-[#3A61C2] bg-[#05309F] flex items-center gap-[.2rem] rounded-[.1rem] p-[.2rem]"
        >
          <img src="/images/rpwd.png" alt="" class="w-[.25rem]" />

          <div class="flex w-full justify-between items-center">
            <div class="">
              <input
                class="text-[#A0C5FB] text-[.2rem] bg-transparent outline-none w-full"
                placeholder="Confirmar password"
                :type="confirmShow ? 'text' : 'password'"
                v-model="changeUserPw.confirmPwd"
              />
            </div>
            <div class="">
              <img
              :src="confirmShow ? '/eye_30X30.png' : '/eye-slash_30X30.png'"
                alt=""
                class="w-[.3rem]"
                @click="showConfirm"
              />
            </div>
          </div>
        </div>
      </div>
      <Toast
        v-if="showPwdNotif"
        class="absolute top-[5rem] left-[.6rem]"
        :updateMessage="msg"
      />
    </div>
    <div class="w-full bg-[#05309F] bottom-0 fixed">
      <div class="flex p-[.2rem] items-center justify-center w-full">
        <button
          className="rounded-[.1rem] h-[.7rem] w-full text-[.24rem] text-center text-[#05309F] border-[#FFF0BB] border bg-[#FFF0BB]"
          @click="changePwd.mutate(changeUserPw.value)"
        >
          Seguintes
        </button>
      </div>
    </div>
  </PageLayout>
</template>
<script setup>
import { onUpdated } from "vue";
import PageLayout from "@/components/layout/PageLayout.vue";
import Toast from "@/components/ToastComponent/Toast.vue";
import { changePassword } from "@/global/getUserInfo.js";
import { useRegister } from "@/global/registerQuery.js";
const { userRegister } = useRegister();
const {
  changeUserPw,
  changePwd,
  msg,
  showPwdNotif,
  passwordStrength,
  showPw,
  hideShow,
  showPwNew,
  hideShowNew,
  confirmShow,
  showConfirm,
} = changePassword();

onUpdated(() => {
  changeUserPw.value = "";
});
</script>
