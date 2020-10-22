import React from 'react';

import AppHeader from '../app-header';
import SearchPanel from '../search-panel';
import TodoList from '../todo-list';
import ItemStatusFilter from '../item-status-filter';

const App = () => {

  const todoData = [
    { label: 'Drink Coffee', important: false, id: 1 },
    { label: 'Make Awesome App', important: true, id: 2 },
    { label: 'Have a lunch', important: false, id: 3 }
  ];
 // <TodoList todos={todoData} />  
  return (
    <div>
      <AppHeader toDo={1} done={3} />
      <div>
        <SearchPanel />
        <ItemStatusFilter />
      </div>
          
    </div>
  );
};

export default App;
