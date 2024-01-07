import React, { useState } from 'react'
import Input from '../shared/Input'

const Form = () => {
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
        <div className='bg-white px-3'>
            <h2 className='text-xl text-center border-b pb-3 font-semibold'>Add Deaprtment</h2>
            <div className='mt-3'>
                <h4 className='mb-2'>Department Name</h4>
                <form action="">
                    <Input
                        type="text"
                        placeholder="Enter text..."
                        value={inputValue}
                        onChange={handleInputChange}
                        validate={customValidation}
                        error={error}
                    />
                    <button className='bg-primary text-white mt-3 px-5 py-1 rounded'>Add</button>
                </form>
            </div>
        </div>
    )
}

export default Form