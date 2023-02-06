import { taskUpdated, taskDelete } from "./actionTypes";

export function taskReducer(state = [], action) {
    // ф которая будет обрабатывать все действия с задачими
    switch (action.type) {
        case taskUpdated: {
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
        case taskDelete: {
            let newArray = [...state];
            newArray = newArray.filter((el) => el.id !== action.payload.id);
            return newArray;
        }
        default:
            return state;
    }
}
