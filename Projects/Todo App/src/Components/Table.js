import React, { Component } from "react";
import "../App.css";

export default class Table extends Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [],
    };
  }

  componentDidMount() {
    this.setState({
      todos: this.props.todos,
    });
  }

  componentWillReceiveProps(props) {
    this.setState({
      todos: props.todos,
    });
  }

  handleTodoChange = (e, id) => {
    const updatedTodos = this.state.todos.map((todo) => {
      if (todo._id === id) {
        todo.todo = e.target.value;
        return todo;
      }
      return todo;
    });

    this.setState({
      todos: updatedTodos,
    });
  };

  handleDescChange = (e, id) => {
    const updatedTodos = this.state.todos.map((todo) => {
      if (todo._id === id) {
        todo.description = e.target.value;
        return todo;
      }
      return todo;
    });

    this.setState({
      todos: updatedTodos,
    });
  };

  handleDateChange = (e, id) => {
    const updatedTodos = this.state.todos.map((todo) => {
      if (todo._id === id) {
        todo.target_date = e.target.value;
        return todo;
      }
      return todo;
    });

    this.setState({
      todos: updatedTodos,
    });
  };

  cancelEdit = (e, id) => {
    e.preventDefault();
    const todo = this.state.todos.find((todo) => todo._id === id);
    todo.isEditStarted = false;
    this.setState({
      todos: this.state.todos,
    });
  };

  updateTodo = (id, e) => {
    e.preventDefault();
    this.state.todos.forEach((todo) =>
      todo._id === id
        ? (todo.isEditStarted = true)
        : (todo.isEditStarted = false)
    );

    this.setState({ todos: this.state.todos });
  };

  render() {
    return (
      <>
        <div id="Table">
          <form>
            <table>
              <thead>
                <tr>
                  <th>Todo</th>
                  <th>Description</th>
                  <th>Target Date</th>
                  <th colSpan={2}>Edit/Delete</th>
                </tr>
              </thead>
              <tbody>
                {this.state.todos.map((todo) => (
                  <tr>
                    <td>
                      {todo.isEditStarted === true ? (
                        <input
                          id="todoBox"
                          type="text value"
                          value={todo.todo}
                          onChange={(e) => this.handleTodoChange(e, todo._id)}
                        />
                      ) : (
                        todo.todo
                      )}
                    </td>
                    <td>
                      {todo.isEditStarted === true ? (
                        <input
                          type="text"
                          value={todo.description}
                          onChange={(e) => this.handleDescChange(e, todo._id)}
                        />
                      ) : (
                        todo.description
                      )}
                    </td>
                    <td>
                      {todo.isEditStarted === true ? (
                        <input
                          type="date"
                          value={todo.target_date}
                          onChange={(e) => this.handleDateChange(e, todo._id)}
                        />
                      ) : (
                        todo.target_date
                      )}
                    </td>
                    <td>
                      {todo.isEditStarted === true ? (
                        <>
                          <button
                            className="btn"
                            onClick={(e) => this.props.handleSave(e, todo)}
                          >
                            Save
                          </button>
                          <button
                            className="btn"
                            onClick={(e) => this.cancelEdit(e, todo._id)}
                          >
                            Cancel
                          </button>
                        </>
                      ) : (
                        <>
                          <button
                            onClick={(e) => this.updateTodo(todo._id, e)}
                            className="btn"
                          >
                            Edit
                          </button>
                          <button
                            onClick={(e) => this.props.deleteTodo(todo._id, e)}
                            className="btn"
                          >
                            Delete
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </form>
        </div>
      </>
    );
  }
}
