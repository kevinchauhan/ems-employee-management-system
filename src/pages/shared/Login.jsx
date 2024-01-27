import React, { useEffect, useState } from 'react'
import Input from '../../Components/shared/Input'
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../../firebase/firebaseConfig';
import { useDispatch, useSelector } from 'react-redux';
import { authAction, roleAction } from '../../store/store';
import { queryData } from '../../firebase/firebaseSevice';
import { where } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const login = () => {
    const [inputValue, setInputValue] = useState({ email: '', password: '' })
    const [error, setError] = useState('')
    const authRedux = useSelector(state => state.auth)
    const role = useSelector(state => state.role)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    useEffect(() => {
        if (authRedux) {
            if (role === 'admin') {
                navigate('/admin/dashboard')
            } else {
                navigate('/employee/dashboard')
            }
        }
    }, [authRedux, role])

    const handleInputChange = async (e) => {
        const name = e.target.name
        const value = e.target.value
        setInputValue({ ...inputValue, [name]: value })
    }


    const handleLogin = async (e) => {
        e.preventDefault()
        setError('')
        try {
            const res = await signInWithEmailAndPassword(auth, inputValue.email, inputValue.password)
            const emp = await queryData('employees', where('uid', '==', res.user.uid))

            if (res.user.uid === '5N5CvR8j7CVlAkX89B3ITn6pymu2') {
                dispatch(roleAction.setRole('admin'))
                dispatch(authAction.login(res.user.uid))
            } else {
                dispatch(authAction.login(emp[0]))
            }
        } catch (error) {
            console.log(error)
            setError('Invalid Credentials')
        }
    }


    return (
        <div className='h-screen relative bg-gray-100 z-0'>
            <div className="absolute bg-primary w-full h-1/2 top-0 left-0 z-[-1]"></div>
            <h1 className='w-full text-center text-6xl text-white pt-10 mb-10'>Employee Management System</h1>
            <div className="flex flex-wrap items-center justify-center h-[70%]">
                <div className=' bg-white shadow-xl w-1/3 px-10 py-5 mx-auto'>
                    <h1 className='text-2xl border-b pb-3 mb-3 text-center font-medium'>Sign In</h1>
                    <form action="" onSubmit={handleLogin}>
                        <Input label='Email'
                            name='email'
                            type="text"
                            placeholder="Enter your email..."
                            value={inputValue.email}
                            onChange={handleInputChange}
                        />
                        <Input label='Password'
                            name='password'
                            type="password"
                            placeholder="Enter your password..."
                            value={inputValue.password}
                            onChange={handleInputChange}
                            error={error}
                        />
                        <button className='bg-primary w-full text-white mt-3 px-5 py-1 rounded'>Sign In</button>
                    </form>
                </div>
            </div>
            <div className='text-red-600 text-xl absolute top-[50%] left-[10%] '>
                <h1>Admin Credentials:-</h1>
                <p>Email : admin@gmail.com</p>
                <p>Password : 123456</p>
            </div>
            <div className='text-red-600 text-xl absolute top-[50%] right-[10%] '>
                <h1>Employee Credentials:-</h1>
                <p>Add employee then login <br /> with entered email and password</p>
            </div>
        </div>
    )
}

export default login