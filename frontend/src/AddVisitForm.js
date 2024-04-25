import React, { useState } from 'react';
import axios from 'axios';
import Form from "react-bootstrap/Form";
import {Col, Row} from "react-bootstrap";

function AddVisitForm() {
    const [address, setAddress] = useState('');
    const [name, setName] = useState('');
    const [age, setAge] = useState(0);

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log(name);
        console.log(age);
        console.log(address);
        axios.post("http://localhost:80/patients", {
            name: name,
            age: age,
            address: address
        })
            .then(response => {
                console.log(response);
            })
            .catch(error => {
                console.log(error);
            });
    };

    return (
        <div>
            <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridPatientName">
                    <Form.Label>Name</Form.Label>
                    <Form.Control placeholder="Patient" />
                </Form.Group>
                <Form.Group as={Col} controlId="formGridId">
                    <Form.Label>ID</Form.Label>
                    <Form.Control placeholder="ID" />
                </Form.Group>
            </Row>
            <hr className='text-secondary'/>
            <h5>Visit Details</h5>
            <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridCategory">
                    <Form.Label>Category</Form.Label>
                    <Form.Select>
                        <option>Select</option>
                        <option>Office Visit</option>
                        <option>Lab Services</option>
                        <option>Physical Therapy</option>
                    </Form.Select>
                </Form.Group>
                <Form.Group as={Col} controlId="formGridType">
                    <Form.Label>Type</Form.Label>
                    <Form.Select>
                        <option>Select</option>
                        <option>Outpatient</option>
                        <option>Inpatient</option>
                        <option>Emergency</option>
                        <option>Virtual</option>
                        <option>Out-In-Field</option>
                    </Form.Select>
                </Form.Group>
                <Form.Group as={Col} controlId="formGridDoctor">
                    <Form.Label>Doctor</Form.Label>
                    <Form.Select>
                        <option>Select</option>
                        <option>Dr. Farhan</option>
                        <option>Dr. Khursheed</option>
                        <option>Dr. Praveen</option>
                        <option>...</option>
                    </Form.Select>
                </Form.Group>
                <Form.Group as={Col} controlId="formGridReferral">
                    <Form.Label>Referral From</Form.Label>
                    <Form.Control placeholder="Referral" />
                </Form.Group>
            </Row>
            <Row className="mb-3">
                <Form.Group>
                    <Form.Label>Reason For Visit</Form.Label>
                    <Form.Control as="textarea" rows={3} />
                </Form.Group>
            </Row>
            <hr className='text-secondary'/>
            <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridProvider">
                    <Form.Label>Provider</Form.Label>
                    <Form.Select>
                        <option>Select</option>
                        <option>...</option>
                    </Form.Select>
                </Form.Group>
                <Form.Group as={Col} controlId="formGridPlanName">
                    <Form.Label>Plan Name</Form.Label>
                    <Form.Control placeholder="Plan Name" />
                </Form.Group>
                <Form.Group as={Col} controlId="formGridPolicyNumber">
                    <Form.Label>Policy Number</Form.Label>
                    <Form.Control placeholder="Policy Number" />
                </Form.Group>
            </Row>
        </div>
    );
}

export default AddVisitForm;