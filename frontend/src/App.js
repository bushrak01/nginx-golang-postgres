import React from 'react';
import PatientsList from './PatientsList';
import PatientForm from './PatientForm';

function App() {
    return (
        <div>
            <PatientForm />
            <PatientsList />
        </div>
    );
}

export default App;