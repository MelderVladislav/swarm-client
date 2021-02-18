<template>
  <div>
      <el-table v-loading="isLoading"
      :data="peersStateModel"
      style="width: 100%">
      <el-table-column
        prop="address"
        label="Peer Address">
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
        prop="lastCacheoutHash"
        label="Last Cacheout Hash">
      </el-table-column>
      <el-table-column
      label="Operations"
      width="180">
      <template #default="scope">
        <el-button
          @click.prevent="getPaymentInfo(scope.$index, peersStateModel)"
          type="text"
          size="small">
          Get last hash
        </el-button>
      </template>
    </el-table-column>
    </el-table>
  </div>
</template>
<script lang="ts" src="./node-state-board.ts"></script>