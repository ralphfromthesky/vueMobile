
<template>
    <a-tabs v-model:activeKey="activeKey">
      <a-tab-pane v-for="(tab, index) in props.tabName" :key="index" :tab="tab.name" :force-render="true">
        {{ tab.value || tab.value[1]}}
      </a-tab-pane>
    </a-tabs>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const activeKey = ref('1');
  
  const props = defineProps({
    tabName: {
      type: Array,
      required: true
    },
    title: String,
    content: String,
    Boolean: {
      type: Boolean,
      required: true
    }
  });
  </script>
  