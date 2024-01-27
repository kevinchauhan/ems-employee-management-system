import React, { useEffect, useState } from 'react'
import TableUi from '../../../Components/shared/TableUi'
import Input from '../../../Components/shared/Input'
import { getData, updateData } from '../../../firebase/firebaseSevice'
import { addDoc, collection, doc, getDocs, getFirestore, query, where } from 'firebase/firestore'
import app, { db } from '../../../firebase/firebaseConfig'
import { useNavigate } from 'react-router-dom'

const AddSalary = () => {
    const [inputValue, setInputValue] = useState({ department: '', emp: '', salary: '' })
    const [error, setError] = useState('')
    const [departments, setDepartments] = useState([])
    const [emps, setEmps] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        setDepartments(await getData('departments'))
    }

    const fetchEmp = async (id) => {
        const empRef = collection(db, "employees")

        // Create a query against the collection.
        const q = query(empRef, where("department.id", "==", id))

        const querySnapshot = await getDocs(q)
        let temp = []
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            temp.push({ id: doc.id, ...doc.data() })
        })
        setEmps(temp)
    }

    const handleInputChange = (e) => {
        const key = e.target.name
        const value = e.target.value
        if (key === 'department') {
            fetchEmp(value)
        }
        setInputValue({ ...inputValue, [key]: value })
        if (!value.trim()) {
            setError('Input cannot be empty')
        } else {
            setError('')
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const employeeDocRef = doc(db, "employees", inputValue.emp)
            const salaryHistoryColRef = collection(employeeDocRef, "salary_history")

            const newSalaryHistory = {
                date: new Date(),
                salary: inputValue.salary,
            }

            await addDoc(salaryHistoryColRef, newSalaryHistory)
            navigate(-1)
            // console.log(await updateData('employees', { salary: inputValue.salary }, inputValue.emp))
        } catch (error) {
            console.log(error)
        }
    }

    const customValidation = (value) => {
        return value.length >= 10
    }

    return (
        <TableUi title={'Add Salary'}>
            <form action="" onSubmit={handleSubmit}>
                <div className="grid grid-cols-2 gap-5 text-gray-700">
                    <div>
                        <label htmlFor="">Department</label>
                        <select name="department" value={inputValue.department} onChange={handleInputChange} id="" className={`border ${true ? 'border-gray-300' : 'border-red-500'} w-full rounded-md mt-2 py-2 px-3`}>
                            <option value="">--Select Deartment--</option>
                            {
                                departments.map(item =>
                                    <option key={item.id} value={item.id}>{item.name}</option>
                                )
                            }
                        </select>
                    </div>
                    <div>
                        <label htmlFor="">Employee</label>
                        <select name="emp" value={inputValue.emp} onChange={handleInputChange} id="" className={`border ${true ? 'border-gray-300' : 'border-red-500'} w-full rounded-md mt-2 py-2 px-3`}>
                            <option value="">--Select Employee--</option>
                            {
                                emps.map(item =>
                                    <option key={item.id} value={item.id}>{item.name}</option>
                                )
                            }
                        </select>
                    </div>
                    <div>
                        <Input name={'salary'} label='Salary' type="text" placeholder="Enter your salary" value={inputValue.salary} onChange={handleInputChange} error={error} />
                    </div>
                </div>
                <button className='bg-primary text-white mt-3 px-5 py-1 rounded'>Submit</button>
            </form>
        </TableUi >
    )
}

export default AddSalary