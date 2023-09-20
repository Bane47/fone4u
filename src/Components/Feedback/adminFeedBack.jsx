import axios from 'axios';
import React, { useEffect, useState } from 'react';

const AdminFeedBack = () => {
  const [msg, setMsg] = useState([]);
  const [msgArr, setMsgArr] = useState([]);

  const getFeedback = () => {
    axios
      .get("http://localhost:3001/Get-Message")
      .then((response) => {
        setMsg(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getFeedback();
  }, []);

  return (
    <div>
      <div>
        <h1 className='mt-5 pt-5'>Feedbacks</h1>
        <div className='row'>
        {msg.length > 0 ? (
          msg.map((data, index) => (
            <div key={index} className="col-3 gy-5 mt-5">
              <div className="card h-100 shadow-sm">
                <div className="text-center">
                  <div className="img-hover-zoom img-hover-zoom--colorize"></div>
                </div>
                <div className="card-body">
                  <div className="clearfix mb-3"></div>
                  <div className="my-2 text-center"></div>
                  <div className="mb-3">
                    <p>{data.message}</p>
                    <p>~ {data.email}</p>
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No feedbacks</p>
        )}
        </div>
      </div>
    </div>
  );
};

export default AdminFeedBack;
