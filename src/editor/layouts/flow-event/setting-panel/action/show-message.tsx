import {Form, Input, Select} from "antd";

const ShowMessageSetting = () => {
    return (
        <>
            <Form.Item label='类型' name={['config', 'type']}>
                <Select
                    style={{ width: 240 }}
                    options={[
                        { label: '成功', value: 'success' },
                        { label: '失败', value: 'error' }
                    ]}
                />
            </Form.Item>
            <Form.Item label='文本' name={['config', 'text']}>
                <Input style={{ width: 240 }} />
            </Form.Item>
        </>
    );
};

export default ShowMessageSetting
