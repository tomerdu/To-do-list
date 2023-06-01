import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';

const App = () => {
    const [todos, setTodos] = useState([]);
    const [newTodo, setNewTodo] = useState('');
    const [change, setChange] = useState(false);


    useEffect(() => {
        axios
            .get('http://localhost:8081/todo')
            .then((res) => setTodos(res.data))
            .catch((error) => console.log(error));
        setChange(false)
    }, [change]);



    const handleFormSubmit = (event) => {
        event.preventDefault();
        if (!newTodo) {
            return;
        }
        axios
            .post('http://localhost:8081/todo', { title: newTodo })
            .then((res) => {
                setTodos([...todos, res.data]);
                setNewTodo('');
            })
            .catch((error) => console.log(error));
        setChange(true);
    };

    const handleDeleteTodo = (id) => {
        axios
            .delete(`http://localhost:8081/todo/${id}`)
            .then((res) => {
                setTodos(res.data);
            })
            .catch((error) => console.log(error));
        setChange(true);
    };

    return (
        <div className="wrapper">
            <h1>Todo List</h1>
            <form onSubmit={handleFormSubmit}>
                <input
                    type="text"
                    placeholder="Enter a new todo..."
                    value={newTodo}
                    onChange={(event) => setNewTodo(event.target.value)}
                />
                <button type="submit">Add Todo</button>
            </form>
            <ul>
                {todos.map((todo) => (
                    <li key={todo.id}>
                        <input type="checkbox" />
                        <span>{todo.title}</span>
                        <button onClick={() => handleDeleteTodo(todo.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default App;
