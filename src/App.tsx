import React from 'react';
import logo from './logo.svg';
import { Navbar } from './Navbar';import { TestComponent } from './TestComponent';
import { TodoComponent } from './Component/TodoComponent';
import { ToDoApp } from './Component/TodoApp';
import './App.css';
import { Helmet } from "react-helmet";
function App() {
  return (
    <div className="application">
        <Helmet>
          <title>Todo App</title>
        </Helmet>
        <TodoComponent></TodoComponent>
    </div>
  );
}

export default App;
