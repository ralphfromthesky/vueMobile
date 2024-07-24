<template>
    <div>
      <div class="roulette-container">
        <div class="roulette" :class="{ 'spinning': isSpinning }">
          <div class="award" v-for="(award, index) in awards" :key="index">
          </div>
        </div>
      </div>
      <button @click="startRoulette" :disabled="isSpinning">Start Roulette</button>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const awards = ref(['Award 1', 'Award 2', 'Award 3', 'Award 4', 'Award 5', 'Award 6', 'Award 7', 'Award 8']);
  const isSpinning = ref(false);
  const selectedAward = ref('');
  
  const startRoulette = () => {
    isSpinning.value = true;
  
    // Simulate spinning for 15 seconds (15000ms)
    setTimeout(() => {
      // Stop spinning and select an award
      isSpinning.value = false;
      selectAward();
    }, 15000);
  };
  
  const selectAward = () => {
    // Select a random award
    const randomIndex = Math.floor(Math.random() * awards.value.length);
    selectedAward.value = awards.value[randomIndex];
  };
  </script>
  
  <style scoped>
  .roulette-container {
    width: 100%;
    height: 200px;
    overflow: hidden;
    position: relative;
  }
  
  .roulette {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
    border: 1px solid #ccc;
    position: absolute;
    transition: transform 15s ease-out;
  }
  
  .spinning {
    animation: spin 15s linear infinite;
  }
  
  @keyframes spin {
    to {
      transform: translateY(-800px);
    }
  }
  
  .award {
    width: 100px;
    height: 50px;
    background-color: #f0f0f0;
    border: 1px solid #ccc;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 14px;
  }
  </style>
  