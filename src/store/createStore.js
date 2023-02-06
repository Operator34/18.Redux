export function createStore(reducer, initialState) {
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
