import React, { useState } from 'react'
import TableUi from '../../Components/shared/TableUi'
import Input from '../../Components/shared/Input'

const Salary = () => {
    const [inputValue, setInputValue] = useState('')
    const [error, setError] = useState('')

    const handleInputChange = (e) => {
        const value = e.target.value
        setInputValue(value)
        if (!value.trim()) {
            setError('Input cannot be empty')
        } else {
            setError('')
        }
    }

    const customValidation = (value) => {
        return value.length >= 10
    }
    return (
        <TableUi title={'Add Salary'}>
            <form action="">
                <div className="grid grid-cols-2 gap-5">
                    <div className='text-gray-700'>
                        <label htmlFor="">Department</label>
                        <select name="" id="" className={`border ${true ? 'border-gray-300' : 'border-red-500'} w-full rounded-md mt-2 py-2 px-3`}>
                            <option value="">--Select Deartment--</option>
                        </select>
                    </div>
                    <div className='text-gray-700'>
                        <label htmlFor="">Name</label>
                        <select name="" id="" className={`border ${true ? 'border-gray-300' : 'border-red-500'} w-full rounded-md mt-2 py-2 px-3`}>
                            <option value="">--Select Employee--</option>
                        </select>
                    </div>
                    <div>
                        <Input label='Salary' type="text" placeholder="Enter your salary" value={inputValue} onChange={handleInputChange} validate={customValidation} error={error} />
                    </div>
                </div>
                <button className='bg-primary text-white mt-3 px-5 py-1 rounded'>Submit</button>
            </form>
        </TableUi>
    )
}

export default Salary