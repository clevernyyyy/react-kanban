import React from 'react';
import {compose} from 'redux';
import {connect} from 'react-redux';
import {DropTarget} from 'react-dnd';
import Cards from './Cards.js';
import Edit from './Edit.js';
import ItemTypes from '../constants/itemTypes';
import * as laneActions from '../actions/lanes';
import * as cardActions from '../actions/cards';

const cardTarget = {
  hover(targetProps, monitor) {
    const sourceProps = monitor.getItem();
    const sourceId = sourceProps.id;

    if(!targetProps.lane.get('cards').count()) {
      targetProps.attachToLane(
        targetProps.lane.get('id'),
        sourceId
      );
    }
  }
};

class Lane extends React.Component {
  render() {
    const {connectDropTarget, lane, laneCards, ...props} = this.props;
    const laneId = lane.get('id');

    return connectDropTarget(
      <div {...props}>
        <div className="lane-header"
          onClick={() => props.updateLane({id: laneId, editing: true})}>
          <div className="lane-add-card">
            <button onClick={this.addCard.bind(this, laneId)}>+</button>
          </div>
          <Edit className="lane-name" editing={lane.get('editing')}
            value={lane.get('name')}
            onEdit={name => props.updateLane({id: laneId, name, editing: false})} />
          <div className="lane-delete">
            <button onClick={this.deleteLane.bind(this, lane)}>x</button>
          </div>
        </div>
        <Cards
          cards={laneCards}
          onValueClick={id => props.updateCard({id, editing: true})}
          onEdit={(id, task) => props.updateCard({id, task, editing: false})}
          onDelete={(id, e) => this.deleteCard(laneId, id, e)} />
      </div>
    );
  }
  deleteLane(lane, e) {
    e.stopPropagation();

    const laneId = lane.get('id');

    // Clean up cards
    lane.get('cards').forEach(cardId => {
      this.props.detachFromLane(laneId, cardId);
      this.props.deleteCard(cardId);
    });

    this.props.deleteLane(laneId);
  }
  addCard(laneId, e) {
    e.stopPropagation();

    const o = this.props.createCard({
      task: 'New task'
    });
    this.props.attachToLane(laneId, o.card.id);
  }
  deleteCard(laneId, cardId, e) {
    e.stopPropagation();

    this.props.detachFromLane(laneId, cardId);
    this.props.deleteCard(cardId);
  }
}

export default compose(
  // If you want to memoize this (more performant),
  // use https://www.npmjs.com/package/reselect
  connect((state, props) => ({
    laneCards: props.lane.get('cards').map(
      id => state.cards.find(card => card.get('id') === id)
    )
  }), {
    ...laneActions,
    ...cardActions
  }),
  DropTarget(ItemTypes.CARD, cardTarget, (connect) => ({
    connectDropTarget: connect.dropTarget()
  }))
)(Lane);
