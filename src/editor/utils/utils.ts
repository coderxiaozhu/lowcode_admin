import React from "react";
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

export async function loadRemoteComponent(url: string) {
    const script = await fetch(url).then(res => res.text())
    const module = { exports: {} }
    const exports = {}
    // 因为上面代码里用到了react，所以要把react注入进去，不然会报错
    const require = (id: string) => {
        if (id === 'react') {
            return React
        }
    }
    const process = { env: { NODE_ENV: 'production' } };
    const func = new Function('module', 'exports', 'require', 'process',  script)
    func(module, exports, require, process)
    return { default: module.exports } as any
}
