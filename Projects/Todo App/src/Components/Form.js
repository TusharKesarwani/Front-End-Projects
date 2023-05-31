import React, { Component } from "react";

export default class Form extends Component {
  render() {
    return (
      <div id="Form">
        <h1>Kalepu Omkar's Todo</h1>
        <form id="myForm">
          <input
            type="text"
            refs="todo"
            placeholder="Todo.."
            onChange={this.props.onTodoChange}
          />
          <input
            type="text"
            refs="desc"
            placeholder="Description.."
            onChange={this.props.onDesChange}
          />
          <input type="date" refs="date" onChange={this.props.onDateChange} />
          <input type="submit" value="Add Todo" onClick={this.props.onSubmit} />
          <input type="reset" value="Reset" />
        </form>
      </div>
    );
  }
}
