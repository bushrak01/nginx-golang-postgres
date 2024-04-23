import React from 'react';
import PatientsList from './PatientsList';
import SideBar from "./SideBar";
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
    return (
        <BrowserRouter>
        <div className="d-flex">
            <div className="col-auto">
                <SideBar />
            </div>
            <Routes>
                <Route path="patients" element={<PatientsList />}></Route>
            </Routes>
        </div>
        </BrowserRouter>
    );
}

export default App;