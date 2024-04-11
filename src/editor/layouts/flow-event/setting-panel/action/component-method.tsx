import {ItemType} from "../../../../item-type.ts";
import {useComponents} from "../../../../stores/components.ts";
import {useMemo} from "react";
import {getComponentById} from "../../../../utils/utils.ts";
import {Form, Select, TreeSelect} from "antd";

const componentMethodMap = {
    [ItemType.Button]: [{
        name: 'startLoading',
        label: '开始loading'
    }, {
        name: 'endLoading',
        label: '结束loading'
    }]
}

const ComponentMethodSetting = ({ values }: { values: any }) => {
    const { components } = useComponents()
    const component = useMemo(() => {
        if (values?.config?.componentId) {
            return getComponentById(values?.config?.componentId, components)
        }
    }, [values?.config?.componentId])
    return (
        <>
            <Form.Item label='组件' name={['config', 'componentId']}>
                <TreeSelect
                    style={{ width: 240 }}
                    treeData={components}
                    fieldNames={{
                        label: 'name',
                        value: 'id'
                    }}
                />
            </Form.Item>
            {componentMethodMap[component?.name || ''] && (
                <Form.Item label='方法' name={['config', 'method']}>
                    <Select
                        style={{ width: 240 }}
                        options={componentMethodMap[component?.name || ''].map(
                            method => ({ label: method.label, value: method.name })
                        )}
                    />
                </Form.Item>
            )}
        </>
    );
};

export default ComponentMethodSetting
