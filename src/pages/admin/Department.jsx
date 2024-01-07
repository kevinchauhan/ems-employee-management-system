import React from 'react'
import TableUi from '../../Components/shared/TableUi'
import ManageTable from '../../Components/admin/ManageTable'
import Modal from '../../Components/shared/Modal'
import Form from '../../Components/admin/Form'

const Department = () => {
    return (
        <>
            <Modal>
                <Form />
            </Modal>
            <TableUi >
                <ManageTable title={'name'} data={[{ name: 'HR', id: '1' }]} />
            </TableUi>
        </>
    )
}

export default Department