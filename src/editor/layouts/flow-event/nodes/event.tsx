import {COLLAPSE_ICON, EXPAND_ICON} from "../icons.tsx";

export const eventNode: any = {
    options: {
        style: {
            fill: '#E6F7FF',
            radius: 8,
            lineWidth: 1,
            stroke: '#1890FF',
            fillOpacity: '0.95'
        },
        stateStyles: {
            hover: {},
            selected: {}
        },
        labelCfg: {
            style: {
                fill: '#000000',
                fontSize: 14,
                fontWeight: 400,
                fillOpacity: '0.7'
            }
        },
        size: [120, 40]
    },
    drawShape(cfg: any, group: any) {
        const styles = this.getShapeStyle(cfg)
        const h = styles.height;
        const w = styles.width;
        const keyShape = group.addShape('rect', {
            attrs: {
                x: 0,
                y: 0,
                ...styles
            }
        })
        group.addShape('marker', {
            attrs: {
                x: w / 2 + 20,
                y: 0,
                r: 6,
                stroke: '#ff4d4f',
                cursor: 'pointer',
                symbol: COLLAPSE_ICON
            },
            name: 'remove-item'
        })
        group.addShape('marker', {
            attrs: {
                x: 0,
                y: h / 2 + 7,
                r: 6,
                stroke: '#73d13d',
                cursor: 'pointer',
                symbol: EXPAND_ICON
            },
            name: 'add-item'
        })
        return keyShape
    }
}
