import {useComponents} from "../../stores/components.ts";
import {Modal, Tree} from "antd";

interface ComponentTreeProps {
    open: boolean
    onCancel: () => void
}

const ComponentTree = ({ open, onCancel }: ComponentTreeProps) => {
    const { components, setCurComponentId } = useComponents()

    // 选择组件后,高亮当前组件,并关闭弹框
    function componentsSelect([selectedKey]: any[]) {
        setCurComponentId(selectedKey)
        onCancel && onCancel()
    }
    return (
        <Modal
            open={open}
            title='组件树'
            onCancel={onCancel}
            destroyOnClose
            footer={null}
        >
            <Tree
                fieldNames={{ title: 'name', key: 'id' }}
                treeData={ components as any }
                showLine
                defaultExpandAll
                onSelect={componentsSelect}
            />
        </Modal>
    );
};

export default ComponentTree
