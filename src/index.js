import React from "react";
import ReactDOM from "react-dom/client";
import { pipe, compose } from "lodash/fp";

const App = (second) => {
    const x = 2;
    const double = (number) => number * 2;
    const square = (number) => number * number;
    const half = (number) => number / 2;
    const mathCalculate = pipe(double, square, half);
    const mathCalculate2 = compose(half, square, double);
    return (
        <h1>
            {mathCalculate(x)} + {mathCalculate2(x)}
        </h1>
    );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
