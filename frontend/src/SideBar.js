import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
import {Link} from "react-router-dom";

function SideBar() {
    return (
        // <div className='container-fluid'>
        //      <div className='row'>
                 <div className='bg-dark min-vh-100 d-flex justify-content-between flex-column'>
                     <div>
                         <a className='text-decoration-none text-white d-none d-sm-inline d-flex align-items-center ms-3 mt-4'>
                             <span className='mt-2 badge fs-6'>Imperia Neurosciences</span>
                         </a>
                         <hr className='text-secondary'/>
                         <ul className="nav nav-pills flex-column">
                             <li className="nav-item text-white fs-4 my-1">
                                 <a href="#" className="nav-link text-white fs-5" aria-current="page">
                                     <i className='bi bi-speedometer2'></i>
                                     <span className='ms-3 d-none d-sm-inline'>Dashboard</span>
                                 </a>
                             </li>
                             <li className="nav-item text-white fs-4 my-1">
                                 <Link to="patients" className="nav-link text-white fs-5" aria-current="page">
                                     <i className='bi bi-table'></i>
                                     <span className='ms-3 d-none d-sm-inline'>Patients</span>
                                 </Link>
                             </li>
                             <li className="nav-item text-white fs-4 my-1">
                                 <a href="#" className="nav-link text-white fs-5" aria-current="page">
                                     <i className='bi bi-person'></i>
                                     <span className='ms-3 d-none d-sm-inline'>Doctors</span>
                                 </a>
                             </li>
                             <li className="nav-item text-white fs-4 my-1">
                                 <a href="#" className="nav-link text-white fs-5" aria-current="page">
                                     <i className='bi bi-calendar'></i>
                                     <span className='ms-3 d-none d-sm-inline'>Appointments</span>
                                 </a>
                             </li>
                             <li className="nav-item text-white fs-4 my-1">
                                 <a href="#" className="nav-link text-white fs-5" aria-current="page">
                                     <i className='bi bi-cash-coin'></i>
                                     <span className='ms-3 d-none d-sm-inline'>Billing</span>
                                 </a>
                             </li>
                             <li className="nav-item text-white fs-4 my-1">
                                 <a href="#" className="nav-link text-white fs-5" aria-current="page">
                                     <i className='bi bi-bell'></i>
                                     <span className='ms-3 d-none d-sm-inline'>Notifications</span>
                                 </a>
                             </li>
                         </ul>
                     </div>
                 </div>
        //      </div>
        // </div>
    )
}

export default SideBar;