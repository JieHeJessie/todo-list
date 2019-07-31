import * as React from "react";
import "./App.css";

type FormElem = React.FormEvent<HTMLFormElement>;
interface ITodo {
  text: string;
  complete: boolean;
}

const App = (props: any) => {
  const [value, setValue] = React.useState<string>("");
  const [todos, setTodos] = React.useState<ITodo[]>([]);
  const handleSubmit = (e: FormElem): void => {
    e.preventDefault();
    addTodo(value);
    setValue("");
  };

  const addTodo = (text: string): void => {
    const newTodos: ITodo[] = [...todos, { text, complete: false }];
    setTodos(newTodos);
  };

  const removeTodo = (index: number): void => {
    setTodos(todos.filter((item, i) => i !== index));
  };

  const completeTodo = (index: number): void => {
    const newTodos: ITodo[] = [...todos];
    newTodos[index].complete = !newTodos[index].complete;
    setTodos(newTodos);
  };
  return (
    <React.Fragment>
      <h1>To do list</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          required
          value={value}
          onChange={e => setValue(e.target.value)}
        />
        <button type="submit">Add</button>
      </form>
      <section>
        {todos.map((todo: ITodo, index: number) => (
          <div key={index} style={{ display: "flex" }}>
            <div
              style={{ textDecoration: todo.complete ? "line-through" : "" }}
            >
              {todo.text}
            </div>
            <button type="button" onClick={() => completeTodo(index)}>
              {todo.complete ? "Incomplete" : "Complete"}
            </button>
            <button onClick={() => removeTodo(index)}>x</button>
          </div>
        ))}
      </section>
    </React.Fragment>
  );
};

export default App;
