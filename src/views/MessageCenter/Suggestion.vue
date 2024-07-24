<template>
    <PageLayout title="Centro de mensagens">
        <div class="flex flex-col w-full gap-[.2rem]">
            <div class="flex items-center w-full justify-between p-[.2rem] pb-0">
                <div class="flex items-center leading-none gap-[.2rem]">
                    <button @click="showContentCreate" :class="`text-[.22rem] h-[.55rem] rounded-full  w-[1.5rem] ${showCreate ? 'bg-[#FFF0BB] border-[.01rem] border-[#FFF0BB] text-[#05309F]' : 'bg-[#05309F] border-[.01rem] border-[#3A61C2] text-[#A0C5FB]'}`">
                        Create Feedback
                    </button>
                    <button @click="showContentMy" :class="`text-[.22rem] h-[.55rem] rounded-full  w-[1.5rem] ${showFeedback ? 'bg-[#FFF0BB] border-[.01rem] border-[#FFF0BB] text-[#05309F]' : 'bg-[#05309F] border-[.01rem] border-[#3A61C2] text-[#A0C5FB]'}`">
                        My Feedback
                    </button>
                </div>
                <div class="flex items-center gap-[.2rem]" v-if="showFeedback">
                    <div class="flex flex-col leading-[.3rem] justify-center items-center">
                        <span class="text-[#6FA4EF] text-[.24rem]">Pendente</span>
                        <span class="text-[#FFAA09] text-[.24rem]">R$ 0,00</span>
                    </div>
                    <div class="leading-[.24rem]">
                        <button
                            class="bg-[#999] border-[.01rem] border-[#999] text-[.22rem] h-[.55rem] rounded-[.2rem] text-white w-[1.2rem] cursor-no-drop">Colectar
                            Tudo</button>
                    </div>
                </div>
            </div>
            <CreateFeedBack v-if="showCreate" />
            <MyFeedBack v-if="showFeedback" />
        </div>
    </PageLayout>
</template>
<script setup>
    import PageLayout from '@/components/layout/MessageCenterLayout.vue';
    import CreateFeedBack from './components/SuggestionComponents/CreateFeedback.vue';
    import MyFeedBack from './components/SuggestionComponents/MyFeedback.vue';
    import { reactive, ref } from 'vue';

    const showCreate = ref(true)
    const showFeedback = ref(false)

    const showContentCreate = () => {
        showCreate.value = true
        showFeedback.value = false
    }
    const showContentMy = () => {
        showCreate.value = false
        showFeedback.value = true
    }

</script>