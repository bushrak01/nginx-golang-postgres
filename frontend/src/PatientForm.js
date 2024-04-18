import React, { useState } from 'react';
import axios from 'axios';

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
            <h2>New Patient</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Name:
                    <input type="text" value={name} onChange={e => setName(e.target.value)} />
                </label>
                <label>
                    Age:
                    <input type="number" value={age} onChange={e => setAge(parseInt(e.target.value))} />
                </label>
                <label>
                    Address:
                    <input type="text" value={address} onChange={e => setAddress(e.target.value)} />
                </label>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default PatientForm;