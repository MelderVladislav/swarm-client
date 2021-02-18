<template>
  <el-tabs>
    <el-tab-pane label="Kronartist"><node-state-board/></el-tab-pane>
    <el-tab-pane label="Sanyek">
      <file-uploader/>
    </el-tab-pane>
    <el-tab-pane label="Peers">
      <peers/>
    </el-tab-pane>
  </el-tabs>
</template>

<script lang="tsx" src="./main-page.ts"></script>