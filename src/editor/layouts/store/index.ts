import { Component } from  './types.ts'


const component: Component[] = [
    {
        id: 1,
        name: 'Button',
        props: {
            type: 'primary',
            children: '按钮'
        }
    },
    {
        id: 2,
        name: 'Space',
        props: {
            size: 'large'
        },
        children: [{
            id: 3,
            name: 'Button',
            props: {
                type: 'primary',
                children: '按钮1'
            }
        }, {
            id: 4,
            name: 'Button',
            props: {
                type: 'primary',
                children: '按钮2'
            }
        }]
    }
]

export default component
