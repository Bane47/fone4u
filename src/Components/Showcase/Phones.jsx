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
        
        {phonesData.length > 0 && (
          <>
          {phonesData.map((data)=>(
        <Card className='col-lg-3 col-md-2 col-sm-1 mx-1'>
      <Card.Img variant="top" src="" />
      <Card.Body>
        <Card.Title>{data.name}</Card.Title>
       
      </Card.Body>
      
      <Card.Body>
      
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