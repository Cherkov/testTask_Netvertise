import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import TodoApp from './App';
import {render} from 'react-dom';
const
  ALL_TODOS = 'all',
  ACTIVE_TODOS = 'active',
  COMPLETED_TODOS = 'completed';
render((
  <Router>
      <Route path="/" exact component={() => <TodoApp todos={ALL_TODOS} />} />
      <Route path="/active" component={() => <TodoApp todos={ACTIVE_TODOS} />} />
      <Route path="/completed" component={() => <TodoApp todos={COMPLETED_TODOS} />} />
  </Router>
), document.getElementById('root'))
    
