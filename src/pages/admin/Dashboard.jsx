import React from 'react'
import DashboardNav from '../../Components/shared/DashboardNav'
import DashBoardDetails from '../../Components/shared/DashBoardDetails'
import { FaUser } from 'react-icons/fa'

const Dashboard = () => {
    return (
        <>
            <DashboardNav />
            <div className="p-5">
                <DashBoardDetails icon={<FaUser />} title={'Welcome'} data={'kevin (1234564)'} />
            </div>
        </>
    )
}

export default Dashboard