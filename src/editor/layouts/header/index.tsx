import {Button, Space} from "antd";
import React, {useCallback, useState} from "react";
import {useComponents} from "../../stores/components.ts";
import ComponentTree from "./component-tree.tsx";
import DefineVariable from './define-variable.tsx'
import {usePageDataStore} from "../store/page-data.ts";

const Header: React.FC = () => {
    const { mode, setMode, setCurComponentId } = useComponents()
    const { resetData } = usePageDataStore()
    const [open, setOpen] = useState(false)
    const [variableVisible, setVariableVisible] = useState(false)
    const onOpen = useCallback(() => {
        setOpen(true)
    }, [])
    const onCancel = useCallback(() => {
        setOpen(false)
    }, [])
    const handleVariableVisible = useCallback(() => {
        setVariableVisible(false)
    }, [])
    return (
        <div className='flex justify-end w-[100%] px-[24px]'>
            <Space>
                {
                    mode === 'edit' && (
                        <>
                            <Button type='primary' onClick={onOpen}>查看大纲树</Button>
                            <Button type='primary' onClick={() => {
                                setVariableVisible(true)
                            }}>
                                定义变量
                            </Button>
                            <Button
                                onClick={() => {
                                    setMode('preview');
                                    setCurComponentId(null)
                                    resetData()

                                }}
                                type='primary'
                            >
                                预览
                            </Button>
                        </>
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
            <ComponentTree open={open} onCancel={onCancel} />
            <DefineVariable open={variableVisible} onCancel={handleVariableVisible} />
        </div>
    );
};

export default Header
