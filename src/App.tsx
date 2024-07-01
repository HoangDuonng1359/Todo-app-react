import React from 'react';
import logo from './logo.svg';
import { Navbar } from './Navbar';import { TestComponent } from './TestComponent';
import { TodoComponent } from './Component/TodoComponent';
import { ToDoApp } from './Component/TodoApp';
import './App.css';
import { Helmet } from "react-helmet";
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom';
import { LoginPage } from './pages/LoginPage';
import { FormBuilder } from './builder/form/FormBuilder';
import { Home } from './pages/Home';
import Test from './builder/form/test';

function App() {
  return (
    <div className="application">
        <Helmet>
          <title>Todo App</title>
        </Helmet>
        <BrowserRouter>
            <Routes>
              <Route path='/' element={<Home></Home>}></Route>
              <Route path="/login" element={<LoginPage/>} />
              <Route path="/todoApp" element={<TodoComponent></TodoComponent>}></Route>
              <Route path="/form-builder" element={<FormBuilder/>}></Route>
              <Route path='/test' element={<Test></Test>}></Route>
            </Routes>
          </BrowserRouter>
    </div>
  );
}

export default App;
