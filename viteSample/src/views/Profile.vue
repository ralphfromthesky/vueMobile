<template>
    <div>
        <div>
            <h1>this is profile</h1>
            <TrySlot #default="slotProps"><h1>{{ slotProps.per }} - {{ slotProps.activity }}</h1></TrySlot>
            <!-- <TrySlot/> -->


            <buttonSlot>click</buttonSlot>
            <buttonSlot>Save</buttonSlot>

        </div>
        <input type="text" ref="inputers">
    </div>
</template>

<script setup>
import {ref, onMounted} from 'vue'
import MainLayoutVue from '../MainLayout/MainLayout.vue'
import TrySlot from '../slots/TrySlot.vue'
import buttonSlot from '../slots/buttonSlot.vue'
const inputers = ref(null)

onMounted(() => {
  inputers.value.focus()
})


</script>

<style lang="scss" scoped>

</style>