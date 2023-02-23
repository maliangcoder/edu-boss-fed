<template>
  <div>
    <resouce-list />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import ResouceList from './components/list.vue'

export default Vue.extend({
  name: 'Resource',
  components: {
    ResouceList
  }
})
</script>

<style scoped></style>
