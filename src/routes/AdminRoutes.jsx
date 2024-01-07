import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Dashboard from '../pages/admin/Dashboard'
import Department from '../pages/admin/Department'
import LeaveType from '../pages/admin/LeaveType'
import Employee from '../pages/admin/Employee'
import Salary from '../pages/admin/Salary'
import AddEmployee from '../pages/admin/AddEmployee'

const AdminRoutes = () => {
    return (
        <Routes>
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/department' element={<Department />} />
            <Route path='/leavetype' element={<LeaveType />} />
            <Route path='/employee' element={<Employee />} />
            <Route path='/employee/add' element={<AddEmployee />} />
            <Route path='/salary' element={<Salary />} />
        </Routes>
    )
}

export default AdminRoutes