import uuid from 'node-uuid';

export const CREATE_CARD = 'CREATE_CARD';
export function createNote(card) {
  return {
    type: CREATE_CARD,
    note: {
      id: uuid.v4(),
      ...note
    }
  };
};

export const UPDATE_CARD = 'UPDATE_CARD';
export function updateCard(updatedCard) {
  return {
    type: UPDATE_CARD,
    ...updatedCard
  };
};

export const DELETE_CARD = 'DELETE_CARD';
export function deleteCard(id) {
  return {
    type: DELETE_CARD,
    id
  };
};
