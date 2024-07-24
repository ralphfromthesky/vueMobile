<template>
    <router-link :to="props.link">
        <div class="flex link-content items-center justify-center relative h-[.8rem]">
            <span class="text-[.27rem] text-nowrap">{{ props.title }}</span>
        </div>
    </router-link>
</template>

<script setup>
const props = defineProps({
    title: {type: String, required: true},
    link: {type: String, required: true}
})
</script>
<style scoped>
.router-link-active .link-content {
    border-bottom: 3px solid hsl(47, 100%, 87%);
    color: hsl(47, 100%, 87%);
}
</style>