import React, { useEffect, useState } from 'react'
import TableUi from '../../../Components/shared/TableUi'
import { useDispatch, useSelector } from 'react-redux'
import { modalAction } from '../../../store/store'
import Modal from '../../../Components/shared/Modal'
import Form from '../../../Components/admin/Form'
import { addData, deleteData, getData, updateData } from '../../../firebase/firebaseSevice'

const Leaves = () => {
    const [leaves, setLeaves] = useState([])
    const [editId, setEditId] = useState(null)
    const modal = useSelector(state => state.modal)
    const dispatch = useDispatch()

    useEffect(() => {
        // fetchData()
    }, [])

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
    const handleForm = async (input) => {
        if (editId) {
            await updateData('leavetypes', { name: input }, editId.id)
        } else {
            await addData('leavetypes', { name: input })
        }
        dispatch(modalAction.toggleModal())
        fetchData()
    }

    const fetchData = async () => {
        const data = await getData('leavetypes')
        setLeaves(data)
    }
    return (
        <>
            <Modal>
                <Form handleForm={handleForm} title={'Leave Type'} editId={editId} />
            </Modal>
            <TableUi title={'Leave Requests'}>
                <table className="min-w-full divide-y divide-gray-200 border-gray-300">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="text-start border border-gray-300 py-2 px-4">Sr. No</th>
                            <th className="text-start border border-gray-300 py-2 px-4">Emp Id</th>
                            <th className="text-start border border-gray-300 py-2 px-4">Leave Type</th>
                            <th className="text-start border border-gray-300 py-2 px-4">From</th>
                            <th className="text-start border border-gray-300 py-2 px-4">To</th>
                            <th className="text-start border border-gray-300 py-2 px-4">Status</th>
                            <th className="text-start border border-gray-300 py-2 px-4">Action</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                        {/* {
                            leaves && leaves.map((item, i) => */}
                        <tr>
                            <td className="border border-gray-300 py-2 px-4">1</td>
                            <td className="border border-gray-300 py-2 px-4">101</td>
                            <td className="border border-gray-300 py-2 px-4">CL</td>
                            <td className="border border-gray-300 py-2 px-4">10-01-2024</td>
                            <td className="border border-gray-300 py-2 px-4">15-01-2024</td>
                            <td className="border border-gray-300 py-2 px-4">
                                <span className='bg-green-600 rounded px-3 py-2 text-white'>Approved</span>
                            </td>
                            <td className="border border-gray-300 py-2 px-4">
                                <button onClick={() => handleEdit(item)} className='bg-primary rounded px-3 py-2 text-white'>View Details</button>
                            </td>
                        </tr>
                        {/* )
                        } */}
                    </tbody>
                </table>
            </TableUi>
        </>
    )
}

export default Leaves