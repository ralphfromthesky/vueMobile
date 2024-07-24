<template>
    <div class="text-[#ffff6b] italic font-bold jackpot-text">{{ formattedValue }}</div>
  </template>
  

  <script setup>
  import { ref, computed, onMounted, onUnmounted } from 'vue'; 
  const initialAmount = 7651321.00;
  const increment = 0.01;  
  const value = ref(initialAmount);  
  const formattedValue = computed(() => {
    return value.value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  });
  let timer;
  const slowInterval = 500; 
  const mediumInterval = 200; 
  const fastInterval = 100; 
  const cycleTime = 5000; 
  
  const startFast = () => {
    clearInterval(timer);
    timer = setInterval(() => {
      value.value += increment;
    }, fastInterval);
  
    setTimeout(startMedium, cycleTime / 1); 
  };
  
  const startMedium = () => {
    clearInterval(timer);
    timer = setInterval(() => {
      value.value += increment;
    }, mediumInterval);
  
    setTimeout(startSlow, cycleTime / 5); 
  };
  
  const startSlow = () => {
    clearInterval(timer);
    timer = setInterval(() => {
      value.value += increment;
    }, slowInterval);
  
    setTimeout(startFast, cycleTime / 1); 
  };
  
  onMounted(() => {
    startFast(); 
  });
  
  onUnmounted(() => {
    clearInterval(timer);
  });
  </script>
  
  <style scoped>
  div {
    font-size: 2em;
    font-family: 'Courier New', Courier, monospace;
  }

  .jackpot-text {
    @apply  font-bold relative text-yellow-400;
  
    text-shadow: 1px 1px 0px red, -1px -1px 0px red, 1px -1px 0px red, -1px 1px 0px red;
  }
  
  .jackpot-text::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 0.1em;
    background: red;
    z-index: -1;
  }
  </style>
  