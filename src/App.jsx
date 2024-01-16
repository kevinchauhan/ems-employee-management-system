import React from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AdminRoutes from './routes/AdminRoutes'
import Header from './Components/shared/Header'
import Nav from './Components/admin/Nav'
import DashboardNav from './Components/shared/DashboardNav'
import Login from './pages/shared/Login'

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/*' element={
            <section className='flex min-h-screen bg-light'>
              <Nav />
              <main className='flex-1'>
                <Header />
                <DashboardNav />
                <div className="p-5 h-[85vh] overflow-y-auto">
                  <Routes>
                    <Route path='/admin/*' element={<AdminRoutes />} />
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