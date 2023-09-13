import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Modal, Table } from 'react-bootstrap';
import MyModal from '../Modal/MyModal';
import { Link } from 'react-router-dom';
import Pagination from 'react-bootstrap/Pagination';


const Manage = () => {
  const [phonesData, setPhonesData] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedPhone, setSelectedPhone] = useState(null);

  //for pagination
 const [num,setNumber] = useState();

let active = 2
  let items = [];
for (let number = 1; number <= num/5; number++) {
  items.push(
    <Pagination.Item key={number} active={number === active}>
      {number}
    </Pagination.Item>,
  );
}

  const handleCloseEditModal = () => setShowEditModal(false);
  const handleShowEditModal = (phone) => {
    setSelectedPhone(phone);
    setShowEditModal(true);
  };

  const handleDeleteModal = (id) => {
    setSelectedPhone(id); // Store the selected phone ID in the state
    setDeleteModal(true);
  };

  const handleDelete = async () => { // No need to pass the ID here
    try {
      await axios.delete(`http://localhost:3001/delete/${selectedPhone}`);
      alert('Successfully deleted');
      setDeleteModal(false);
      fetchPhonesData();
    } catch (error) {
      console.error(error);
    }
  };

  const handleEdit = async (updatedPhone) => {
    try {
      await axios.put(`http://localhost:3001/edit/${updatedPhone._id}`, updatedPhone);
      alert('Successfully updated');
      setShowEditModal(false);
      fetchPhonesData();
    } catch (error) {
      console.error(error);
    }
  };

  const fetchPhonesData = async () => {
    try {
      const response = await axios.get('http://localhost:3001/getPhones');
      setPhonesData(response.data);
      setNumber(response.data.length)
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchPhonesData();
  }, []);

  return (
    <div>
      <div className='row container'>
        <div className='col-lg-10 mb-2'>
      <h1 className='text-white'>Manage Phones</h1>
      </div>
      <div className='col-lg-2'>
       <Link to="/addphones" className=' text-decoration-none text-white mx-auto mt-1'><Button variant="info" className='rounded-5'> <i class="fa-solid fa-plus"></i>
                </Button></Link>
       </div>
       </div>
      <Table responsive="sm">
        <thead>
          <tr>
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
          
          {phonesData.map((phone) => (
            <tr key={phone._id}>
              <td className='text-white'>{phone.name}</td>
              <td className='text-white'>{phone.ram}</td>
              <td className='text-white'>{phone.camera}</td>
              <td className='text-white'>{phone.storage}</td>
              <td className='text-white'>{phone.display}</td>
              <td className='text-white'>{phone.price}</td>
              <td>
                <Button variant="warning" onClick={() => handleShowEditModal(phone)}>
                  Edit
                </Button>
              </td>
              <td>
                <Button variant="danger" onClick={() => handleDeleteModal(phone._id)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      
      {showEditModal && selectedPhone && (
        <MyModal
          show={showEditModal}
          handleClose={handleCloseEditModal}
          handleEdit={handleEdit}
          phone={selectedPhone}
        />
      )}

      {deleteModal && selectedPhone && (
        <DeleteModal
          show={deleteModal}
          handleClose={() => setDeleteModal(false)}
          handleDelete={handleDelete}
        />
      )}<div className='row mt-5 pt-5'>
        <div className='col-12 d-flex justify-content-center'> 
      <Pagination className=''>{items}</Pagination>
      </div>
      </div>
    </div>
  );
};

const DeleteModal = ({ show, handleClose, handleDelete }) => (
  <Modal show={show} onHide={handleClose}>
    <Modal.Header closeButton>
      <Modal.Title>Confirm Deletion</Modal.Title>
    </Modal.Header>
    <Modal.Body>Are you sure you want to delete this phone record?</Modal.Body>
    <Modal.Footer>
      <Button variant="secondary" onClick={handleClose}>
        Close
      </Button>
      <Button variant="danger" onClick={handleDelete}>
        Delete
      </Button>
    </Modal.Footer>
  </Modal>
);

export default Manage;
