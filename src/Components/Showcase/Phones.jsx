import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Card, ListGroup, Pagination } from 'react-bootstrap'

const Phones = () => {
const [phonesData,setPhonesData] = useState([]);
const phonesPerPage = 5;
const [currentPage,setCurrentPage] = useState(1);
  useEffect(()=>{
    axios.get("http://localhost:3001/getPhones")
    .then((res)=>{
        setPhonesData(res.data)
    })
  },[])
  const indexOfLastPhone = currentPage * phonesPerPage;
  const indexOfFirstPhone = indexOfLastPhone - phonesPerPage;
  const currentPhones = phonesData.slice(indexOfFirstPhone,indexOfLastPhone)

  const paginate = (pageNumber)=>setCurrentPage(pageNumber);

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  
  const handleNextPage = () => {
    if (currentPage < Math.ceil(phonesData.length / phonesPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };
  return (
    <div className='container mt-5'>
      <div className='row justify-content-center'>
        <h1 className='text-white'>Phones</h1>
        
        <>
        {currentPhones.length > 0 && (
          <>
          {currentPhones.map((data)=>(
        <Card key={data._id} className='col-md-2 col-sm-3 col-8 mx-5 my-5'>
      
      <Card.Img variant="top"  src="https://images.unsplash.com/photo-1616348436168-de43ad0db179?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGlwaG9uZXxlbnwwfHwwfHx8MA%3D%3D&w=1000&q=80" />
      
      <Card.Body>
        
        <Card.Title>{data.name}</Card.Title>

        <span>Price : {data.price}</span>

      </Card.Body>
      
    </Card>
    ))}
    </>
    )}
    </>

    <div className='row mt-5 pt-5'>
  <div className='col-12 d-flex justify-content-center '>
    <Pagination>
      <Pagination.Prev onClick={handlePreviousPage} />
      {Array.from({ length: Math.ceil(phonesData.length / phonesPerPage) }).map((_, index) => (
        <Pagination.Item key={index} active={index + 1 === currentPage} onClick={() => paginate(index + 1)}>
          <p className='text-black'> {index + 1}</p>
        </Pagination.Item>
      ))}
      <Pagination.Next onClick={handleNextPage} />
    </Pagination>
  </div>
</div>
    </div>
    </div>
  )
}

export default Phones