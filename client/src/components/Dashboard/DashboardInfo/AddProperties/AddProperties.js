import React, { useState } from 'react'
import { useFormik } from 'formik'
import { useNavigate } from 'react-router-dom';
import * as yup from 'yup'
import './styles.css'

function AddProperties() {
    const navigate = useNavigate()
    const [successMessage, setSuccessMessage] = useState(false)

    const formSchema = yup.object().shape({
        property_name: yup.string().required("Property name required"),
        property_street: yup.string().required("Street name required"),
        property_city: yup.string().required("City required"),
        property_state: yup.string().required("State required"),
        property_postal_code: yup.string().required("Postal code required"),
        num_of_units: yup.number().required("Number of units required").min(1, "Number of units must be at least 1"),
    });


    const formik = useFormik({
        initialValues: {
            property_name: "",
            property_street: "",
            property_city: "",
            property_state: "",
            property_postal_code: "",
            num_of_units: "",
        },
        validationSchema: formSchema,
        onSubmit: (values, { resetForm }) => {
            fetch("http://127.0.0.1:5000/new_property", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(values)
            })
                .then((resp) => {
                    if (resp.ok) {
                        resp.json().then((property) => {
                            console.log(property)
                            setSuccessMessage(true);
                            resetForm()
                            setTimeout(() => {
                                setSuccessMessage(false);
                            }, 1000);
                        })
                    }
                })
        }
    })

    return (
        <div className='add_properties'>
            <h4>Add a new property +</h4>
            <form>
                {formik.errors && (
                    <>
                        <label>Property Name</label>
                        <input
                            type='text'
                            placeholder='Property Name'
                            name='property_name'
                            onChange={formik.handleChange}
                            value={formik.values.property_name}
                        />
                        <label>Street</label>
                        <input
                            type='text'
                            placeholder='Street Name'
                            name='property_street'
                            onChange={formik.handleChange}
                            value={formik.values.property_street}
                        />
                        <label>City</label>
                        <input
                            type='text'
                            placeholder='City'
                            name='property_city'
                            onChange={formik.handleChange}
                            value={formik.values.property_city}
                        />
                        <label>State</label>
                        <input
                            type='text'
                            placeholder='State'
                            name='property_state'
                            onChange={formik.handleChange}
                            value={formik.values.state}
                        />
                        <label>Postal Code</label>
                        <input
                            type='text'
                            placeholder='Postal Code'
                            name='property_postal_code'
                            onChange={formik.handleChange}
                            value={formik.values.property_postal_code}
                        />
                        <label>Number of Units</label>
                        <input
                            type='number'
                            placeholder='Number of Units'
                            name='num_of_units'
                            onChange={formik.handleChange}
                            value={formik.values.num_of_units}
                        />
                    </>
                )}
                <button type='submit' onClick={formik.handleSubmit}>Add New Property</button>
            </form>
            <div className={`success_message ${successMessage ? "opacity-1" : "opacity-0"}`}>
                <h4>New unit added successfully!</h4>
            </div>
        </div>
    )
}

export default AddProperties