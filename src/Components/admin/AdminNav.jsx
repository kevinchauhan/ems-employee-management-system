import React from 'react'
import Nav from '../shared/Nav'
import { FaBuilding, FaRegMoneyBillAlt, FaUsers } from 'react-icons/fa'
import { MdSpaceDashboard } from 'react-icons/md'
import { IoIosLaptop } from "react-icons/io";
import { BiSolidReport } from "react-icons/bi";
import { Link } from 'react-router-dom'
import { IoDocuments, IoLogOutSharp } from 'react-icons/io5';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase/firebaseConfig';
import { useDispatch } from 'react-redux';
import { authAction, roleAction } from '../../store/store';

const AdminNav = () => {
    const dispatch = useDispatch()
    const handleLogout = () => {
        signOut(auth)
        dispatch(authAction.logout())
        dispatch(roleAction.setRole('employee'))
    }
    return (
        <Nav>
            <ul>
                <li className='py-1 pr-3' ><Link to='/admin/dashboard' className='hover:bg-primary hover:text-white rounded-r-full font-medium w-full inline-flex items-center gap-1 py-2 pl-10 group'><MdSpaceDashboard className='text-white group-hover:text-white' />Dashboard</Link></li>
                <li className='py-1 pr-3' ><Link to='/admin/department' className='hover:bg-primary hover:text-white rounded-r-full font-medium w-full inline-flex items-center gap-1 py-2 pl-10 group'><FaBuilding className='text-white group-hover:text-white' />Department</Link></li>
                <li className='py-1 pr-3' ><Link to='/admin/leavetype' className='hover:bg-primary hover:text-white rounded-r-full font-medium w-full inline-flex items-center gap-1 py-2 pl-10 group'><IoIosLaptop className='text-white group-hover:text-white' />Leave Type</Link></li>
                <li className='py-1 pr-3' ><Link to='/admin/employee' className='hover:bg-primary hover:text-white rounded-r-full font-medium w-full inline-flex items-center gap-1 py-2 pl-10 group'><FaUsers className='text-white group-hover:text-white' />Employee</Link></li>
                <li className='py-1 pr-3' ><Link to='/admin/salary' className='hover:bg-primary hover:text-white rounded-r-full font-medium w-full inline-flex items-center gap-1 py-2 pl-10 group'><FaRegMoneyBillAlt className='text-white group-hover:text-white' />Salary</Link></li>
                <li className='py-1 pr-3' ><Link to='/admin/leave-requests' className='hover:bg-primary hover:text-white rounded-r-full font-medium w-full inline-flex items-center gap-1 py-2 pl-10 group'><IoDocuments className='text-white group-hover:text-white' />Leave Requests</Link></li>
                {/* <li className='py-1 pr-3' ><Link to='/admin/report/leaves' className='hover:bg-primary hover:text-white rounded-r-full font-medium w-full inline-flex items-center gap-1 py-2 pl-10 group'><BiSolidReport className='text-white group-hover:text-white' />Report</Link></li> */}
                <li className='py-1 pr-3' ><button onClick={handleLogout} className='hover:bg-primary hover:text-white rounded-r-full font-medium w-full inline-flex items-center gap-1 py-2 pl-10 group'><IoLogOutSharp className='text-white group-hover:text-white' />Sign Out</button></li>
            </ul>
        </Nav>
    )
}

export default AdminNav