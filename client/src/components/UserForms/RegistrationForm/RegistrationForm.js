import React from 'react'
import { useFormik } from 'formik'
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup'
import "./styles.css"

function RegistrationForm({ login, setLogin, setEmployee, setUser }) {
    const navigate = useNavigate()

    const handleLoginForm = () => {
        setLogin(true)
    }

    const formSchema = yup.object().shape({
        first_name: yup.string().required("First name required"),
        last_name: yup.string().required("Last name required"),
        email: yup.string().email().required("Email required"),
        property_name: yup.string().required("Property name required"),
        street: yup.string().required("Street name required"),
        city: yup.string().required("City name required"),
        state: yup.string().required("State required"),
        postal_code: yup.string().required("Postal code required"),
        password: yup.string().required("Password required"),
    });

    const formik = useFormik({
        initialValues: {
            first_name: "",
            last_name: "",
            email: "",
            property_name: "",
            street: "",
            city: "",
            state: "",
            postal_code: "",
            password: "",
        },
        validationSchema: formSchema,
        onSubmit: (values) => {
            fetch("http://127.0.0.1:5000/register", {
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
                            setEmployee(false)
                            navigate(0)
                        })
                    }
                })
        }
    })

    return (
        <div className={`registration-form ${login ? "right-minus-400" : "right-0"}`}>
            <h2>Welcome</h2>
            <form>
                {formik.errors && (
                    <>
                        <div className='personal-details'>
                            <h3>Personal Details</h3>
                            <input
                                type='text'
                                placeholder='First Name'
                                name='first_name'
                                onChange={formik.handleChange}
                                value={formik.values.first_name}
                                className={`${formik.values.first_name ? "bg-off-white" : "bg-transparent"} ${formik.errors.first_name ? "mb-0" : "mb-2"}`}
                            />
                            <span>{formik.errors.first_name}</span>
                            <input
                                type='text'
                                placeholder='Last Name'
                                name='last_name'
                                onChange={formik.handleChange}
                                value={formik.values.last_name}
                                className={`${formik.values.last_name ? "bg-off-white" : "bg-transparent"} ${formik.errors.last_name ? "mb-0" : "mb-2"}`}
                            />
                            <span>{formik.errors.last_name}</span>
                            <input
                                type='email'
                                placeholder='Email'
                                name='email'
                                onChange={formik.handleChange}
                                value={formik.values.email}
                                className={`${formik.values.email ? "bg-off-white" : "bg-transparent"} ${formik.errors.email ? "mb-0" : "mb-2"}`}
                            />
                            <span>{formik.errors.email}</span>
                        </div>
                        <div className='account-information'>
                            <h3>Account Information</h3>
                            <input
                                type='text'
                                placeholder='Property Name'
                                name='property_name'
                                onChange={formik.handleChange}
                                value={formik.values.property_name}
                                className={`${formik.values.property_name ? "bg-off-white" : "bg-transparent"} ${formik.errors.property_name ? "mb-0" : "mb-2"}`}
                            />
                            <span>{formik.errors.property_name}</span>
                            <input
                                type='text'
                                placeholder='Street'
                                name='street'
                                onChange={formik.handleChange}
                                value={formik.values.street}
                                className={`${formik.values.street ? "bg-off-white" : "bg-transparent"} ${formik.errors.state ? "mb-0" : "mb-2"}`}
                            />
                            <span>{formik.errors.street}</span>
                            <input
                                type='text'
                                placeholder='City'
                                name='city'
                                onChange={formik.handleChange}
                                value={formik.values.city}
                                className={`${formik.values.city ? "bg-off-white" : "bg-transparent"} ${formik.errors.city ? "mb-0" : "mb-2"}`}
                            />
                            <span>{formik.errors.city}</span>
                            <input
                                type='text'
                                placeholder='State'
                                name='state'
                                onChange={formik.handleChange}
                                value={formik.values.state}
                                className={`${formik.values.state ? "bg-off-white" : "bg-transparent"} ${formik.errors.state ? "mb-0" : "mb-2"}`}
                            />
                            <span>{formik.errors.state}</span>
                            <input
                                type='text'
                                placeholder='Postal Code'
                                name='postal_code'
                                onChange={formik.handleChange}
                                value={formik.values.postal_code}
                                className={`${formik.values.postal_code ? "bg-off-white" : "bg-transparent"} ${formik.errors.postal_code ? "mb-0" : "mb-2"}`}
                            />
                            <span>{formik.errors.postal_code}</span>
                            <input
                                type='password'
                                placeholder='Password'
                                name='password'
                                onChange={formik.handleChange}
                                value={formik.values.password}
                                className={`${formik.values.password ? "bg-off-white" : "bg-transparent"} ${formik.errors.password ? "mb-0" : "mb-2"}`}
                            />
                            <span>{formik.errors.password}</span>
                        </div>
                        <div className='terms-and-conditions'>
                            <input type='checkbox' required aria-required='true' />
                            <h5>I have read and accept the Terms and Conditions</h5>
                        </div>
                    </>
                )}
                <button type='submit' onClick={formik.handleSubmit}>Register</button>
            </form>
            <h5>Already have an account? Sign in <span onClick={handleLoginForm}>here.</span></h5>
        </div>
    )
}

export default RegistrationForm