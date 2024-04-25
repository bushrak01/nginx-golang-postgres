import React, { useState } from 'react';
import axios from 'axios';
import Form from "react-bootstrap/Form";
import {Col, Row} from "react-bootstrap";

function PatientForm() {
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
            <Form.Group className="mb-3" controlId="formGridName">
                <Form.Label>Name</Form.Label>
                <Form.Control placeholder="Full Name" />
            </Form.Group>
            <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridGender">
                    <Form.Label>Gender</Form.Label>
                    <Form.Select>
                        <option>Select</option>
                        <option value="M">Male</option>
                        <option value="F">Female</option>
                        <option value="O">Other</option>
                    </Form.Select>
                </Form.Group>

                <Form.Group as={Col} controlId="formGridDoB">
                    <Form.Label>Date of Birth</Form.Label>
                    <Form.Control type="date" placeholder="Date of Birth" />
                </Form.Group>
            </Row>
            <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridContact">
                    <Form.Label>Contact Number</Form.Label>
                    <Form.Control placeholder="Contact" />
                </Form.Group>
                <Form.Group as={Col} controlId="formGridDoB">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" placeholder="Email" />
                </Form.Group>
            </Row>
            <Form.Group className="mb-3" controlId="formGridAddress1">
                <Form.Label>Address</Form.Label>
                <Form.Control placeholder="1234 Main St" />
            </Form.Group>
            <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridCity">
                    <Form.Label>City</Form.Label>
                    <Form.Control />
                </Form.Group>
                <Form.Group as={Col} controlId="formGridState">
                    <Form.Label>State</Form.Label>
                    <Form.Select>
                        <option>Select</option>
                        <option>Andhra Pradesh</option>
                        <option>Arunachal Pradesh</option>
                        <option>Assam</option>
                        <option>Bihar</option>
                        <option>Chhattisgarh</option>
                        <option>Goa</option>
                        <option>Gujarat</option>
                        <option>Haryana</option>
                        <option>Himachal Pradesh</option>
                        <option>Jharkhand</option>
                        <option>Karnataka</option>
                        <option>Kerala</option>
                        <option>Madhya Pradesh</option>
                        <option>Maharashtra</option>
                        <option>Manipur</option>
                        <option>Meghalaya</option>
                        <option>Mizoram</option>
                        <option>Nagaland</option>
                        <option>Odisha</option>
                        <option>Punjab</option>
                        <option>Rajasthan</option>
                        <option>Sikkim</option>
                        <option>Tamil Nadu</option>
                        <option>Telangana</option>
                        <option>Tripura</option>
                        <option>Uttar Pradesh</option>
                        <option>Uttarakhand</option>
                        <option>West Bengal</option>
                    </Form.Select>
                </Form.Group>
                <Form.Group as={Col} controlId="formGridZip">
                    <Form.Label>Zip</Form.Label>
                    <Form.Control />
                </Form.Group>
            </Row>
            <Form.Group className="mb-3" id="formGridCheckbox">
                <Form.Check type="checkbox" label="Check-In" disabled />
            </Form.Group>
        </div>
    );
}

export default PatientForm;