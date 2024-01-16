import React, { useEffect, useState } from 'react'
import TableUi from '../shared/TableUi'
import Input from '../shared/Input'
import { getData } from '../../firebase/firebaseSevice'

const EmployeeForm = ({ handleForm, input }) => {
    const INITIAL_INPUT = {
        empId: '',
        name: '',
        surname: '',
        email: '',
        password: '',
        confirmPassword: '',
        mobile: '',
        dob: '',
        doj: '',
        country: '',
        state: '',
        city: '',
        address: '',
        department: ''
    }
    const [departments, setDepartments] = useState([])
    const [inputValue, setInputValue] = useState(INITIAL_INPUT)
    const [error, setError] = useState('')
    console.log(inputValue)
    useEffect(() => {
        if (input) {
            setInputValue(input)
        }
    }, [input])

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        setDepartments(await getData('departments'))
    }

    const handleInputChange = (e) => {
        const name = e.target.name
        const value = (e.target.value).trim()
        setInputValue({ ...inputValue, [name]: value })
        if (!value.trim()) {
            setError('Input cannot be empty')
        } else {
            setError('')
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const department = departments.filter(e => e.id === inputValue.department)
        handleForm({ ...inputValue, department: department[0] })
    }

    const customValidation = (value) => {
        return value.trim().length > 0
    }



    return (
        <TableUi title={'Add Employee'}>
            <form action="" onSubmit={handleSubmit} className='text-gray-700'>
                <Input name='empId' label='Emp ID' type="text" placeholder="Enter emp id" value={inputValue.empId} onChange={handleInputChange} validate={customValidation} error={error} />
                <div className="grid grid-cols-2 gap-5">
                    <div>
                        <Input name='name' label='First Name' type="text" placeholder="Enter your first name" value={inputValue.name} onChange={handleInputChange} validate={customValidation} error={error} />
                    </div>
                    <div>
                        <Input name='surname' label='Last Name' type="text" placeholder="Enter your last name" value={inputValue.surname} onChange={handleInputChange} validate={customValidation} error={error} />
                    </div>
                    <div>
                        <label htmlFor="">Department</label>
                        <select name="department" value={inputValue.department} onChange={handleInputChange} id="" className={`border ${true ? 'border-gray-300' : 'border-red-500'} w-full rounded-md mt-2 py-2 px-3`}>
                            <option value="">--Select Deartment--</option>
                            {
                                departments.map(item =>
                                    <option value={item.id}>{item.name}</option>
                                )
                            }
                        </select>
                    </div>
                    <div>
                        <Input name='email' label='Email ID' type="email" placeholder="Enter your Email ID" value={inputValue.email} onChange={handleInputChange} validate={customValidation} error={error} />
                    </div>
                    <div>
                        <Input name='mobile' label='Mobile no.' type="text" placeholder="Enter your mobile no." value={inputValue.mobile} onChange={handleInputChange} validate={customValidation} error={error} />
                    </div>
                    <div>
                        <Input name='country' label='Country' type="text" placeholder="Enter your country" value={inputValue.country} onChange={handleInputChange} validate={customValidation} error={error} />
                    </div>
                    <div>
                        <Input name='state' label='State' type="text" placeholder="Enter your state" value={inputValue.state} onChange={handleInputChange} validate={customValidation} error={error} />
                    </div>
                    <div>
                        <Input name='city' label='City' type="text" placeholder="Enter your city" value={inputValue.city} onChange={handleInputChange} validate={customValidation} error={error} />
                    </div>
                    <div>
                        <Input name='dob' label='DOB' type="date" placeholder="Enter your Dob" value={inputValue.dob} onChange={handleInputChange} validate={customValidation} error={error} />
                    </div>
                    <div>
                        <Input name='doj' label='Date of Joining' type="date" placeholder="Enter your Dob" value={inputValue.doj} onChange={handleInputChange} validate={customValidation} error={error} />
                    </div>
                    <div>
                        {/* <Input label='Photo' type="file" placeholder="" value={''} onChange={handleInputChange} validate={customValidation} error={error} /> */}
                    </div>
                    <div>
                        <label htmlFor="">Address</label>
                        <textarea name="address" id="" value={inputValue.address} cols="30" rows="3" className='border-gray-300 border w-full rounded-md mt-2 mb-5 py-2 px-3' placeholder='Enter your address'></textarea>
                    </div>
                    <div>
                        <Input name='password' label='Password' type="password" placeholder="Enter your password" value={inputValue.password} onChange={handleInputChange} validate={customValidation} error={error} />
                    </div>
                    <div>
                        <Input name='confirmPassword' label='Confirm Password' type="text" placeholder="Confirm your password" value={inputValue.confirmPassword} onChange={handleInputChange} validate={customValidation} error={error} />
                    </div>
                </div>
                <button className='bg-primary text-white mt-3 px-5 py-1 rounded'>Submit</button>
            </form>
        </TableUi>
    )
}

export default EmployeeForm