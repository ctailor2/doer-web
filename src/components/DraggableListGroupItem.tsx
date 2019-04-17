import React, { Component } from 'react';
import { ListGroupItem } from 'react-bootstrap';
import {
    ConnectDragSource,
    ConnectDropTarget,
    DragSource,
    DragSourceConnector,
    DragSourceMonitor,
    DropTarget,
    DropTargetConnector,
    DropTargetMonitor,
} from 'react-dnd';
import { findDOMNode } from 'react-dom';

interface Props {
    isDragging: boolean;
    connectDragSource: ConnectDragSource;
    connectDropTarget: ConnectDropTarget;
    isOver: boolean;
    index: number;
    moveItem: (index: number) => void;
}

export class DraggableListGroupItem extends Component<Props> {
    public render() {
        const { isDragging, connectDragSource, connectDropTarget, isOver } = this.props;
        return (<ListGroupItem ref={(instance) => {
            if (instance) {
                const domNode = findDOMNode(instance) as any;
                connectDragSource(domNode);
                connectDropTarget(domNode);
            }
        }}
            bsStyle={isOver ? 'info' : undefined}
            style={{ opacity: isDragging ? 0.5 : 1 }}>
            {this.props.children}
        </ListGroupItem>);
    }
}

const dragSpec = {
    beginDrag(props: Props) {
        return { index: props.index };
    },
    endDrag(props: Props, monitor: DragSourceMonitor) {
        const dropResult = monitor.getDropResult();
        if (dropResult != null) {
            const toIndex = dropResult.index;
            props.moveItem(toIndex);
        }
    },
};

function dragCollect(connect: DragSourceConnector, monitor: DragSourceMonitor) {
    return {
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging(),
    };
}

const dropSpec = {
    drop(props: Props) {
        return { index: props.index };
    },
};

function dropCollect(connect: DropTargetConnector, monitor: DropTargetMonitor) {
    return {
        connectDropTarget: connect.dropTarget(),
        isOver: monitor.isOver(),
    };
}

export default DragSource('todo', dragSpec, dragCollect)
    (DropTarget('todo', dropSpec, dropCollect)(DraggableListGroupItem));
