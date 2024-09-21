<template>
    <div>
        <div class="bg-[red] text-white p-[1rem] border-2 border-[black] rounded-md" v-for="per in person" ::key="per">
            <slot :per="per" :activity="1"></slot>
            <!-- <h1>{{ per }}</h1> -->
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
const person = ref({
    name: 'ralp',
    age: 40,
    location: 'navotas'
})

</script>

<style lang="scss" scoped></style>