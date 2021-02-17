import { defineComponent, ref } from 'vue'

export default defineComponent({
  props: {
    message: {
      type: String,
      required: true
    }
  },

  setup(props) {
    const messageText = ref(props.message)

    return {messageText}
  }
})