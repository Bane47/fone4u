import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Card, Form, Pagination } from 'react-bootstrap'
import '../Styles/phones.css'

const Phones = () => {
  const [phonesData, setPhonesData] = useState([]);
  const phonesPerPage = 4;
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    axios
      .get("http://localhost:3001/getPhones")
      .then((res) => {
        setPhonesData(res.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [searchTerm]);

  const indexOfLastPhone = currentPage * phonesPerPage;
  const indexOfFirstPhone = indexOfLastPhone - phonesPerPage;

  // Filter phones based on the search term
  const filteredPhones = phonesData.filter((phone) =>
    phone.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const currentPhones = filteredPhones.slice(indexOfFirstPhone, indexOfLastPhone);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < Math.ceil(filteredPhones.length / phonesPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className='container mt-5 pt-3'>
      <div className='row justify-content-center'>
        <div className='row'>
          <div className='col-7 text-end'>
        <h1 className='text-black'>Phones</h1>
        </div>
        <div className='row col-sm-2 mx-2 ms-auto mb-2'>
          <div className='col-sm-2 mt-1'>
            <i className="fa-solid fa-magnifying-glass"></i>
          </div>
          <div className='col-sm-10'>
            <Form.Control
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              size="sm"
            />
          </div>
        </div>
        </div>
                
        {currentPhones.length > 0 && (
          <>
            {currentPhones.map((data) => (
              <div class="col-3 gy-5" key={data._id}>
              <div class="card h-100 shadow-sm">
                  <div class="text-center">


                      <div class="img-hover-zoom img-hover-zoom--colorize">
                          <img class="shadow showcase-image" src={data.image}
                              alt="Another Image zoom-on-hover effect"/>
                      </div>

                  </div>

                  <div class="card-body">
                      <div class="clearfix mb-3">

                      </div>


                      <div class="my-2 text-center">

                          <h1>{data.name}</h1>

                      </div>
                      <div class="mb-3">

                          <h2 class="text-uppercase text-center role">&#8377; {data.price}</h2>

                      </div>
                 

                  </div>
              </div>
          </div>
            
            ))}
          </>
        )}
      </div>

      <div className='row  fixed-bottom mb-5'>
        <div className='col-12 d-flex justify-content-center '>
          <Pagination>
            <Pagination.Prev onClick={handlePreviousPage} />
            {Array.from({ length: Math.ceil(filteredPhones.length / phonesPerPage) }).map((_, index) => (
              <Pagination.Item key={index} active={index + 1 === currentPage} onClick={() => paginate(index + 1)}>
                <p className='text-black'> {index + 1}</p>
              </Pagination.Item>
            ))}
            <Pagination.Next onClick={handleNextPage} />
          </Pagination>
        </div>
      </div>
    </div>
  );
}

export default Phones;
