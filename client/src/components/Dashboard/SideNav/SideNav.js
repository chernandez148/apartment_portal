import React from 'react';
import logo from '../../../assets/property_matrix_logo.jpeg';
import './styles.css';

function SideNav({ toggleSideNav, setToggleSideNav, setMenuSelection, employee }) {
    const handleToggleSideNav = () => {
        setToggleSideNav(false);
    };

    const handleMenuItemClick = (menuItem) => {
        setMenuSelection(menuItem);
    };

    return (
        <div className={`side-nav ${toggleSideNav ? "left-0" : null}`}>
            <img src={logo} width="100%" alt="Logo" />
            <ul>
                <li><a href='#' onClick={() => handleMenuItemClick('Home')}>{employee ? "Admin" : "Home"}</a></li>
                <li><a href='#' onClick={() => handleMenuItemClick('Payments')}>{employee ? "Add New Property" : "Payments"}</a></li>
                <li><a href='#' onClick={() => handleMenuItemClick('Maintenance')}>{employee ? "Add New Unit" : "Maintenance"}</a></li>
                <li><a href='#' onClick={() => handleMenuItemClick('Contact Us')}>{employee ? "Add New Tenant" : "Contact Us"}</a></li>
                <li><a href='#' onClick={() => handleMenuItemClick('Shared Documents')}>{employee ? "New Employee" : "Shared Documents"}</a></li>
                <li><a href='#' onClick={() => handleMenuItemClick('Insurance')}>{employee ? "Properties" : "Insurance"}</a></li>
                <li><a href='#' onClick={() => handleMenuItemClick('Property Details')}>{employee ? "Requests" : "Property Details"}</a></li>
                <li><a href='#' onClick={() => handleMenuItemClick('View Other Units')}>View Other Units</a></li>
                <li><a href='#' onClick={() => handleMenuItemClick('Account Profile')}>Account Profile</a></li>
                <li><a href='#' onClick={() => handleMenuItemClick('Help')}>Help</a></li>
            </ul>
            <button onClick={handleToggleSideNav}>X</button>
        </div>
    );
}

export default SideNav;
