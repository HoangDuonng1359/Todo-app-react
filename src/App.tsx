import React, { useEffect, useState } from 'react';
import { TodoComponent } from './Component/TodoComponent';
import './App.css';
import { Helmet } from "react-helmet";
import { BrowserRouter, Route, Router, Routes } from 'react-router-dom';
import { LoginPage } from './pages/LoginPage';
import { FormBuilder, form } from './builder/form/Builder';
import { Home } from './pages/Home';
import Test from './builder/form/test';
import axios from 'axios';
import { GenerateForm } from './builder/form/generate';
import { URL_REQUEST } from './api/urlAPI';
import {StudentManagement} from './pages/student_management'
import { TimekeepingPage } from './pages/timekeepingPage';
import NavigationBar from './Component/Navigation';
function App() {
  return (
    <div className="application">
      <Helmet>
        <title>App</title>
      </Helmet>
      <BrowserRouter>
        <Routes>
        <Route path="/" element={<Home/>} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/todoApp" element={<TodoComponent></TodoComponent>}></Route>
          <Route path="/form-builder" element={<FormBuilder />}></Route>
          <Route path="/timekeeping" element={<TimekeepingPage/>} />
          <Route path='/test' element={<Test></Test>}></Route>
          <Route path='/qlsv' element={<StudentManagement/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
