import React, { useEffect } from "react";
import { Provider, useSelector, useDispatch } from "react-redux";
import ReactDOM from "react-dom/client";
import { titleChange, taskDeleted, completeTask, getTasks } from "./store/task";
import configureStore from "./store/store";

const store = configureStore();
const App = (second) => {
    const state = useSelector((state) => state);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getTasks());
    }, []);

    // const completeTask = (taskId) => {
    //     store.dispatch((dispatch, getState) => {
    //         console.log(dispatch, getState);
    //         store.dispatch(taskCompleted(taskId));
    //     });
    // };

    const changeTitle = (taskId) => {
        dispatch(titleChange(taskId));
    };

    const deletedTask = (taskId) => {
        dispatch(taskDeleted(taskId));
    };
    return (
        <>
            <h1>App</h1>

            <ul>
                {state.map((el) => (
                    <li key={el.id}>
                        <p>{el.title}</p>
                        <p>{` Completed: ${el.completed}`}</p>
                        <button onClick={() => dispatch(completeTask(el.id))}>
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
        <Provider store={store}>
            <App />
        </Provider>
    </React.StrictMode>
);
