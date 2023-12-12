import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import "./style.css";
import axios from "axios";
function Todo({ userId, setLogin }) {
  const [todos, setTodos] = useState([]);
  const [title, setTitle] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [todoId, setTodoId] = useState(null);
  const [isChecked, setIsChecked] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:3000/todos`).then((res) => {
      setTodos(res.data);
    });
  }, []);

  function deleteTodo(id) {
    axios.delete(`http://localhost:3000/todos/${id}`);

    setTodos((prevState) => {
      return prevState.filter((todo) => todo.id !== id);
    });
  }

  function addTodo(e) {
    e.preventDefault();
    if (!isEditing) {
      const newTodo = {
        id: uuidv4(),
        title,
        userId,
        completed: false,
      };

      axios.post("http://localhost:3000/todos", newTodo);

      setTodos([...todos, newTodo]);

      setTitle("");
    } else {
      axios
        .patch(`http://localhost:3000/todos/${todoId}`, {
          title,
        })
        .finally(() => {
          setIsEditing(false);
          setTodos((prevState) =>
            prevState.map((todo) => {
              if (todo.id === todoId) {
                todo.title = title;
                setTitle("");
              }
              return todo;
            })
          );
        });
    }
  }

  function updateTodo(title, id) {
    setTitle(title);
    setIsEditing(true);
    setTodoId(id);
  }
  function completeTodo(id, isCompleted) {
    axios
      .patch(`http://localhost:3000/todos/${id}`, {
        completed: !isCompleted,
      })
      .finally(() => {
        setIsChecked(!isCompleted);
      });
  }

  return (
    <div>
      <h1>Todo Application</h1>
      <div className="todoApp">
        <form onSubmit={addTodo}>
          <input
            type="text"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
          <input type="submit" value={isEditing ? "Edit todo" : "Add Todo"} />
        </form>
        <table>
          <tr>
            <th>Todo title</th>
            <th>Actions</th>
          </tr>
          {todos.map((todo) => {
            return (
              <tr key={todo.id}>
                <td>{todo.title}</td>
                <td>
                  <button onClick={() => deleteTodo(todo.id)}>delete</button>
                  <button onClick={() => updateTodo(todo.title, todo.id)}>
                    update
                  </button>
                  <input
                    type="checkbox"
                    name="completed"
                    id="completed"
                    checked={isChecked}
                    onChange={() => {
                      completeTodo(todo.id, todo.completed);
                    }}
                  />
                </td>
              </tr>
            );
          })}
        </table>
      </div>
      <button onClick={() => setLogin(false)}>logout</button>
    </div>
  );
}

export default Todo;
