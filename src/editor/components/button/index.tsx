import { Button as AntdButton } from "antd";
import {useImperativeHandle, useState, forwardRef} from "react";

// eslint-disable-next-line react-refresh/only-export-components
const Button = (props: any, ref: any) => {
    const [loading, setLoading] = useState(false)
    // 暴露方法,父组件可以使用ref获取组件里暴露出来的方法
    useImperativeHandle(ref, () => {
        return {
            startLoading: () => {
                setLoading(true)
            },
            endLoading: () => {
                setLoading(false)
            }
        }
    }, [])
    return (
        <AntdButton loading={loading} {...props}>{ props?.children }</AntdButton>
    );
};

// eslint-disable-next-line react-refresh/only-export-components
export default forwardRef(Button)
