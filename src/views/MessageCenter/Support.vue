<template>
  <PageLayout title="Centro de mensagens">
    <div class="flex flex-col gap-[.2rem] p-[.2rem]">
      <div class="flex gap-[.2rem] bg-[#05309F] rounded-[.1rem] p-[.2rem]">
        <div class="flex items-baseline">
          <img
            src="/supportImages/supportProfile.png"
            alt=""
            class="w-[1.7rem]"
          />
        </div>
        <div class="flex flex-col gap-[.2rem] leading-none">
          <span class="text-white text-[.3rem]">Apoio online 24/7</span>
          <span class="text-[.22rem] text-[#6FA4EF]"
            >Converse com o serviço profissional de apoio ao cliente online para
            resolver os seus problemas</span
          >
          <button
            class="text-[#fff0bb] text-[.22rem] rounded-[.1rem] w-[2rem] border border-[#fff0bb] p-[.1rem] leading-none"
          >
            <a
              href="https://www.live700.vip/Chat/Chat?serID=&userName="
              target="_blank"
              >SEUWIN</a
            >
          </button>
        </div>
      </div>
      <div class="flex flex-col bg-[#05309F] rounded-[.1rem]">
        <div class="flex px-[.2rem] h-[.72rem]">
          <div
            class="flex items-center gap-[.2rem] h-[.71rem] border-b-[.05rem] border-b-[#fff0bb]"
          >
            <img src="/images/img_tg.png" alt="" class="w-[.4rem]" />
            <span class="text-[#fff0bb] text-[.22rem]">Telegram Suporte</span>
          </div>
        </div>
        <div class="w-full h-[.01rem] bg-[#3A61C2]"></div>
        <div class="flex p-[.2rem]">
          <div
            class="flex bg-[#1A45B1] p-[.2rem] w-full rounded-[.1rem] justify-between items-center"
          >
            <div class="flex items-center gap-[.2rem]">
              <img src="/images/img_tg.png" alt="" class="w-[.8rem]" />
              <div class="flex flex-col leading-none">
                <span class="text-[#6FA4EF] text-[.25rem]">Contact Informatio</span>
                <span class="text-white text-[.22rem]">{{ store.state.userConfig.content.telegram_url}}</span>
              </div>
            </div>
            <div class="leading-[.2rem]">
              <button
                class="flex items-center text-[.2rem] text-[#05309F] bg-[#FFF0BB] rounded-[.1rem] w-[1.2rem] h-[.5rem]"
              >
                Contactar agora
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="flex flex-col bg-[#05309F] rounded-[.1rem]">
        <div class="flex px-[.2rem] h-[.72rem]">
          <div
            class="flex items-center gap-[.2rem] h-[.71rem] border-b-[.05rem] border-b-[#fff0bb]"
          >
            <img src="/supportImages/instagram.png" alt="" class="w-[.4rem]" />
            <span class="text-[#fff0bb] text-[.22rem]">Instagram</span>
          </div>
        </div>
        <div class="w-full h-[.01rem] bg-[#3A61C2]"></div>
        <div class="flex p-[.2rem]">
          <div
            class="flex bg-[#1A45B1] p-[.2rem] w-full rounded-[.1rem] justify-between items-center"
          >
            <div class="flex items-center gap-[.2rem]">
              <img src="/supportImages/instagram.png" alt="" class="w-[.8rem]" />
              <div class="flex flex-col leading-none">
                <span class="text-[#6FA4EF] text-[.25rem]">Contact Information</span>
                <span class="text-white text-[.22rem]">{{ store.state.userConfig.content.instagram_url}}</span>
              </div>
            </div>
            <div class="leading-[.2rem]">
              <button
                class="flex items-center text-[.2rem] text-[#05309F] bg-[#FFF0BB] rounded-[.1rem] w-[1.2rem] h-[.5rem]"
              >
                Contactar agora
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="flex flex-col bg-[#05309F] rounded-[.1rem]">
        <div class="flex px-[.2rem] h-[.72rem]">
          <div
            class="flex items-center gap-[.2rem] h-[.71rem] border-b-[.05rem] border-b-[#fff0bb]"
          >
            <img src="/supportImages/whatsapp.png" alt="" class="w-[.4rem]" />
            <span class="text-[#fff0bb] text-[.22rem]">WhatsApp</span>
          </div>
        </div>
        <div class="w-full h-[.01rem] bg-[#3A61C2]"></div>
        <div class="flex p-[.2rem]">
          <div
            class="flex bg-[#1A45B1] p-[.2rem] w-full rounded-[.1rem] justify-between items-center"
          >
            <div class="flex items-center gap-[.2rem]">
              <img src="/supportImages/whatsapp.png" alt="" class="w-[.8rem]" />
              <div class="flex flex-col leading-none">
                <span class="text-[#6FA4EF] text-[.25rem]">Contact Information</span>
                <span class="text-white text-[.22rem]">{{ store.state.userConfig.content.whatsapp_url}}</span>
              </div>
            </div>
            <div class="leading-[.2rem]">
              <button
                class="flex items-center text-[.2rem] text-[#05309F] bg-[#FFF0BB] rounded-[.1rem] w-[1.2rem] h-[.5rem]"
              >
                Contactar agora
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="flex flex-col bg-[#05309F] rounded-[.1rem]">
        <div class="flex px-[.2rem] h-[.72rem]">
          <div
            class="flex items-center gap-[.2rem] h-[.71rem] border-b-[.05rem] border-b-[#fff0bb]"
          >
            <img src="/images/fbook.png" alt="" class="w-[.4rem]" />
            <span class="text-[#fff0bb] text-[.22rem]">Facebook</span>
          </div>
        </div>
        <div class="w-full h-[.01rem] bg-[#3A61C2]"></div>
        <div class="flex p-[.2rem]">
          <div
            class="flex bg-[#1A45B1] p-[.2rem] w-full rounded-[.1rem] justify-between items-center"
          >
            <div class="flex items-center gap-[.2rem]">
              <img src="/images/fbook.png" alt="" class="w-[.8rem]" />
              <div class="flex flex-col leading-none">
                <span class="text-[#6FA4EF] text-[.25rem]">Contact Information</span>
                <span class="text-white text-[.22rem]">{{ store.state.userConfig.content.facebook_url}}</span>
              </div>
            </div>
            <div class="leading-[.2rem]">
              <button
                class="flex items-center text-[.2rem] text-[#05309F] bg-[#FFF0BB] rounded-[.1rem] w-[1.2rem] h-[.5rem]"
              >
                Contactar agora
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="flex flex-col bg-[#05309F] rounded-[.1rem]">
        <div class="flex px-[.2rem] h-[.72rem]">
          <div
            class="flex items-center gap-[.2rem] h-[.71rem] border-b-[.05rem] border-b-[#fff0bb]"
          >
            <img src="/supportImages/twitter.png" alt="" class="w-[.4rem]" />
            <span class="text-[#fff0bb] text-[.22rem]">Twitter</span>
          </div>
        </div>
        <div class="w-full h-[.01rem] bg-[#3A61C2]"></div>
        <div class="flex p-[.2rem]">
          <div
            class="flex bg-[#1A45B1] p-[.2rem] w-full rounded-[.1rem] justify-between items-center"
          >
            <div class="flex items-center gap-[.2rem]">
              <img src="/supportImages/twitter.png" alt="" class="w-[.8rem]" />
              <div class="flex flex-col leading-none">
                <span class="text-[#6FA4EF] text-[.25rem]">Contact Information</span>
                <span class="text-white text-[.22rem]">{{ store.state.userConfig.content.twitter_url}}</span>
              </div>
            </div>
            <div class="leading-[.2rem]">
              <button
                class="flex items-center text-[.2rem] text-[#05309F] bg-[#FFF0BB] rounded-[.1rem] w-[1.2rem] h-[.5rem]"
              >
                Contactar agora
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </PageLayout>
</template>
<script setup>
import { onMounted } from "vue";
import PageLayout from "@/components/layout/MessageCenterLayout.vue";
import store from "@/store/store";


</script>
