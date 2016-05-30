import React from 'react';
import {connect} from 'react-redux';
import Edit from './Edit.js';
import Card from './Card.js';
import {move} from '../actions/lanes';

class Cards extends React.Component {
  render() {
    const {cards, move, onValueClick, onEdit, onDelete} = this.props;

    return (<ul className="cards">{cards.map((card) =>
      <Card className="card" id={card.get('id')} key={card.get('id')}
        editing={card.get('editing')} onMove={move}>
        <Edit
          editing={card.get('editing')}
          value={card.get('task')}
          onValueClick={onValueClick.bind(null, card.get('id'))}
          onEdit={onEdit.bind(null, card.get('id'))}
          onDelete={onDelete.bind(null, card.get('id'))} />
      </Card>
    )}</ul>);
  }
}

export default connect(() => ({}), {
  move
})(Cards);
