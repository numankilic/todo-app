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

  function addNewTodoItem() {
    fetch('http://localhost:8080/api/todoItems', {
      headers: {
        'content-type': 'application/json'
      },
      method: 'POST'
    })
      .then((response => response.json()))
      .then(aTodoItem => {
        console.log(aTodoItem)
        setTodoItems([...todoItems, aTodoItem])
      })
  }

  function handleDeleteTodoItem(item) {
    const updatedTodoItems = todoItems.filter(aTodoItem => aTodoItem.id !== item.id)
    setTodoItems([...updatedTodoItems])
    
  }
  return (
    <div>
      <div>
        <button onClick={addNewTodoItem}>Add new item</button>
      </div>
      <div>
        {todoItems
          ? todoItems.map((todoItem) => {
            return <TodoItem key={todoItem.id} data={todoItem} emitDeleteTodoItem={handleDeleteTodoItem} />
          })
          : "loading data..."}
      </div>
    </div>

  );
}

export default App;
