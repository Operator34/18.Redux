import React, { useEffect } from "react";
import { Provider, useSelector, useDispatch } from "react-redux";
import ReactDOM from "react-dom/client";
import {
    titleChange,
    completeTask,
    loadTasks,
    getTasks,
    getTasksLoadingStatus,
    createTask,
    remove,
} from "./store/task";
import configureStore from "./store/store";
import { getError } from "./store/errors";

const store = configureStore();
const App = (second) => {
    const state = useSelector(getTasks());
    console.log(state);
    const isLoading = useSelector(getTasksLoadingStatus());
    const error = useSelector(getError());
    console.log(error);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(loadTasks());
    }, []);

    const changeTitle = (taskId) => {
        dispatch(titleChange(taskId));
    };

    const deletedTask = (taskId) => {
        dispatch(remove({ id: taskId }));
    };

    if (isLoading) {
        return <h1>Loading...</h1>;
    }
    console.log(error);
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
                        <button onClick={() => dispatch(createTask())}>
                            Добавить таску
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
