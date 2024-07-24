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
      :class="{'modas': props.bgColor, 'customColor': props.backGrounds}"

      >
      <component :is="componentPass" @close="handleOk"></component>
      <span class="absolute left-[45%] bottom-[-.8rem]" @click="handleOk">
        <CloseOutlined class="text-bg text-[.3rem] border-4 border-bg p-[.1rem] rounded-[50%]"  />
      </span>
    </a-modal>

  </div>
</template>
<script setup>
import { ref, watch, onMounted } from "vue";
import { CloseOutlined } from "@ant-design/icons-vue";
import Operation from "ant-design-vue/es/transfer/operation";
import {useLogin} from '@/global/loginQuery.js'
const {loginMutation} = useLogin()

const showModal = () => {
  open.value = true;
};
const handleOk = (e) => {
  open.value = false;
  emits('closed', open.value)
};

const emits = defineEmits(['closed'])

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
    default: false
  }
});

const open = ref(props.isOpen);
watch(() => props.isOpen, (newVal) => {
  open.value = newVal
})


</script>

<style>
.modas .ant-modal-content{
  background-color: transparent;
}

.customColor .ant-modal-content {
  background-color: #05309F;
}
</style>
