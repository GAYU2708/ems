import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import {Route,Routes} from 'react-router-dom';
import Employee from './components/Employee';
import AddEmployee from './components/AddEmployee';
import EditEmployee from './components/EditEmployee';


function App() {

  return (
    <Routes>
      <Route path='/' element={<Employee/>}/>
      <Route path='/add' element={<AddEmployee/>}/>
      <Route path='/edit/:id' element={<EditEmployee/>}/>
    </Routes>
  )
}

export default App;
