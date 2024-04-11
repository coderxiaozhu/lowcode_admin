export const defaultLayout = {
    type: 'compactBox',
    direction: 'TB',
    getId: (d: any) => {
        return d.id
    },
    getHeight: () => {
        return 16;
    },
    getWidth: () => {
        return 16;
    },
    getVGap: () => {
        return 40;
    },
    getHGap: () => {
        return 70;
    }
}
