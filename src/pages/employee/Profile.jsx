import React, { useEffect, useState } from 'react'
import { downloadImage, getData, getSingleData, queryData, updateData, uploadImage } from '../../firebase/firebaseSevice'
import { where } from 'firebase/firestore'
import { createUserWithEmailAndPassword, inMemoryPersistence, setPersistence } from "firebase/auth";
import { auth } from '../../firebase/firebaseConfig';
import { useNavigate } from 'react-router-dom';
import TableUi from '../../Components/shared/TableUi';
import { useSelector } from 'react-redux';

const Profile = () => {
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
    const [imageFile, setImageFile] = useState(null)
    const [imageUrl, setImageUrl] = useState('')
    const [error, setError] = useState({})
    const [isValidEmail, setIsValidEmail] = useState(true)
    const [isValidEmpId, setIsValidEmpId] = useState(true)
    const auth = useSelector(state => state.auth)
    const navigate = useNavigate()

    useEffect(() => {
        fetchDepartment()
    }, [])

    useEffect(() => {
        fetchData()
    }, [auth])

    const fetchDepartment = async () => {
        setDepartments(await getData('departments'))
    }

    const fetchData = async () => {
        try {
            if (auth) {
                const res = await getSingleData('employees', auth.id)
                setInputValue(res)
                if (res.filePath) {
                    const url = await downloadImage(res.filePath)
                    setImageUrl(url)
                }
            }
        } catch (error) {
            console.log(error)
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
        const checkValidate = validate(inputValue)
        if (Object.keys(checkValidate).length > 0) {
            setError(checkValidate)
        } else {
            setError({})
            const data = { ...inputValue }
            await updateData('employees', data, auth.id)
            if (imageFile) {
                await handleImage(auth.id)
            }
            fetchData()
        }
    }

    const handleImage = async (empId) => {
        console.log(empId)
        const fileExt = imageFile.name.split('.')[1]
        const filePath = `employees/dp/${empId}.${fileExt}`
        await uploadImage(imageFile, filePath)
        await updateData('employees', { filePath }, empId)
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


    return (
        <TableUi title={'Profile'}>
            <form action="" onSubmit={handleSubmit} className='text-gray-700' noValidate>
                <div className='mb-7'>
                    <label htmlFor="">Emp Id</label>
                    <input className={`border ${!error.empId || isValidEmpId ? 'border-gray-300' : 'border-red-500'} w-full rounded-md mt-2 py-2 px-3`} name='empId' label='Emp ID' type="text" placeholder="Enter emp id" value={inputValue.empId} autoComplete='false' disabled={true} />
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
                        <select disabled={true} name="department" value={inputValue.department.id} className={`border ${!error.department ? 'border-gray-300' : 'border-red-500'} w-full rounded-md mt-2 py-2 px-3`}>
                            <option value="">--Select Deartment--</option>
                            {
                                departments.map(item =>
                                    <option key={item.id} value={item.id}>{item.name}</option>
                                )
                            }
                        </select>
                    </div>
                    <div className='mb-5'>
                        <label htmlFor="">Email ID</label>
                        <input className={`border ${!error.email || isValidEmail ? 'border-gray-300' : 'border-red-500'} w-full rounded-md mt-2 py-2 px-3`} name='email' type="email" placeholder="Enter your Email ID" value={inputValue.email} autoComplete='false' disabled={true} />
                    </div>
                    <div className='mb-5'>
                        <label htmlFor="">Mobile no.</label>
                        <input className={`border ${!error.mobile ? 'border-gray-300' : 'border-red-500'} w-full rounded-md mt-2 py-2 px-3`} name='mobile' type="text" placeholder="Enter your mobile no." value={inputValue.mobile} disabled={true} />
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
                        <input className={`border ${!error.doj ? 'border-gray-300' : 'border-red-500'} w-full rounded-md mt-2 py-2 px-3`} name='doj' type="date" placeholder="Enter your Dob" value={inputValue.doj} disabled={true} />
                    </div>
                    <div className='mb-5'>
                        <label htmlFor="">Photo</label>
                        <input className={`border border-gray-300 w-full rounded-md mt-2 py-2 px-3`} type="file" onChange={handleFileChange} accept="image/*" />
                        {
                            imageUrl ?
                                <div className='border w-fit mt-2 p-1'>
                                    <img src={imageUrl} alt="image" className='w-24 h-24 object-contain rounded-full' />
                                </div>
                                : 'no image available'
                        }
                    </div>
                    <div className='mb-5'>
                        <label htmlFor="">Address</label>
                        <textarea name="address" value={inputValue.address} onChange={handleInputChange} cols="30" rows="3" className={`border ${!error.address ? 'border-gray-300' : 'border-red-500'} w-full rounded-md mt-2 py-2 px-3`} placeholder='Enter your address'></textarea>
                        {error && <p className="text-red-500 text-sm">{error.address}</p>}
                    </div>
                </div>
                <button className='bg-primary text-white mt-3 px-5 py-1 rounded'>Update</button>
            </form>
        </TableUi>
    )
}

export default Profile