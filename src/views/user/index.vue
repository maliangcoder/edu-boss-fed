<template>
  <div>
    <user-list />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import UserList from './components/UserList.vue'

export default Vue.extend({
  name: 'User',
  components: {
    UserList
  }
})
</script>

<style scoped>

</style>
