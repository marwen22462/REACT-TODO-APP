import React, { Component } from "react";
import "./todo.css";

export class todo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newItem: "",
      list: []
    };
  }
  updateInput(key, value) {
    this.setState({
      [key]: value
    });
  }
  addItem() {
    const newItem = {
      id: 1 + Math.random(),
      value: this.state.newItem.slice(),
      complete: false
    };
    const list = [...this.state.list]; //copy the current list of items
    list.push(newItem); //add new item to list
    this.setState({
      list,
      newItem: ""
    });
  }
  deteleItem(id) {
    const list = [...this.state.list]; //copy current list of items
    const updatedList = list.filter(item => item.id !== id); //filter out item being deleted
    this.setState({ list: updatedList });
  }
  undoItem = id => {
    this.setState({
      list: this.state.list.map((item, index) =>
        id === item.id ? { ...item, complete: !item.complete } : item
      )
    });
  };
  render() {
    return (
      <div>
        <div className="upper">
          <h1 className="title">To-Do App!</h1>
          <h4 className="subTitle">add New To-Do</h4>
          <input
            type="text"
            className="inputField"
            placeholder="Enter new task"
            value={this.state.newItem}
            onChange={e => this.updateInput("newItem", e.target.value)}
          />
          <br />
          <button className="addButton" onClick={() => this.addItem()}>
            Add
          </button>
        </div>
        <div className="downPart">
          <ul>
            {this.state.list.map((item, id) => {
              return (
                <li key={item.id} className={item.complete ? "complete" : ""}>
                  {item.task}
                  <button
                    className="undoBtn"
                    onClick={() => this.undoItem(item.id)}
                  >
                    {!item.complete ? "complete" : "undo"}
                  </button>
                  <button
                    onClick={() => this.deteleItem(item.id)}
                    className="deletBtn"
                  >
                    {" "}
                    Delete
                  </button>

                  <p className="inputText">{item.value}</p>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    );
  }
}

export default todo;
