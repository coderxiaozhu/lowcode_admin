import { Space as AntdSpace } from "antd";
import React from "react";
import {useDrop} from "react-dnd";
import {ItemType} from "../../item-type.ts";

interface Props {
    // 当前组件的节点
    children: any;
    // 当前组件的id
    id: number,
    [key: string]: any
}

const Space: React.FC<Props> = ({ children, id, size }) => {
    const [{ canDrop }, drop] = useDrop(() => ({
        accept: [
            ItemType.Space,
            ItemType.Button
        ],
        drop: (_, monitor) => {
            const didDrop = monitor.didDrop()
            if (didDrop) {
                return
            }
            // 这里把当前组件的id返回出去，在拖拽结束事件里可以拿到这个id。
            return {
                id
            }
        },
        collect: (monitor) => ({
            isOver: monitor.isOver(),
            canDrop: monitor.canDrop()
        })
    }))
    if (!children.length) {
        return (
            <AntdSpace ref={drop} size={size} className='p-4' style={{ border: canDrop ? '1px solid #ccc' : 'none' }} data-component-id={id}>
                暂无内容
            </AntdSpace>
        )
    }
    return (
        <AntdSpace ref={drop} size={size} className='p-4' style={{ border: canDrop ? '1px solid #ccc' : 'none' }} data-component-id={id}>
            { children }
        </AntdSpace>
    )
}

export default Space
