import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik'
import * as yup from 'yup'
import { FaFacebook, FaGoogle, FaTwitter } from 'react-icons/fa';
import './styles.css'

function LoginForm({ setUser, employee, setEmployee, login, setLogin }) {
    const [errorMessage, setErrorMessage] = useState("")
    const navigate = useNavigate()
    console.log(errorMessage)

    const handleRegistrationForm = () => {
        setLogin(false)
    }

    const handleEmployeeLogin = () => {
        setEmployee(!employee)
    }

    const formSchema = employee
        ? yup.object().shape({
            employee_email: yup.string().email().required("Email required"),
            password: yup.string().required("Password required"),
        }) : yup.object().shape({
            email: yup.string().email().required("Email required"),
            password: yup.string().required("Password required"),
        })


    const formik = useFormik({
        initialValues: employee
            ? {
                employee_email: "",
                password: "",
            } : {
                email: "",
                password: "",
            },
        validationSchema: formSchema,
        onSubmit: (values) => {
            fetch(`http://127.0.0.1:5000/${employee ? "employee_login" : "login"}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ ...values, password: values.password })
            })
                .then((resp) => {
                    if (resp.ok) {
                        resp.json().then((user) => {
                            setUser(user)
                            navigate('/dashboard')
                        })
                    } else {
                        setErrorMessage("Incorrect email or password");
                    }
                })
                .catch((error) => {
                    console.log('Error occurred:', error);
                })
        }
    })

    return (
        <div className="login-form">
            <div className='overlay'></div>
            <div className={`form-wrapper ${login ? "opacity-1" : "opacity-0"}`}>
                <h1>Matrix Property Portal</h1>
                <form>
                    {formik.errors && (
                        <>
                            <div className='inner-wrapper'>
                                <h2>{employee ? "Employee Login" : "Welcome"}</h2>
                                <input
                                    type='email'
                                    placeholder='Email'
                                    name={employee ? "employee_email" : "email"}
                                    onChange={formik.handleChange}
                                    value={employee ? formik.values.employee_email : formik.values.email}
                                    className={`${formik.values.email ? "bg-off-white" : "bg-transparent"} ${formik.errors.email ? "mb-0" : "mb-2"}`}
                                />
                                <span>{formik.errors.email}</span>
                                <input
                                    type='password'
                                    placeholder='Password'
                                    name='password'
                                    onChange={formik.handleChange}
                                    value={formik.values.password}
                                    className={`${formik.values.password ? "bg-off-white" : "bg-transparent"} ${formik.errors.password ? "mb-0" : "mb-2"}`}
                                />
                                <span>{formik.errors.password}</span>
                                <span>{errorMessage}</span>
                            </div>
                            <button type='submit' onClick={formik.handleSubmit}>
                                Sign In
                            </button>
                            <h3>OR LOGIN WITH</h3>
                            <hr />
                            <ul>
                                <li><FaFacebook size={28} /></li>
                                <li><FaGoogle size={28} /></li>
                                <li><FaTwitter size={28} /></li>
                            </ul>
                            <a href="#">Forgot Password?</a>
                        </>
                    )}
                </form>
                <h5>Don't have an account? Register <span onClick={handleRegistrationForm}>here</span></h5>
            </div>
            <button onClick={handleEmployeeLogin} className='employee-login'>{!employee ? "Emplyee?" : "Tenent?"} <br />Login here</button>
        </div>
    )
}

export default LoginForm