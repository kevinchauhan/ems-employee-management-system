import React, { useEffect } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import Dashboard from '../pages/employee/Dashboard'
import Profile from '../pages/employee/Profile'
import LeaveHistory from '../pages/employee/LeaveHistory'
import EmployeeSalaryDetails from '../pages/shared/EmployeeSalaryDetails'
import { useSelector } from 'react-redux'

const EmployeeRoutes = () => {
    const auth = useSelector(state => state.auth)
    const role = useSelector(state => state.role)
    const navigate = useNavigate()

    useEffect(() => {
        if (role !== 'employee') {
            navigate('/admin/dashboard')
        }
    }, [role])

    return (
        <Routes>
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/salary' element={<EmployeeSalaryDetails empId={auth ? auth.id : null} />} />
            <Route path='/leave-history' element={<LeaveHistory />} />
        </Routes>
    )
}

export default EmployeeRoutes