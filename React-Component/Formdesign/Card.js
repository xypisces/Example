import React, { Component } from 'react'
import { DragSource, DropTarget } from 'react-dnd'
import SRadio from './service/radio';
import SCheckbox from './service/checkbox';
import Fillblank from './service/fillblank';
import RichText from './service/richText';
import Pic from './service/pic';

const style = {
	border: '1px dashed gray',
	padding: '0.5rem 1rem',
	marginBottom: '.5rem',
	backgroundColor: 'white',
	cursor: 'move',
}

const cardSource = {
	beginDrag(props) {
		return {
			id: props.id,
			originalIndex: props.findCard(props.id).index,
		}
	},

	endDrag(props, monitor) {
		const { id: droppedId, originalIndex } = monitor.getItem()
		const didDrop = monitor.didDrop()

		if (!didDrop) {
			props.moveCard(droppedId, originalIndex)
		}
	},
}

const cardTarget = {
	canDrop() {
		return false
	},

	hover(props, monitor) {
		const { id: draggedId } = monitor.getItem()
		const { id: overId } = props

		if (draggedId !== overId) {
			const { index: overIndex } = props.findCard(overId)
			props.moveCard(draggedId, overIndex)
		}
	},
}

@DropTarget('card', cardTarget, connect => ({
	connectDropTarget: connect.dropTarget(),
}))
@DragSource('card', cardSource, (connect, monitor) => ({
	connectDragSource: connect.dragSource(),
	isDragging: monitor.isDragging(),
}))
class Card extends Component {
	render() {
		const {
      text,
			i,
			data,
			updateData,
			updataStatus,
			datas,
			isDragging,
			connectDragSource,
      connectDropTarget,
		} = this.props
		const opacity = isDragging ? 0 : 1
		let content = null;
		/**
		 * 1单选，2多选，3填空，4排序，5图片单选，6富文本，7图片多选
		 */
    if( data.type === 1 || data.type === 2) {
      content = <SRadio 
			text={text}
			index={i}
			datas={datas}
			updateData={updataStatus}
			data={data}
			/>
    } else if ( data.type === 3 || data.type === 4) {
			content = <Fillblank 
			text={text}
			index={i}
			datas={datas}
			updateData={updataStatus}
			data={data}
			/>
		} else if ( data.type === 5 || data.type === 7) {
			content = <Pic 
			text={text}
			index={i}
			datas={datas}
			updateData={updataStatus}
			data={data}
			/>
		} else if ( data.type === 6) {
			content = <RichText 
			text={text}
			index={i}
			datas={datas}
			updateData={updataStatus}
			data={data}
			/>
		}
		return connectDragSource(
			connectDropTarget(<div style={{ opacity }}>
				{content}
      </div>),
		)
	}
}

export default Card;