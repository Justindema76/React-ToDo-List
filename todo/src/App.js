import React, { Component } from "react";
import { TodoBanner } from "./TodoBanner"; // Import TodoBanner
import { TodoCreator } from "./TodoCreator"; // Import TodoCreator
import { TodoRow } from "./TodoRow"; // Import TodoRow
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap styles
import { VisibilityControl } from "./VisibilityControl"; // Import VisibilityControl

// The App component
export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: "Justin", // User's name
      todoItems: [
        { action: "Buy Flowers", done: false },
        { action: "Get Shoes", done: false },
        { action: "Collect Tickets", done: true },
        { action: "Call Joe", done: false },
      ],
      showCompleted: true, // Determines whether to show completed tasks
    };
  }

  // Updates the text value for the new to-do item
  updateNewTextValue = (event) => {
    this.setState({ newItemText: event.target.value });
  };

  // Creates a new to-do item
  createNewTodo = (task) => {
   if (!this.state.todoItems.find(item => item.action === task)) {
   this.setState({
   todoItems: [...this.state.todoItems, { action: task, done: false }]
   }, () => localStorage.setItem("todos", JSON.stringify(this.state)));
   }
   }

  // Toggles the 'done' state of a to-do item
  toggleTodo = (todo) =>
    this.setState({
      todoItems: this.state.todoItems.map((item) =>
        item.action === todo.action ? { ...item, done: !item.done } : item
      ),
    });

  // Generates table rows for the to-do list
  todoTableRows = (doneValue) =>
    this.state.todoItems
      .filter((item) => item.done === doneValue)
      .map((item) => (
        <TodoRow key={item.action} item={item} callback={this.toggleTodo} />
      ));

      componentDidMount = () => {
         let data = localStorage.getItem("todos");
         this.setState(data != null
         ? JSON.parse(data)
         : {
         userName: "Justin",
         todoItems: [{ action: "Buy Flowers", done: false },
         { action: "Get Shoes", done: false },
        { action: "Collect Tickets", done: true },
        { action: "Call Joe", done: false }],
         showCompleted: true
         });
         }

  render = () => (
    <div>
      {/* Banner Section */}
      <TodoBanner name={this.state.userName} tasks={this.state.todoItems} />

      {/* Main To-Do Creator and Table */}
      <div className="container-fluid">
        <TodoCreator callback={this.createNewTodo} />

        {/* Table for Incomplete Tasks */}
        <table className="table table-striped table-bordered">
          <thead>
            <tr>
              <th>Description</th>
              <th>Done</th>
            </tr>
          </thead>
          <tbody>{this.todoTableRows(false)}</tbody>
        </table>

        {/* Visibility Control and Completed Tasks */}
        <div className="bg-secondary text-white text-center p-2">
          <VisibilityControl
            description="Completed Tasks"
            isChecked={this.state.showCompleted}
            callback={(checked) =>
              this.setState({ showCompleted: checked })
            }
          />
        </div>

        {/* Table for Completed Tasks (if showCompleted is true) */}
        {this.state.showCompleted && (
          <table className="table table-striped table-bordered">
            <thead>
              <tr>
                <th>Description</th>
                <th>Done</th>
              </tr>
            </thead>
            <tbody>{this.todoTableRows(true)}</tbody>
          </table>
        )}
      </div>
    </div>
  );
}
