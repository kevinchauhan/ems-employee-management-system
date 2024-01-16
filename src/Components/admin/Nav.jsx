import React from 'react'
import { MdSpaceDashboard } from 'react-icons/md'
import { Link } from 'react-router-dom'

const Nav = () => {
    return (
        <nav className='w-[220px] bg-secondary text-white'>
            <h1 className='text-2xl text-center font-bold bg-primaryDark py-2'>
                <a to={'/'}>EMS</a>
            </h1>
            <div className='mt-8'>
                <ul>
                    <li className='py-1 pr-3' ><Link to='/admin/dashboard' className='hover:bg-primary hover:text-white rounded-r-full font-medium w-full inline-flex items-center gap-1 py-2 pl-10 group'><MdSpaceDashboard className='text-primary group-hover:text-white' />Dashboard</Link></li>
                    <li className='py-1 pr-3' ><Link to='/admin/department' className='hover:bg-primary hover:text-white rounded-r-full font-medium w-full inline-block py-2 pl-10'>Department</Link></li>
                    <li className='py-1 pr-3' ><Link to='/admin/leavetype' className='hover:bg-primary hover:text-white rounded-r-full font-medium w-full inline-block py-2 pl-10'>Leave Type</Link></li>
                    <li className='py-1 pr-3' ><Link to='/admin/employee' className='hover:bg-primary hover:text-white rounded-r-full font-medium w-full inline-block py-2 pl-10'>Employee</Link></li>
                    <li className='py-1 pr-3' ><Link to='/admin/salary' className='hover:bg-primary hover:text-white rounded-r-full font-medium w-full inline-block py-2 pl-10'>Salary</Link></li>
                    <li className='py-1 pr-3' ><Link to='/admin/dashboard' className='hover:bg-primary hover:text-white rounded-r-full font-medium w-full inline-block py-2 pl-10'>Leave Requests</Link></li>
                    <li className='py-1 pr-3' ><Link to='/admin/report/leaves' className='hover:bg-primary hover:text-white rounded-r-full font-medium w-full inline-block py-2 pl-10'>Report</Link></li>
                </ul>
            </div>
        </nav>
    )
}

export default Nav