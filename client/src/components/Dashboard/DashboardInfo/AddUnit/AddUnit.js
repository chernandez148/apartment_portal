import React, { useState } from 'react'
import { useFormik } from 'formik'
import * as yup from 'yup'
import './styles.css'

function AddUnit() {

    const [successMessage, setSuccessMessage] = useState(false)

    const formSchema = yup.object().shape({
        unit_number: yup.string().required("Unit number required"),
        unit_type: yup.string().required("Unit type required"),
        unit_price: yup.string().required('Price required'),
        sqft: yup.string().required("SQFT required"),
        current_tenant_first_name: yup.string(),
        current_tenant_last_name: yup.string(),
        email: yup.string(),
        property_name: yup.string().required("Property name required")
    })

    const formik = useFormik({
        initialValues: {
            unit_number: "",
            unit_type: "",
            unit_price: "",
            sqft: "",
            current_tenant_first_name: "",
            current_tenant_last_name: "",
            email: "",
            property_name: "",
        },
        validationSchema: formSchema,
        onSubmit: (values, { resetForm }) => {
            fetch("http://127.0.0.1:5000/new_unit", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(values)
            })
                .then((resp) => {
                    if (resp.ok) {
                        resp.json().then((unit) => {
                            console.log(unit)
                            setSuccessMessage(true);
                            resetForm();
                            setTimeout(() => {
                                setSuccessMessage(false);
                            }, 1000);
                        })
                    }
                })
        }

    })

    return (
        <div className='add_unit'>
            <h4>Add a new unit +</h4>
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
                        <label>Tenant First Name</label>
                        <input
                            type='text'
                            placeholder='First Name'
                            name='current_tenant_first_name'
                            onChange={formik.handleChange}
                            value={formik.values.current_tenant_first_name}
                        />
                        <label>Tenant Last Name</label>
                        <input
                            type='text'
                            placeholder='Last Name'
                            name='current_tenant_last_name'
                            onChange={formik.handleChange}
                            value={formik.values.current_tenant_last_name}
                        />
                        <label>Tenant Email Address</label>
                        <input
                            type='email'
                            placeholder='Email'
                            name='email'
                            onChange={formik.handleChange}
                            value={formik.values.email}
                        />
                        <label>Unit Number</label>
                        <input
                            type='text'
                            placeholder='A1'
                            name='unit_number'
                            onChange={formik.handleChange}
                            value={formik.values.unit_number}
                        />
                        <label>Unit Type</label>
                        <input
                            type='text'
                            placeholder='1BD 1BA'
                            name='unit_type'
                            onChange={formik.handleChange}
                            value={formik.values.unit_type}
                        />
                        <label>Unit Price</label>
                        <input
                            type='text'
                            placeholder='$1,900.00'
                            name='unit_price'
                            onChange={formik.handleChange}
                            value={formik.values.unit_price}
                        />
                        <label>Sqft</label>
                        <input
                            type='text'
                            placeholder='850sqft'
                            name='sqft'
                            onChange={formik.handleChange}
                            value={formik.values.sqft}
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

export default AddUnit