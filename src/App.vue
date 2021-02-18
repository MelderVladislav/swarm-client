<template>
  <main-page></main-page>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import MainPage from './components/main-page/MainPage.vue'
import TestComponent from './components/test-component/TestComponent.vue'

@Options({
  components: {
    TestComponent,
    MainPage
  },
})
export default class App extends Vue {}
</script>