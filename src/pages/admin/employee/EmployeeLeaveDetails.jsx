import React, { useEffect, useState } from 'react'
import EmployeeDetails from './EmployeeDetails'
import TableUi from '../../../Components/shared/TableUi'
import { useParams } from 'react-router-dom'
import { getSingleData } from '../../../firebase/firebaseSevice'
import { collection, doc, getDocs, orderBy, query, where } from 'firebase/firestore'
import { db } from '../../../firebase/firebaseConfig'

const EmployeeLeaveDetails = () => {
    const [datas, setDatas] = useState([])
    const { id } = useParams()
    const date = new Date()
    useEffect(() => {
        fetchLeaveForEmployee()
    }, [])

    const fetchLeaveForEmployee = async () => {
        try {
            const leaveRef = collection(db, 'leaveHistory');

            const leaveQuery = query(leaveRef, where('emp.id', '==', id))
            const leaveSnapshot = await getDocs(leaveQuery);
            const leave = [];

            leaveSnapshot.forEach((doc) => {
                leave.push({
                    id: doc.id,
                    ...doc.data(),
                });
            });
            setDatas(leave)
        } catch (error) {
            console.error('Error fetching salary history:', error);
        }
    };

    return (
        <EmployeeDetails >
            <h2 className='text-2xl font-medium text-gray-700 my-5'>Leave Details</h2>
            <table className="min-w-full divide-y divide-gray-200 border-gray-300">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="text-start border border-gray-300 py-2 px-4">Sr. No</th>
                        <th className="text-start border border-gray-300 py-2 px-4">Leave Type</th>
                        <th className="text-start border border-gray-300 py-2 px-4">From</th>
                        <th className="text-start border border-gray-300 py-2 px-4">To</th>
                        <th className="text-start border border-gray-300 py-2 px-4">Status</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                    {
                        datas.length > 0 ? datas.map((item, i) =>
                            <tr key={i}>
                                <td className="border border-gray-300 py-2 px-4">{i + 1}</td>
                                <td className="border border-gray-300 py-2 px-4">{item.leaveType.name}</td>
                                <td className="border border-gray-300 py-2 px-4">{item.fromDate}</td>
                                <td className="border border-gray-300 py-2 px-4">{item.toDate}</td>
                                <td className="border border-gray-300 py-2 px-4">
                                    <span className={`${item.status === 'approved' ? 'bg-green-600' : item.status === 'rejected' ? 'bg-red-600' : 'bg-yellow-500'}  rounded px-3 py-2 text-white capitalize`}>{item.status}</span>
                                </td>
                            </tr>
                        ) :
                            <tr>
                                <td className='text-center text-xl' colSpan={5}>No record Found</td>
                            </tr>
                    }
                </tbody>
            </table>
        </EmployeeDetails >
    )
}

export default EmployeeLeaveDetails