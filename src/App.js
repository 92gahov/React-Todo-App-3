import React, { useState, useEffect } from 'react';
import './App.css';
import Form from './Components/Form';
import TodoList from './Components/TodoList';

const url = "http://localhost:3001";

function App() {
  const [inputText, setInputText] = useState("");
  const [inputDate, setInputDate] = useState("")
  const [todos, setTodos] = useState([]);
  const [checkday, setCheckDay] = useState(false);
  const [eventToday, setEventToday] = useState("");

  let modal;
  let d = new Date().getDate();
  let m = new Date().getMonth() + 1;
  let y = new Date().getFullYear();
  d = addZero(d);
  m = addZero(m);
  let today = `${d}.${m}.${y}`;

  function addZero(i) {
    if (i < 10) {
      i = "0" + i;
    }
    return i;
  };

  const getTodos = () => {
    fetch(url + "/todos")
      .then(response => response.json())
      .then(data => {
        setTodos(data);
        for (let i = 0; i < data.length; i++) {
          if (data[i].date === today) {
            setCheckDay(true);
            setEventToday(data[i].event);
          }
        }
      })
  };

  useEffect(() => {
    getTodos();
    // eslint-disable-next-line
  }, [url]);

  let title = "";
  if (todos.length === 1) {
    title = "event";
  } else {
    title = "events";
  };

  function closeModal() {
    setCheckDay(false);
  };

  if (checkday) {
    modal = <div className='modal'>
      <div className='today-event'>
        <span className='close'
          onClick={closeModal}>&times;</span>
        <p><b>For today:</b></p>
        <p>{eventToday}</p>
      </div>
    </div>
  }

  return (
    <div className="App">
      <Form inputText={inputText}
        todos={todos}
        setTodos={setTodos}
        setInputText={setInputText}
        inputDate={inputDate}
        setInputDate={setInputDate} />
      <TodoList setTodos={setTodos}
        todos={todos} />
      <div className="count">
        <p>You have {todos.length} {title}</p>
      </div>
      {modal}
    </div>
  );
};

export default App;
