import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getSingleData } from '../../../firebase/firebaseSevice'

const EmployeeDetails = () => {
    const [data, setData] = useState({})
    const { id } = useParams()

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        const res = await getSingleData('employees', id)
        setData(res)
        console.log(res)
    }

    return (
        <div className="container mx-auto px-4 py-8 bg-white">
            <table className="table-auto w-full">
                <tbody>
                    <tr>
                        <th className="text-start text-gray-700 border px-4 py-2">EmpId</th>
                        <td className="border text-gray-600 font-medium px-4 py-2">{data.empId}</td>
                        <th className="text-start text-gray-700 border px-4 py-2">Photo</th>
                        <td className="border text-gray-600 font-medium px-4 py-2">{data.empId}</td>
                    </tr>
                    <tr>
                        <th className="text-start text-gray-700 border px-4 py-2">First Name</th>
                        <td className="border text-gray-600 font-medium px-4 py-2">{data.name}</td>
                        <th className="text-start text-gray-700 border px-4 py-2">Last Name</th>
                        <td className="border text-gray-600 font-medium px-4 py-2">{data.surname}</td>
                    </tr>
                    <tr>
                        <th className="text-start text-gray-700 border px-4 py-2">Department</th>
                        <td className="border text-gray-600 font-medium px-4 py-2">{data.department ? data.department.name : ''}</td>
                        <th className="text-start text-gray-700 border px-4 py-2">Email</th>
                        <td className="border text-gray-600 font-medium px-4 py-2">{data.email}</td>
                    </tr>
                    <tr>
                        <th className="text-start text-gray-700 border px-4 py-2">DOB</th>
                        <td className="border text-gray-600 font-medium px-4 py-2">{data.dob}</td>
                        <th className="text-start text-gray-700 border px-4 py-2">DOJ</th>
                        <td className="border text-gray-600 font-medium px-4 py-2">{data.doj}</td>
                    </tr>
                    <tr>
                        <th className="text-start text-gray-700 border px-4 py-2">Address</th>
                        <td className="border text-gray-600 font-medium px-4 py-2">{data.address}</td>
                        <th className="text-start text-gray-700 border px-4 py-2">City</th>
                        <td className="border text-gray-600 font-medium px-4 py-2">{data.city}</td>
                    </tr>
                    <tr>
                        <th className="text-start text-gray-700 border px-4 py-2">State</th>
                        <td className="border text-gray-600 font-medium px-4 py-2">{data.state}</td>
                        <th className="text-start text-gray-700 border px-4 py-2">Country</th>
                        <td className="border text-gray-600 font-medium px-4 py-2">{data.country}</td>
                    </tr>
                    <tr>
                        <th className="text-start text-gray-700 border px-4 py-2">Mobile</th>
                        <td colSpan={3} className="border text-gray-600 font-medium px-4 py-2">{data.mobile}</td>
                    </tr>
                    <tr>
                        <td colSpan={4} className="border text-gray-600 font-medium px-4 py-2">
                            <Link to={`/admin/employee/edit/${id}`} className='bg-green-600 hover:bg-green-700 rounded px-3 py-2 ml-2 text-white'>Edit Details</Link>
                            <button className='bg-yellow-500 hover:bg-yellow-600 rounded px-3 py-2 ml-2 text-white'>Salary History</button>
                            <button className='bg-red-600 hover:bg-red-700 rounded px-3 py-2 ml-2 text-white'>Leave History</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

    )
}

export default EmployeeDetails