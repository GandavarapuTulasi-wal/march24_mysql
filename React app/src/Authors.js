import axios from 'axios';
import { useEffect, useState } from 'react';

function Todo() {
  let [authors, setAuthors] = useState([]);
  let [update, setUpdate] = useState(false);
  let [editAuthors, setEditAuthors] = useState([]);

  useEffect(() => {
    getAuthors();
  }, []);
  const getAuthors = () => {
    axios
      .get('/authors')
      .then((res) => {
        setAuthors(res.data.results);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const addAuthor = (event) => {
    event.preventDefault();
    let authorObject = {
      first_name: event.target.first_name.value,
      lastname: event.target.lastname.value,
      dob: event.target.dob.value,
      dod: event.target.dod.value,
    };
    console.log(authorObject);
    axios
      .post('/authors', authorObject)
      .then((res) => {
        getAuthors();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const deleteAuthor = (first_name) => {
    axios
      .delete('/authors/' + first_name)
      .then((res) => {
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
    getAuthors();
  };
  const deleteAll = () => {
    axios.get('/authors/deleteall').then((res) => {
      console.log(res.data);
    });
    getAuthors();
  };
  const updateAuthor = (author) => {
    setUpdate(true);
    setEditAuthors(author);
  };
  const closeAuthor = () => {
    setUpdate(false);
  };
  const saveAuthor = (event) => {
    event.preventDefault();
    const object = {
      first_name: event.target.first_name.value,
      lastname: event.target.lastname.value,
      dob: event.target.dob.value,
      dod: event.target.dod.value,
    };
    axios
      .put(`/authors/update/${editAuthors.first_name}`, object)
      .then((res) => {
        getAuthors();
        setUpdate(false);
        console.log(res.data);
      });
  };
  return (
    <div className="card-container">
      <h1>Authors Form</h1>
      <form onSubmit={addAuthor} className="box">
        <input
          type="text"
          name="first_name"
          placeholder="Enter First Name"
          className="todo-user-input"
        />
        <input
          type="text"
          name="lastname"
          placeholder="Enter Last Name"
          className="todo-user-input"
        />
        <input type="date" name="dob" className="todo-user-input" />
        <input type="date" name="dod" className="todo-user-input" />

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
        {authors.map((val, index) => (
          <div>
            <div className="card">
              <h3>{val.first_name}</h3>
              <p>{val.lastname}</p>
              <p>{val.dob}</p>
              <p>{val.dod}</p>
              <button
                className="delete"
                onClick={() => {
                  deleteAuthor(val.first_name);
                }}
              >
                Delete
              </button>
              <button onClick={() => updateAuthor(val)}>Edit</button>
            </div>
            {update ? (
              <form onSubmit={saveAuthor} className="save-box">
                <input
                  type="text"
                  name="first_name"
                  placeholder="Enter First Name"
                  className="todo-user-input"
                />
                <input
                  type="text"
                  name="lastname"
                  placeholder="Enter Last Name"
                  className="todo-user-input"
                />
                <input type="date" name="dob" className="todo-user-input" />
                <input type="date" name="dod" className="todo-user-input" />

                <div className="button-container">
                  <button>Save</button>
                  <button
                    className="delete"
                    onClick={() => closeAuthor(val.item)}
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
