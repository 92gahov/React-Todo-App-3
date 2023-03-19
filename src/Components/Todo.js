import React from "react";
import check from "./img/circle-check-solid.svg";
import remove from "./img/trash-can-solid.svg";
import undo from "./img/undo.svg";
import calendar from "./img/calendar-solid.svg"

const url = "http://localhost:3001";

const Todo = ({ event, todo, todos, date, setTodos }) => {

    const deleteTodo = (e) => {
        const id = e.target.getAttribute("data-remove");
        fetch(url + "/todos/" + id, {
            method: "DELETE"
        })
        setTodos(todos.filter(el => el.id !== todo.id));
    };

    const finishTodo = (e) => {
        const id = e.target.getAttribute("data-check");
        const finish = {
            completed: true
        }
        fetch(url + "/todos/" + id, {
            method: "PATCH",
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            },
            body: JSON.stringify(finish)
        })
        setTodos(todos.map(el => {
            if (el.id === todo.id) {
                return {
                    ...el, completed: true
                }
            }
            return el;
        }))
    };

    const undoTodo = (e) => {
        const id = e.target.getAttribute("data-undo");
        const undo = {
            completed: false
        }
        fetch(url + "/todos/" + id, {
            method: "PATCH",
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            },
            body: JSON.stringify(undo)
        })
        setTodos(todos.map(el => {
            if (el.id === todo.id) {
                return {
                    ...el, completed: false
                }
            }
            return el;
        }))
    };

    return (
        <div className="output">
            <div className="cal-icon">
                <img alt=""
                    src={calendar}></img>
            </div>
            <div className="date-output">
                <p>{date}</p>
            </div>
            <div className="event-info">
                <p className={`todo-item ${todo.completed ? "completed" : ""}`}>{event}</p>
            </div>
            <div className="check">
                <img alt="" onClick={finishTodo}
                    src={check}
                    data-check={todo.id}
                    title="Finish event!"></img>
            </div>
            <div className="undo">
                <img alt="" onClick={undoTodo}
                    src={undo}
                    data-undo={todo.id}
                    title="Undo finish event!"></img>
            </div>
            <div className="remove">
                <img alt="" onClick={deleteTodo}
                    src={remove}
                    data-remove={todo.id}
                    title="Delete event!"></img>
            </div>
        </div>
    );
};

export default Todo;