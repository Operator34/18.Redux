import React, { useEffect } from "react";
import { Provider, useSelector, useDispatch } from "react-redux";
import ReactDOM from "react-dom/client";
import { titleChange, taskDeleted, completeTask, getTasks } from "./store/task";
import configureStore from "./store/store";

const store = configureStore();
const App = (second) => {
    const state = useSelector((state) => state.entities);
    const isLoading = useSelector((state) => state.isLoading);
    const error = useSelector((state) => state.error);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getTasks());
    }, []);

    const changeTitle = (taskId) => {
        dispatch(titleChange(taskId));
    };

    const deletedTask = (taskId) => {
        dispatch(taskDeleted(taskId));
    };

    if (isLoading) {
        return <h1>Loading...</h1>;
    }
    if (error) {
        return <p>{error}</p>;
    }
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
