import React, {useEffect} from "react";
import {Button, Form, Input, Modal, Select, Space} from "antd"
import {MinusCircleOutlined, PlusOutlined} from '@ant-design/icons'
import {useVariableStore} from "../../stores/variable.ts"

interface Props {
    open: boolean,
    onCancel: () => void
}

interface Variable {
    // 变量名
    name: string;
    // 变量类型
    type: string;
    // 默认值
    defaultValue: string;
    // 备注
    remark: string;
}

const DefineVariable: React.FC<Props> = ({ open, onCancel }) => {
    const [form] = Form.useForm()
    const { setVariables, variables } = useVariableStore()
    function onFinish(values: { variables: Variable[] }) {
        setVariables(values.variables)
        onCancel && onCancel()
    }

    useEffect(() => {
        if (open) {
            form.setFieldsValue({ variables })
        }
    }, [open]);
    return (
        <Modal
            open={open}
            title='定义变量'
            onCancel={onCancel}
            destroyOnClose
            onOk={() => { form.submit() }}
            width={700}
        >
            <Form<{ variables: Variable[] }>
                onFinish={onFinish}
                autoComplete='off'
                className='py-[20px]'
                form={form}
                initialValues={{ variables }}
            >
                <Form.List name='variables'>
                    {(fields, { add, remove }) => (
                        <>
                            {
                                fields.map(({ key, name, ...resetField }) => (
                                    <Space
                                        key={key}
                                        style={{ display: 'flex', marginBottom: 8 }}
                                        align='baseline'
                                    >
                                        <Form.Item
                                            rules={[{ required: true, message: '变量名不能为空' }]}
                                            {...resetField}
                                            name={[name, 'name']}
                                        >
                                            <Input placeholder='变量名' />
                                        </Form.Item>
                                        <Form.Item
                                            {...resetField}
                                            name={[name, 'type']}
                                        >
                                            <Select
                                                style={{ width: 140 }}
                                                options={[{ label: '字符串', value: 'string' }]}
                                                placeholder='类型'
                                                disabled
                                            ></Select>
                                        </Form.Item>
                                        <Form.Item
                                            {...resetField}
                                            name={[name, 'defaultValue']}
                                        >
                                            <Input placeholder='默认值' />
                                        </Form.Item>
                                        <Form.Item
                                            {...resetField}
                                            name={[name, 'remark']}
                                        >
                                            <Input placeholder='备注' />
                                        </Form.Item>
                                        <MinusCircleOutlined onClick={() => remove(name)} />
                                    </Space>
                                ))
                            }
                            <Form.Item>
                                <Button
                                    type='dashed'
                                    onClick={() => add({ type: 'string' })}
                                    block
                                    icon={<PlusOutlined />}
                                >
                                    添加变量
                                </Button>
                            </Form.Item>
                        </>
                    )}
                </Form.List>
            </Form>
        </Modal>
    );
};

export default DefineVariable
