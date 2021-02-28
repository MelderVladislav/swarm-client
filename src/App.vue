<template>
  <el-container style="height: 100%">
    <el-header
      style="
        position: sticky; 
        top: 0px; 
        z-index: 3; 
        background-color: #fff;
        box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 2px;
      "
      >beecon</el-header
    >
    <el-container>
      <el-aside width="200px">
        <el-menu router="true">
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
          <el-menu-item index="/chequebook">
            <i class="el-icon-setting"></i>
            <span>Chequebook</span>
          </el-menu-item>
          <el-menu-item index="/dashboard">
            <i class="el-icon-setting"></i>
            <span>Dashboard</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";

@Options({
  components: {},
})
export default class App extends Vue {}
</script>