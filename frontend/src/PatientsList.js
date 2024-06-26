import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Button from "react-bootstrap/Button";
import Modal from 'react-bootstrap/Modal';
import PatientForm from "./PatientForm";
import AddVisitForm from "./AddVisitForm";
import {Pagination} from "react-bootstrap";
import {Link} from "react-router-dom";


const Patients = [
    { id: 1, name: "Random Joe", age: 34, gender: "M", dob: "02/20/1991", address: "400 Boren Ave, Seattle, WA", contact: "7085719860", email: "test@gmail.com" },
    { id: 2, name: "Tom Dick", age: 32, gender: "F", dob: "06/03/1986", address: "333 Fairview Ave, Fremont, CA", contact: "7085719860", email: "trial@gmail.com" },
    { id: 1, name: "Random Joe", age: 34, gender: "M", dob: "02/20/1991", address: "400 Boren Ave, Seattle, WA", contact: "7085719860", email: "test@gmail.com" },
    { id: 2, name: "Tom Dick", age: 32, gender: "F", dob: "06/03/1986", address: "333 Fairview Ave, Fremont, CA", contact: "7085719860", email: "trial@gmail.com" },
    { id: 1, name: "Random Joe", age: 34, gender: "M", dob: "02/20/1991", address: "400 Boren Ave, Seattle, WA", contact: "7085719860", email: "test@gmail.com" },
    { id: 2, name: "Tom Dick", age: 32, gender: "F", dob: "06/03/1986", address: "333 Fairview Ave, Fremont, CA", contact: "7085719860", email: "trial@gmail.com" },
]

function HandleDeletePatient() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Button className="border-0" onClick={handleShow}>
                <i class="bi-trash"></i>
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete Patient</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to delete this?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={handleClose}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

function AddNewPatient() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <button type="button" className="btn btn-secondary" onClick={handleShow}>New Patient</button>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Register New Patient</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <PatientForm />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="primary" onClick={handleClose}>Register</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

function CheckInPatient() {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <button type="button" className="btn btn-secondary" onClick={handleShow}>Check-In</button>
            <Modal
                show={show}
                size="lg"
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
            >
                <Modal.Header closeButton>
                    <Modal.Title>Add New Visit</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <AddVisitForm />
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="primary">Create Visit</Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

function SearchBar() {
    function handleAddPatient() {
        console.log("Handling Add Patient")
    }

    function handleCheckin() {
        console.log("Handling Check-In")
    }

    return (
        <>
        <div className="row">
            <div className="col">
                <form>
                    <input type="text" className="form-control" placeholder="Search..." />
                </form>
            </div>
                <div className="col">
                    <div className="btn-group">
                        <AddNewPatient />
                        <CheckInPatient />
                    </div>
                </div>
            </div>
        </>
    );
}

const deletePatient = (patientId) => {
    console.log(patientId);
}

function PatientsList() {
    let active = 0;
    let items = [];
    for (let number = 1; number <= 5; number++) {
        items.push(
            <Pagination.Item key={number} active={number === active}>
                {number}
            </Pagination.Item>,
        );
    }

    const [users, setPatients] = useState([]);
    useEffect(() => {
        axios.get("http://localhost:80/patients")
            .then(response => {
                setPatients(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    return (
        <div class="container-fluid">
            <p className="h2 pt-5">Patients List</p>
            <SearchBar />
            <hr className='text-secondary'/>
            <table class="table table-striped">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Age</th>
                    <th>Contact</th>
                    <th>Address</th>
                </tr>
                </thead>
                <tbody>
                {Patients.map(patient => (
                    <tr key={patient.id}>
                        <td>{patient.id}</td>
                        <td>
                            <Link to="patient" className="nav-link text-primary" aria-current="page">
                                {patient.name}
                            </Link>
                        </td>
                        <td>{patient.age}</td>
                        <td>{patient.contact}</td>
                        <td>{patient.address}</td>
                        <Button className="border-0" onClick={HandleDeletePatient}>
                            <i class="bi-pencil"></i>
                        </Button>
                        <HandleDeletePatient />
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default PatientsList;
