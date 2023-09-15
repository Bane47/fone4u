import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Button, Form, Modal, Table } from 'react-bootstrap';
import MyModal from '../Modal/MyModal';
import { Link } from 'react-router-dom';
import Pagination from 'react-bootstrap/Pagination';
import AddModel from '../Modal/AddModel';
import { ToastContainer, toast } from 'react-toastify';

const Manage = () => {
  const [phonesData, setPhonesData] = useState([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const [selectedPhone, setSelectedPhone] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const phonesPerPage = 3; // Number of phones to display per page
  const [showAddModel, setShowAddModel] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const handleCloseEditModal = () => setShowEditModal(false);
  const handleShowEditModal = (phone) => {
    setSelectedPhone(phone);
    setShowEditModal(true);
  };

  const handleDeleteModal = (id) => {
    setSelectedPhone(id);
    setDeleteModal(true);
  };

  const handleShowAddModel = () => {
    setShowAddModel(true)
  };

  const handleCloseAddModel = () => {
    setShowAddModel(false)
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:3001/delete/${selectedPhone}`);
      toast.success("Successfully deleted");
      setDeleteModal(false);
      fetchPhonesData();
    } catch (error) {
      toast.error("Error in deleting phone");
      console.error(error);
    }
  };

  const handleEdit = async (updatedPhone) => {
    try {
      await axios.put(`http://localhost:3001/edit/${updatedPhone._id}`, updatedPhone);
      toast.success("Successfully Updated");
      setShowEditModal(false);
      fetchPhonesData();
    } catch (error) {
      toast.error("Error in updating phone");
      console.error(error);
    }
  };

  const fetchPhonesData = async () => {
    try {
      const response = await axios.get('http://localhost:3001/getPhones');
      setPhonesData(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < Math.ceil(filteredPhonesData.length / phonesPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  useEffect(() => {
    fetchPhonesData();
  }, []);

  // Calculate the indexes for the current page
  const indexOfLastPhone = currentPage * phonesPerPage;
  const indexOfFirstPhone = indexOfLastPhone - phonesPerPage;
  const filteredPhonesData = phonesData.filter((phone) =>
    phone.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const currentPhones = filteredPhonesData.slice(indexOfFirstPhone, indexOfLastPhone);

  // Change the current page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className='mt-4'>
      <ToastContainer />

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

      <div className='row container '>
        <div className='col-lg-10 mb-2'>
          <h1 className='text-white'>Manage Phones</h1>
        </div>
        <div className='col-lg-2'>
          <Button variant="info" className='rounded-5' onClick={handleShowAddModel}>
            <i className="fa-solid fa-plus"></i>
          </Button>
          <AddModel show={showAddModel} handleClose={handleCloseAddModel} />
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
          {currentPhones.map((phone) => (
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

      <div className='row mt-5 pt-5'>
        <div className='col-12 d-flex justify-content-center '>
          <Pagination>
            <Pagination.Prev onClick={handlePreviousPage} />
            {Array.from({ length: Math.ceil(filteredPhonesData.length / phonesPerPage) }).map((_, index) => (
              <Pagination.Item key={index} active={index + 1 === currentPage} onClick={() => paginate(index + 1)}>
                <p className='text-black'> {index + 1}</p>
              </Pagination.Item>
            ))}
            <Pagination.Next onClick={handleNextPage} />
          </Pagination>
        </div>
      </div>

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
      )}
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
