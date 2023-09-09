import React from 'react'
import { Link } from 'react-router-dom'

const SideBar = () => {
  return (
    <div className='bg-primary min-vh-100 text-start text-white '>

       <Link to="/phones" className=' text-decoration-none text-white'><h4 className='px-2'>Phones</h4></Link>
       <Link to="/manage" className=' text-decoration-none text-white'><h4 className='px-2'>Manage Phones</h4></Link>


    </div>
  )
}

export default SideBar