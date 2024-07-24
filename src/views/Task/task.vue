<template>
  <Layout>
    <div class="w-screen flex p-[.3rem] gap-1 text-white">
      <div class="flex flex-col gap-1">
        <Spinloader v-if="spinLoad"/>
        <div v-for="(btn, ind) in buttons" :key="ind">
          <button
            :class="
              activebutton === ind ? 'bg-[#2c2ff80e]  text-[#5c5b5b]' : 'bg-[#FFF0BB]'
            "
            class="w-[1.8rem] p-[.1rem] rounded-sm bg-[#FFF0BB] text-[#1A45B1] text-[.22rem] font-bold"
            @click="handleClick(ind, btn.taskId())"
          >
            {{ btn.title }}
          </button>
        </div>
      </div>
      <div>
        <div
          class="py-[.1rem] text-[white]"
          v-for="(mission, ind) in taskData"
          :key="ind"
        >
          <div><img :src="mission?.content?.titleImg" alt="" /></div>
          <div class="my-[.1rem] text-[red]">{{ mission?.content?.title }}</div>
          <div>{{ mission?.content?.actDesc }}</div>
        </div>
      </div>
    </div>
  </Layout>
</template>

<script setup>
import { reactive, ref, onMounted } from "vue";
import Spinloader from "@/components/antUi/spinLoader.vue";
import Layout from "../../components/layout/Layout.vue";
import { getTask } from "@/global/missionEvent.js";
const { task, taskData, spinLoad } = getTask();
const activebutton = ref(null);
const buttons = ref([
  {
    title: "Accumulated valid bets",
    taskId: () => task.mutate({ taskId: 316 }),
  },
  {
    title: "Set up a password for withdrawing cash",
    taskId: () => task.mutate({ taskId: 297 }),
  },
  {
    title: "Install app for the first time",
    taskId: () => task.mutate({ taskId: 318 }),
  },
  { title: "Daily Login", taskId: () => task.mutate({ taskId: 282 }) },
  { title: "First withdrawal", taskId: () => task.mutate({ taskId: 308 }) },
  { title: "Set birthday", taskId: () => task.mutate({ taskId: 364 }) },
  {
    title: "Bind a bank card for the first time",
    taskId: () => task.mutate({ taskId: 312 }),
  },
  { title: "Register account", taskId: () => task.mutate({ taskId: 300 }) },
  { title: "Accumulated recharge", taskId: () => task.mutate({ taskId: 313 }) },
  {
    title: "Accumulated valid bets",
    taskId: () => task.mutate({ taskId: 314 }),
  },
  { title: "Accumulated recharge", taskId: () => task.mutate({ taskId: 315 }) },
]);


const handleClick = (index, taskId) => {
  activebutton.value = index;
  taskId();
};

</script>
