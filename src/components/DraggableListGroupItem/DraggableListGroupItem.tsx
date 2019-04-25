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

interface DragProps {
    isDragging: boolean;
    connectDragSource: ConnectDragSource;
    connectDropTarget: ConnectDropTarget;
    isOver: boolean;
}

interface OwnProps {
    index: number;
    moveItem: (index: number) => void;
}

type AllProps = DragProps & OwnProps;

export class DraggableListGroupItem extends Component<AllProps> {
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
    beginDrag(props: OwnProps) {
        return { index: props.index };
    },
    endDrag(props: OwnProps, monitor: DragSourceMonitor) {
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
    drop(props: OwnProps) {
        return { index: props.index };
    },
};

function dropCollect(connect: DropTargetConnector, monitor: DropTargetMonitor) {
    return {
        connectDropTarget: connect.dropTarget(),
        isOver: monitor.isOver(),
    };
}

const dragSource = DragSource('todo', dragSpec, dragCollect);
const dropTarget = DropTarget('todo', dropSpec, dropCollect);
export default dragSource
    (dropTarget(DraggableListGroupItem));
