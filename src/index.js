import React, { useEffect, useState } from "react";

import ReactDOM from "react-dom/client";
import { taskCompleted, titleChange, taskDeleted } from "./store/task";
import configureStore from "./store/store";

const store = configureStore();
const App = (second) => {
    const [state, setState] = useState(store.getState());

    useEffect(() => {
        store.subscribe(() => {
            setState(store.getState());
        });
    }, []);

    const completeTask = (taskId) => {
        store.dispatch(taskCompleted(taskId));
        // console.log(store.getState());
    };
    const changeTitle = (taskId) => {
        store.dispatch(titleChange(taskId));
    };

    const deletedTask = (taskId) => {
        store.dispatch(taskDeleted(taskId));
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
