import React, { useEffect, useState } from 'react'

const TodoItem = (props) => {
    const [todoItem, setTodoItem] = useState(props.data)
    const [isDirty, setDirty] = useState(false)
    useEffect(() => {
        if (isDirty) {
            fetch(`http://localhost:8080/api/todoItems/${todoItem.id}`, {
                method: "PUT",
                headers: {
                    'content-type': "application/json"
                },
                body: JSON.stringify(todoItem),
            }).then(response => response.json()).then(data => {
                setDirty(false)
                setTodoItem(data)
            })
        }


    }, [todoItem,isDirty])

    function updateIsDone() {
        setDirty(true)
        setTodoItem({ ...todoItem, done: !todoItem.isDone })
    }
    return (
        <>
            <input
                type="checkbox"
                checked={todoItem.isDone}
                onChange={updateIsDone}
            />
            <span>{todoItem.task}</span>
        </>
    )
}

export default TodoItem