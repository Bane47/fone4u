import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Card, ListGroup } from 'react-bootstrap'

const Phones = () => {
const [phonesData,setPhonesData] = useState([]);
  useEffect(()=>{
    axios.get("http://localhost:3001/getPhones")
    .then((res)=>{
        setPhonesData(res.data)
    })
  },[])
  return (
    <div className='container mt-5'>
      <div className='row'>
        <h1 className='text-white'>Phones</h1>
        
        {phonesData.length > 0 && (
          <>
          {phonesData.map((data)=>(
        <Card className='col-lg-3 col-md-2 col-sm-1 mx-1'>
      <Card.Img variant="top"  src="https://images.unsplash.com/photo-1616348436168-de43ad0db179?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGlwaG9uZXxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80" />
      <Card.Body>
        <Card.Title>{data.name}</Card.Title>
        <span>Price : {data.price}</span>

      </Card.Body>
      
      
    </Card>
    ))}
    </>
    )}
    </div>
    </div>
  )
}

export default Phones