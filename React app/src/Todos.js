import axios from 'axios';
import { useEffect, useState } from 'react';

function Todo() {
  let [todos, setTodos] = useState([]);
  let [update, setUpdate] = useState(false);
  let [editTodos, setEditTodo] = useState([]);

  useEffect(() => {
    getTodos();
  }, []);
  const getTodos = () => {
    axios
      .get('/todos')
      .then((res) => {
        setTodos(res.data.results);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const addTodo = (event) => {
    event.preventDefault();
    let todoObject = {
      item: event.target.item.value,
      status: event.target.status.value,
    };
    axios
      .post('/todos', todoObject)
      .then((res) => {
        getTodos();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const deleteTodo = (item) => {
    axios
      .delete('/todos/' + item)
      .then((res) => {
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
    getTodos();
  };
  const deleteAll = () => {
    axios.get('/todos/deleteall').then((res) => {
      console.log(res.data);
    });
    getTodos();
  };
  const updateTodo = (todo) => {
    setUpdate(true);
    setEditTodo(todo);
  };
  const closeTodo = () => {
    setUpdate(false);
  };
  const saveTodo = (event) => {
    event.preventDefault();
    const obj = {
      item: event.target.item.value,
      status: event.target.status.value,
    };
    axios.put(`/todos/update/${editTodos.item}`, obj).then((res) => {
      getTodos();
      setUpdate(false);
      console.log(res.data);
    });
  };
  return (
    <div className="card-container">
      <h1>Todos Form</h1>
      <form onSubmit={addTodo} className="box">
        <input
          type="text"
          name="item"
          placeholder="Enter Item"
          className="todo-user-input"
        />
        <select name="status" className="todo-user-input">
          <option value="complete">Complete</option>
          <option value="incomplete">incomplete</option>
        </select>
        <button>Add</button>
      </form>

      <button
        onClick={() => {
          deleteAll();
        }}
      >
        Delete all
      </button>
      <div>
        <h1>todos</h1>
        {todos.map((val, index) => (
          <div>
            <div className="card">
              <h3>{val.item}</h3>
              <p>{val.status}</p>
              <button
                className="delete"
                onClick={() => {
                  deleteTodo(val.item);
                }}
              >
                Delete
              </button>
              <button onClick={() => updateTodo(val)}>Edit</button>
            </div>
            {update ? (
              <form onSubmit={saveTodo} className="save-box">
                <input
                  type="text"
                  name="item"
                  placeholder="Enter Item"
                  className="todo-user-input"
                />
                <select name="status" className="todo-user-input">
                  <option value="complete">Complete</option>
                  <option value="incomplete">incomplete</option>
                </select>
                <div className="button-container">
                  <button>Save</button>
                  <button
                    className="delete"
                    onClick={() => closeTodo(val.item)}
                  >
                    Close
                  </button>
                </div>
              </form>
            ) : (
              ''
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
export default Todo;
