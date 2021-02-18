<template>
  <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        prop="peerAddress"
        label="Peer Address"
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        label="Name"
        width="180">
      </el-table-column>
    </el-table>
</template>

<script lang="ts" src="./peers-list.ts"></script>