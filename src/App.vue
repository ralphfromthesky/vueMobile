<script setup>
import {contextHolder} from '@/components/antUi/antMessage.js'
import { RouterLink, RouterView } from 'vue-router'
import HelloWorld from './components/HelloWorld.vue'
import { useGetDegreeInfo } from '@/global/getDegreeInfo.js';
import { onMounted } from 'vue';


const { degreeInfo } = useGetDegreeInfo()

onMounted(() => {
  // const accountInfo = store.state.userInfo
  // if (accountInfo.isLogin === false) {
  //   registerConfig.refetch()
  // }
  degreeInfo.refetch()
})
</script>

<template>
    <context-holder />

  <RouterView />
</template>

<style scoped></style>
