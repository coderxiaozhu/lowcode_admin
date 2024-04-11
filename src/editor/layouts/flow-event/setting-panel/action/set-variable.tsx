import {useVariableStore} from "../../../../stores/variable.ts";
import {Form, Input, Select} from "antd";

const SetVariableSetting = ({ values }: { values: any }) => {
    const { variables } = useVariableStore()
    return (
        <>
            <Form.Item label='变量' name={['config', 'variable']}>
                <Select
                    style={{ width: 240 }}
                    options={variables.map(variable => ({ label: variable.remark, value: variable.name }))}
                />
            </Form.Item>
            {values?.config?.variable && (
                <Form.Item label='值' name={['config', 'value']}>
                    <Input style={{ width: 240 }} />
                </Form.Item>
            )}
        </>
    );
};

export default SetVariableSetting
