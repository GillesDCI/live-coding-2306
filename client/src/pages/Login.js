import axios from './../util/axiosInstance';
import React from 'react'

export default function Login() {

  const handleSubmit = async(e) => {
     e.preventDefault();
     const formData = new FormData(e.target);
     //extract information from the form and store it into a data variable. 
     const data = {
         email:formData.get('email'), //name="email" see <input></input>
         password:formData.get('password')
     }

     try {

        const response = await axios.post('/api/users/login', data);
        console.log("response ", response);

         
     } catch (error) {
         
     }

  }

  return (
    <>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Email
          <input name="email" className="form-control" type="email" required={true} />
        </label>
        <label>
          Password
          <input name="password" className="form-control" type="password" required={true} />
        </label>

        <button className="btn btn-primary">Login</button>
      </form>
    </>
  )
}
