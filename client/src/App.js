import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from './components/Dashboard/Dashboard';
import UserForm from './components/UserForms/UserForm';
import './App.css';

function App() {
  const [login, setLogin] = useState(true)
  const [user, setUser] = useState(null)
  const [employee, setEmployee] = useState(false)
  console.log(user)

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path='/' element={<UserForm setUser={setUser} employee={employee} setEmployee={setEmployee} setLogin={setLogin} login={login} />} />
          <Route path="/dashboard" element={<Dashboard user={user} setUser={setUser} employee={employee} />} />
        </Routes>
      </div>
    </Router>

  );
}

export default App;
