<template>
    <div>
        <div>
            <div v-if="showDiv">
                <h1>tadan!!!!</h1>

            </div>
            <h1>this is about</h1>
            <h1>{{ name }}</h1>

            <div v-for="(value, key) in person" :key="key" @click="change">
                {{ key }}: {{ value }}
            </div>
        </div>

        <input type="text" ref="inputRef" v-model="inputValue">
        {{ inputValue }}
    </div>
</template>

<script setup>
import { onMounted, ref, watch, reactive } from 'vue'
import MainLayoutVue from '../MainLayout/MainLayout.vue'

const name = ref('ralph')
const showDiv = ref(false)
const inputRef = ref(null);
const inputValue = ref('')


onMounted(() => {
    name.value = 'santolorin'
    inputRef.value.focus();
})

const person = reactive({
    name: 'miya',
    lastname: 'khalifa'
})

const change = () => {
    person.name = 'wow!'

}

watch(person, () => {
    console.log('it changed')
    showDiv.value = true;

}, { deep: true })
</script>

<style lang="scss" scoped></style>