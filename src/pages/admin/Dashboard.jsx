import React from 'react'
import DashboardNav from '../../Components/shared/DashboardNav'
import DashBoardDetails from '../../Components/shared/DashBoardDetails'
import { FaUser } from 'react-icons/fa'
import { Outlet } from 'react-router-dom'

const Dashboard = () => {
    return (
        <>
            <DashBoardDetails icon={<FaUser />} title={'Welcome'} data={'kevin (1234564)'} />
            <Outlet />
        </>
    )
}

export default Dashboard