import React from 'react'

const AuthLayout = ({children}) => {
  return (
    <main className="grid grid-cols-2 items-center justify-center min-h-screen bg-gray-400">
          <div className="flex items-center justify-center h-screen bg-white">
              {children}
        </div>
          <div className="hidden md:block bg-auth-pattern bg-cover bg-center h-full">
              <img src="/image1.jpg" alt="" className='min-h-screen'/>
        </div>
    </main>
  )
}

export default AuthLayout