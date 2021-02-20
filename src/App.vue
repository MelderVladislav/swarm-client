<template>
    <el-row class="tac">
      <el-col :span="4">
        <el-menu
          router="true">
          <el-menu-item index="/">
            <i class="el-icon-menu"></i>
            <span>Nodes state board</span>
          </el-menu-item>
          <el-menu-item index="/uploader">
            <i class="el-icon-document"></i>
            <span>Uploader</span>
          </el-menu-item>
          <el-menu-item index="/peers">
            <i class="el-icon-setting"></i>
            <span>Peers</span>
          </el-menu-item>
        </el-menu>
      </el-col>
    <el-col :span="20">
      <router-view />
    </el-col>
  </el-row>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';

@Options({
  components: {
  },
})
export default class App extends Vue {}
</script>