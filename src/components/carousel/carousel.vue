<template>
  <Carousel :autoplay=2000 :wrapAround=true>
    <Slide v-for="(image, index) in bannerImage" :key="index">
      <img :src="image.titleImg" class="w-full h-[2rem]">
    </Slide>

    <template #addons>
      <!-- <Navigation /> -->
      <Pagination v-if="bannerImage.length" />
    </template>
  </Carousel>
</template>

<script setup>
import { getBanner } from "@/global/getUserInfo.js";
import 'vue3-carousel/dist/carousel.css'
import { Carousel, Slide, Pagination, Navigation } from 'vue3-carousel'

const { bannerImage } = getBanner();
</script>

<style>
.carousel__pagination-button--active::after {
  background-color: #f4eded;
  height: .1rem;
  width: .1rem;
  border-radius: 50%;
}

.carousel__pagination-button::after {
  height: .1rem;
  width: .1rem;
  border-radius: 50%;
}

.carousel__pagination {
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  bottom: .2rem
}
.carousel{
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.carousel__viewport{
  width: 100%;
}
</style>