import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { Navibar } from './components/navbar';
import { Login } from './pages/login';
import { Main } from './pages/main';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import { CreatePost } from './pages/create-post/createpost';

function App() {
  return (
    <div className="App">
      <Router>
        <Navibar/>
        <Routes>
          <Route path='/' element={ <Login /> } />
          <Route path='/main' element={<Main /> } />
          <Route path='/login' element={ <Login /> } />
          <Route path='/createpost' element={ <CreatePost /> } />
          <Route path='*' element={ <h3 className='text-center'>Error 404, Page Not Found!</h3> } />
        </Routes>
      </Router>
      
    </div>
  );
}

export default App;
