import React from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AdminRoutes from './routes/AdminRoutes'
import Header from './Components/shared/Header'
import Nav from './Components/admin/Nav'
import DashboardNav from './Components/shared/DashboardNav'

const App = () => {
  return (
    <>
      <BrowserRouter>
        <section className='flex min-h-screen bg-light'>
          <Nav />
          <main className='flex-1'>
            <Header />
            <DashboardNav />
            <div className="p-5">
              <Routes>
                <Route path='/' element={'Home'} />
                <Route path='/login' element={'login'} />
                <Route path='/admin/*' element={<AdminRoutes />} />
              </Routes>
            </div>
          </main>
        </section>
      </BrowserRouter>
    </>
  )
}

export default App