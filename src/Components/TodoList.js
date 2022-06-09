import React from "react";
import Todo from "./Todo";

const TodoList = ({ todos, setTodos }) => {
    return (
        <div className="output-main">
            {todos.map(todo => (
                <Todo setTodos={setTodos}
                    todos={todos}
                    key={todo.id}
                    todo={todo}
                    event={todo.event}
                    date={todo.date} />
            ))}
        </div>
    );
};

export default TodoList;