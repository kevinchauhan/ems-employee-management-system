import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { getSingleData, queryData } from '../../firebase/firebaseSevice'
import { where } from 'firebase/firestore'

const Header = () => {
    const role = useSelector(state => state.role)
    const auth = useSelector(state => state.auth)

    return (
        <header className='bg-primary text-white'>
            <div className="px-2 sm:px-6 lg:px-8">
                <div className="relative py-3">
                    <div className="flex flex-1 items-center sm:items-stretch sm:justify-end">
                        <div className="hidden sm:ml-6 sm:block">
                            <div className="flex space-x-4">
                                <h3 className='capitalize'>Welcome Back, {role === 'admin' ? 'Admin' : `${auth ? auth.name : ''}`}</h3>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header