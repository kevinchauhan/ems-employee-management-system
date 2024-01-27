import React from 'react'
import EmployeeForm from '../../../Components/admin/EmployeeForm'
import { addData } from '../../../firebase/firebaseSevice'

const AddEmployee = () => {
    const INITIAL_INPUT = {
        empId: '101',
        name: 'abc',
        surname: 'xyz',
        email: 'abc@gmail.com',
        password: 'Abc@1234',
        confirmPassword: 'Abc@1234',
        mobile: '1234567895',
        dob: '1999-01-10',
        doj: '2024-01-24',
        country: 'india',
        state: 'gujarat',
        city: 'surat',
        address: 'abc society',
        department: 'V7q1kcEqLAvEnpHJQtWB'
    }
    const handleForm = async (inputValue) => {
        const res = await addData('employees', inputValue)
        return res
    }
    // return <EmployeeFormHook handleForm={handleForm} input={INITIAL_INPUT} />
    return <EmployeeForm handleForm={handleForm} />
}

export default AddEmployee