import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SideNav from './SideNav/SideNav';
import DashboardInfo from './DashboardInfo/DashboardInfo';
import './styles.css';

function Dashboard({ user, setUser, employee }) {
    const [toggleSideNav, setToggleSideNav] = useState(false);
    const [menuSelection, setMenuSelection] = useState("Home")
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            try {
                navigate('/');
            } catch (error) {
                console.error('Navigation error:', error);
            }
        }
    }, [user, navigate]);

    return (
        <div className="dashboard">
            {user ? (
                <>
                    <SideNav
                        user={user}
                        employee={employee}
                        toggleSideNav={toggleSideNav}
                        setToggleSideNav={setToggleSideNav}
                        setMenuSelection={setMenuSelection}
                    />
                    <DashboardInfo
                        user={user}
                        setUser={setUser}
                        employee={employee}
                        toggleSideNav={toggleSideNav}
                        setToggleSideNav={setToggleSideNav}
                        menuSelection={menuSelection}
                    />
                </>
            ) : null}
        </div>
    );
}

export default Dashboard;
