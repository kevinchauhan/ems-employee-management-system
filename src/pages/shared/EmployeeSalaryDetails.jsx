import React, { useEffect, useState } from 'react'
import EmployeeDetails from '../admin/employee/EmployeeDetails'
import { useParams } from 'react-router-dom'
import { collection, doc, getDocs, orderBy, query } from 'firebase/firestore'
import { db } from '../../firebase/firebaseConfig'

const EmployeeSalaryDetails = ({ empId }) => {
    const [datas, setDatas] = useState([])
    const { id } = useParams()

    useEffect(() => {
        fetchSalaryHistoryForEmployee()
    }, [empId])

    const fetchSalaryHistoryForEmployee = async () => {
        try {
            const employeeRef = doc(db, 'employees', empId || id)
            const salaryHistoryRef = collection(employeeRef, 'salary_history')

            const salaryHistoryQuery = query(salaryHistoryRef, orderBy('date', 'desc'))
            const salaryHistorySnapshot = await getDocs(salaryHistoryQuery)
            const salaryHistory = []

            salaryHistorySnapshot.forEach((doc) => {
                salaryHistory.push({
                    id: doc.id,
                    ...doc.data(),
                })
            })
            setDatas(salaryHistory)
        } catch (error) {
            console.error('Error fetching salary history:', error)
        }
    }

    return (
        <EmployeeDetails empId={empId} >
            <>
                <h2 className='text-2xl font-medium text-gray-700 my-5'>Salary Details</h2>
                <table className="min-w-full divide-y divide-gray-200 border-gray-300 text-gray-700">
                    <thead className="bg-gray-100">
                        <tr>
                            <th className="text-start border border-gray-300 py-2 px-4">Sr. No</th>
                            <th className="text-start border border-gray-300 py-2 px-4">Date</th>
                            <th className="text-start border border-gray-300 py-2 px-4">Salary</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {
                            datas.length > 0 ? datas.map((data, i) =>
                                <tr key={i}>
                                    <td className="border border-gray-300 py-2 px-4">{i + 1}</td>
                                    <td className="border border-gray-300 py-2 px-4">{new Date(data.date.seconds * 1000 + data.date.nanoseconds / 1000000).toLocaleDateString()}</td>
                                    <td className="border border-gray-300 py-2 px-4">{data.salary}</td>
                                </tr>
                            ) :
                                <tr>
                                    <td className='text-center text-xl' colSpan={3}>No record Found</td>
                                </tr>
                        }
                    </tbody>
                </table>
            </>
        </EmployeeDetails >
    )
}

export default EmployeeSalaryDetails