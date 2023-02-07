import {
    legacy_createStore as createStore,
    compose,
    applyMiddleware,
} from "redux";
import { logger } from "./middlewere/logger";
import { thunk } from "./middlewere/thunk";
import taskReducer from "./task";

const middlewareEnhancer = applyMiddleware(logger, thunk);

function configureStore() {
    return createStore(
        taskReducer,
        compose(
            middlewareEnhancer,
            window.__REDUX_DEVTOOLS_EXTENSION__ &&
                window.__REDUX_DEVTOOLS_EXTENSION__()
        )
    );
}

export default configureStore;
