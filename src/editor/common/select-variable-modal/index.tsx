import React, {useMemo} from "react";
import {useVariableStore} from "../../stores/variable.ts";
import {Modal, Table} from "antd";

interface Props {
    open: boolean;
    onCancel: () => void;
    onSelect: (record: any) => void
}
const SelectVariableModal: React.FC<Props> = ({ open, onCancel, onSelect }) => {
    const columns = useMemo(() => {
        return [
            {
                title: '变量名',
                dataIndex: 'name'
            },
            {
                title: '变量值',
                dataIndex: 'defaultValue'
            },
            {
                title: '备注',
                dataIndex: 'remark'
            }
        ]
    }, [])
    const { variables } = useVariableStore()
    function rowSelect(record: any) {
        onSelect(record)
    }
    return (
        <Modal title='选择变量' width={800} open={open} onCancel={onCancel}>
            <Table
                columns={columns}
                dataSource={variables}
                rowKey={(record) => record.name}
                onRow={(record) => ({
                    onClick: () => {
                        rowSelect(record)
                    }
                })}
            />
        </Modal>
    );
};

export default SelectVariableModal
