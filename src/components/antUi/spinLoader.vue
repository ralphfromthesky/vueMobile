<template>
    <a-spin :indicator="indicator" class="absolute top-[7rem] right-[3rem] z-10" />
  </template>
  <script setup>
  import { LoadingOutlined } from '@ant-design/icons-vue';
  import { h } from 'vue';
  const props = defineProps({
    loading: Boolean
  })
  const indicator = h(LoadingOutlined, {
    style: {
      fontSize: '1rem',
      color: '#FFF0BB'
    },
    spin: true,
  });
  </script>