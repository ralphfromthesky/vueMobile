<script setup>
import { ref, onMounted } from 'vue'

const list = ref([
{name: 'ralph', age: 40, location: 'navotas'},
{name: 'shenron', age: 10, location: 'navotas'},
{name: 'gadwin', age: 4, location: 'navotas'}
])

const itemRefs = ref([])

onMounted(() => console.log(itemRefs.value))
</script>

<template>
  <ul>
    <li v-for="item in list" ref="itemRefs">
      {{ item}}
    </li>
  </ul>
</template>

