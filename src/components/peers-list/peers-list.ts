import { defineComponent, ref, onMounted } from 'vue'
import peerClient from '../../services/peers-client'

export default defineComponent({
  props: {
  },

  setup() {
    const tableData = ref([])
    onMounted(async () => {
      console.log('Component is mounted!')
      let data = await peerClient.GetAllPeers()
      console.log(data)
      tableData.value = await peerClient.GetAllPeers()
    })
    return {tableData}
  }
})