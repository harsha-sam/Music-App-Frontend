import React from 'react'
import useAuth from "./useAuth"

const Dashboard = ({ code }) => {
    const accessToken = useAuth(code);
    return <>
        <h4>{code}</h4>
    </>
}
export default Dashboard