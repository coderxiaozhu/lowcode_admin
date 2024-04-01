import { create } from "zustand";

interface State {
    data: any
}

interface Action {
    /**
     * 设置变量值
     * @param key key
     * @param value  值
     */
    setData: (key: string, value: any) => void;
    /**
     * 重置数据
     */
    resetData: () => void;
}

export const usePageDataStore = create<State & Action>(set => ({
    data: {},
    setData: (key, value) => set((state) => ({ data: { ...state.data, [key]: value } })),
    resetData: () => set({data: {}})
}))
