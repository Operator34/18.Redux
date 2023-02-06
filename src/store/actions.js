import * as actionsTypes from "./actionTypes";
export function taskCompleted(id) {
    return {
        type: actionsTypes.taskUpdated,
        payload: { id, completed: true },
    };
}

export function taskDeleted(id) {
    return {
        type: actionsTypes.taskDelete,
        payload: { id },
    };
}

export function titleChange(id) {
    return {
        type: actionsTypes.taskUpdated,
        payload: { id, title: `New title for ${id}` },
    };
}
