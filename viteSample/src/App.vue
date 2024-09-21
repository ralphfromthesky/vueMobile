<template>
  <div>
<h1 @click="changeName">{{ name }}</h1>
{{ ok }}
<HelloWorld :pas="Pass"/>
<HelloWorld :rigor="name"/>

  </div>
</template>

<script setup>
import HelloWorld from './components/HelloWorld.vue'
import Pass from './components/PassComponent.vue'

import {ref, watch, computed} from 'vue'
const name = ref('ralph')

const changeName = () => {
  name.value = 'santolorin'
}

watch(name, () => {
  console.log('change')
})

const ok = computed(() => {
  if(name.value === 'santolorin') {
    return 'chnage the name!'
  }
})
</script>

<style lang="scss" scoped>

</style>