import { createStore } from "vuex";
import employee from "./employee/employee";

const store = createStore({
    modules: {
        module1: employee
        
    }
})

export default store;
export const useStore = () => {
    return store;
}