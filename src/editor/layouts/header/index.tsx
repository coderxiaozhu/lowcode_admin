import {Button, Space} from "antd";
import React, {useCallback, useState} from "react";
import {useComponents} from "../../stores/components.ts";
import ComponentTree from "./component-tree.tsx";

const Header: React.FC = () => {
    const { mode, setMode, setCurComponentId } = useComponents()
    const [open, setOpen] = useState(false)
    const onOpen = useCallback(() => {
        setOpen(true)
    }, [])
    const onCancel = useCallback(() => {
        setOpen(false)
    }, [])
    return (
        <div className='flex justify-end w-[100%] px-[24px]'>
            <Space>
                <Button type='primary' onClick={onOpen}>查看大纲树</Button>
                <ComponentTree open={open} onCancel={onCancel} />
                {
                    mode === 'edit' && (
                        <Button
                            onClick={() => {
                                setMode('preview');
                                setCurComponentId(null)
                            }}
                            type='primary'
                        >
                            预览
                        </Button>
                    )
                }
                {
                    mode === 'preview' && (
                        <Button
                            onClick={() => setMode('edit')}
                            type='primary'
                        >
                            退出预览
                        </Button>
                    )
                }
            </Space>
        </div>
    );
};

export default Header
