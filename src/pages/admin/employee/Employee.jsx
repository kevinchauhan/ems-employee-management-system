import React, { useEffect, useState } from 'react'
import TableUi from '../../../Components/shared/TableUi'
import Table2 from '../../../Components/admin/Table2'
import { getData } from '../../../firebase/firebaseSevice'
import { Link } from 'react-router-dom'

const Button = () => <Link to='/admin/employee/add' className='bg-primary  text-white px-2 py-1 rounded'>Add</Link>

const Employee = () => {
    const [data, setData] = useState([])
    // const data = [{
    //     empId: '101',
    //     name: 'kevin',
    //     email: 'kevin@gmail.com',
    //     mobile: '1234567895',
    //     country: 'india',
    //     department: 'IT'
    // }]
    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        const res = await getData('employees')
        setData(res)
    }

    return (
        <>
            <TableUi title={'Manage Employee'} cmp={<Button />}>
                <Table2 data={data} />
            </TableUi>
        </>
    )
}

export default Employee