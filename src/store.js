import { reactive } from 'vue'
import { ref } from 'vue';

const OpenSidebar = ref(true)
const openFeedback = ref(false)
const openFeedbackCreate = ref(true)
const myEcho = ref(null)

export const store = reactive({
  SideBareSate: OpenSidebar,
  OpenClose() {
    OpenSidebar.value = !OpenSidebar.value
  }
})

export const storeSuggestion = reactive({
  FeedbackSatate: openFeedback,
  OpenClose() {
    openFeedback.value = true
    openFeedbackCreate.value = false
  }
})
export const storeSuggestionCreate = reactive({
  FeedbackSatateCreate: openFeedbackCreate,
  OpenClose() {
    openFeedbackCreate.value = true
    openFeedback.value = false
  }
})

export const loginModal = reactive({
  myEcho: myEcho
})