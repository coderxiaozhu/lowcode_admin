import React, {useEffect} from "react";
import {Form, Select, Input} from "antd";
import {ItemType} from "../../item-type.ts";
import {useComponents} from "../../stores/components.ts";

const componentSettingMap = {
    [ItemType.Button]: [{
        name: 'type',
        label: '按钮类型',
        type: 'select',
        options: [
            {
                label: '主按钮',
                value: 'primary'
            },
            {
                label: '次按钮',
                value: 'default'
            }
        ]
    }, {
        name: 'children',
        label: '文本',
        type: 'input'
    }],
    [ItemType.Space]: [
        {
            name: 'size',
            label: '间距大小',
            type: 'select',
            options: [
                {
                    label: '大',
                    value: 'large'
                },
                {
                    label: '中',
                    value: 'middle'
                },
                {
                    label: '小',
                    value: 'small'
                }
            ]
        }
    ]
}

const Setting: React.FC = () => {
    const { curComponentId, updateComponentProps, curComponent } = useComponents()
    const [form] = Form.useForm()
    useEffect(() => {
        // 初始化表单
        form.setFieldsValue(curComponent?.props)
    }, [])
    function renderFormElement(setting: any) {
        const { type, options } = setting;
        if (type === 'select') {
            return (
                <Select options={options} />
            )
        } else if (type === 'input') {
            return (
                <Input />
            )
        }
    }
    // 监听表单值变化, 更新组件属性
    function valueChange(changeValues: any) {
        if (curComponentId) {
            updateComponentProps(curComponentId, changeValues)
        }
    }
    if (!curComponentId || !curComponent) return null
    // 根据组件类型值渲染表单
    return (
        <div className='pt-[20px]'>
            <Form
                form={form}
                onValuesChange={valueChange}
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 14 }}
            >
                { (componentSettingMap[curComponent.name] || []).map(setting => {
                    return (
                        <Form.Item key={setting.name} name={setting.name} label={setting.label}>
                            { renderFormElement(setting) }
                        </Form.Item>
                    )
                }) }
            </Form>
        </div>
    );
};

export default Setting
