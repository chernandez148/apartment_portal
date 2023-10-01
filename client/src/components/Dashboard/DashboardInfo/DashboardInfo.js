import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { RiMenu4Fill } from 'react-icons/ri';
import Home from './Home/Home';
import Payments from './Payments/Payments';
import Maintenance from './Maintenance/Maintenance';
import Contact from './Contact/Contact';
import Admin from './Admin/Admin';
import AddProperties from './AddProperties/AddProperties';
import AddUnit from './AddUnit/AddUnit';
import AddTenant from './AddTenant/AddTenant';
import Documents from './Documents/Documents';
import Insurance from './Insurance/Insurance';
import PropertyDetails from './PropertyDetails/PropertyDetails';
import AvailableUnits from './AvailableUnits/AvailableUnits';
import Profile from './Profile/Profile';
import Help from './Help/Help';
import NewEmployee from './NewEmployee/NewEmployee';
import Properties from './Properties/Properties';
import Requests from './Requests/Requests';
import './styles.css'

function DashboardInfo({ user, setUser, employee, toggleSideNav, setToggleSideNav, menuSelection }) {
    const navigate = useNavigate()

    const handleLogOut = () => {
        fetch("http://127.0.0.1:5000/logout", {
            method: "DELETE"
        }).then(resp => {
            if (resp.ok) {
                setUser(null);
                navigate("/");
            }
        });
    }

    const handleToggleNav = () => {
        setToggleSideNav(true)
    }

    return (
        <div className={`dashboard-info ${toggleSideNav ? "backdrop-brighness-5" : null}`}>
            <div className='dashboard-info-wrapper'>
                <div className='user-info'>
                    <button onClick={handleToggleNav}><RiMenu4Fill size={24} /></button>
                    <div className='user-info-wrapper'>
                        <h5>Welcome back, {employee ? user.employee_first_name : user.first_name} {employee ? user.employee_last_name : user.last_name}</h5>
                        {employee ? <h5>Employee Role: {user.account_type} | <span onClick={handleLogOut}>Sign Out</span></h5> :
                            <h5>Property Address: {user.street}, {user.city} {user.state} {user.postal_code} | <span onClick={handleLogOut}>Sign Out</span></h5>
                        }
                    </div>
                </div>
                {!employee && menuSelection === "Home" ? <Home user={user} /> : null}
                {employee && menuSelection === "Home" ? <Admin /> : null}
                {!employee && menuSelection === "Payments" ? <Payments /> : null}
                {employee && menuSelection === "Payments" ? <AddProperties /> : null}
                {!employee && menuSelection === "Maintenance" ? <Maintenance /> : null}
                {employee && menuSelection === "Maintenance" ? <AddUnit /> : null}
                {!employee && menuSelection === "Contact Us" ? <Contact /> : null}
                {employee && menuSelection === "Contact Us" ? <AddTenant /> : null}
                {!employee && menuSelection === "Shared Documents" ? <Documents /> : null}
                {employee && menuSelection === "Shared Documents" ? <NewEmployee /> : null}
                {!employee && menuSelection === "Insurance" ? <Insurance /> : null}
                {employee && menuSelection === "Insurance" ? <Properties /> : null}
                {!employee && menuSelection === "Property Details" ? <PropertyDetails /> : null}
                {employee && menuSelection === "Property Details" ? <Requests /> : null}
                {menuSelection === "View Other Units" ? <AvailableUnits /> : null}
                {menuSelection === "Account Profile" ? <Profile /> : null}
                {menuSelection === "Help" ? <Help /> : null}
            </div>
        </div>
    )
}

export default DashboardInfo