import { createAction } from "@reduxjs/toolkit";

const update = createAction("task/updated");
const remove = createAction("task/removed");

export function taskCompleted(id) {
    return update({ id, completed: true });
}

export function taskDeleted(id) {
    return remove({ id });
}

export function titleChange(id) {
    return update({ id, title: `New title for ${id}` });
}

function taskReducer(state = [], action) {
    switch (action.type) {
        case update.type: {
            const newArray = [...state];
            const elementIndex = newArray.findIndex(
                (el) => el.id === action.payload.id
            );
            newArray[elementIndex] = {
                ...newArray[elementIndex],
                ...action.payload,
            };
            return newArray;
        }
        case remove.type: {
            let newArray = [...state];
            newArray = newArray.filter((el) => el.id !== action.payload.id);
            return newArray;
        }
        default:
            return state;
    }
}

export default taskReducer;
