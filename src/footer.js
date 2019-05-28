import Utils from './Utils';
const
  ALL_TODOS = 'all',
  ACTIVE_TODOS = 'active',
  COMPLETED_TODOS = 'completed';
var classNames = require('classnames');
import { Link  } from "react-router-dom";
import React, {Component} from 'react';
export default class TodoFooter extends Component{
  render(){
    const { count, completedCount, onClearCompleted, nowShowing } = this.props
    let activeTodoWord = Utils.pluralize(count, 'item');
    let clearButton = null;
    if (completedCount > 0) {
      clearButton = (
        <button
          className="clear-completed"
          onClick={onClearCompleted}>
          Clear completed
          </button>
      );
    }
    return (
      <footer className="footer">
        <span className="todo-count">
          <strong>{count}</strong> {activeTodoWord} left
            </span>
        <ul className="filters">
          <li>
            <Link
              to="/"
              className={classNames({ selected: nowShowing === ALL_TODOS })}>
              All
                </Link>
          </li>
          {' '}
          <li>
            <Link
              to="/active"
              className={classNames({ selected: nowShowing === ACTIVE_TODOS })}>
              Active
                </Link>
          </li>
          {' '}
          <li>
            <Link
              to="/completed"
              className={classNames({ selected: nowShowing === COMPLETED_TODOS })}>
              Completed
                </Link>
          </li>
        </ul>
        {clearButton}
      </footer>
    );
  }
  
}