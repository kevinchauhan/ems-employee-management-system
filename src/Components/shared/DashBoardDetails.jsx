import React from 'react'

const DashBoardDetails = ({ icon, title, data }) => {
    return (
        <div className='flex items-center bg-white gap-5 rounded overflow-hidden'>
            <div className='text-white text-3xl bg-primary flex items-center justify-center p-5'>
                {icon}
            </div>
            <div className='bg-white text-primary'>
                <h2 className='text-xl'>{title}</h2>
                <p>{data}</p>
            </div>
        </div>
    )
}

export default DashBoardDetails