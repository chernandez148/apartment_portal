import React, { useEffect, useState } from 'react'
import { CiEdit, CiTrash } from 'react-icons/ci';
import EditUnit from './EditUnit/EditUnit';
import './styles.css'

function Properties() {
    const [propertyData, setPropertyData] = useState([]);
    const [edit, setEdit] = useState(false)
    const [index, setIndex] = useState(0);
    const [aptIndex, setAptIndex] = useState()
    console.log(index);
    console.log(propertyData);

    const fetchPropertyData = () => {
        fetch("http://127.0.0.1:5000/new_property")
            .then((resp) => {
                if (resp.ok) {
                    resp.json().then((property) => {
                        setPropertyData(property);
                    });
                }
            });
    };

    const handleUnitDelete = (unitIndex) => {
        fetch(`http://127.0.0.1:5000/new_unit/${unitIndex}`, {
            method: "DELETE"
        })
    }

    const handleIndex = (property_index) => {
        setIndex(property_index);
    }

    const handleEditUnit = (unitIndex) => {
        setEdit(true)
        setAptIndex(unitIndex)
    }

    useEffect(() => {
        fetchPropertyData();
    }, []);

    return (
        <div className='properties'>
            <div className='properties-left'>
                <h4>Properties</h4>
                {propertyData.map((property, propertyIndex) => {
                    return (
                        <div onClick={() => handleIndex(propertyIndex)} className='property_card' key={propertyIndex}>
                            <h5>{property.property_name}</h5>
                            <p>{property.property_street}</p>
                            <p>{property.property_city}, {property.property_state} {property.property_postal_code}</p>
                        </div>
                    );
                })}
            </div>
            <div className='properties-right'>
                <h4>{propertyData[index] ? propertyData[index].property_name : ''}</h4>
                <h5>Property Info</h5>
                <p>{propertyData[index] ? propertyData[index].property_street : ''}</p>
                <p>{propertyData[index] ? propertyData[index].property_city : ''}, {propertyData[index] ? propertyData[index].property_state : ''} {propertyData[index] ? propertyData[index].property_postal_code : ''}</p>
                <div className='property_units'>
                    <h5>{propertyData[index] ? propertyData[index].units.length : 0} Unit(s)</h5>
                    <div key={index}>
                        <table border="1">
                            <thead>
                                <tr>
                                    <th>Apt #</th>
                                    <th>Price</th>
                                    <th>Bed/Bath</th>
                                    <th>Sqft</th>
                                    <th>Availability</th>
                                    <th>Edit</th>
                                    <th>Delete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {propertyData[index]?.units.map((unit, index) => {
                                    return (
                                        <tr key={index}>
                                            <td>{unit.unit_number}</td>
                                            <td>{unit.unit_price}</td>
                                            <td>{unit.unit_type}</td>
                                            <td>{unit.sqft}</td>
                                            <td>{unit.current_tenant_first_name && unit.current_tenant_last_name ? "Not Available" : "Available"}</td>
                                            <td><button onClick={() => handleEditUnit(unit.id)}><CiEdit /></button></td>
                                            <td><button onClick={() => handleUnitDelete(unit.id)}><CiTrash /></button></td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            {edit ? <EditUnit aptIndex={aptIndex} setEdit={setEdit} /> : null}
        </div>
    );
}

export default Properties;
