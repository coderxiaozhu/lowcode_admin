// import component from '../store'
import { Component } from "../store/types.ts";
import {Button} from "antd";
import React, {useEffect, useRef} from "react";
import {useDrop} from "react-dnd";
import {ItemType} from "../../item-type.ts";
import {useComponents} from "../../stores/components.ts";
import SelectedMask from "../../common/selected-mask.tsx";
import Space from '../../components/space/index.tsx'

const ComponentMap: { [key: string]: any } = {
    Button: Button,
    Space: Space
}

const Renderer: React.FC = () => {
    const { components, curComponentId, setCurComponentId } = useComponents()
    const selectedMaskRef = useRef<any>(null)
    useEffect(() => {
        if (selectedMaskRef?.current) {
            selectedMaskRef.current.updatePosition()
        }

    }, [components]);
    function renderComponents(component: Component[]): React.ReactNode {
        return component.map((cpn: Component) => {
            if (!ComponentMap[cpn.name]) {
                return null
            }
            if (ComponentMap[cpn.name]) {
                return React.createElement(
                    ComponentMap[cpn.name],
                    {
                        key: cpn.id,
                        id: cpn.id,
                        "data-component-id": cpn.id,
                        ...cpn.props,
                    },
                    // 是否有嵌套组件,没有的话就显示内容
                    cpn.props.children || renderComponents(cpn.children || [])
                );
            }
        })
    }

    // 如果拖拽的组件是可以放置的，canDrop则为true，通过这个可以给组件添加边框
    const [{ canDrop }, drop] = useDrop(() => ({
        // 可以接受的元素类型
        accept: [
            ItemType.Space,
            ItemType.Button
        ],
        drop: (_, monitor) => {
            const didDrop = monitor.didDrop()
            if (didDrop) {
                return
            }
            return {
                id: 0
            }
        },
        collect: (monitor) => ({
            canDrop: monitor.canDrop()
        })
    }))

    useEffect(() => {
        function createMask(e: any)  {
            // 获取当前点击的元素
            const path = e.composedPath()
            for (let i = 0; i < path.length; i++) {
                const ele = path[i];
                if (ele.getAttribute) {
                    if (ele.getAttribute("data-component-id")) {
                        const componentId = ele.getAttribute("data-component-id");
                        setCurComponentId(+componentId);
                        return;
                    }
                }
            }
        }
        let container = document.querySelector(".stage");
        if (container) {
            container.addEventListener("click", createMask, true)
        }
        return () => {
            container = document.querySelector(".stage")
            if (container) {
                container.removeEventListener("click", createMask, true);
            }
        }
    }, [])
    return (
        <div ref={drop} style={{ border: canDrop ? '1px solid #ccc' : 'none' }} className='p-4 h-full stage'>
            {renderComponents(components)}
            {curComponentId && (
                <SelectedMask
                    componentId={curComponentId}
                    containerClassName="select-mask-container"
                    offsetContainerClassName="stage"
                    ref={selectedMaskRef}
                />
            )}
            <div className="select-mask-container" />
        </div>
    );
};

export default Renderer