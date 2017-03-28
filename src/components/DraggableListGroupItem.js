import React, {Component} from 'react';
import { findDOMNode } from 'react-dom'
import { ListGroupItem } from 'react-bootstrap';
import { DragSource, DropTarget } from 'react-dnd';

export default class DraggableListGroupItem extends Component {
	render() {
		const {isDragging, connectDragSource, connectDropTarget, isOver} = this.props;
		return (<ListGroupItem ref={instance => {
										let domNode = findDOMNode(instance);
										connectDragSource(domNode);
										connectDropTarget(domNode);
								   }}
							   bsStyle={isOver ? 'info' : ''}
							   style={{ opacity: isDragging ? 0.5 : 1 }}>
			{this.props.children}
		</ListGroupItem>);
	}
}

const dragSpec = {
    beginDrag(props) {
        return {index: props.index};
    }
};

function dragCollect(connect, monitor) {
    return {
	    connectDragSource: connect.dragSource(),
	    isDragging: monitor.isDragging()
    };
}

const dropSpec = {
	drop(props, monitor, component) {
		let fromIndex = monitor.getItem().index;
		let toIndex = props.index;
		props.moveItem(fromIndex, toIndex);
	}
};

function dropCollect(connect, monitor) {
	return {
		connectDropTarget: connect.dropTarget(),
		isOver: monitor.isOver()
	};
}

export default DragSource('todo', dragSpec, dragCollect)(DropTarget('todo', dropSpec, dropCollect)(DraggableListGroupItem));