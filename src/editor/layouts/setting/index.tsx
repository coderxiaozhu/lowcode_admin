import React, {useState} from "react";
import {Segmented} from "antd";
import type { SegmentedValue } from 'antd/es/segmented'
import {useComponents} from "../../stores/components.ts";
import ComponentAttr from "./component-attr.tsx";
import ComponentEvent from "./component-event.tsx";

const Setting: React.FC = () => {
    const { curComponentId, curComponent } = useComponents()
    const [key, setKey] = useState<SegmentedValue>('属性')
    if (!curComponentId || !curComponent) return null
    return (
        <div>
            <Segmented options={['属性', '事件']} value={key} onChange={setKey} block />
            <div className='pt-[20px]'>
                {
                    key === '属性' && (
                        <ComponentAttr />
                    )
                }
                {
                    key === '事件' && (
                        <ComponentEvent />
                    )
                }
            </div>
        </div>
    );
};

export default Setting
