<script lang="ts">
import beeClient from "@/services/beeClient";
import { Vue } from "vue-class-component";

export default class FileUploader extends Vue {
  superValue = 0;
  filepath = "";
  input: any = null;
  uploading = false;
  hash = "";

  get hashNotEmpty() {
    return this.hash !== "";
  }

  async uploadButtonClickHandler() {
    this.uploading = true;
    const file: File = this.input.input.files[0];
    const hash = await beeClient.Bee.uploadFile(file, file.name);
    this.uploading = false;
    this.hash = hash;
  }
}
</script>

<template>
  <div>
    <h2>FileUploader</h2>

    <p>Upload a file to Swarm</p>
    <el-input
      placeholder="Attach file"
      ref="input"
      type="file"
      v-model="filepath"
    ></el-input>
    <el-button
      @click="uploadButtonClickHandler"
      type="primary"
      :disabled="uploading"
      >Upload</el-button
    >

    <div v-if="hashNotEmpty">Swarm Hash: {{ hash }}</div>
  </div>
</template>