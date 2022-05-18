import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
      <>
   
    <div className="d-flex flex-column flex-md-row align-items-center justify-content-between
p-3 px-md-4 mb-3 bg-white border-bottom shadow-sm">
  <h5 className="my-0 mr-md-auto font-weight-normal">Orders App</h5>
  <nav className="my-2 my-md-0 me-md-3">
  
    <Link className="p-2 text-dark" to="/">Home</Link>
    <Link  className="p-2 text-dark" to="/profile">Profile</Link>
    <Link className="btn btn-outline-info me-md-2" to="/login">Login</Link>
    <Link  className="btn btn-outline-primary" to="/logout">Logout</Link>
   </nav>
  </div>

 
    </>
  )
}
