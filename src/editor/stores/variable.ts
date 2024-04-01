import { create } from "zustand";

export interface Variable {
    // 变量名
    name: string;
    // 默认值
    defaultValue: string;
    // 备注
    remark: string;
}

interface State {
    variables: Variable[]
}

interface Action {
    setVariables: (variables: Variable[]) => void;
}

export const useVariableStore = create<State & Action>(set => ({
    variables: [],
    setVariables: (variables) => set({variables})
}))
