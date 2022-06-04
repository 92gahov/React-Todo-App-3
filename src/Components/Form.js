import React, { useEffect, useRef } from "react";

const url = "http://localhost:3001";

const Form = ({ setInputText, todos, setTodos, inputText }) => {
    const inputTextHandler = (e) => {
        setInputText(e.target.value)
    };

    const input = useRef(null);

    useEffect(() => {
        input.current.focus();
    }, []);

    const addTodo = () => {
        const newTodo = {
            event: inputText,
            completed: false
        }
        if (inputText === "") {
            alert("Please fill out the field !")
            return false;
        } else {
            fetch(url + "/todos", {
                method: "POST",
                headers: {
                    'Content-type': 'application/json; charset=UTF-8'
                },
                body: JSON.stringify(newTodo)
            })
                .then(response => response.json())
                .then(data => {
                    setTodos([...todos, data])
                })
            setInputText("");
        }
        input.current.focus();
    };


    return (
        <main>
            <div className="main">
                <div>
                    <textarea ref={input} value={inputText} onChange={inputTextHandler} cols="44" rows="3" placeholder="Make event..."></textarea>
                </div>
                <div className="add-btn">
                    <button onClick={addTodo}>Add new</button>
                </div>
            </div>
        </main>
    );
};

export default Form;