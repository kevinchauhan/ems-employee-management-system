// Input.js

import React, { useState, useEffect } from 'react'

const Input = ({ label, type = 'text', placeholder, value, onChange, validate, error }) => {
    const [isValid, setIsValid] = useState(true)

    const handleInputChange = (e) => {
        onChange(e)
        if (validate) {
            setIsValid(validate(e.target.value))
        }
    }

    return (
        <div className='text-gray-700'>
            <label htmlFor="">{label}</label>
            <input
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={handleInputChange}
                className={`border ${isValid ? 'border-gray-300' : 'border-red-500'} w-full rounded-md mt-2 mb-5 py-2 px-3`}
            />
            {!isValid && <p className="text-red-500">{error}</p>}
        </div>
    )
}

export default Input