import { create } from "zustand";
import {getComponentById} from "../utils/utils.ts";
// import component from "../layouts/store";

export interface Component {
    // 组件唯一标识
    id: number;
    // 组件名称
    name: string;
    // 组件属性
    props: any;
    // 父组件id
    parentId?: number;
    // 组件描述
    desc?: string;
    // 子组件
    children?: Component[]
}

interface State {
    components: Component[],
    curComponentId?: number | null,
    curComponent: Component | null,
    mode: 'edit' | 'preview'
}

interface Action {
    /**
     * 添加组件
     * @param component 组件属性
     * @param parentId  上级组件id
     */
    addComponent: (component: Component, parentId?: number) => void;
    /**
     * 设置当前组件id
     * @param componentId
     */
    setCurComponentId: (componentId: State['curComponentId']) => void;
    /**
     * 更新组件属性
     * @param componentId
     * @param props
     */
    updateComponentProps: (componentId: number, props: any) => void;
    setMode: (mode: State['mode']) => void
}

export const useComponents = create<State & Action>((set, get) => ({
    components: [],
    curComponent: null,
    mode: 'edit',
    addComponent: (component, parentId) => {
        set(state => {
            // 如果上级id, 把当前组件添加到父组件的子组件中
            if (parentId) {
                // 通过父id递归查找组件
                const parentComponent = getComponentById(parentId, state.components)
                if (parentComponent) {
                    if (parentComponent?.children) {
                        parentComponent.children.push(component)
                    } else {
                        parentComponent.children = [component]
                    }
                }
                // component.parentId = parentId
                return { components: [...state.components] }
            }
            return { components: [...state.components, component] }
        })
    },
    setCurComponentId: (componentId: State['curComponentId']) => {
        const state = get()
        return set({
            curComponentId: componentId,
            curComponent: getComponentById(componentId as number, state.components)
        })
    },
    updateComponentProps: (componentId, props) => {
        set((state) => {
            const component = getComponentById(componentId, state.components)
            if (component) {
                component.props = { ...component.props, ...props }
                if (componentId === state.curComponentId) {
                    return {
                        curComponent: component,
                        components: [...state.components]
                    }
                }
                return { components: [...state.components] }
            }
            return { components: [...state.components] }
        })
    },
    setMode: (mode: State["mode"]) => {
        set(() => {
            return { mode }
        })
    }
}))
