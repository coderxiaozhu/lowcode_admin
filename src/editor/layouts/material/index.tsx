import React from "react";
import ComponentItem from "../../common/component-item.tsx";
import {useComponents} from "../../stores/components.ts";
import {ItemType} from "../../item-type.ts";

const Material: React.FC = () => {
    const { addComponent } = useComponents()
    const onDragEnd = (dropResult: { name: string, id?: number, desc: string, props: any }) => {
        addComponent({
            id: new Date().getTime(),
            name: dropResult.name,
            props: dropResult.props,
            desc: dropResult.desc
        }, dropResult.id)
    }
    return (
        <div className='flex p-2.5 gap-4 flex-wrap'>
            <ComponentItem onDragEnd={onDragEnd} description='按钮' name={ItemType.Button} />
            <ComponentItem onDragEnd={onDragEnd} description='间距' name={ItemType.Space}  />
        </div>
    );
};

export default Material
