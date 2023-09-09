import axios from 'axios';
import { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function MyModal(props) {
    const [formData,setFormData]=useState({
        name:'',
        processor:'',
        ram:'',
        battery:'',
        camera:'',
        storage:'',
        display:'',
        price:0
    });
    const [phonedata,setPhoneData] = useState([]);



    const updateFormData=(field,value)=>{
            setFormData({
                ...formData,
                [field]:value,
            });
    };

    const handleSubmit = (e) => {

        e.preventDefault();

        const {name,processor,ram,battery,camera,storage,display,price} = formData;
        axios.put(`http://localhost:3001/edit/${props.id}`, { name,processor,ram,battery,camera,storage,display,price })
            .then(result => {
                
                // console.log(result);
                
            })
            .catch((err) => { console.log(err) })

    }
const [foundItem,setFoundItem] = useState();
const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFoundItem({ ...foundItem, [name]: value });
  };
const handleNameChange = (e) => {
    const newName = e.target.value;
    // Update the name property in the foundItem
    setFoundItem((prevItem) => ({
        ...prevItem,
        name: newName,
    }));
};
    useEffect(() => {
        axios.get('http://localhost:3001/getPhones')
          .then((res) => {
             setFoundItem(res.data.find((item) => item._id === props.id));
      
            if (foundItem) {
              console.log('Found item:', foundItem);
            } else {
              console.log(`Item with _id ${props.id} not found.`);
            }
          })
          .catch((error) => {
            console.error('Error:', error);
          });
      }, []); 


  return (
    <>
    {foundItem && (
    <Modal show={props.show} onHide={props.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update Phone Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <Form onSubmit={handleSubmit}>
            {/* {console.log(foundItem.name)} */}
                    <Form.Group controlId="exampleForm.ControlInput1">
                        <div className='row'>
                            <label  className='col-lg-6 col-md-6 col-sm-6 mt-2'>Phone name</label>
                            {console.log(foundItem.name)}
                            <div className="col-lg-5 col-md-5 col-sm-5 m-2">
                                <Form.Control type="text" name="name" placeholder="Enter the phone name" value={foundItem.name} onChange={handleInputChange} />
                            </div>
                        </div>
                    </Form.Group>
                    <Form.Group controlId="exampleForm.ControlInput1">
                        <div className='row'>
                            <label  className='col-lg-6 col-md-6 col-sm-6 mt-2'>Image</label>
                            <div className="col-lg-5 col-md-5 col-sm-5 m-2">
                                <Form.Control type="file" accept='.jpeg,.png,.jpg,.webp' name="processor" placeholder="Enter the processor name"  />
                            </div>
                        </div>
                    </Form.Group>
                    <Form.Group controlId="exampleForm.ControlInput1">
                        <div className='row'>
                            <label  className='col-lg-6 col-md-6 col-sm-6 mt-2'>RAM</label>
                            <div className="col-lg-5 col-md-5 col-sm-5 m-2">
                                <Form.Control type="text" placeholder="Enter the RAM" name="ram" value={foundItem.ram} onChange={(e)=>{handleInputChange}} />
                            </div>
                        </div>
                    </Form.Group>
                    <Form.Group controlId="exampleForm.ControlInput1">
                        <div className='row'>
                            <label  className='col-lg-6 col-md-6 col-sm-6 mt-2'>Battery Capacity</label>
                            <div className="col-lg-5 col-md-5 col-sm-5 m-2">
                                <Form.Control type="text" placeholder="Enter the Battery Capacity" name="battery" value={foundItem.battery} onChange={(e)=>{handleInputChange}} />
                            </div>
                        </div>
                    </Form.Group>
                    <Form.Group controlId="exampleForm.ControlInput1">
                        <div className='row'>
                            <label  className='col-lg-6 col-md-6 col-sm-6 mt-2'>Camera</label>
                            <div className="col-lg-5 col-md-5 col-sm-5 m-2">
                                <Form.Control type="text" placeholder="Camera" value={foundItem.camera} name="camera" onChange={(e)=>{handleInputChange}} />
                            </div>
                        </div>
                    </Form.Group>
                    <Form.Group controlId="exampleForm.ControlInput1">
                        <div className='row'>
                            <label  className='col-lg-6 col-md-6 col-sm-6 mt-2'>Storage</label>
                            <div className="col-lg-5 col-md-5 col-sm-5 m-2">
                                <Form.Control type="text" placeholder="Storage" value={foundItem.storage} name="storage" onChange={(e)=>{handleInputChange}} />
                            </div>
                        </div>
                    </Form.Group>
                    <Form.Group controlId="exampleForm.ControlInput1">
                        <div className='row'>
                            <label  className='col-lg-6 col-md-6 col-sm-6 mt-2'>Display</label>
                            <div className="col-lg-5 col-md-5 col-sm-5 m-2">
                                <Form.Control type="text" placeholder="Display" value={foundItem.display} name="display" onChange={(e)=>{handleInputChange}} />
                            </div>
                        </div>
                    </Form.Group>
                    <Form.Group controlId="exampleForm.ControlInput1">
                        <div className='row'>
                            <label  className='col-lg-6 col-md-6 col-sm-6 mt-2'>Price</label>
                            <div className="col-lg-5 col-md-5 col-sm-5 m-2">
                                <Form.Control type="text" placeholder="Price" value={foundItem.price} name="price" onChange={(e)=>{handleInputChange}} />
                            </div>
                        </div>
                    </Form.Group>
                


                    <button className='btn btn-primary mt-4 mb-5' type='submit'>Submit!</button>
                </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={props.handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={props.handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      )}
      </>
  );
}

export default MyModal;