import React, { Component } from 'react';
import TodoItem from './TodoItem';
import TodoFooter from './footer';
import Utils from "./Utils";
import Search from "./Search";
import './App.css';
const 
  ACTIVE_TODOS = 'active',
  COMPLETED_TODOS = 'completed',
  ENTER_KEY = 13;
export default class TodoApp extends Component {
  constructor(props){
    super(props);
    this.state={
      nowShowing: this.props.todos,
      editing: null,
      newTodo: '',
      todos: Utils.store(),      
    }
  }
  handleChange =  (event) => {
    this.setState({newTodo: event.target.value});
  }
  handleSearch = (val) => {
    let tds = Utils.store().filter((todo) => {
     if( todo.title.includes(val)){
      return todo
     } else {
      return;
     }
    })
    this.setState({
        todos: tds
    })
  }
  handleNewTodoKeyDown = (event) => {
    if (event.keyCode !== ENTER_KEY) {
      return;
    }
    let val = this.state.newTodo.trim();
    if (val) {
      let tds = this.state.todos.concat({
        id: Utils.uuid(),
        title: val,
        completed: false,
        priority: false
      });
      this.setState((state)=>{
        return{
          todos: tds,
        }
      })
			Utils.store(tds);
    }
    this.setState({
        newTodo: ''
    })
  }
  toggleAll = (event) => {
    var checked = event.target.checked;
    let tds = this.state.todos.map((todo) => {
      return {...todo, completed: checked};
    });
    this.setState({
      todos: tds 
    })
    Utils.store(tds);
  }
  togglePrior = (todoToTogglePrior) => {
    let tds = this.state.todos.map((todo) => {
      if(todo.id !== todoToTogglePrior) {
        return todo;
      } else {
        let flag = todo.priority
        return {...todo, priority: !flag}
      }
    });
    this.setState((state)=>{
      return{
        todos: tds 
      }
    })
    Utils.store(tds);
  }
  toggle = (todoToToggle) => {
    let tds = this.state.todos.map((todo) => {
      if(todo.id !== todoToToggle) {
        return todo;
      } else {
        let flag = todo.completed
        return {...todo, completed: !flag}
      }
    });
    this.setState((state)=>{
      return{
        todos: tds 
      }
    })
    Utils.store(tds);
  }
  destroy = (todo) => {
    let tds = this.state.todos.filter((candidate) => {
      return candidate.id !== todo;
    });
    this.setState((state)=>{
      return{
        todos: tds 
      }
    })
    Utils.store(tds);
  }
  edit = (todo) => {
    this.setState({editing: todo});
  }
  save = (todoToSave, text) => {
    let tds = this.state.todos.map((todo) => {
      return todo.id !== todoToSave ? todo : {...todo, title: text};
    });
    this.setState({
      todos: tds
    })
    Utils.store(tds);
    this.setState({editing: null});
  }
  cancel = () =>{
    this.setState({editing: null});
  }
  clearCompleted =  () => {
    let tds = this.state.todos.filter((todo) => {
      return !todo.completed;
    });
    this.setState({
      todos: tds
    })
    Utils.store(tds);
  }
  render() {
    let footer;
    let main;
    let {todos} = this.state;
    let shownTodos = todos.filter(todo => {
      switch (this.state.nowShowing) {
        case ACTIVE_TODOS:
          return !todo.completed;
        case COMPLETED_TODOS:
          return todo.completed;
        default:
          return true;
      }
    });
    let todoItems = shownTodos.map((todo, index) => {
      return (
        <TodoItem
          key={index}
          id={todo.id}
          todo={todo}
          onToggle={this.toggle}
          onDestroy={this.destroy}
          onEdit={this.edit}
          editing={this.state.editing === todo.id}
          onSave={this.save}
          onCancel={this.cancel}
          onTogglePrior={this.togglePrior}
        />
      );
    });

    let activeTodoCount = todos.reduce((accum, todo) => {
      return todo.completed ? accum : accum + 1;
    }, 0);

    let completedCount = todos.length - activeTodoCount;

    if (activeTodoCount || completedCount) {
      footer =
        <TodoFooter
          count={activeTodoCount}
          completedCount={completedCount}
          nowShowing={this.state.nowShowing}
          onClearCompleted={this.clearCompleted}
        />;
    }

    if (todos.length) {
      main = (
        <section className="main">
          <input
            id="toggle-all"
            className="toggle-all"
            type="checkbox"
            onChange={this.toggleAll}
            checked={activeTodoCount === 0}
          />
          <label
            htmlFor="toggle-all"
          />
          <ul className="todo-list">
            {todoItems}
          </ul>
        </section>
      );
    }
    return (
      <div>
        <Search onSearch={this.handleSearch}/>
        <div className="todoForm">
        <header className="header">
          <h1>TODO TEST TASK</h1>
          <input
            className="new-todo"
            placeholder="What needs to be done?"
            value={this.state.newTodo}
            onKeyDown={this.handleNewTodoKeyDown}
            onChange={this.handleChange}
            autoFocus={true}
          />
        </header>
        {main}
        {footer}
      </div>
      </div>
    );
  }
};
