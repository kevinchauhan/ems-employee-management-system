import React, { useEffect, useState } from 'react'
import DashBoardDetails from '../../Components/shared/DashBoardDetails'
import { FaStar, FaUser } from 'react-icons/fa'
import { IoDocumentSharp, IoDocuments } from "react-icons/io5";
import { getData, queryData } from '../../firebase/firebaseSevice'
import { where } from 'firebase/firestore';

const Dashboard = () => {
    const [employeesCount, setEmployeesCount] = useState(0)
    const [departmentCount, setDepartmentCount] = useState(0)
    const [leavetypeCount, setLeavetypeCount] = useState(0)
    const [totLeaveCount, setTotLeaveCount] = useState(0)
    const [pendingLeaveCount, setPendingLeaveCount] = useState(0)
    const [rejectedLeaveCount, setRejectedLeaveCount] = useState(0)
    const [approvedLeaveCount, setApprovedLeaveCount] = useState(0)

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        const employees = await getData('employees')
        setEmployeesCount(employees.length)
        const departments = await getData('departments')
        setDepartmentCount(departments.length)
        const leavetypes = await getData('leavetypes')
        setLeavetypeCount(leavetypes.length)
        const totLeave = await getData('leaveHistory')
        setTotLeaveCount(totLeave.length)
        const pendingLeave = await queryData('leaveHistory', where('status', '==', 'pending'))
        setPendingLeaveCount(pendingLeave.length)
        const rejectedLeave = await queryData('leaveHistory', where('status', '==', 'rejected'))
        setRejectedLeaveCount(rejectedLeave.length)
        const approvedLeave = await queryData('leaveHistory', where('status', '==', 'approved'))
        setApprovedLeaveCount(approvedLeave.length)
    }

    return (
        <>
            <div className="grid grid-cols-3 gap-4 items-start mb-10">
                <DashBoardDetails bgColor={'bg-primary'} icon={<FaUser />} title={'REGISTERED EMPLOYEES'} data={employeesCount} />
                <DashBoardDetails bgColor={'bg-yellow-500'} icon={<IoDocuments />} title={'LISTED DEPARTMENTS'} data={departmentCount} />
                <DashBoardDetails bgColor={'bg-red-600'} icon={<FaStar />} title={'LISTED LEAVE TYPES'} data={leavetypeCount} />
            </div>
            <h1 className='py-3 border-t border-b border-gray-300 text-center my-5 text-3xl text-gray-700 font-medium'>Leaves Details</h1>
            <div className="grid grid-cols-2 gap-4 items-start mb-10">
                <DashBoardDetails bgColor={'bg-cyan-600'} icon={<IoDocuments />} title={'LEAVES APPLIED'} data={totLeaveCount} />
                <DashBoardDetails bgColor={'bg-yellow-500'} icon={<IoDocumentSharp />} title={'NEW LEAVE REQUESTS'} data={pendingLeaveCount} />
                <DashBoardDetails bgColor={'bg-red-600'} icon={<IoDocumentSharp />} title={'REJECTED LEAVE REQUESTS'} data={rejectedLeaveCount} />
                <DashBoardDetails bgColor={'bg-primary'} icon={<IoDocumentSharp />} title={'APPROVED LEAVE REQUESTS'} data={approvedLeaveCount} />
            </div>
        </>
    )
}

export default Dashboard