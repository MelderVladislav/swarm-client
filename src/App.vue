<template>
  <test-component message="sanyek"></test-component>
  <el-button>Commit</el-button>
  <main-page></main-page>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import MainPage from './components/main-page/MainPage.vue'
import TestComponent from './components/test-component/TestComponent.vue'
import FileUploader from './components/file-uploader/FileUploader.vue'

@Options({
  components: {
    TestComponent,
    MainPage,
    FileUploader,
  },
})
export default class App extends Vue {}
</script>