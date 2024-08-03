<template>
  <div>
    <!-- <a-button type="primary" @click="showModal">Open Modal</a-button> -->
    <a-modal
      v-model:open="open"
      @ok="handleOk"
      :v-if="isOpen"
      :footer="null"
      :closable="false"
      centered
      :class="{ modas: props.bgColor, customColor: props.backGrounds }"
      @cancel="open"
    >
      <component :is="componentPass" @close="handleOk"></component>
      <span
        class="absolute left-[45%] bottom-[-.8rem]"
        id="handleThis"
        @click="handleOk"
      >
        <CloseOutlined
          class="text-bg text-[.3rem] border-4 border-bg p-[.1rem] rounded-[50%]"
        />
      </span>
    </a-modal>
  </div>
</template>
<script setup>
import { ref, watch, onMounted, defineExpose } from "vue";
import { CloseOutlined } from "@ant-design/icons-vue";
import { useLogin } from "@/global/loginQuery.js";
const { loginMutation } = useLogin();
import { useStore } from "@/store/store";
const store = useStore();

const showModal = () => {
  open.value = true;
};
const handleOk = (e) => {
  open.value = false;
  emits("closed", open.value);
};

const handeClose = () => {
  open.value = false;
};

const emits = defineEmits(["closed"]);

const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true,
  },
  pass: {
    type: String,
  },
  title: String,
  componentPass: {
    type: Object,
    default: () => ({}),
  },
  bgColor: {
    type: Boolean,
    default: false,
  },
  backGrounds: {
    type: Boolean,
    default: false,
  },
  newMessage: {
    type: String,
    default: ''
  }
});

const open = ref(props.isOpen);
watch(
  () => props.isOpen,
  (newVal) => {
    open.value = newVal;
  }
);

// onMounted(() => {
//   const closed = document.getElementById("handleThis");
//   if (store.state.userInfo.isLogin === true) {
//     closed.addEventListener("click", handleOk);
//     closed.click()
//   }
// });
</script>

<style>
.modas .ant-modal-content {
  background-color: transparent;
}

.customColor .ant-modal-content {
  background-color: #05309f;

}
</style>
