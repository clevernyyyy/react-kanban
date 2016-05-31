import {List, Map} from 'immutable';
import * as types from '../actions/cards';

const initialState = List();

export default function cards(state = initialState, action) {
  let cardIndex;

  switch (action.type) {
    case types.CREATE_CARD:
      return state.push(Map(action.card));

    case types.UPDATE_CARD:
      cardIndex = state.findIndex(card => card.get('id') === action.id);

      if(cardIndex < 0) {
        return state;
      }

      const {type, ...updatedCard} = action;
      return state.mergeIn([cardIndex], updatedCard);

    case types.DELETE_CARD:
      cardIndex = state.findIndex(card => card.get('id') === action.id);

      if(cardIndex < 0) {
        return state;
      }

      return state.delete(cardIndex);

    default:
      return state;
  }
}
