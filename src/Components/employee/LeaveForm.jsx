import React, { useEffect, useState } from 'react'
import Input from '../shared/Input'
import { useDispatch, useSelector } from 'react-redux'
import { addData, getData } from '../../firebase/firebaseSevice'
import { modalAction } from '../../store/store'

const LeaveForm = ({ handleForm, title, editId }) => {
    const INITIAL_INPUT = {
        leaveType: '',
        fromDate: '',
        toDate: ''
    }
    const [inputValue, setInputValue] = useState(INITIAL_INPUT)
    const [error, setError] = useState('')
    const [leaveTypes, setLeaveTypes] = useState([])
    const modal = useSelector(state => state.modal)
    const auth = useSelector(state => state.auth)
    const dispatch = useDispatch()

    useEffect(() => {
        if (modal === false) {
            setInputValue(INITIAL_INPUT)
        }
    }, [modal])

    useEffect(() => {
        fetchData()
    }, [])

    useEffect(() => {
        if (editId) {
            setInputValue(editId.name)
        }
    }, [editId])

    const handleInputChange = (e) => {
        const name = e.target.name
        const value = (e.target.value).trim()
        setInputValue({ ...inputValue, [name]: value })
    }


    const handleSubmit = async (e) => {
        e.preventDefault()
        const checkValidate = validate(inputValue)
        if (Object.keys(checkValidate).length > 0) {
            setError(checkValidate)
        } else {
            setError({})
            const leaveType = leaveTypes.filter(e => e.id === inputValue.leaveType)
            const data = { ...inputValue, createdAt: Date(), status: 'pending', emp: { id: auth.id, name: auth.name }, leaveType: leaveType[0] }
            const res = await handleForm(data)
            setInputValue(INITIAL_INPUT)
        }
    }

    const validate = (input) => {
        const errors = {}
        if (input.leaveType.length < 1) {
            errors.leaveType = 'please select leave type'
        }
        if (input.fromDate.length < 1) {
            errors.fromDate = 'please select starting date'
        }
        if (input.toDate.length < 1) {
            errors.toDate = 'please select ending date'
        }
        return errors
    }


    const fetchData = async () => {
        const data = await getData('leavetypes')
        setLeaveTypes(data)
    }

    return (
        <div className='bg-white px-3'>
            <h2 className='text-xl text-center border-b pb-3 font-semibold'>Apply for Leave</h2>
            <div className='mt-3'>
                <h4 className='mb-2'></h4>
                <form action="" onSubmit={handleSubmit}>
                    <div className='mb-5'>
                        <label htmlFor="">First Name</label>
                        <select name="leaveType" value={inputValue.leaveType} onChange={handleInputChange} className={`border ${!error.leaveType ? 'border-gray-300' : 'border-red-500'} w-full rounded-md mt-2 py-2 px-3`}>
                            <option value="">--Select LeaveType--</option>
                            {
                                leaveTypes.map(item =>
                                    <option key={item.id} value={item.id}>{item.name}</option>
                                )
                            }
                        </select>
                        {error && <p className="text-red-500 text-sm">{error.leaveType}</p>}
                    </div>
                    <div className="flex gap-5">
                        <div className='flex-1 mb-5'>
                            <label htmlFor="">From Date</label>
                            <input className={`border ${!error.fromDate ? 'border-gray-300' : 'border-red-500'} w-full rounded-md mt-2 py-2 px-3`} name='fromDate' type="date" placeholder="Enter your fromDate" value={inputValue.fromDate} onChange={handleInputChange} error={error.fromDate} />
                            {error && <p className="text-red-500 text-sm">{error.fromDate}</p>}
                        </div>
                        <div className='flex-1 mb-5'>
                            <label htmlFor="">To Date</label>
                            <input className={`border ${!error.toDate ? 'border-gray-300' : 'border-red-500'} w-full rounded-md mt-2 py-2 px-3`} name='toDate' type="date" placeholder="Enter your toDate" value={inputValue.toDate} onChange={handleInputChange} error={error.toDate} />
                            {error && <p className="text-red-500 text-sm">{error.toDate}</p>}
                        </div>
                    </div>
                    <button className='bg-primary text-white mt-3 px-5 py-1 rounded'>Apply for Leave</button>
                </form>
            </div>
        </div>
    )
}

export default LeaveForm