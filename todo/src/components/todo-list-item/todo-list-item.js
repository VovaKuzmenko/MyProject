import React from 'react';

const TodoListItem = ({ label, important = false }) => {

  const style = {
    color: important ? 'steelblue' : 'black',
    fontWeight: important ? 'bold' : 'normal'
  };

  return (
    <span>
      <span style={style}>
        {label}
      </span>
      <button type="button">
        <i />
      </button>

      <button type="button">
        <i />
      </button>
    </span>
  );
};

export default TodoListItem;