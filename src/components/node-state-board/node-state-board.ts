import { defineComponent, ref, onMounted } from 'vue'
import { Bee, BeeDebug } from "@ethersphere/bee-js";

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