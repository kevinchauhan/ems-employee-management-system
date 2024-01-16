import React from 'react'

const ManageTable = ({ title, data, handleEdit, handleDelete }) => {
    return (
        <table className="min-w-full divide-y divide-gray-200 border-gray-300">
            <thead className="bg-gray-50">
                <tr>
                    <th className="text-start border border-gray-300 py-2 px-4">Sr. No</th>
                    <th className="text-start border border-gray-300 py-2 px-4">{title}</th>
                    <th className="text-start border border-gray-300 py-2 px-4">Action</th>
                </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
                {
                    data && data.map((item, i) =>
                        <tr key={i}>
                            <td className="border border-gray-300 py-2 px-4">{i + 1}</td>
                            <td className="border border-gray-300 py-2 px-4">{item.name}</td>
                            <td className="border border-gray-300 py-2 px-4">
                                <button onClick={() => handleEdit(item)} className='bg-green-600 rounded px-3 py-2 text-white'>Edit</button>
                                <button onClick={() => handleDelete(item.id)} className='bg-red-600 rounded px-3 py-2 ml-2 text-white'>Delete</button>
                            </td>
                        </tr>
                    )
                }
            </tbody>
        </table>
    )
}

export default ManageTable