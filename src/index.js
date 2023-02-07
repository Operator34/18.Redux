import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import * as actions from "./store/task/actions";
import configureStore from "./store/store";
const store = configureStore();

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
        store.dispatch(actions.taskCompleted(taskId));
        // console.log(store.getState());
    };
    const changeTitle = (taskId) => {
        store.dispatch(actions.titleChange(taskId));
    };

    const deletedTask = (taskId) => {
        store.dispatch(actions.taskDeleted(taskId));
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
                        <button onClick={() => deletedTask(el.id)}>
                            Delete
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
