<template>
  <div class="create-course">
    <create-or-update-course />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import CreateOrUpdateCourse from './components/CreateOrUpdateCourse.vue'
export default Vue.extend({
  name: 'course-create',
  components: {
    CreateOrUpdateCourse
  }
})
</script>

<style lang="scss" scoped>

</style>
