import React, { Component } from 'react'
import { connect } from 'dva';
import update from 'immutability-helper'
import { DropTarget, DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import _ from 'lodash'
import Card from './Card'

const cardTarget = {
	drop() {},
}

@DragDropContext(HTML5Backend)
@DropTarget('card', cardTarget, connect => ({
	connectDropTarget: connect.dropTarget(),
}))
class Container extends Component {
	constructor(props) {
		super(props)
		this.moveCard = this.moveCard.bind(this)
		this.findCard = this.findCard.bind(this)
		this.state = {
			cards: [],
		}
	}
	componentWillReceiveProps(nextProps) {
		if(_.isEqual(this.state.cards,nextProps.objSecond)){
			// console.log('----card一样----')
		}else{
			// console.log('---card不一样----')
			this.setState({
				cards: nextProps.objSecond
			})
		}
	}
	moveCard(id, atIndex) {
		const { card, index } = this.findCard(id)
		this.setState(
			update(this.state, {
				cards: {
					$splice: [[index, 1], [atIndex, 0, card]],
				},
			}),()=>{
				console.log('callback')
				console.log(this.state.cards)
				this.props.updataStatus(this.state.cards)
			}
    )
    console.log('---card---')
    console.log(id, atIndex)
	}

	findCard(id) {
		const { cards } = this.state
		const card = cards.filter(c => c.id === id)[0]

		return {
			card,
			index: cards.indexOf(card),
		}
	}
	render() {
		const { connectDropTarget, objSecond, updateData, updataStatus } = this.props
		const { cards, colorType } = this.state

		return connectDropTarget(
			<div>
				{cards.map((card,i) => (
					<Card
            i = {i}
						key={i}
						data = {card}
						id={card.id}
						updataStatus={updataStatus}
						datas = {cards}
						updateData={updateData}
						text={card.title}
						moveCard={this.moveCard}
						findCard={this.findCard}
					/>
				))}
			</div>,
		)
	}
}

export default Container;