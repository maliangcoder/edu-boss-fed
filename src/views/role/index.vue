<template>
  <div>
    <role-list />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import RoleList from './components/List.vue'
export default Vue.extend({
  name: 'Role',
  components: {
    RoleList
  }
})
</script>

<style scoped></style>
