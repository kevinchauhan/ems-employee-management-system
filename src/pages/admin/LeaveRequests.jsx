import React, { useEffect, useState } from 'react'
import TableUi from '../../Components/shared/TableUi'
import ManageTable from '../../Components/admin/ManageTable'
import { useDispatch, useSelector } from 'react-redux'
import { modalAction } from '../../store/store'
import Modal from '../../Components/shared/Modal'
import { addData, deleteData, getData, queryData, updateData } from '../../firebase/firebaseSevice'
import LeaveForm from '../../Components/employee/LeaveForm'
import { orderBy, where } from 'firebase/firestore'

const LeaveRequests = () => {
    const [inputValue, setInputValue] = useState('')
    const [leaves, setLeaves] = useState([])
    const [editId, setEditId] = useState(null)
    const modal = useSelector(state => state.modal)
    const auth = useSelector(state => state.auth)
    const dispatch = useDispatch()

    useEffect(() => {
        fetchData()
    }, [])

    useEffect(() => {
        if (editId && modal === false) {
            setEditId(null)
        }
    }, [modal])

    const handleStatus = (id) => {
        setEditId(id)
        dispatch(modalAction.toggleModal())
    }

    const handleInputChange = (e) => {
        setInputValue(e.target.value)
    }

    const handleForm = async (e) => {
        e.preventDefault()
        await updateData('leaveHistory', { status: inputValue }, editId)
        dispatch(modalAction.toggleModal())
        fetchData()
    }

    const fetchData = async () => {
        const data = await queryData('leaveHistory', orderBy('createdAt', 'desc'))
        setLeaves(data)
    }
    return (
        <>
            <Modal>
                <div className='bg-white px-3'>
                    <h2 className='text-xl text-center border-b pb-3 font-semibold'>Leave Status</h2>
                    <div className='mt-3'>
                        <form action="" onSubmit={handleForm}>
                            <select name="status" value={inputValue} onChange={handleInputChange} className={`border border-gray-300 w-full rounded-md mt-2 py-2 px-3`}>
                                <option value="pending">--Select status--</option>
                                <option value='approved'>Approve</option>
                                <option value='rejected'>Reject</option>
                            </select>
                            <button className='bg-primary text-white mt-5 px-5 py-1 rounded'>Update</button>
                        </form>
                    </div>
                </div>
            </Modal>
            <TableUi title={'Manage Leaves'}>
                <table className="min-w-full divide-y divide-gray-200 border-gray-300">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="text-start border border-gray-300 py-2 px-4">Sr. No</th>
                            <th className="text-start border border-gray-300 py-2 px-4">Emp Name</th>
                            <th className="text-start border border-gray-300 py-2 px-4">Leave Type</th>
                            <th className="text-start border border-gray-300 py-2 px-4">From</th>
                            <th className="text-start border border-gray-300 py-2 px-4">To</th>
                            <th className="text-start border border-gray-300 py-2 px-4">Status</th>
                            <th className="text-start border border-gray-300 py-2 px-4">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {
                            leaves && leaves.map((item, i) =>
                                <tr key={i}>
                                    <td className="border border-gray-300 py-2 px-4">{i + 1}</td>
                                    <td className="border border-gray-300 py-2 px-4">{item.emp.name}</td>
                                    <td className="border border-gray-300 py-2 px-4">{item.leaveType.name}</td>
                                    <td className="border border-gray-300 py-2 px-4">{item.fromDate}</td>
                                    <td className="border border-gray-300 py-2 px-4">{item.toDate}</td>
                                    <td className="border border-gray-300 py-2 px-4">
                                        <span className={`${item.status === 'approved' ? 'bg-green-600' : item.status === 'rejected' ? 'bg-red-600' : 'bg-yellow-500'}  rounded px-3 py-2 text-white capitalize`}>{item.status}</span>
                                    </td>
                                    <td className="border border-gray-300 py-1 px-4">
                                        <button onClick={() => handleStatus(item.id)} className='bg-primary rounded px-3 py-2 text-white'>View Details</button>
                                    </td>
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </TableUi>
        </>
    )
}

export default LeaveRequests