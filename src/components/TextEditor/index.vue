<template>
  <div ref="editor" class="text-editor">

  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import E from 'wangeditor'
import { uploadCourseImage } from '@/services/course'

export default Vue.extend({
  name: 'TextEditor',
  props: {
    value: {
      type: String
    }
  },
  mounted() {
    this.initEditor()
  },
  methods: {
    initEditor() {
      const editor = new E(this.$refs.editor as any)
      // 注意：监听事件要在 create 之前
      editor.config.onchange = (value: string) => {
        this.$emit('input',value)
      }
      editor.create() // 创建一个富文本
      // 注意：设置默认值在 create 之后
      editor.txt.html(this.value)

      // 自定义实现图片上传
      editor.config.customUploadImg = async function(resultFiles:any, insetImageFn:any) {
        const fd = new FormData()
        fd.append('file', resultFiles[0])
        const { data } = await uploadCourseImage(fd)
        insetImageFn(data.data.name)
      }
    }
  }
})
</script>

<style scoped>

</style>
