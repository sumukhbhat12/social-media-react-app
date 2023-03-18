import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { Navibar } from './components/navbar';
import { Login } from './pages/login';
import { Main } from './pages/main';
import {auth} from './config/firebase';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Navibar/>
        <Routes>
          <Route path='/' element={ <Login /> } />
          <Route path='/main' element={<Main /> } />
          <Route path='/login' element={ <Login /> } />
          <Route path='*' element={ <h3>Error 404, Page Not Found!</h3> } />
        </Routes>
      </Router>
      
    </div>
  );
}

export default App;
