<template>
  <div>
    <h1>this is componenent A</h1>
<component :is="pas"></component>
{{ rigor }}
</div>
</template>

<script setup>
const props = defineProps({
  pas: Object

})
props: {
  rigor: Object
}
</script>

<style lang="scss" scoped>

</style>