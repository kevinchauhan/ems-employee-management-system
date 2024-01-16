import React, { useState } from 'react'
import Input from '../../Components/shared/Input'

const login = () => {
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
        <div className='h-screen relative bg-gray-100 z-0'>
            <div className="absolute bg-primary w-full h-1/2 top-0 left-0 z-[-1]"></div>
            <h1 className='w-full text-center text-6xl text-white pt-10 mb-10'>Employee Management System</h1>
            <div className="flex flex-wrap items-center justify-center h-[70%]">
                <div className=' bg-white shadow-xl w-1/3 px-10 py-5 mx-auto'>
                    <h1 className='text-2xl border-b pb-3 mb-3 text-center font-medium'>Sign In</h1>
                    <form action="">
                        <Input label='Email'
                            type="text"
                            placeholder="Enter your email..."
                            value={inputValue}
                            onChange={handleInputChange}
                            validate={customValidation}
                            error={error}
                        />
                        <Input label='Password'
                            type="text"
                            placeholder="Enter your password..."
                            value={inputValue}
                            onChange={handleInputChange}
                            validate={customValidation}
                            error={error}
                        />
                        <button className='bg-primary w-full text-white mt-3 px-5 py-1 rounded'>Sign In</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default login