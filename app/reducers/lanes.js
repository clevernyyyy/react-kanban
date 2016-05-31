import {List, Map} from 'immutable';
import update from 'react-addons-update';
import * as types from '../actions/lanes';

const initialState = List();

export default function lanes(state = initialState, action) {
  let laneIndex;

  switch (action.type) {
    case types.CREATE_LANE:
      return state.push(Map(action.lane));

    case types.UPDATE_LANE:
      laneIndex = state.findIndex(lane => lane.get('id') === action.id);

      if(laneIndex < 0) {
        return state;
      }

      const {type, ...updatedLane} = action;
      return state.mergeIn([laneIndex], updatedLane);

    case types.DELETE_LANE:
      laneIndex = state.findIndex(lane => lane.get('id') === action.id);

      if(laneIndex < 0) {
        return state;
      }

      return state.delete(laneIndex);

    case types.ATTACH_TO_LANE:
      const laneId = action.laneId;
      const cardId = action.cardId;

      return state.map(
        lane => {
          const cardIndex = lane.get('cards').indexOf(cardId);

          // Delete cards if found
          if(cardIndex >= 0) {
             return lane.deleteIn(['cards', cardIndex]);
          }

          // Attach card to the lane
          if(lane.get('id') === laneId) {
            return lane.setIn(['cards'], lane.get('cards').push(cardId));
          }

          return lane;
        }
      );

    case types.DETACH_FROM_LANE:
      return state.updateIn(
        [state.findIndex(lane => lane.id === action.laneId)],
        lane => lane.deleteIn(['cards', lane.get('cards').indexOf(action.cardId)])
      );

    case types.MOVE:
      const sourceId = action.sourceId;
      const targetId = action.targetId;

      const sourceLane = state.findEntry(lane => lane.get('cards').indexOf(sourceId) >= 0);
      const targetLane = state.findEntry(lane => lane.get('cards').indexOf(targetId) >= 0);

      const sourceCardIndex = sourceLane[1].get('cards').indexOf(sourceId);
      const targetCardIndex = targetLane[1].get('cards').indexOf(targetId);

      return state.updateIn(
        // Get rid of the source card
        [sourceLane[0]],
        lane => lane.deleteIn(['cards', sourceCardIndex])
      ).updateIn(
        // And move it to the target
        [targetLane[0]],
        lane => lane.updateIn(['cards'], cards => cards.insert(
          targetCardIndex, sourceId
        ))
      );

    default:
      return state;
  }
}
