<template>
  <div class="h-screen w-screen bg-[red] flex justify-center items-center">
    <div class="border-2 border-white">

    <iframe :src="props.gamePass" frameborder="0" class="w-screen"></iframe>{{ props.passive }}
    Lorem ipsum dolor sit amet.bxcbxcgxcb
    </div>
  </div>
</template>

<script setup>

const props = defineProps({
    gamePass: {
        type: String,
        required: true
    },
    passive: {
        type: String,
        default: ''
    }
})
</script>

<style lang="scss" scoped></style>
