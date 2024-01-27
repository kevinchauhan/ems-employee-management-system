import React from 'react'
import Nav from '../shared/Nav'
import { FaRegMoneyBillAlt } from 'react-icons/fa'
import { MdSpaceDashboard } from 'react-icons/md'
import { IoIosLaptop, IoMdKey } from "react-icons/io";
import { Link } from 'react-router-dom'
import { IoLogOutSharp } from 'react-icons/io5';
import { CgProfile } from "react-icons/cg";
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase/firebaseConfig';
import { useDispatch } from 'react-redux';
import { authAction, roleAction } from '../../store/store';

const EmployeeNav = () => {
    const dispatch = useDispatch()
    const handleLogout = () => {
        signOut(auth)
        dispatch(authAction.logout())
        dispatch(roleAction.setRole('employee'))
    }

    return (
        <Nav>
            <ul>
                <li className='py-1 pr-3' ><Link to='/employee/dashboard' className='hover:bg-primary hover:text-white rounded-r-full font-medium w-full inline-flex items-center gap-1 py-2 pl-10 group'><MdSpaceDashboard className='text-white group-hover:text-white' />Dashboard</Link></li>
                <li className='py-1 pr-3' ><Link to='/employee/profile' className='hover:bg-primary hover:text-white rounded-r-full font-medium w-full inline-flex items-center gap-1 py-2 pl-10 group'><CgProfile className='text-white group-hover:text-white' />My Profile</Link></li>
                <li className='py-1 pr-3' ><Link to='/employee/leave-history' className='hover:bg-primary hover:text-white rounded-r-full font-medium w-full inline-flex items-center gap-1 py-2 pl-10 group'><IoIosLaptop className='text-white group-hover:text-white' />Leave</Link></li>
                <li className='py-1 pr-3' ><Link to='/employee/salary' className='hover:bg-primary hover:text-white rounded-r-full font-medium w-full inline-flex items-center gap-1 py-2 pl-10 group'><FaRegMoneyBillAlt className='text-white group-hover:text-white' />Salary History</Link></li>
                {/* <li className='py-1 pr-3' ><Link to='/employee/dashboard' className='hover:bg-primary hover:text-white rounded-r-full font-medium w-full inline-flex items-center gap-1 py-2 pl-10 group'><IoMdKey className='text-white group-hover:text-white' />Change Password</Link></li> */}
                <li className='py-1 pr-3' ><button onClick={handleLogout} className='hover:bg-primary hover:text-white rounded-r-full font-medium w-full inline-flex items-center gap-1 py-2 pl-10 group'><IoLogOutSharp className='text-white group-hover:text-white' />Sign Out</button></li>
            </ul>
        </Nav>
    )
}

export default EmployeeNav