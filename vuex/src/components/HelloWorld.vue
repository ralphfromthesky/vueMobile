<template>
  <div class="red">
    <div>Hello world</div>
    <div>
      {{ store.getters['module1/getThis'] }}
    </div>
    <div @click="store.commit('module1/changeName', 'diego')"> 
      {{ store.state.module1.name }}
    </div>

    <div v-if="store.state.module1.isLogin">
       NAKA LOG IN AKO
    </div>
    <button @click="store.commit('module1/login')">ralph</button>
  </div>
</template>

<script setup>
import {useStore} from '../store/store.js'
const store = useStore()
</script>

<style scoped>
.red{
  border: 2px solid red;
}
</style>