import React from 'react'
import { Link } from 'react-router-dom'

const Table2 = ({ data }) => {

    return (
        <table className="min-w-full divide-y divide-gray-200 border-gray-300">
            <thead className="bg-gray-50">
                <tr>
                    <th className="text-start border border-gray-300 py-2 px-4">Sr. No</th>
                    <th className="text-start border border-gray-300 py-2 px-4">Emp Id</th>
                    <th className="text-start border border-gray-300 py-2 px-4">Name</th>
                    <th className="text-start border border-gray-300 py-2 px-4">Email</th>
                    <th className="text-start border border-gray-300 py-2 px-4">Mobile</th>
                    <th className="text-start border border-gray-300 py-2 px-4">Country</th>
                    <th className="text-start border border-gray-300 py-2 px-4">Department</th>
                    <th className="text-start border border-gray-300 py-2 px-4">Action</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
                {
                    data && data.map((item, i) =>
                        <tr key={i}>
                            <td className="border border-gray-300 py-2 px-4">{i + 1}</td>
                            <td className="border border-gray-300 py-2 px-4">{item.empId}</td>
                            <td className="border border-gray-300 py-2 px-4">{item.name}</td>
                            <td className="border border-gray-300 py-2 px-4">{item.email}</td>
                            <td className="border border-gray-300 py-2 px-4">{item.mobile}</td>
                            <td className="border border-gray-300 py-2 px-4">{item.country}</td>
                            <td className="border border-gray-300 py-2 px-4">{item.department.name}</td>
                            <td className="border border-gray-300 py-3 px-4">
                                <Link to={`/admin/employee/view/${item.id}`} className='bg-blue-600 hover:bg-blue-700 rounded px-3 py-2 text-white'>view</Link>
                                <Link to={`/admin/employee/edit/${item.id}`} className='bg-green-600 hover:bg-green-700 rounded px-3 py-2 ml-2 text-white'>Edit</Link>
                                <Link to={`/admin/employee/salary/${item.id}`} className='bg-yellow-500 hover:bg-yellow-600 rounded px-3 py-2 ml-2 text-white'>Salary</Link>
                                <Link to={`/admin/employee/leave/${item.id}`} className='bg-red-600 hover:bg-red-700 rounded px-3 py-2 ml-2 text-white'>Leave</Link>
                            </td>
                        </tr>
                    )
                }
            </tbody>
        </table>
    )
}

export default Table2