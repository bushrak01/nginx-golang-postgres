import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Button from "react-bootstrap/Button";

const Patients = [
    { id: 1, name: "Random Joe", age: 34, address: "400 Boren Ave, Seattle, WA", contact: "7085719860" },
    { id: 2, name: "Tom Dick", age: 32, address: "333 Fairview Ave, Fremont, CA", contact: "7085719860" },
    { id: 3, name: "Random Joe", age: 34, address: "400 Boren Ave, Seattle, WA", contact: "7085719860" },
    { id: 4, name: "Tom Dick", age: 32, address: "333 Fairview Ave, Fremont, CA", contact: "7085719860" },
    { id: 5, name: "Random Joe", age: 34, address: "400 Boren Ave, Seattle, WA", contact: "7085719860" },
    { id: 6, name: "Tom Dick", age: 32, address: "333 Fairview Ave, Fremont, CA", contact: "7085719860" },
    { id: 7, name: "Random Joe", age: 34, address: "400 Boren Ave, Seattle, WA", contact: "7085719860" },
    { id: 8, name: "Tom Dick", age: 32, address: "333 Fairview Ave, Fremont, CA", contact: "7085719860" },
]

function SearchBar() {
    return (
        <form>
            <div className="row">
                <div className="col">
                    <input type="text" className="form-control" placeholder="Search..." />
                </div>
                <div className="col">
                    <div className="btn-group">
                        <button type="button" className="btn btn-secondary">New Patient</button>
                        <button type="button" className="btn btn-secondary">Check-In</button>
                    </div>
                </div>
            </div>
        </form>
    );
}

const deletePatient = (patientId) => {
    console.log(patientId);
}

function PatientsList() {
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
                        <td>{patient.name}</td>
                        <td>{patient.age}</td>
                        <td>{patient.contact}</td>
                        <td>{patient.address}</td>
                        <Button className="border-0" onClick={() => deletePatient(patient.id)}>
                            <i class="bi-pencil"></i>
                        </Button>
                        <Button className="border-0" onClick={() => deletePatient(patient.id)}>
                            <i class="bi-trash"></i>
                        </Button>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
}

export default PatientsList;
