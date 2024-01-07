import React from 'react'

const TableUi = ({ title, children }) => {
    return (
        <div className='bg-white p-5 rounded shadow'>
            <h2 className='text-center text-xl font-semibold border-b pb-3 mb-5'>{title}</h2>
            {children}
        </div>
    )
}

export default TableUi