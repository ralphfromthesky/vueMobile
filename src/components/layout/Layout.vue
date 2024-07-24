<!-- <template>
    <main>
        <NavBarTab></NavBarTab>
        <div class="flex bg-[#1a45b1]">
            <section class="h-[calc(100vh-1.7rem)] pb-[.2rem] w-full overflow-auto">
                <div class="flex items-center justify-center w-full">
           
                    <transition name="route" appear>
                        <div v-if="$slots.default">
                            <slot></slot>
                        </div>
                    </transition>

                </div>
            </section>
        </div>
        <BottomNavbar></BottomNavbar>
    </main>
</template>
<script setup>
import BottomNavbar from './Navigation/BottomNavbar.vue'
import NavBarTab from './Navigation/NavBarTab.vue'
</script>


<style scoped>
.route-enter-from {
    opacity: 0;
    transform: translateX(10rem);
}

.route-enter-active {

    transition: all 0.3s ease-out;
}

.route-leave-to {
    opacity: 0;
    transform: translateX(-10rem);
}

.route-leave-active {
    transition: all 0.3s ease-in;
}
</style> -->

<template>
    <main>
      <NavBarTab></NavBarTab>
      <div class="flex bg-[#1a45b1]">
        <section class="h-[calc(100vh-1.7rem)] pb-[.2rem] w-full overflow-auto">
          <div class="flex items-center justify-center w-full">
            <transition :name="transitionName" appear>
              <div v-if="$slots.default">
                <slot></slot>
              </div>
            </transition>
          </div>
        </section>
      </div>
      <BottomNavbar></BottomNavbar>
    </main>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import BottomNavbar from './Navigation/BottomNavbar.vue';
  import NavBarTab from './Navigation/NavBarTab.vue';
  
  const transitionName = ref('route-forward'); 
  
  import { useRouter } from 'vue-router';
  const router = useRouter();
  router.beforeEach((to, from, next) => {
    if (to.meta.index > from.meta.index) {
      transitionName.value = 'route-forward';
    } else {
      transitionName.value = 'route-backward';
    }
    next();
  });
  </script>
  
  <style scoped>
  .route-forward-enter-from {
    opacity: 0;
    transform: translateX(10rem);
  }
  
  .route-forward-enter-active {
    transition: all 0.3s ease-out;
  }
  
  .route-forward-leave-to {
    opacity: 0;
    transform: translateX(-10rem);
  }
  
  .route-forward-leave-active {
    transition: all 0.3s ease-in;
  }
  
  .route-backward-enter-from {
    opacity: 0;
    transform: translateX(-10rem);
  }
  
  .route-backward-enter-active {
    transition: all 0.3s ease-out;
  }
  
  .route-backward-leave-to {
    opacity: 0;
    transform: translateX(10rem);
  }
  
  .route-backward-leave-active {
    transition: all 0.3s ease-in;
  }
  </style>
  
