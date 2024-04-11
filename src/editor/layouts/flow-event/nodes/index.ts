import G6 from '@antv/g6'
import {startNode} from "./start.tsx";
import {conditionNode} from "./condition.tsx";
import {actionNode} from "./action.tsx";
import {eventNode} from "./event.tsx";

export const registerNodes = () => {
    G6.registerNode('start', startNode, 'rect')
    G6.registerNode('condition', conditionNode, 'rect')
    G6.registerNode('action', actionNode, 'rect')
    G6.registerNode('event', eventNode, 'rect')
}
