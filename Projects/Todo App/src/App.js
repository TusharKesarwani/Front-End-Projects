import React from "react";
import "./App.css";
import Form from "./Components/Form";
import Table from "./Components/Table";
import axios from "axios";

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      todos: [],

      newTodo: "",
      newDes: "",
      newDate: "",
    };

    this.getTodosFromAPI = this.getTodosFromAPI.bind(this);
  }

  getTodo = (e) => {
    this.setState({ newTodo: e.target.value });
  };

  getDes = (e) => {
    this.setState({ newDes: e.target.value });
  };

  getDate = (e) => {
    this.setState({ newDate: e.target.value });
  };

  handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      todo: this.state.newTodo,
      description: this.state.newDes,
      target_date: this.state.newDate,
    };

    axios
      .post("http://localhost:5000/todos", data)
      .then(this.getTodosFromAPI)
      .catch((err) => console.log(err));
  };

  deleteTodo = (id, e) => {
    e.preventDefault();
    axios
      .delete(`http://localhost:5000/todos/${id}`)
      .then(this.getTodosFromAPI)
      .catch((err) => console.log(err));
  };

  getTodosFromAPI() {
    axios
      .get("http://localhost:5000/todos/")
      .then((response) => this.setState({ todos: response.data }))
      .catch((err) => console.log(err));
  }

  handleSave = (e, todo) => {
    e.preventDefault();
    axios
      .patch(`http://localhost:5000/todos/${todo._id}`, todo)
      .then(this.getTodosFromAPI)
      .catch((err) => console.log(err));
  };

  componentDidMount() {
    this.getTodosFromAPI();
  }

  render() {
    const { todos } = this.state;
    return (
      <>
        <Form
          onTodoChange={this.getTodo}
          onDesChange={this.getDes}
          onDateChange={this.getDate}
          onSubmit={this.handleSubmit}
        />
        {todos.length >= 0 ? (
          <Table
            todos={todos}
            deleteTodo={this.deleteTodo}
            handleSave={this.handleSave}
          />
        ) : (
          ""
        )}
      </>
    );
  }
}

export default App;
