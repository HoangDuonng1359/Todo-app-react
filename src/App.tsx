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
import { GenerateForm } from './builder/form/genereate';
function App() {
  const [FormJson, setFormJson] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/api/form')
      .then(function (response) {
        setFormJson(response.data);
        //console.log(FormJson);
      })
      .catch(function (error) {
        console.log(error);
      })
  }, []);
  return (
    <div className="application">
      <Helmet>
        <title>App</title>
      </Helmet>

      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home FormJson={FormJson} setFormJson={setFormJson}></Home>}></Route>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/todoApp" element={<TodoComponent></TodoComponent>}></Route>
          <Route path="/form-builder" element={<FormBuilder />}></Route>
          <Route path='/test' element={<Test></Test>}></Route>
          {FormJson?.map((Form: form) => {
            //console.log(Form.widgets)
            return (
              <Route path={Form.url} element={<GenerateForm title={Form.title} url={Form.url} widgets={JSON.parse(Form.widgets)} ></GenerateForm>} ></Route>
            )
          })}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
