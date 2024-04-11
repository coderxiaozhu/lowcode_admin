export const getTreeDepth = (node: any) => {
    if (!node) {
        // 如果节点为空，深度为0
        return 0
    }
    // 当前节点的子节点最大深度
    let maxChildDepth = 0;

    // 遍历当前节点的所有子节点, 递归调用getTreeDepth函数获取子节点的深度
    for (const child of node.children || []) {
        const childDepth = getTreeDepth(child)
        if (childDepth > maxChildDepth) {
            maxChildDepth = childDepth
        }
    }
    return maxChildDepth + 1
}
