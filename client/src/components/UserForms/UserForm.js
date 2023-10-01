import React from 'react'
import LoginForm from '../UserForms/LoginForm/LoginForm';
import RegistrationForm from '../UserForms/RegistrationForm/RegistrationForm';

function UserForm({ setUser, employee, setEmployee, login, setLogin }) {
    return (
        <div className='user-forms'>
            <LoginForm setUser={setUser} employee={employee} setEmployee={setEmployee} login={login} setLogin={setLogin} />
            <RegistrationForm setUser={setUser} setEmployee={setEmployee} login={login} setLogin={setLogin} />
        </div>
    )
}

export default UserForm