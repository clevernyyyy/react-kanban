import React from 'react';
import Lane from './Lane.js';

export default ({lanes}) => {
  return (
    <div className="lanes">{lanes.map((lane) =>
      <Lane className="lane" key={lane.get('id')} lane={lane} />
    )}</div>
  );
}
