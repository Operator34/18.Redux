import * as actionsTypes from "./actionTypes";

export function taskCompleted(id) {
    return {
        type: actionsTypes.taskUpdated,
        payload: { id, completed: true },
    };
}

export function titleChange(id) {
    return {
        type: actionsTypes.taskUpdated,
        payload: { id, title: `New title for ${id}` },
    };
}
