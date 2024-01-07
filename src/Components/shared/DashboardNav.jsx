import React from 'react'
import { FaHome } from 'react-icons/fa'
import { MdSpaceDashboard } from "react-icons/md";

const DashboardNav = () => {
    return (
        <div className='bg-white shadow'>
            <div className="flex items-center justify-between px-5 py-3">
                <h3 className='text-2xl flex items-center gap-1'><MdSpaceDashboard className='text-primary' /> Dashboard</h3>
                <p className='text-primary flex items-center gap-1'><FaHome className='text-black' /> / Dashboard</p>
            </div>
        </div>
    )
}

export default DashboardNav