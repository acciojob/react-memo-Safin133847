import React, { useState, useMemo } from "react";

const TodoList = React.memo(({ todos }) => {
  console.log("Rendering TodoList");

  return (
    <div>
      <h3>Todo List</h3>
      <ul>
        {todos.map((todo, index) => (
          <li key={index}>{todo}</li>
        ))}
      </ul>
    </div>
  );
});

const App = () => {
  const [todos, setTodos] = useState([]);
  const [counter, setCounter] = useState(0);
  const [task, setTask] = useState("");
  const [isValid, setIsValid] = useState(true);

  const addTodo = () => {
    setTodos((prevTodos) => [...prevTodos, "New todo"]);
  };

  const incrementCounter = () => {
    setCounter((prevCounter) => prevCounter + 1);
  };

  const handleTaskChange = (event) => {
    const newTask = event.target.value;
    setTask(newTask);
    setIsValid(newTask.length > 5);
  };

  const submitTask = () => {
    if (task.length > 5) {
      setTodos((prevTodos) => [...prevTodos, task]);
      setTask("");
    }
  };

  const validationMessage = useMemo(() => {
    return isValid ? "" : "Task must be longer than 5 characters!";
  }, [isValid]);

  return (
    <div className="App">
      <h1>Task Management</h1>

      <button onClick={addTodo}>Add Todo</button>
      <br />

      <button onClick={incrementCounter}>Increment Counter</button>
      <h2>Counter: {counter}</h2>

      <input
        type="text"
        value={task}
        onChange={handleTaskChange}
        placeholder="Enter a custom task"
      />
      <p>{validationMessage}</p>
      <button onClick={submitTask} disabled={!isValid}>
        Submit Task
      </button>

      <TodoList todos={todos} />
    </div>
  );
};

export default App;

