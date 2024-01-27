import React from 'react'
import { useDispatch } from 'react-redux'
import { modalAction } from '../../store/store'

const TableUi = ({ title, children, isBtn, cmp }) => {
    const disptach = useDispatch()
    return (
        <div className='bg-white p-5 rounded shadow'>
            <h2 className='flex items-center justify-between text-xl font-semibold border-b pb-3 mb-5'>{title}
                {
                    cmp ? cmp : isBtn ? <button onClick={() => disptach(modalAction.toggleModal())} className='bg-primary text-white px-2 py-1 rounded'>Add</button> : ''
                }
            </h2>
            {children}
        </div>
    )
}

export default TableUi