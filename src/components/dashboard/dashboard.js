import "./dashboard.css"
import { useNavigate } from "react-router-dom";
import React, { useEffect } from "react";




function DashboardComponent() {
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token || token == "") {
            navigate("/signin");
        }
    }, [navigate]);

    function signOut() {
        localStorage.setItem('token', "");
        localStorage.setItem('email', "");
        localStorage.setItem('firstName', "");
        localStorage.setItem('lastName', "");
        navigate("/signin");
    }


    const email = localStorage.getItem("email");
    const firstName = localStorage.getItem("firstName");
    const lastName = localStorage.getItem("lastName");
    return (
        <div>
            <nav>
                <div>Dashboard</div>
                <div><button className="logoutBtn" onClick={signOut}>Sign Out</button></div>
            </nav>

            <div className="dashboardContent">
                <p className="heading">Welcome, {firstName} {lastName}!</p>
                <p><b>Email</b>: {email}</p>
            </div>
        </div>
    )
}

export default DashboardComponent