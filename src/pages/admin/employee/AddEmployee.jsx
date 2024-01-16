import React from 'react'
import EmployeeForm from '../../../Components/admin/EmployeeForm'
import { addData } from '../../../firebase/firebaseSevice'

const AddEmployee = () => {
    const INITIAL_INPUT = {
        empId: '101',
        name: 'kevin',
        surname: 'chauhan',
        email: 'kevin@gmail.com',
        password: '123456',
        confirmPassword: '123456',
        mobile: '1234567895',
        dob: '',
        doj: '',
        country: 'india',
        state: 'gujarat',
        city: 'surat',
        address: 'abc society',
        // department: 'IT'
    }
    const handleForm = async (inputValue) => {
        await addData('employees', inputValue)
    }
    return <EmployeeForm handleForm={handleForm} input={INITIAL_INPUT} />
}

export default AddEmployee