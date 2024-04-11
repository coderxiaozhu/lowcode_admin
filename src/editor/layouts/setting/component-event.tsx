import {Button, Collapse, Drawer} from "antd";
import {ItemType} from "../../item-type.ts";
import {useComponents} from "../../stores/components.ts";
import { useRef, useState} from "react";
import FlowEvent from "../flow-event";

// eslint-disable-next-line react-refresh/only-export-components
export const componentEventMap = {
    [ItemType.Button]: [{
        name: 'onClick',
        label: '点击事件'
    }]
}

const ComponentEvent = () => {
    const { curComponent, curComponentId, updateComponentProps } = useComponents()
    const [open, setOpen] = useState(false)
    const [eventName, setEventName] = useState('')
    const flowEventRef = useRef()
    function save() {
        if (!curComponentId) return;
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        const value = flowEventRef.current?.save();

        updateComponentProps(curComponentId, {
            [eventName]: value,
        });

        setOpen(false);
    }
    if (!curComponent) return null
    return (
        <div className='px-[12px]'>
            {(componentEventMap[curComponent.name] || []).map(setting => {
                return (
                    <Collapse key={setting.name} defaultActiveKey={setting.name}>
                        <Collapse.Panel key={setting.name} header={setting.label}>
                            <div className='text-center'>
                                <Button
                                    onClick={() => {
                                        setEventName(setting.name)
                                        setOpen(true)
                                    }}
                                    type='primary'
                                >
                                    设置事件流
                                </Button>
                            </div>
                        </Collapse.Panel>
                    </Collapse>
                )
            })}
            <Drawer
                title='设置事件流'
                width='100vw'
                open={open}
                zIndex={1005}
                onClose={() => { setOpen(false) }}
                extra={(
                    <Button
                        type='primary'
                        onClick={save}
                    >
                        保存
                    </Button>
                )}
                push={false}
                destroyOnClose
                styles={{ body: { padding: 0 } }}
            >
                <FlowEvent flowData={curComponent?.props?.[eventName]} ref={flowEventRef} />
            </Drawer>
        </div>
    )
}

export default ComponentEvent
