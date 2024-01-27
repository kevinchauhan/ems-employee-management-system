import React from 'react'

const Nav = ({ children }) => {
    return (
        <nav className='w-[220px] bg-secondary text-white'>
            <h1 className='text-2xl text-center font-bold bg-primaryDark py-2'>
                <a to={'/'}>EMS</a>
            </h1>
            <div className='mt-8'>
                {children}
            </div>
        </nav>
    )
}

export default Nav