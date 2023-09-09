import React from 'react'
import SideBar from '../SideBar/SideBar'

const Dashboard = () => {
    const userDetail = localStorage.UserDetail
  return (
    <>

    <div className='col-lg-10'>
    {userDetail && (
        <div className='container'>
    <div className='row'>
      <div className='col-lg-4' >
              
      </div>
      <div className='col-lg-8 '>
       
      </div>
    </div>
    </div>
    )}
    </div>
    </>
  )
}

export default Dashboard