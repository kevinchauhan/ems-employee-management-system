import React, { useState } from 'react'
import Input from '../../Components/shared/Input'
import TableUi from '../../Components/shared/TableUi'

const AddEmployee = () => {
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
        <TableUi title={'Add Employee'}>
            <form action="">
                <Input label='Emp ID' type="text" placeholder="Enter text..." value={inputValue} onChange={handleInputChange} validate={customValidation} error={error} />
                <div className="grid grid-cols-2 gap-5">
                    <div>
                        <Input label='First Name' type="text" placeholder="Enter your first name" value={inputValue} onChange={handleInputChange} validate={customValidation} error={error} />
                    </div>
                    <div>
                        <Input label='Last Name' type="text" placeholder="Enter your last name" value={inputValue} onChange={handleInputChange} validate={customValidation} error={error} />
                    </div>
                    <div>
                        {/* select */}
                    </div>
                    <div>
                        <Input label='Email ID' type="email" placeholder="Enter your Email ID" value={inputValue} onChange={handleInputChange} validate={customValidation} error={error} />
                    </div>
                    <div>
                        <Input label='Mobile no.' type="text" placeholder="Enter your mobile no." value={inputValue} onChange={handleInputChange} validate={customValidation} error={error} />
                    </div>
                    <div>
                        <Input label='Country' type="text" placeholder="Enter your country" value={inputValue} onChange={handleInputChange} validate={customValidation} error={error} />
                    </div>
                    <div>
                        <Input label='State' type="text" placeholder="Enter your state" value={inputValue} onChange={handleInputChange} validate={customValidation} error={error} />
                    </div>
                    <div>
                        <Input label='City' type="text" placeholder="Enter your city" value={inputValue} onChange={handleInputChange} validate={customValidation} error={error} />
                    </div>
                    <div>
                        <Input label='DOB' type="date" placeholder="Enter your Dob" value={inputValue} onChange={handleInputChange} validate={customValidation} error={error} />
                    </div>
                    <div>
                        <Input label='Date of Joining' type="date" placeholder="Enter your Dob" value={inputValue} onChange={handleInputChange} validate={customValidation} error={error} />
                    </div>
                    <div>
                        <Input label='Photo' type="file" placeholder="Enter your Dob" value={inputValue} onChange={handleInputChange} validate={customValidation} error={error} />
                    </div>
                    <div className='text-gray-700'>
                        <label htmlFor="">Address</label>
                        <textarea name="" id="" cols="30" rows="3" className='border-gray-300 border w-full rounded-md mt-2 mb-5 py-2 px-3' placeholder='Enter your address'></textarea>
                    </div>
                    <div>
                        <Input label='Password' type="password" placeholder="Enter your password" value={inputValue} onChange={handleInputChange} validate={customValidation} error={error} />
                    </div>
                    <div>
                        <Input label='Confirm Password' type="password" placeholder="Confirm your password" value={inputValue} onChange={handleInputChange} validate={customValidation} error={error} />
                    </div>
                </div>
                <button className='bg-primary text-white mt-3 px-5 py-1 rounded'>Submit</button>
            </form>
        </TableUi>
    )
}

export default AddEmployee