import React from 'react'

const Header = () => {
    return (
        <header className='bg-primary text-white'>
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                <div className="relative py-3">
                    <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-end">
                        <div className="hidden sm:ml-6 sm:block">
                            <div className="flex space-x-4">
                                <h3>Welcome Back</h3>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header