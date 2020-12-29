import * as React from "react";
import * as ReactDOM from "react-dom";
import App from "./components/App";
// import { TodoProvider } from "./context/TodoContext";

ReactDOM.render(
  // <TodoProvider>
    <App />,
  // </TodoProvider>,
  document.getElementById("root")
);
