import React, { useState, useEffect } from 'react';
import './App.css';
import Form from './Components/Form';
import TodoList from './Components/TodoList';

const url = "http://localhost:3001";

function App() {
  const [inputText, setInputText] = useState("");
  const [todos, setTodos] = useState([]);

  const getTodos = () => {
    fetch(url + "/todos")
      .then(response => response.json())
      .then(data => {
        setTodos(data);
      })
  };

  useEffect(() => {
    getTodos()
  }, []);

  let title = "";
  if (todos.length === 1) {
    title = "todo";
  } else {
    title = "todos";
  };

  return (
    <div className="App">
      <Form inputText={inputText} todos={todos} setTodos={setTodos} setInputText={setInputText} />
      <TodoList setTodos={setTodos} todos={todos} />
      <div className="count">
        <p>You have {todos.length} {title}</p>
      </div>
    </div>
  );
};

export default App;
