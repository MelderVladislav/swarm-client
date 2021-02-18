<template>
  <div>
      <el-table
      :data="peersStateModel"
      style="width: 100%">
      <el-table-column
        prop="address"
        label="Peer Address"
        width="300">
      </el-table-column>
      <el-table-column
        prop="sent"
        label="Sent"
        width="180">
      </el-table-column>
      <el-table-column
        prop="received"
        label="Received"
        width="180">
      </el-table-column>
      <el-table-column
        prop="balance"
        label="Balance"
        width="180">
      </el-table-column>
      <el-table-column
      fixed="right"
      label="Operations"
      width="120">
      <template #default="scope">
        <el-button
          @click.prevent="getPaymentInfo(scope.$index)"
          type="text"
          size="small">
          Remove
        </el-button>
      </template>
    </el-table-column>
    </el-table>
  </div>
</template>
<script lang="ts" src="./node-state-board.ts"></script>