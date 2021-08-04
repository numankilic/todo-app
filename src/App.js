import { useEffect, useState } from 'react';
import './App.css';
import TodoItem from './components/todoItem';

function App() {

  const [todoItems, setTodoItems] = useState(null);


  useEffect(() => {

    if (!todoItems) {
      fetch('http://localhost:8080/api/todoItems')
        .then((response) => response.json())
        .then((data) => {
          console.log(data)
          setTodoItems(data)
        })
    }


  }, [todoItems])
  return (
    <div>
      {todoItems
        ? todoItems.map((todoItem) => {
          return <TodoItem key={todoItem.id} data={todoItem} />
        })
        : "loading data..."}
    </div>
  );
}

export default App;
