import React, { useEffect, useState } from 'react'
import TableUi from '../../../Components/shared/TableUi'
import { Link } from 'react-router-dom'
import { collection, getDocs, limit, orderBy, query } from 'firebase/firestore'
import { db } from '../../../firebase/firebaseConfig'

const Button = () => <Link to='/admin/salary/add' className='bg-primary text-white px-2 py-1 rounded'>Add</Link>

const Salary = () => {
    const [datas, setDatas] = useState([])
    useEffect(() => {
        fetchData()
    }, [])
    console.log(datas)
    const fetchData = async () => {
        const employeesColRef = collection(db, "employees");
        const fetchEmployeesWithLatestSalary = async () => {
            try {
                const employeesWithLatestSalary = await getDocs(employeesColRef);

                const result = [];

                for (const employeeDoc of employeesWithLatestSalary.docs) {
                    const salaryHistoryColRef = collection(employeeDoc.ref, 'salary_history');
                    const latestSalaryQuery = query(salaryHistoryColRef, orderBy('date', 'desc'), limit(1));

                    const latestSalarySnapshot = await getDocs(latestSalaryQuery);

                    if (!latestSalarySnapshot.empty) {
                        const latestSalary = latestSalarySnapshot.docs[0].data();
                        result.push({
                            id: employeeDoc.id,
                            ...employeeDoc.data(),
                            latestSalary,
                        });
                    }
                }

                setDatas(result);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchEmployeesWithLatestSalary()
    }

    return (
        <TableUi title={'Salary History'} cmp={<Button />}>
            <table className="min-w-full divide-y divide-gray-200 border-gray-300">
                <thead className="bg-gray-50">
                    <tr>
                        <th className="text-start border border-gray-300 py-2 px-4">Sr. No</th>
                        <th className="text-start border border-gray-300 py-2 px-4">Emp Id</th>
                        <th className="text-start border border-gray-300 py-2 px-4">Name</th>
                        <th className="text-start border border-gray-300 py-2 px-4">Department Name</th>
                        <th className="text-start border border-gray-300 py-2 px-4">Salary</th>
                        <th className="text-start border border-gray-300 py-2 px-4">Action</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                    {
                        datas && datas.map((data, i) =>
                            <tr key={i}>
                                <td className="border border-gray-300 py-2 px-4">{i + 1}</td>
                                <td className="border border-gray-300 py-2 px-4">{data.empId}</td>
                                <td className="border border-gray-300 py-2 px-4">{data.name}</td>
                                <td className="border border-gray-300 py-2 px-4">{data.department.name}</td>
                                <td className="border border-gray-300 py-2 px-4">{data.latestSalary.salary}</td>
                                <td className="border border-gray-300 py-2 px-4">
                                    <Link to={`/admin/employee/salary/${data.id}`} className='bg-blue-600 hover:bg-blue-700 rounded px-3 py-2 text-white'>view</Link>
                                    <button onClick={() => handleEdit(data)} className='bg-green-600 rounded px-3 py-2 ml-2 text-white'>Edit</button>
                                </td>
                            </tr>
                        )
                    }
                </tbody>
            </table>
        </TableUi>
    )
}

export default Salary