  import {useSignInStore,useLoginStore} from '../globalFunctions/store'
  const checkedRemember = useSignInStore.getState().rememberMe;
 export const closeLogin = () => {
    if (checkedRemember === false) {
      useSignInStore.setState({ rememberMe: false });
      useSignInStore.setState({ userName: "" });
      useSignInStore.setState({ password: "" });
    }
    useSignInStore.setState({ captcha: "" });
    useLoginStore.setState({ isOpen: false });
  };
  