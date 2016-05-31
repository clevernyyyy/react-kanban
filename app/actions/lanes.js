import {List, Map} from 'immutable';
import uuid from 'node-uuid';

export const CREATE_LANE = 'CREATE_LANE';
export function createLane(lane) {
  return {
    type: CREATE_LANE,
    lane: Map({
      id: uuid.v4(),
      cards: List(lane.cards || []),
      ...lane
    })
  };
};

export const UPDATE_LANE = 'UPDATE_LANE';
export function updateLane(updatedLane) {
  return {
    type: UPDATE_LANE,
    ...updatedLane
  };
};

export const DELETE_LANE = 'DELETE_LANE';
export function deleteLane(id) {
  return {
    type: DELETE_LANE,
    id
  };
};

export const ATTACH_TO_LANE = 'ATTACH_TO_LANE';
export function attachToLane(laneId, cardId) {
  return {
    type: ATTACH_TO_LANE,
    laneId,
    cardId
  };
};

export const DETACH_FROM_LANE = 'DETACH_FROM_LANE';
export function detachFromLane(laneId, cardId) {
  return {
    type: DETACH_FROM_LANE,
    laneId,
    cardId
  };
};

export const MOVE = 'MOVE';
export function move({sourceId, targetId}) {
  return {
    type: MOVE,
    sourceId,
    targetId
  };
};
