<template>
    <div class="toast text-black flex justify-center">
        <div class=" bg-white w-[6rem] rounded-[.1rem] p-[.3rem] h-[1rem] flex justify-center items-center relative">
            <div>{{ message }}</div>
            <div>{{ messageReg }}</div>
            <div>{{ updateMessage }}</div>
            <div> <img src="/alertImages/error.png" class="h-[.4rem] absolute top-[-.2rem] right-[-.2rem]" @click="closeButton"></div>

        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    message: String,
    errorToast: Boolean,
    messageReg: String,
    updateMessage: String
    
})

const emits = defineEmits(['close', 'closeReg'])
const closeButton = () => {
    emits('close', false),
    emits('closeReg', false)
}

</script>

<style scoped>
.toast {
    -webkit-animation: scale-in-center 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
    animation: scale-in-center 0.3s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;
    position: absolute;
    z-index: 100;
}

@-webkit-keyframes scale-in-center {
    0% {
        -webkit-transform: scale(0);
        transform: scale(0);
        opacity: 1;
    }

    100% {
        -webkit-transform: scale(1);
        transform: scale(1);
        opacity: 1;
    }
}

@keyframes scale-in-center {
    0% {
        -webkit-transform: scale(0);
        transform: scale(0);
        opacity: 1;
    }

    100% {
        -webkit-transform: scale(1);
        transform: scale(1);
        opacity: 1;
    }
}
</style>