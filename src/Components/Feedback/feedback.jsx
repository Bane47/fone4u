// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import '../Styles/feedback.css'
// import { toast } from "react-toastify";

// const Feedback = () => {
//   const [msg, setMsg] = useState("");
//   const [receivedMessage, setReceivedMessage] = useState([]);
//   const user = localStorage.getItem("UserDetail");
// const userEmail  = user.email

//   const sendMessage = (e) => {
//     e.preventDefault();
//     if(msg){  
// console.log(msg)
//    const data={msg,userEmail}

//     axios
//       .post("http://localhost:3001/feedback", data)
//       .then((res) => {
//         console.log(res.data);
//         setMsg("");
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//     }else{
//         toast("Please type some feedback")
//     }
//   };

//   useEffect(() => {
//     axios
//       .get("http://localhost:3001/getFeed")
//       .then((res) => {
//         setReceivedMessage(res.data);
//         console.log("This is the result",res);
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   }, []);

// const deleteMessage=(id)=>{
//   axios.delete(`http://localhost:3001/deletefeed/${id}`)
//   .then((response)=>{
//     const updatedMessages=receivedMessage.filter((item)=>item._id !== id)
//     setReceivedMessage(updatedMessages)
//     console.log("Message deleted successfully!");
//   })
// }

//   return (
//     <div className="container mt-5 pt-5">
//       <h2>Send a feed back to us</h2>
//       <div className="mb-3">
//         <label htmlFor="message" className="form-label">
//           Type your thoughts here!
//         </label>
//         <textarea
//           className="form-control w-25 mx-auto"
//           id="message"
//           rows="4"
//           placeholder="Enter your message"
//           value={msg}
//           onChange={(e) => setMsg(e.target.value)}
//         ></textarea>
//       </div>
//       <button className="feedbackButton px-5 py-2 rounded-0" onClick={sendMessage}>
//         Send
//       </button>

//       {receivedMessage.length > 0 && (
//         <div className="mt-4">
//           <h3>Feedback:</h3>
//           {receivedMessage.map((item) => (
//             <div key={item._id} className="alert alert-info" role="alert">
//               {console.log(receivedMessage)}
              
//               {/* <button className="btn btn-danger btn-sm float-end" onClick={()=>deleteMessage(item._id)}>
//                 Delete
//               </button> */}
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default Feedback;

import React, { useEffect, useState } from "react";
import axios from "axios";
import '../Styles/feedback.css'

const Feedback = () => {
  const [message, setMessage] = useState("");
  const [receivedMessage, setReceivedMessage] = useState([]);
  const user = localStorage.getItem('UserDetail')
  const sendMessage = (e) => {
    e.preventDefault();
    const data = { message };

    axios
      .post("http://localhost:3001/feedbackMessage", data)
      .then((res) => {
        console.log(res.data);
        setMessage("");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
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

   
    </div>
  );
};

export default Feedback;
