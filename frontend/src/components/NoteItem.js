import React from 'react';

const NoteItem = (props) => {


return (
  <li onClick={() => props.selectNote(props.note)}>
    <h2>{props.note.title}</h2>
    <p>{props.note.body.slice(0, 60)}...</p>
  </li>
)};

export default NoteItem;
