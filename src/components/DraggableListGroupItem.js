import React, {Component} from 'react';
import { findDOMNode } from 'react-dom'
import { ListGroupItem } from 'react-bootstrap';
import { DragSource, DropTarget } from 'react-dnd';

export class DraggableListGroupItem extends Component {
	render() {
		const {isDragging, connectDragSource, connectDropTarget, isOver} = this.props;
		return (<ListGroupItem ref={instance => {
										let domNode = findDOMNode(instance);
										connectDragSource(domNode);
										connectDropTarget(domNode);
								   }}
							   bsStyle={isOver ? 'info' : null}
							   style={{ opacity: isDragging ? 0.5 : 1 }}>
			{this.props.children}
		</ListGroupItem>);
	}
}

const dragSpec = {
    beginDrag(props) {
        return {index: props.index};
    },
    endDrag(props, monitor) {
        let dropResult = monitor.getDropResult();
        if (dropResult != null) {
            let toIndex = dropResult.index;
		    props.moveItem(toIndex);
        }
    }
};

function dragCollect(connect, monitor) {
    return {
	    connectDragSource: connect.dragSource(),
	    isDragging: monitor.isDragging()
    };
}

const dropSpec = {
	drop(props) {
		return {index: props.index};
	}
};

function dropCollect(connect, monitor) {
	return {
		connectDropTarget: connect.dropTarget(),
		isOver: monitor.isOver()
	};
}

export default DragSource('todo', dragSpec, dragCollect)(DropTarget('todo', dropSpec, dropCollect)(DraggableListGroupItem));