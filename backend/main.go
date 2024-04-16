package main

import (
	"encoding/json"
	"log"
	"net/http"

	"github.com/gorilla/mux"
)

// Define a Patient struct
type Patient struct {
	ID      string `json:"id,omitempty"`
	Name    string `json:"name,omitempty"`
	Age     int    `json:"age,omitempty"`
	Address string `json:"address,omitempty"`
}

var patients []Patient

// Handle GET requests to /patients to get all patients
func GetPatients(w http.ResponseWriter, r *http.Request) {
	json.NewEncoder(w).Encode(patients)
}

// Handle GET requests to /patients/{id} to get a specific patient
func GetPatient(w http.ResponseWriter, r *http.Request) {
	params := mux.Vars(r)
	for _, item := range patients {
		if item.ID == params["id"] {
			json.NewEncoder(w).Encode(item)
			return
		}
	}
	json.NewEncoder(w).Encode(&Patient{})
}

// Handle POST requests to add a new patient
func CreatePatient(w http.ResponseWriter, r *http.Request) {
	var patient Patient
	_ = json.NewDecoder(r.Body).Decode(&patient)
	patients = append(patients, patient)
	json.NewEncoder(w).Encode(patient)
}

// Handle PUT requests to update an existing patient
func UpdatePatient(w http.ResponseWriter, r *http.Request) {
	params := mux.Vars(r)
	for index, item := range patients {
		if item.ID == params["id"] {
			patients = append(patients[:index], patients[index+1:]...)
			var patient Patient
			_ = json.NewDecoder(r.Body).Decode(&patient)
			patient.ID = params["id"]
			patients = append(patients, patient)
			json.NewEncoder(w).Encode(patient)
			return
		}
	}
	json.NewEncoder(w).Encode(patients)
}

// Handle DELETE requests to delete a patient
func DeletePatient(w http.ResponseWriter, r *http.Request) {
	params := mux.Vars(r)
	for index, item := range patients {
		if item.ID == params["id"] {
			patients = append(patients[:index], patients[index+1:]...)
			break
		}
	}
	json.NewEncoder(w).Encode(patients)
}

func main() {
	// Initialize the router
	router := mux.NewRouter()

	// Mock data - replace this with a database
	patients = append(patients, Patient{ID: "1", Name: "John Doe", Age: 30, Address: "123 Main St"})
	patients = append(patients, Patient{ID: "2", Name: "Jane Smith", Age: 25, Address: "456 Elm St"})

	// Define API routes
	router.HandleFunc("/patients", GetPatients).Methods("GET")
	router.HandleFunc("/patients/{id}", GetPatient).Methods("GET")
	router.HandleFunc("/patients", CreatePatient).Methods("POST")
	router.HandleFunc("/patients/{id}", UpdatePatient).Methods("PUT")
	router.HandleFunc("/patients/{id}", DeletePatient).Methods("DELETE")

	// Start the server
	log.Fatal(http.ListenAndServe(":8000", router))
}
