import React, { useEffect, useState } from "react";
import axios from "axios";
import '../Styles/feedback.css'
import { ToastContainer, toast } from "react-toastify";
import jwt_decode from 'jwt-decode'

const Feedback = () => {
  const [message, setMessage] = useState("");
  const [receivedMessage, setReceivedMessage] = useState([]);
  const user = localStorage.getItem('UserDetail');
  const token = localStorage.getItem("accessToken");
  const decryptedToken = jwt_decode(token)
  const emailToken = decryptedToken.email
  const sendMessage = (e) => {
    e.preventDefault();
    const data = { message };
    console.log(data,emailToken)
    if (message) {
      axios
        .post("http://localhost:3001/feedbackMessage", { message, email:emailToken })
        .then((res) => {
          console.log(res.data);
          setMessage("");
          toast.success("Thank you for your feedback!")
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      toast("Please type a message")
    }
  };

  useEffect(() => {
    console.log(message);
    axios
      .get("http://localhost:3001/Get-Message")
      .then((res) => {
        setReceivedMessage(res.data);
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);



  return (
    <div className="container mt-5 pt-5 text-start">
      <h2>Send a feed back to us</h2>
      <div className="mb-3">
        <label htmlFor="message" className="form-label">
          Type your thoughts here!
        </label>
        <textarea
          className="form-control w-25 "
          id="message"
          rows="4"
          placeholder="Type your suggestions"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        ></textarea>
      </div>
      <button className="feedbackButton " onClick={sendMessage}>
        Send
      </button>
      <ToastContainer />

    </div>
  );
};

export default Feedback;
