import React, { useEffect, useState } from 'react'
import DashBoardDetails from '../../Components/shared/DashBoardDetails'
import { FaUser } from 'react-icons/fa'
import { getData } from '../../firebase/firebaseSevice'
import { useSelector } from 'react-redux'

const Dashboard = () => {
    const [employeesCount, setEmployeesCount] = useState('')
    const auth = useSelector(state => state.auth)

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        try {
            const employees = await getData('employees')
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            {
                auth?.id ?
                    <DashBoardDetails bgColor={'bg-primary'} icon={<FaUser />} title={`WELCOME BACK `} data={`${auth.name} (${auth.empId})`} />
                    : ''
            }
        </>
    )
}

export default Dashboard