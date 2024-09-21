<template>
  <div>
    <HelloWorld/>
    <div>STATE MANAGEMENT</div>
    <div @click="store.commit('module1/increment', 50000)"> {{ store.state.module1.balance }}</div>
    <div> {{ store.state.module1.name }}</div>

    <div>{{ store.getters['module1/getThis'] }}</div>

  </div>
</template>

<script setup>
import HelloWorld from './components/HelloWorld.vue'
import {onMounted, ref, onBeforeMount} from 'vue'
import {useStore} from './store/store.js'
const store = useStore()

onMounted(() => {
  store.dispatch('module1/getData')
})

</script>

<style lang="scss" scoped></style>