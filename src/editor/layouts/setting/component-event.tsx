import {Collapse, Input, Select, TreeSelect} from "antd";
import {ItemType} from "../../item-type.ts";
import {useComponents} from "../../stores/components.ts";
import {useCallback, useState} from "react";
import {getComponentById} from "../../utils/utils.ts";
import {Component} from "../store/types.ts";

// eslint-disable-next-line react-refresh/only-export-components
export const componentEventMap = {
    [ItemType.Button]: [{
        name: 'onClick',
        label: '点击事件'
    }]
}

const componentMethodsMap = {
    [ItemType.Button]: [{
        name: 'startLoading',
        label: '开始loading'
    }, {
        name: 'endLoading',
        label: '结束loading'
    }]
}

const ComponentEvent = () => {
    const { curComponent, curComponentId, updateComponentProps, components } = useComponents()
    const [selectedComponent, setSelectedComponent] = useState<Component | null>(null)
    // 事件类型改变
    const typeChange = useCallback((eventName: string, value: string) => {
        if (!curComponentId) return;
        updateComponentProps(curComponentId, { [eventName]: { type: value } })
    }, [curComponentId, updateComponentProps])
    // 消息类型改变
    const messageTypeChange = useCallback((eventName: string, value: string) => {
        if (!curComponentId) return;
        updateComponentProps(curComponentId, {
            [eventName]: {
                ...curComponent?.props?.[eventName],
                config: {
                    ...curComponent?.props?.[eventName].config,
                    type: value
                }
            }
        })
    }, [curComponentId, updateComponentProps])
    // 消息文本改变
    const messageTextChange = useCallback((eventName: string, value: string) => {
        if (!curComponentId) return;
        updateComponentProps(curComponentId, {
            [eventName]: {
                ...curComponent?.props?.[eventName],
                config: {
                    ...curComponent?.props?.[eventName].config,
                    text: value
                }
            }
        })
    }, [curComponentId, updateComponentProps])
    // 组件改变
    const componentChange = useCallback((eventName: string, value: number) => {
        if (!curComponentId) return;
        setSelectedComponent(getComponentById(value, components))
        updateComponentProps(curComponentId, {
            [eventName]: {
                ...curComponent?.props?.[eventName],
                config: {
                    ...curComponent?.props?.[eventName].config,
                    componentId: value
                }
            }
        })
    }, [curComponentId, getComponentById, updateComponentProps])
    // 组件方法改变
    const componentMethodChange = useCallback((eventName: string, value: string) => {
        if (!curComponentId) return null;
        updateComponentProps(curComponentId, {
            [eventName]: {
                ...curComponent?.props?.[eventName],
                config: {
                    ...curComponent?.props?.[eventName].config,
                    method: value
                }
            }
        })
    }, [curComponentId, updateComponentProps])
    if (!curComponent) return null
    return (
        <div className='px-[12px]'>
            {
                (componentEventMap[curComponent.name] || []).map(setting => {
                    return (
                        <Collapse key={setting.name} defaultActiveKey={setting.name}>
                            <Collapse.Panel key={setting.name} header={setting.label}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                                    <div>动作: </div>
                                    <div>
                                        <Select
                                            style={{ width: 160 }}
                                            options={[
                                                { label: '显示提示', value: 'showMessage' },
                                                { label: '组件方法', value: 'componentFunction' }
                                            ]}
                                            onChange={(value) => { typeChange(setting.name, value) }}
                                            value={curComponent?.props?.[setting.name]?.type}
                                        />
                                    </div>
                                </div>
                                {
                                    curComponent?.props?.[setting.name]?.type === 'componentFunction' && (
                                        <div className='flex flex-col gap-[12px] mt-[12px]'>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                                                <div>组件: </div>
                                                <div>
                                                    <TreeSelect
                                                        style={{ width: 160 }}
                                                        treeData={components}
                                                        fieldNames={{
                                                            label: 'name',
                                                            value: 'id'
                                                        }}
                                                        onChange={(value) => {
                                                            componentChange(setting.name, value)
                                                        }}
                                                        value={curComponent?.props?.[setting.name]?.config?.componentId}
                                                    ></TreeSelect>
                                                </div>
                                            </div>
                                            {
                                                componentMethodsMap[selectedComponent?.name || ""] && (
                                                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                                                        <div>方法:</div>
                                                        <div>
                                                            <Select
                                                                style={{ width: 160 }}
                                                                options={componentMethodsMap[selectedComponent?.name || ""].map(method => ({
                                                                    label: method.label, value: method.name
                                                                }))}
                                                                onChange={(value) => {
                                                                    componentMethodChange(setting.name, value)
                                                                }}
                                                                value={curComponent?.props?.[setting.name]?.config?.method}
                                                            ></Select>
                                                        </div>
                                                    </div>
                                                )
                                            }
                                        </div>
                                    )
                                }
                                {
                                    curComponent?.props?.[setting.name]?.type === 'showMessage' && (
                                        <div className='flex flex-col gap-[12px] mt-[12px]'>
                                            <div style={{display: 'flex', alignItems: 'center', gap: 10}}>
                                                <div>类型:</div>
                                                <div>
                                                    <Select
                                                        className='w-[160px]'
                                                        options={[
                                                            {label: '成功', value: 'success'},
                                                            {label: '失败', value: 'error'}
                                                        ]}
                                                        onChange={(value) => {
                                                            messageTypeChange(setting.name, value)
                                                        }}
                                                        value={curComponent?.props?.[setting.name]?.config?.type}
                                                    />
                                                </div>
                                            </div>
                                            <div style={{display: 'flex', alignItems: 'center', gap: 10}}>
                                                <div>文本:</div>
                                                <div>
                                                    <Input
                                                        className='w-[160px]'
                                                        onChange={(e) => {
                                                            messageTextChange(setting.name, e.target.value)
                                                        }}
                                                        value={curComponent?.props?.[setting.name]?.config?.text}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    )
                                }
                            </Collapse.Panel>
                        </Collapse>
                    )
                })}
        </div>
    )
};

export default ComponentEvent
