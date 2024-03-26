import React from "react";
import {Button, Space} from "antd";
import {useComponents} from "../../stores/components.ts";
import {Component} from "../store/types.ts";

const ComponentMap: { [key: string]: any } = {
    Button: Button,
    Space: Space
}

const ProdStage: React.FC = () => {
    const { components } = useComponents()
    function renderComponents(components: Component[]): React.ReactNode {
        return components.map((component: Component) => {
            if (!ComponentMap[component.name]) {
                return null
            }
            if (ComponentMap[component.name]) {
                return React.createElement(
                    ComponentMap[component.name],
                    {
                        key: component.id,
                        id: component.id,
                        ...component.props
                    },
                    component.props.children || renderComponents(component.children || [])
                )
            }
            return null
        })
    }
    return (
        <>
            { renderComponents(components) }
        </>
    );
};

export default ProdStage
