import {Component} from "../stores/components.ts";


export function getComponentById(id: number | null, components: Component[]): ReturnType<Component | any> {
    // if (!id) return null
    for (const component of components) {
        if (component.id === id) {
            return component;
        }
        if (component.children && component.children.length > 0) {
            const result = getComponentById(id, component.children)
            if (result !== null) return result
        }
    }
    return null
}
