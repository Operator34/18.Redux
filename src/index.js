import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import * as actions from "./store/actionTypes";

import { createStore } from "./store/createStore";
import { taskReducer } from "./store/taskReducer";

const initialState = [
    { id: 1, title: "Task 1", completed: "false" },
    { id: 2, title: "Task 2", completed: "false" },
];
const store = createStore(taskReducer, initialState);

const App = (second) => {
    const [state, setState] = useState(store.getState());
    // console.log(store.getState()); //получаем состояние
    // store.dispatch({ type: "task/completed", payload: { id: 1 } }); //описываем сначало сущность потом действие, в тайп передаем что необходимо сделать, в пейлоад передаем все данные которые нам нелбходимы для того что найти этот объект в массиве и изменить его
    useEffect(() => {
        store.subscribe(() => {
            setState(store.getState());
        });
    }, []);

    const completeTask = (taskId) => {
        store.dispatch({
            type: actions.taskUpdated,
            payload: { id: taskId, completed: true },
        });
        // console.log(store.getState());
    };
    const changeTitle = (taskId) => {
        store.dispatch({
            type: actions.taskUpdated,
            payload: { id: taskId, title: `New title for ${taskId}` },
        });
    };
    return (
        <>
            <h1>App</h1>

            <ul>
                {state.map((el) => (
                    <li key={el.id}>
                        <p>{el.title}</p>
                        <p>{` Completed: ${el.completed}`}</p>
                        <button onClick={() => completeTask(el.id)}>
                            complete
                        </button>
                        <button onClick={() => changeTitle(el.id)}>
                            Change Tittle
                        </button>
                        <hr />
                    </li>
                ))}
            </ul>
        </>
    );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
