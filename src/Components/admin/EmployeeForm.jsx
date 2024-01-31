import React, { useEffect, useState } from 'react'
import TableUi from '../shared/TableUi'
import { downloadImage, getData, queryData, updateData, uploadImage } from '../../firebase/firebaseSevice'
import { where } from 'firebase/firestore'
import { createUserWithEmailAndPassword, inMemoryPersistence, setPersistence } from "firebase/auth"
import { auth } from '../../firebase/firebaseConfig'
import { useNavigate } from 'react-router-dom'

const EmployeeForm = ({ handleForm, input, isEdit }) => {
    const INITIAL_INPUT = {
        empId: '',
        name: '',
        surname: '',
        email: '',
        password: '',
        confirmPassword: '',
        mobile: '',
        dob: '',
        doj: '',
        country: '',
        state: '',
        city: '',
        address: '',
        department: ''
    }
    const [departments, setDepartments] = useState([])
    const [inputValue, setInputValue] = useState(INITIAL_INPUT)
    const [error, setError] = useState({})
    const [isValidEmail, setIsValidEmail] = useState(true)
    const [isValidEmpId, setIsValidEmpId] = useState(true)
    const [imageFile, setImageFile] = useState(null)
    const [imageUrl, setImageUrl] = useState('')
    const navigate = useNavigate()

    useEffect(() => {
        if (input) {
            setInputValue(input)
            fetchDp()
        }
    }, [input])

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        const res = await getData('departments')
        setDepartments(res)
    }

    const fetchDp = async () => {
        if (input.filePath) {
            const url = await downloadImage(input.filePath)
            setImageUrl(url)
        }
    }

    const handleInputChange = (e) => {
        const name = e.target.name
        const value = (e.target.value).trim()
        setInputValue({ ...inputValue, [name]: value })
    }

    const handleFileChange = async (e) => {
        const file = e.target.files[0]
        if (file && file.type.startsWith('image/')) {
            setImageFile(file)
        } else {
            // Handle invalid file type (not an image)
            alert('Please select a valid image file.')
            e.target.value = ''
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const department = departments.filter(e => e.id === inputValue.department)
        const checkValidate = validate(inputValue)
        if (Object.keys(checkValidate).length > 0) {
            setError(checkValidate)
        } else {
            setError({})
            if (isEdit) {
                const res = await handleForm({ ...inputValue, department: department[0] })
                if (res) {
                    if (imageFile) {
                        await handleImage(res)
                    }
                    navigate(-1)
                }
            } else {
                const password = inputValue.password
                delete inputValue.password
                delete inputValue.confirmPassword
                const empAuth = await createEmp(inputValue.email, password)
                if (empAuth) {
                    const empData = await handleForm({ ...inputValue, department: department[0], createdAt: Date(), uid: empAuth.uid })
                    if (empData) {
                        if (imageFile) {
                            await handleImage(empData.id)
                        }
                        navigate('/admin/employee')
                    }
                }
            }
        }
    }

    const handleImage = async (empId) => {
        console.log(empId)
        const fileExt = imageFile.name.split('.')[1]
        const filePath = `employees/dp/${empId}.${fileExt}`
        await uploadImage(imageFile, filePath)
        updateData('employees', { filePath }, empId)
    }

    const validate = (input) => {
        const errors = {}
        if (input.name.length < 1) {
            errors.name = 'please enter an name'
        }
        if (input.surname.length < 1) {
            errors.surname = 'please enter your lastname'
        }
        if (input.department.length < 1) {
            errors.department = 'please select department'
        }
        if (input.mobile.length < 10) {
            errors.mobile = 'please enter valid mobile number'
        }
        if (input.country.length < 1) {
            errors.country = 'please enter country'
        }
        if (input.state.length < 1) {
            errors.state = 'please enter state'
        }
        if (input.city.length < 1) {
            errors.city = 'please enter city'
        }
        if (input.dob.length < 1) {
            errors.dob = 'please enter date of birth'
        }
        if (input.doj.length < 1) {
            errors.doj = 'please enter date of joining'
        }
        if (input.address.length < 1) {
            errors.address = 'please enter address'
        }

        if (!isEdit) {
            if (input.password.length < 1) {
                errors.password = 'please enter an password'
            } else {
                const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
                if (!passwordRegex.test(input.password)) {
                    errors.password = 'At least one UPPERCASE, lowercase, digit, special character and minimum length of 8 characters.'
                }
            }

            if (input.confirmPassword.length < 1) {
                errors.password = 'please confirm your password'
            } else {
                if (input.confirmPassword !== input.password) {
                    errors.confirmPassword = 'It does not match password'
                }
            }
        }

        return errors
    }

    const handleEmail = async (e) => {
        const email = e.target.value
        if (email.length < 1) {
            setIsValidEmail(false)
            setError({ ...error, email: 'please enter an email' })
        } else {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
            if (!emailRegex.test(email)) {
                // error.email = 'Invalid email format'
                setIsValidEmail(false)
                setError({ ...error, email: 'Invalid email format' })
            } else {
                const result = await queryData('employees', where("email", "==", email))
                if (result.length > 0) {
                    setError({ ...error, email: 'Email already exists' })
                    setIsValidEmail(false)
                } else {
                    setError({})
                    // setError({ ...error, email: 'Email is available' })
                    setIsValidEmail(true)
                }
            }
        }
    }

    const handleEmpId = async (e) => {
        const empId = e.target.value
        if (empId.length < 1) {
            setIsValidEmpId(false)
            setError({ ...error, empId: 'please enter an empId' })
        } else {
            const result = await queryData('employees', where("empId", "==", empId))
            if (result.length > 0) {
                setError({ ...error, empId: 'EmpId already exists' })
                setIsValidEmpId(false)
            } else {
                setError({})
                // setError({ ...error, empId: 'EmpId is available' })
                setIsValidEmpId(true)
            }
        }
    }

    const createEmp = async (email, password) => {
        try {
            setPersistence(auth, inMemoryPersistence)
            const userCredential = await createUserWithEmailAndPassword(auth, email, password)
            const user = userCredential.user
            return user
        } catch (error) {
            console.log(error)
            const errorCode = error.code
            const errorMessage = error.message
            // ..
        }
    }

    return (
        <TableUi title={'Add Employee'}>
            <form action="" onSubmit={handleSubmit} className='text-gray-700' noValidate>
                <div className='mb-7'>
                    <label htmlFor="">Emp Id</label>
                    <input className={`border ${!error.empId || isValidEmpId ? 'border-gray-300' : 'border-red-500'} w-full rounded-md mt-2 py-2 px-3`} name='empId' label='Emp ID' type="text" placeholder="Enter emp id" value={inputValue.empId} onChange={handleInputChange} onBlur={handleEmpId} error={error.empId} autoComplete='false' disabled={isEdit} />
                    {error && <p className={`${isValidEmpId ? 'text-green-500' : 'text-red-500'} text-sm`}>{error.empId}</p>}
                </div>
                <div className="grid grid-cols-2 gap-5">
                    <div className='mb-5'>
                        <label htmlFor="">First Name</label>
                        <input className={`border ${!error.name ? 'border-gray-300' : 'border-red-500'} w-full rounded-md mt-2 py-2 px-3`} name='name' type="text" placeholder="Enter your first name" value={inputValue.name} onChange={handleInputChange} error={error.name} />
                        {error && <p className="text-red-500 text-sm">{error.name}</p>}
                    </div>
                    <div className='mb-5'>
                        <label htmlFor="">Last Name</label>
                        <input className={`border ${!error.surname ? 'border-gray-300' : 'border-red-500'} w-full rounded-md mt-2 py-2 px-3`} name='surname' type="text" placeholder="Enter your last name" value={inputValue.surname} onChange={handleInputChange} error={error.surname} />
                        {error && <p className="text-red-500 text-sm">{error.surname}</p>}
                    </div>
                    <div className='mb-5'>
                        <label htmlFor=""></label>
                        <label htmlFor="">Department</label>
                        <select name="department" value={inputValue.department} onChange={handleInputChange} className={`border ${!error.department ? 'border-gray-300' : 'border-red-500'} w-full rounded-md mt-2 py-2 px-3`}>
                            <option value="">--Select Deartment--</option>
                            {
                                departments.map(item =>
                                    <option key={item.id} value={item.id}>{item.name}</option>
                                )
                            }
                        </select>
                        {error && <p className="text-red-500 text-sm">{error.department}</p>}
                    </div>
                    <div className='mb-5'>
                        <label htmlFor="">Email ID</label>
                        <input className={`border ${!error.email || isValidEmail ? 'border-gray-300' : 'border-red-500'} w-full rounded-md mt-2 py-2 px-3`} name='email' type="email" placeholder="Enter your Email ID" value={inputValue.email} onChange={handleInputChange} onBlur={handleEmail} error={error.email} autoComplete='false' disabled={isEdit} />
                        {error && <p className={`${isValidEmail ? 'text-green-500' : 'text-red-500'} text-sm`}>{error.email}</p>}
                    </div>
                    <div className='mb-5'>
                        <label htmlFor="">Mobile no.</label>
                        <input className={`border ${!error.mobile ? 'border-gray-300' : 'border-red-500'} w-full rounded-md mt-2 py-2 px-3`} name='mobile' type="text" placeholder="Enter your mobile no." value={inputValue.mobile} onChange={handleInputChange} error={error.mobile} />
                        {error && <p className="text-red-500 text-sm">{error.mobile}</p>}
                    </div>
                    <div className='mb-5'>
                        <label htmlFor="">Country</label>
                        <input className={`border ${!error.country ? 'border-gray-300' : 'border-red-500'} w-full rounded-md mt-2 py-2 px-3`} name='country' type="text" placeholder="Enter your country" value={inputValue.country} onChange={handleInputChange} error={error.country} />
                        {error && <p className="text-red-500 text-sm">{error.country}</p>}
                    </div>
                    <div className='mb-5'>
                        <label htmlFor="">State</label>
                        <input className={`border ${!error.state ? 'border-gray-300' : 'border-red-500'} w-full rounded-md mt-2 py-2 px-3`} name='state' type="text" placeholder="Enter your state" value={inputValue.state} onChange={handleInputChange} error={error.state} />
                        {error && <p className="text-red-500 text-sm">{error.state}</p>}
                    </div>
                    <div className='mb-5'>
                        <label htmlFor="">City</label>
                        <input className={`border ${!error.city ? 'border-gray-300' : 'border-red-500'} w-full rounded-md mt-2 py-2 px-3`} name='city' type="text" placeholder="Enter your city" value={inputValue.city} onChange={handleInputChange} error={error.city} />
                        {error && <p className="text-red-500 text-sm">{error.city}</p>}
                    </div>
                    <div className='mb-5'>
                        <label htmlFor="">DOB</label>
                        <input className={`border ${!error.dob ? 'border-gray-300' : 'border-red-500'} w-full rounded-md mt-2 py-2 px-3`} name='dob' type="date" placeholder="Enter your Dob" value={inputValue.dob} onChange={handleInputChange} error={error.dob} />
                        {error && <p className="text-red-500 text-sm">{error.dob}</p>}
                    </div>
                    <div className='mb-5'>
                        <label htmlFor="">Date of Joining</label>
                        <input className={`border ${!error.doj ? 'border-gray-300' : 'border-red-500'} w-full rounded-md mt-2 py-2 px-3`} name='doj' type="date" placeholder="Enter your Dob" value={inputValue.doj} onChange={handleInputChange} error={error.doj} />
                        {error && <p className="text-red-500 text-sm">{error.doj}</p>}
                    </div>
                    <div className='mb-5'>
                        <label htmlFor="">Photo</label>
                        <input className={`border border-gray-300 w-full rounded-md mt-2 py-2 px-3`} type="file" onChange={handleFileChange} accept="image/*" />
                        {
                            isEdit && imageUrl ?
                                <div className='border w-fit mt-2 p-1'>
                                    <img src={imageUrl} alt="image" className='w-24 h-24 object-cover rounded-full' />
                                </div>
                                : isEdit ? 'no image available' : ''
                        }
                    </div>
                    <div className='mb-5'>
                        <label htmlFor="">Address</label>
                        <textarea name="address" value={inputValue.address} onChange={handleInputChange} cols="30" rows="3" className={`border ${!error.address ? 'border-gray-300' : 'border-red-500'} w-full rounded-md mt-2 py-2 px-3`} placeholder='Enter your address'></textarea>
                        {error && <p className="text-red-500 text-sm">{error.address}</p>}
                    </div>
                    {
                        isEdit ? '' :
                            <>
                                <div className='mb-5'>
                                    <label htmlFor="">Password</label>
                                    <input className={`border ${!error.password ? 'border-gray-300' : 'border-red-500'} w-full rounded-md mt-2 py-2 px-3`} name='password' type="password" placeholder="Enter your password" value={inputValue.password} onChange={handleInputChange} error={error.password} />
                                    {error && <p className="text-red-500 text-sm">{error.password}</p>}
                                </div>
                                <div className='mb-5'>
                                    <label htmlFor="">Confirm Password</label>
                                    <input className={`border ${!error.confirmPassword ? 'border-gray-300' : 'border-red-500'} w-full rounded-md mt-2 py-2 px-3`} name='confirmPassword' type="text" placeholder="Confirm your password" value={inputValue.confirmPassword} onChange={handleInputChange} error={error.confirmPassword} />
                                    {error && <p className="text-red-500 text-sm">{error.confirmPassword}</p>}
                                </div>
                            </>
                    }
                </div>
                <button className='bg-primary text-white mt-3 px-5 py-1 rounded'>{isEdit ? 'Update' : 'Submit'}</button>
            </form>
        </TableUi>
    )
}

export default EmployeeForm