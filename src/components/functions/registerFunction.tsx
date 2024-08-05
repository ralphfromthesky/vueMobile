import { useLoginStore, useModalStates, userRegstore } from "../globalFunctions/store"

export const agreement = () => {
    useModalStates.setState({ termsModal: true })
  }
 export  const handleLoginModal = () => {
    useLoginStore.setState({ isOpen: true })
    userRegstore.setState({ isOpenRegister: false })
  };
  export function evaluatePasswordStrength(passwordData: any) {
      const password = passwordData
      let score = 0;
      if (password.length >= 8) score += 1;
      if (/[a-z]/.test(password)) score += 1;
      if (/[A-Z]/.test(password)) score += 1;
      if (/\d/.test(password)) score += 1;
      if (/[^A-Za-z0-9]/.test(password)) score += 1;
        return score

  }
