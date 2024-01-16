import React, { useEffect, useState } from 'react'
import TableUi from '../../Components/shared/TableUi'
import ManageTable from '../../Components/admin/ManageTable'
import { useDispatch, useSelector } from 'react-redux'
import { modalAction } from '../../store/store'
import Modal from '../../Components/shared/Modal'
import Form from '../../Components/admin/Form'
import { addData, deleteData, getData, updateData } from '../../firebase/firebaseSevice'

const LeaveType = () => {
    const [leaveTypes, setLeaveTypes] = useState([])
    const [editId, setEditId] = useState(null)
    const modal = useSelector(state => state.modal)
    const dispatch = useDispatch()

    useEffect(() => {
        fetchData()
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
        setLeaveTypes(data)
    }
    return (
        <>
            <Modal>
                <Form handleForm={handleForm} title={'Leave Type'} editId={editId} />
            </Modal>
            <TableUi title={'Manage Leaves'}>
                <ManageTable title={'Type Of Leave'} data={leaveTypes} handleEdit={handleEdit} handleDelete={handleDelete} />
            </TableUi>
        </>
    )
}

export default LeaveType