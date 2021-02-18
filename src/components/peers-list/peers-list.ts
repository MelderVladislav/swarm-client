import { defineComponent, ref, onMounted } from 'vue'
import peerClient from '../../services/beeClient'

export default defineComponent({
  props: {
  },

  setup() {
    const tableData = ref([])
    onMounted(async () => {

    })
    return {tableData}
  }
})