import React, { useEffect, useState } from 'react'
import TableUi from '../../Components/shared/TableUi'
import ManageTable from '../../Components/admin/ManageTable'
import Modal from '../../Components/shared/Modal'
import Form from '../../Components/admin/Form'
import { useDispatch, useSelector } from 'react-redux'
import { modalAction } from '../../store/store'
import { addData, deleteData, getData, updateData } from '../../firebase/firebaseSevice'

const Department = () => {
    const [departments, setDepartments] = useState([])
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
        await deleteData('departments', id)
        fetchData()
    }
    const handleForm = async (input) => {
        if (editId) {
            await updateData('departments', { name: input }, editId.id)
        } else {
            await addData('departments', { name: input })
        }
        dispatch(modalAction.toggleModal())
        fetchData()
    }

    const fetchData = async () => {
        const data = await getData('departments')
        setDepartments(data)
    }

    return (
        <>
            <Modal>
                <Form handleForm={handleForm} title={'Department'} editId={editId} />
            </Modal>
            <TableUi title={'Manage Department'} isBtn={true} >
                <ManageTable title={'name'} data={departments} handleEdit={handleEdit} handleDelete={handleDelete} />
            </TableUi>
        </>
    )
}

export default Department