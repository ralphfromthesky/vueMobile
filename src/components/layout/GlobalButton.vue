<template>
    <div>
        <Button :class="['bg-[#fff0bb] rounded-[0.14rem] text-[.22rem] w-full text-[#05309f]', customClass]"
            :style="{ height: customHeight, width: customWidth, backgroundColor: customBackgroundColor, color: color }">
            <slot></slot>
        </Button>
    </div>
</template>

<script setup>
const props = defineProps({
    customClass: {
        type: String,
        default: ''
    },
    customHeight: {
        type: String,
        default: '0.7rem'
    },
    customWidth: {
        type: String,
        default: '100%'
    },
    customBackgroundColor: {
        type: String,
        default: '#fff0bb'
    },
    color: {
        type: String,
        default: '#05309f'
    }
});
</script>
