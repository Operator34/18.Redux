const TASK_UPDATED = "task/updated";
const TASK_DELETED = "task/delete";

export function taskCompleted(id) {
    return {
        type: TASK_UPDATED,
        payload: { id, completed: true },
    };
}

export function taskDeleted(id) {
    return {
        type: TASK_DELETED,
        payload: { id },
    };
}

export function titleChange(id) {
    return {
        type: TASK_UPDATED,
        payload: { id, title: `New title for ${id}` },
    };
}

function taskReducer(state = [], action) {
    switch (action.type) {
        case TASK_UPDATED: {
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
        case TASK_DELETED: {
            let newArray = [...state];
            newArray = newArray.filter((el) => el.id !== action.payload.id);
            return newArray;
        }
        default:
            return state;
    }
}

export default taskReducer;
