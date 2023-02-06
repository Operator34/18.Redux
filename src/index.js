import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";

function taskReducer(state, action) {
    // ф которая будет обрабатывать все действия с задачими
    switch (action.type) {
        case "task/completed":
            const newArray = [...state];
            const elementIndex = newArray.findIndex(
                (el) => el.id === action.payload.id
            );
            newArray[elementIndex].completed = true;
            return newArray;

        default:
            break;
    }
}

function createStore(reducer, initialState) {
    // создаем стейт
    let state = initialState;
    let listeners = [];

    function getState() {
        return state;
    }
    function dispatch(action) {
        //изменение состояния стейта
        state = reducer(state, action);
        for (let i = 0; i < listeners.length; i++) {
            const listener = listeners[i];
            listener();
        }
    }
    function subscribe(listener) {
        //добавляет слушателей
        listeners.push(listener);
    }
    return { getState, dispatch, subscribe };
}

const store = createStore(taskReducer, [
    { id: 1, description: "Task 1", completed: "false" },
    { id: 2, description: "Task 2", completed: "false" },
]);
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
            type: "task/completed",
            payload: { id: taskId },
        });
        // console.log(store.getState());
    };
    return (
        <>
            <h1>App</h1>

            <ul>
                {state.map((el) => (
                    <li key={el.id}>
                        <p>{el.description}</p>
                        <p>{` Completed: ${el.completed}`}</p>
                        <button onClick={() => completeTask(el.id)}>
                            complete
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
