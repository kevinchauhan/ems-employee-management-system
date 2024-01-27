import React, { useEffect } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import Dashboard from '../pages/admin/Dashboard'
import Department from '../pages/admin/Department'
import LeaveType from '../pages/admin/LeaveType'
import Salary from '../pages/admin/salary/Salary'
import Employee from '../pages/admin/employee/Employee'
import AddEmployee from '../pages/admin/employee/AddEmployee'
import EditEmployee from '../pages/admin/employee/EditEmployee'
import EmployeeDetails from '../pages/admin/employee/EmployeeDetails'
import AddSalary from '../pages/admin/salary/AddSalary'
import Leaves from '../pages/admin/report/Leaves'
import LeaveRequests from '../pages/admin/LeaveRequests'
import EmployeeLeaveDetails from '../pages/admin/employee/EmployeeLeaveDetails'
import EmployeeSalaryDetails from '../pages/shared/EmployeeSalaryDetails'
import { useSelector } from 'react-redux'

const AdminRoutes = () => {
    const role = useSelector(state => state.role)
    const navigate = useNavigate()

    useEffect(() => {
        if (role !== 'admin') {
            navigate('/employee/dashboard')
        }
    }, [role])

    return (
        <Routes>
            <Route path='/dashboard' element={<Dashboard />} />
            <Route path='/department' element={<Department />} />
            <Route path='/leavetype' element={<LeaveType />} />
            <Route path='/leave-requests' element={<LeaveRequests />} />
            <Route path='/employee' element={<Employee />} />
            <Route path='/employee/add' element={<AddEmployee />} />
            <Route path='/employee/edit/:id' element={<EditEmployee />} />
            <Route path='/employee/view/:id' element={<EmployeeDetails />} />
            <Route path='/employee/salary/:id' element={<EmployeeSalaryDetails />} />
            <Route path='/employee/leave/:id' element={<EmployeeLeaveDetails />} />
            <Route path='/salary' element={<Salary />} />
            <Route path='/salary/add' element={<AddSalary />} />
            <Route path='/report/leaves' element={<Leaves />} />
        </Routes>
    )
}

export default AdminRoutes