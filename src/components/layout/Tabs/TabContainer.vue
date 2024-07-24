<template>
    <div :class="`flex items-center gap-[.5rem] h-[.8rem] p-[.2rem] bg-[`+props.bg+`] border-b-[.04rem] border-b-[#3A61C2] w-screen overflow-x-auto overflow-y-hidden text-white`">
        <slot></slot>
    </div>
</template>
<script setup>
const props = defineProps({
  bg: { type: String, required: true },
});
</script>