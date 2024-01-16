import React, { useEffect, useState } from 'react'
import Input from '../shared/Input'
import { useSelector } from 'react-redux'

const Form = ({ handleForm, title, editId }) => {
    const [inputValue, setInputValue] = useState('')
    const [error, setError] = useState('')
    const modal = useSelector(state => state.modal)

    useEffect(() => {
        if (modal === false) {
            setInputValue('')
        }
    }, [modal])

    useEffect(() => {
        if (editId) {
            setInputValue(editId.name)
        }
    }, [editId])

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

    const handleSubmit = (e) => {
        e.preventDefault()
        handleForm(inputValue)
    }

    return (
        <div className='bg-white px-3'>
            <h2 className='text-xl text-center border-b pb-3 font-semibold'>Add {title}</h2>
            <div className='mt-3'>
                <h4 className='mb-2'>{title} {title === 'Department' ? 'Name' : ''}</h4>
                <form action="" onSubmit={handleSubmit}>
                    <Input
                        type="text"
                        placeholder="Enter text..."
                        value={inputValue}
                        onChange={handleInputChange}
                        validate={customValidation}
                        error={error}
                    />
                    <button className='bg-primary text-white mt-3 px-5 py-1 rounded'>{editId ? 'Update' : 'Add'}</button>
                </form>
            </div>
        </div>
    )
}

export default Form