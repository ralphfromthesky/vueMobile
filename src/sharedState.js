import { ref } from 'vue';

const hideThisDiv = ref(true);
const myName = ref('chupa eng el chupa kabra');

export const sharedState = () => {
  const hideThis = () => {
    hideThisDiv.value = !hideThisDiv.value;
  };

  return {
    hideThisDiv,
    hideThis,
    myName,
  };
};
