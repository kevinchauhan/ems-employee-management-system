import React, { useEffect } from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AdminRoutes from './routes/AdminRoutes'
import Header from './Components/shared/Header'
import DashboardNav from './Components/shared/DashboardNav'
import Login from './pages/shared/Login'
import EmployeeRoutes from './routes/EmployeeRoutes'
import AdminNav from './Components/admin/AdminNav'
import EmployeeNav from './Components/employee/EmployeeNav'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './firebase/firebaseConfig'
import { authAction, roleAction } from './store/store'
import { useDispatch, useSelector } from 'react-redux'
import { queryData } from './firebase/firebaseSevice'
import { where } from 'firebase/firestore'
import Protected from './routes/Protected'

const App = () => {
  const role = useSelector(state => state.role)
  const dispatch = useDispatch()

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        if (user.uid === '5N5CvR8j7CVlAkX89B3ITn6pymu2') {
          dispatch(roleAction.setRole('admin'))
          dispatch(authAction.login(user.uid))
        } else {
          queryData('employees', where('uid', '==', user.uid))
            .then((emp) => {
              dispatch(authAction.login(emp[0]))
            })
            .catch(err => console.log(err))
        }
      }
    })
  }, [])


  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/*' element={
            <section className='flex min-h-screen bg-light'>
              {
                role === 'admin' ? <AdminNav /> : <EmployeeNav />
              }
              <main className='flex-1'>
                <Header />
                {/* <DashboardNav /> */}
                <div className="p-5 h-[82vh] overflow-y-auto">
                  <Routes>
                    <Route path='/admin/*' element={<Protected cmp={<AdminRoutes />} />} />
                    <Route path='/employee/*' element={<Protected cmp={<EmployeeRoutes />} />} />
                  </Routes>
                </div>
              </main>
            </section>
          } />
          <Route path='*' element='404' />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App