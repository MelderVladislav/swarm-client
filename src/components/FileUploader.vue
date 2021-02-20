<script lang="ts">
import beeClient from "@/services/beeClient";
import { Vue } from "vue-class-component";
import Constants from "../constants";

export default class FileUploader extends Vue {
  superValue = 0;
  filepath = "";
  input: any = null;
  uploading = false;
  hash = "";

  get url() {
    return Constants.BeeAddress + "/files/" + this.hash;
  }

  get hashNotEmpty() {
    return this.hash !== "";
  }

  async uploadButtonClickHandler() {
    this.uploading = true;
    this.hash = "";
    const file: File = this.input.input.files[0];
    const hash = await beeClient.Bee.uploadFile(file, file.name);
    this.uploading = false;
    this.hash = hash;
  }
}
</script>

<template>
  <div>
    <el-alert
      v-if="hashNotEmpty"
      title="Successfully Uploaded"
      type="success"
    >
      Your file is available at this address: <a :href="url" target="_blank">{{ url }}</a>
    </el-alert>

    <p>Upload a file to Swarm</p>
    
    <el-input
      placeholder="Attach file"
      ref="input"
      type="file"
      :disabled="uploading"
      v-model="filepath"
    >
    </el-input>

    <el-button
      @click="uploadButtonClickHandler"
      type="primary"
      :disabled="uploading"
      :loading="uploading"
      >Upload</el-button
    >
  </div>
</template>