<template>
  <div>
    <create-or-edit :is-edit="true" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import CreateOrEdit from './components/CreateOrEdit.vue'
export default Vue.extend({
  name: 'menu-edit',
  components: {
    CreateOrEdit
  },
  data() {
    return {
    }
  },
  methods: {
  }
})
</script>

<style scoped></style>
