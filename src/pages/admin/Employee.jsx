import React, { useState } from 'react'
import TableUi from '../../Components/shared/TableUi'
import Table2 from '../../Components/admin/Table2'
import Input from '../../Components/shared/Input'
import Modal from '../../Components/shared/Modal'
import Form from '../../Components/admin/Form'

const Employee = () => {
    const data = [{
        empId: '101',
        name: 'kevin',
        email: 'kevin@gmail.com',
        mobile: '1234567895',
        country: 'india',
        department: 'IT'
    }]

    return (
        <>
            <TableUi>
                <Table2 data={data} />
            </TableUi>
        </>
    )
}

export default Employee