import React, { useEffect, useState } from 'react'
import TableUi from '../../Components/shared/TableUi'
import ManageTable from '../../Components/admin/ManageTable'
import { useDispatch, useSelector } from 'react-redux'
import { modalAction } from '../../store/store'
import Modal from '../../Components/shared/Modal'
import { addData, deleteData, getData, queryData, updateData } from '../../firebase/firebaseSevice'
import LeaveForm from '../../Components/employee/LeaveForm'
import { where } from 'firebase/firestore'

const LeaveHistory = () => {
    const [leaves, setLeaves] = useState([])
    const [editId, setEditId] = useState(null)
    const modal = useSelector(state => state.modal)
    const auth = useSelector(state => state.auth)
    const dispatch = useDispatch()

    useEffect(() => {
        if (auth) {
            fetchData()
        }
    }, [auth])

    useEffect(() => {
        if (editId && modal === false) {
            setEditId(null)
        }
    }, [modal])

    const handleEdit = (id) => {
        dispatch(modalAction.toggleModal())
        setEditId(id)
    }
    const handleDelete = async (id) => {
        await deleteData('leavetypes', id)
        fetchData()
    }
    const handleForm = async (data) => {
        const res = await addData('leaveHistory', data)
        dispatch(modalAction.toggleModal())
        fetchData()
    }

    const fetchData = async () => {
        const data = await queryData('leaveHistory', where('emp.id', '==', auth.id))
        setLeaves(data)
    }
    return (
        <>
            <Modal>
                <LeaveForm handleForm={handleForm} editId={editId} />
            </Modal>
            <TableUi title={'Manage Leaves'} isBtn={true}>
                <table className="min-w-full divide-y divide-gray-200 border-gray-300">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="text-start border border-gray-300 py-2 px-4">Sr. No</th>
                            {/* <th className="text-start border border-gray-300 py-2 px-4">Emp Id</th> */}
                            <th className="text-start border border-gray-300 py-2 px-4">Leave Type</th>
                            <th className="text-start border border-gray-300 py-2 px-4">From</th>
                            <th className="text-start border border-gray-300 py-2 px-4">To</th>
                            <th className="text-start border border-gray-300 py-2 px-4">Status</th>
                            {/* <th className="text-start border border-gray-300 py-2 px-4">Action</th> */}
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {
                            leaves && leaves.map((item, i) =>
                                <tr key={i}>
                                    <td className="border border-gray-300 py-2 px-4">{i + 1}</td>
                                    {/* <td className="border border-gray-300 py-2 px-4">{auth.empId}</td> */}
                                    <td className="border border-gray-300 py-2 px-4">{item.leaveType.name}</td>
                                    <td className="border border-gray-300 py-2 px-4">{item.fromDate}</td>
                                    <td className="border border-gray-300 py-2 px-4">{item.toDate}</td>
                                    <td className="border border-gray-300 py-2 px-4">
                                        <span className={`${item.status === 'approved' ? 'bg-green-600' : item.status === 'rejected' ? 'bg-red-600' : 'bg-yellow-500'}  rounded px-3 py-1 text-white capitalize`}>{item.status}</span>
                                    </td>
                                    {/* <td className="border border-gray-300 py-2 px-4">
                                        <button onClick={() => handleEdit(item)} className='bg-primary rounded px-3 py-2 text-white'>View Details</button>
                                    </td> */}
                                </tr>
                            )
                        }
                    </tbody>
                </table>
            </TableUi>
        </>
    )
}

export default LeaveHistory