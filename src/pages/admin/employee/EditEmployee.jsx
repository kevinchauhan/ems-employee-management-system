import React, { useEffect, useState } from 'react'
import EmployeeForm from '../../../Components/admin/EmployeeForm'
import { getSingleData, updateData } from '../../../firebase/firebaseSevice'
import { useParams } from 'react-router-dom'

const EditEmployee = () => {
    const [inputValue, setInputValue] = useState('')
    const { id } = useParams()

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        const res = await getSingleData('employees', id)
        setInputValue({ ...res, department: res.department.id })
    }

    const handleForm = async (inputValue) => {
        await updateData('employees', inputValue, id)
        return id
    }

    return <EmployeeForm handleForm={handleForm} input={inputValue} isEdit={true} />
}

export default EditEmployee