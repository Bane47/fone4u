import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Button, Modal, Table } from 'react-bootstrap'
import MyModal, { App } from '../Modal/MyModal';
import { Link } from 'react-router-dom';

const Manage = () => {
  const [phonesData,setphonesData]=useState([]);
  const [show, setShow] = useState(false);
  const [id,setId] = useState();

  const handleClose = () => setShow(false);
  const handleShow = (id) => { setId(id); setShow(true)};

useEffect(() => {
  axios.get("http://localhost:3001/getPhones")
    .then((res) => {
      setphonesData(res.data);
   
    })
    .catch((err) => {
      console.log(err);
    });
}, []);


  return (
    <div >
        <Table responsive="sm" >
        <thead >
          <tr >
            <th className='text-white'>S.No</th>
            <th className='text-white'>Name</th>
            <th className='text-white'>RAM</th>
            <th className='text-white'>Camera</th>
            <th className='text-white'>Storage</th>
            <th className='text-white'>Display</th>
            <th className='text-white'>Price</th>
            <th className='text-white'>Edit</th>
            <th className='text-white'>Delete</th>

          </tr>
        </thead>
        <tbody>
        {phonesData.length > 0 && (
          <>
          {phonesData.map((data)=>(
          <tr>
            <td className='text-white'>{data.id}</td>
            <td className='text-white'>{data.name}</td>
      
            <td className='text-white'>{data.ram}</td>
          
            <td className='text-white'>{data.camera}</td>
            <td className='text-white'>{data.storage}</td>
            <td className='text-white'>{data.display}</td>
            <td className='text-white'>{data.price}</td>
           
            <td className='text-white'><Button variant="warning"  onClick={()=>{handleShow(data._id)}}><i class="fa-solid fa-pencil"></i></Button>{' '}</td>

            <td className='text-white'><Button variant="danger"><i class="fa-solid fa-trash"></i></Button>{' '}</td>

          </tr>
          ))}
         
          </>
        )}  
       
        
       <MyModal id={id} show={show} handleClose={handleClose}/>
        </tbody>
      </Table>

      
      <Link to="/addphones" className=' text-decoration-none text-white mx-auto mt-1'><h4 className='px-2 text-white'>Add </h4></Link>

     
    </div>
  )
}

export default Manage
