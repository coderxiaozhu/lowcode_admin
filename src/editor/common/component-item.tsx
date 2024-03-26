import { useDrag } from "react-dnd";
import { ItemType } from "../item-type.ts";
import React from "react";

interface ComponentItemProps {
    name: string,
    description: string,
    onDragEnd: any,
}

const ComponentItem: React.FC<ComponentItemProps> = ({ name, description, onDragEnd }) => {
    const [{ isDragging }, drag] = useDrag(() => ({
        // 指定拖拽源的类型
        type: name,
        // 拖拽操作结束时的回调函数
        end: (_, monitor) => {
            const dropResult = monitor.getDropResult()
            if (!dropResult) return;
            onDragEnd && onDragEnd({
                name,
                props: name === ItemType.Button ? { children: '按钮' } : { },
                ...dropResult
            })
        },
        // 用于收集拖拽相关的状态信息
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
            handlerId: monitor.getHandlerId()
        })
    }))
    const opacity = isDragging ? 0.4 : 1
    return (
        <div
            ref={drag}
            className='border-dashed border border-gray-500 bg-white cursor-move py-2 px-5 rounded-lg'
            style={{ opacity }}
        >
            {description}
        </div>
    );
};

export default ComponentItem
