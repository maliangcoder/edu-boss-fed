<template>
  <div>
    <create-or-update-course
      is-edit
      :course-id="courseId"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import CreateOrUpdateCourse from './components/CreateOrUpdateCourse.vue'
export default Vue.extend({
  name: 'editor',
  props: {
    courseId: {
      type: [String, Number],
      required: true
    }
  },
  components: {
    CreateOrUpdateCourse
  }
})
</script>

<style scoped>

</style>
