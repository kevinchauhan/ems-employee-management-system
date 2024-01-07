import React from 'react'
import TableUi from '../../Components/shared/TableUi'
import ManageTable from '../../Components/admin/ManageTable'

const LeaveType = () => {
    return (
        <TableUi>
            <ManageTable title={'Type Of Leave'} data={[{ name: 'CL', id: '1' }]} />
        </TableUi>
    )
}

export default LeaveType