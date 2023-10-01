import React, { useState, useEffect } from 'react'
import "./styles.css"

function Home({ user }) {
    console.log(user)
    const [nextBillDueDate, setNextBillDueDate] = useState('');

    useEffect(() => {
        // Get the current date
        const currentDate = new Date();

        // Calculate the first day of the next month
        const nextMonth = new Date(currentDate);
        nextMonth.setMonth(nextMonth.getMonth() + 1);
        nextMonth.setDate(1);

        // Format the date as "YYYY-MM-DD"
        const formattedDate = nextMonth.toISOString().split('T')[0];

        // Set the next bill due date in state
        setNextBillDueDate(formattedDate);
    }, []);

    return (
        <div className='home'>
            <h4>We are currently not set up to take payments online.</h4>
            <div className='home_wrapper'>
                <div className='account_balance'>
                    <h3>Your Current Balance</h3>
                    <h2>{user.units.unit_price}</h2>
                    <p>Next bill due on {nextBillDueDate}</p>
                    <button>Make a Payment</button>
                </div>
                <div className='renters_insurance'>
                    <h3>Renters Insurance</h3>
                    <p>Renters insurance will be available for purchase soon.</p>
                    <button>Learn More</button>
                </div>
                <div className='property_details'>
                    <h3>Property Details</h3>
                    <p className='pt-1'>Name: <br />{user.property_name}</p>
                    <p>Address: <br />
                        {user.units.property.property_street}, {user.units.unit_number} <br />
                        {user.units.property.property_city}, {user.units.property.property_state} {user.units.property.property_postal_code}
                    </p>
                    <p>Unit: <br />
                        {user.units.unit_type}
                    </p>
                    <p>Sqft: <br />
                        {user.units.sqft}
                    </p>
                </div>
                <div className='maintanance_requests'>
                    <h3>Maintenance Request</h3>
                    <button>Request Maintenance</button>
                </div>
            </div>

        </div>
    )
}

export default Home