import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { downloadImage, getSingleData } from '../../../firebase/firebaseSevice'

const EmployeeDetails = ({ children, empId }) => {
    const [data, setData] = useState({})
    const [imageUrl, setImageUrl] = useState('')
    const { id } = useParams()

    useEffect(() => {
        fetchData()
    }, [empId])

    const fetchData = async () => {
        try {
            if (empId || id) {
                const res = await getSingleData('employees', empId || id)
                setData(res)
                if (res.filePath) {
                    const url = await downloadImage(res.filePath)
                    setImageUrl(url)
                }
            }
        } catch (error) {
            console.log(error)
        }

    }

    return (
        <div className="container mx-auto px-4 py-8 bg-white rounded">
            <h2 className='text-2xl font-medium text-gray-700 mb-5'>Employee Details</h2>
            <table className="table-auto w-full">
                <tbody>
                    <tr>
                        <th className="text-start text-gray-700 border px-4 py-2">EmpId</th>
                        <td className="border text-gray-600 font-medium px-4 py-2">{data.empId}</td>
                        <th className="text-start text-gray-700 border px-4 py-2">Photo</th>
                        <td className="border text-gray-600 font-medium px-4 py-2">
                            {
                                imageUrl ?
                                    <img src={imageUrl} alt="image" className='w-32 h-32 object-cover rounded-full' />
                                    :
                                    <img src='/avatar.png' alt="image" className='w-32 h-32 object-contain rounded-full' />
                            }
                        </td>
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
                    {/* <tr>
                        <td colSpan={4} className="border text-gray-600 font-medium px-4 py-2">
                            <Link to={`/admin/employee/edit/${id}`} className='bg-green-600 hover:bg-green-700 rounded px-3 py-2 ml-2 text-white'>Edit Details</Link>
                            <button className='bg-yellow-500 hover:bg-yellow-600 rounded px-3 py-2 ml-2 text-white'>Salary History</button>
                            <button className='bg-red-600 hover:bg-red-700 rounded px-3 py-2 ml-2 text-white'>Leave History</button>
                        </td>
                    </tr> */}
                </tbody>
            </table>
            {children}
        </div>

    )
}

export default EmployeeDetails