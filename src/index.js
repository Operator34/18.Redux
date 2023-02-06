import React from "react";
import ReactDOM from "react-dom/client";

function createStore(initialState) {
    // создаем стейт
    let state = initialState;

    function getState() {
        return state;
    }
    function dispatch(action) {
        //изменение состояния стейта
        console.log(action);
        if (action.type === "task/completed") {
            const newArray = [...state];
            const elementIndex = newArray.findIndex(
                (el) => el.id === action.payload.id
            );
            newArray[elementIndex].completed = true;
            state = newArray;
            console.log(state);
        }
    }
    return { getState, dispatch };
}

const store = createStore([
    { id: 1, description: "Task 1", completed: "false" },
]);
const App = (second) => {
    console.log(store.getState()); //получаем состояние
    // store.dispatch({ type: "task/completed", payload: { id: 1 } }); //описываем сначало сущность потом действие, в тайп передаем что необходимо сделать, в пейлоад передаем все данные которые нам нелбходимы для того что найти этот объект в массиве и изменить его
    return (
        <>
            <h1>App</h1>
            <button
                onClick={() =>
                    store.dispatch({
                        type: "task/completed",
                        payload: { id: 1 },
                    })
                }
            >
                complete
            </button>
        </>
    );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
