const 
  ESCAPE_KEY = 27,
  ENTER_KEY = 13;
var classNames = require('classnames');
import React, { Component } from 'react';
import ReactDOM from 'react-dom'
export default class TodoItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editText: this.props.todo.title
    }
  }
  handleSubmit = () => {
    let val = this.state.editText.trim();
    if (val) {
      this.props.onSave(this.props.id, val);
      this.setState({ editText: val });
    } else {
      this.props.onDestroy();
    }
  }
  handleEdit = () => {
    this.props.onEdit(this.props.todo.id);
    this.setState({ editText: this.props.todo.title });
  }
  handleKeyDown = (event) => {
    if (event.which === ESCAPE_KEY) {
      this.setState({ editText: this.props.todo.title });
      this.props.onCancel(event);
    } else if (event.which === ENTER_KEY) {
      this.handleSubmit(event);
    }
  }
  handleChange = (event) => {
    if (this.props.editing) {
      this.setState({ editText: event.target.value });
    }
  }
  shouldComponentUpdate(nextProps, nextState) {
    return (
      nextProps.todo !== this.props.todo ||
      nextProps.editing !== this.props.editing ||
      nextState.editText !== this.state.editText
    );
  }
  componentDidUpdate(prevProps) {
    if (!prevProps.editing && this.props.editing) {
      var node = ReactDOM.findDOMNode(this.refs.editField);
      node.focus();
      node.select();
    }
  }
  render() {
    return (
      <li className={classNames({
        completed: this.props.todo.completed,
        editing: this.props.editing,
        priority: this.props.todo.priority,
      })}>
        <div className="view">
          <input
            className="toggle"
            type="checkbox"
            checked={this.props.todo.completed}
            onChange={() => {this.props.onToggle(this.props.id)}}
          />
          <label onDoubleClick={this.handleEdit}>
            {this.props.todo.title}
          </label>
          <label className="priority-label">
            Pr.
            <input
              className="priority"
              type="checkbox"
              checked={this.props.todo.priority}
              onChange={() => {this.props.onTogglePrior(this.props.id)}}
            />
          </label>
          <button className="destroy" onClick={() => {this.props.onDestroy(this.props.id)}} />
        </div>
        <input
          ref="editField"
          className="edit"
          value={this.state.editText}
          onBlur={this.handleSubmit}
          onChange={this.handleChange}
          onKeyDown={this.handleKeyDown}
        />
      </li>
    );
  }
};
