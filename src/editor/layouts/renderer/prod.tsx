import React, {useRef} from "react";
import { message } from "antd";
import {useComponents} from "../../stores/components.ts";
import {Component} from "../store/types.ts";
import { componentEventMap } from '../setting/component-event.tsx'
import Space from "../../components/space";
import Button from '../../components/button'
import {useVariableStore} from "../../stores/variable.ts";
import {usePageDataStore} from "../store/page-data.ts";
import {ItemType} from "../../item-type.ts";
import {loadRemoteComponent} from "../../utils/utils.ts";

const ComponentMap: { [key: string]: any } = {
    Button: Button,
    Space: Space,
    [ItemType.RemoteComponent]: React.lazy(() => loadRemoteComponent('https://cdn.jsdelivr.net/npm/xiaozhu-remote-component@1.0.2/dist/bundle.umd.js'))
}

const ProdStage: React.FC = () => {
    const { components } = useComponents()
    const componentRefs = useRef<any>({})
    const { variables } = useVariableStore()
    const { setData, data } = usePageDataStore()
    // 获取组件引用
    function getComponentRef(componentId: number) {
        return componentRefs.current[componentId]
    }
    // 执行脚本
    function execScript(script: string) {
        const func = new Function('ctx', script)
        const ctx = { setData, getComponentRef }
        func(ctx)
    }
    // 处理事件
    function handleEvent(component: Component) {
        const props: any = {}
        if (componentEventMap[component?.name]?.length) {
            componentEventMap[component?.name]?.forEach(event => {
                const eventConfig = component?.props[event.name]
                if (eventConfig) {
                    const { type, config } = eventConfig;
                    props[event.name] = () => {
                        if (type === 'showMessage') {
                            if (config?.type === 'success') {
                                message?.success(config?.text)
                            } else if (config?.type === 'error') {
                                message?.error(config?.text)
                            }
                        } else if (type === 'componentFunction') {
                            const component = componentRefs.current[config.componentId]
                            if (component) {
                                component[config.method]?.()
                            }
                        } else if (type === 'setVariable') {
                            const { variable, value } = config
                            if (variable && value) {
                                setData(variable, value)
                            }
                        } else if (type === 'execScript') {
                            execScript(config.script)
                        }
                    }
                }
            })
        }
        return props
    }
    function formatProps(component: Component) {
        return Object.keys(component.props || {}).reduce<any>((prev, cur) => {
            // 如果组件属性是对象, 则判断是静态值还是变量
            if (typeof component.props[cur] === 'object') {
                // 如果是静态值, 则直接赋值, 如果是变量, 则取变量中的默认值
                if (component.props[cur]?.type === 'static') {
                    prev[cur] = component.props[cur].value
                } else if (component.props[cur]?.type === 'variable') {
                    const variableName = component.props[cur].value
                    const variable = variables.find(item => item.name === variableName)
                    // 如果data中有值, 则取data中值. 否则取变量的默认值
                    prev[cur] = data[variableName] || variable?.defaultValue
                }
            } else {
                prev[cur] = component.props[cur]
            }
            return prev
        }, {})
    }
    function renderComponents(components: Component[]): React.ReactNode {
        return components.map((component: Component) => {
            if (!ComponentMap?.[component?.name]) {
                return null
            }
            let props = formatProps(component)
            props = { ...props, ...handleEvent(component) }
            if (ComponentMap[component.name]) {
                return React.createElement(
                    ComponentMap[component.name],
                    {
                        key: component.id,
                        id: component.id,
                        ref: ref => {
                          componentRefs.current[component.id] = ref
                        },
                        'data-component-id': component.id,
                        ...component.props,
                        ...props
                    },
                    component.props.children || renderComponents(component.children || [])
                )
            }
            return null
        })
    }
    return (
        <div>
            <React.Suspense fallback='loading...'>
                { renderComponents(components) }
            </React.Suspense>
        </div>
    );
};

export default ProdStage
