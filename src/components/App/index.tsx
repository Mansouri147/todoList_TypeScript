import React, { useState } from "react";
import Form from "../Form";
import List from "../List";

type FilterType = "ALL" | "DONE" | "UNDONE";
const App = () => {
  const [filterBy, setFilterBy] = useState<FilterType>("ALL");
  return (
    <div>
      <Form originalTodo={null} />
      <select
        name=""
        id=""
        value={filterBy}
        onChange={(e) => {
          setFilterBy(e.target.value as FilterType);
        }}
      >
        <option value="ALL">All</option>
        <option value="DONE">Uncompleted</option>
        <option value="UNDONE">Completed</option>
      </select>
      <List filterBy={filterBy} />
    </div>
  );
};

export default App;
