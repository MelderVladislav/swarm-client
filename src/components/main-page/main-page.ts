import { defineComponent, ref } from 'vue'
import FileUploader from '../FileUploader.vue';
import NodeStateBoard from '../node-state-board/NodeStateBoard.vue'
import Peers from '../Peers.vue';
import Chequebook from '../Chequebook.vue';

export default defineComponent({
  props: {
  },
  components: {
    FileUploader,
    NodeStateBoard,
    Peers,
    Chequebook
  },
  setup(props) {
    
  }
})