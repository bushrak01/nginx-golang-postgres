package main

import (
	"context"
	"encoding/json"
	"fmt"
	"github.com/gorilla/mux"
	"github.com/jackc/pgx/v4"
	"io/ioutil"
	"log"
	"net/http"
)

var db *pgx.Conn

func initDB() {
	bin, err := ioutil.ReadFile("/run/secrets/db-password")
	if err != nil {
		log.Fatal("Failed to start db")
	}
	conn, err := pgx.Connect(context.Background(), fmt.Sprintf("postgresql://postgres:%s@db:5432/example?sslmode=disable", string(bin)))
	if err != nil {
		log.Fatalf("Unable to connect to database: %v\n", err)
	}
	db = conn
}

// Define a Patient struct
type Patient struct {
	ID      int    `json:"id,omitempty"`
	Name    string `json:"name,omitempty"`
	Age     int    `json:"age,omitempty"`
	Address string `json:"address,omitempty"`
}

func CORS(next http.HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		w.Header().Add("Access-Control-Allow-Origin", "*")
		w.Header().Add("Access-Control-Allow-Credentials", "true")
		w.Header().Add("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")
		w.Header().Add("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")

		if r.Method == "OPTIONS" {
			http.Error(w, "No Content", http.StatusNoContent)
			return
		}

		next(w, r)
	}
}

// Handle GET requests to /patients to get all patients
func GetPatients(w http.ResponseWriter, r *http.Request) {
	rows, err := db.Query(context.Background(), "SELECT * FROM patients")
	if err != nil {
		log.Printf("Error querying patients: %v\n", err)
		http.Error(w, "Internal server error", http.StatusInternalServerError)
		return
	}
	defer rows.Close()

	var patients []Patient
	for rows.Next() {
		var patient Patient
		err := rows.Scan(&patient.ID, &patient.Name, &patient.Age, &patient.Address)
		if err != nil {
			log.Printf("Error scanning patient row: %v\n", err)
			http.Error(w, "Internal server error", http.StatusInternalServerError)
			return
		}
		patients = append(patients, patient)
	}

	json.NewEncoder(w).Encode(patients)
}

// Handle GET requests to /patients/{id} to get a specific patient
func GetPatient(w http.ResponseWriter, r *http.Request) {
	params := mux.Vars(r)
	id := params["id"]

	var patient Patient
	err := db.QueryRow(context.Background(), "SELECT id, name, age, address FROM patients WHERE id = $1", id).Scan(&patient.ID, &patient.Name, &patient.Age, &patient.Address)
	if err != nil {
		log.Printf("Error fetching patient: %v\n", err)
		http.Error(w, "Internal server error", http.StatusInternalServerError)
		return
	}

	json.NewEncoder(w).Encode(patient)
}

// Handle POST requests to add a new patient
func CreatePatient(w http.ResponseWriter, r *http.Request) {
	var patient Patient
	err := json.NewDecoder(r.Body).Decode(&patient)
	if err != nil {
		log.Printf("Error decoding request body: %v\n", err)
		http.Error(w, "Bad request", http.StatusBadRequest)
		return
	}

	log.Printf("Request Body: %+v", patient)

	_, err = db.Exec(context.Background(), "INSERT INTO patients (name, age, address) VALUES ($1, $2, $3)", patient.Name, patient.Age, patient.Address)
	if err != nil {
		log.Printf("Error inserting patient: %v\n", err)
		http.Error(w, "Internal server error", http.StatusInternalServerError)
		return
	}

	json.NewEncoder(w).Encode(patient)
}

// Handle PUT requests to update an existing patient
func UpdatePatient(w http.ResponseWriter, r *http.Request) {
	params := mux.Vars(r)
	id := params["id"]

	var patient Patient
	err := json.NewDecoder(r.Body).Decode(&patient)
	if err != nil {
		log.Printf("Error decoding request body: %v\n", err)
		http.Error(w, "Bad request", http.StatusBadRequest)
		return
	}

	_, err = db.Exec(context.Background(), "UPDATE patients SET name=$1, age=$2, address=$3 WHERE id=$4", patient.Name, patient.Age, patient.Address, id)
	if err != nil {
		log.Printf("Error updating patient: %v\n", err)
		http.Error(w, "Internal server error", http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusOK)
}

// Handle DELETE requests to delete a patient
func DeletePatient(w http.ResponseWriter, r *http.Request) {
	params := mux.Vars(r)
	id := params["id"]

	_, err := db.Exec(context.Background(), "DELETE FROM patients WHERE id = $1", id)
	if err != nil {
		log.Printf("Error deleting patient: %v\n", err)
		http.Error(w, "Internal server error", http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusOK)
}

func main() {
	// Initialize the router
	router := mux.NewRouter()
	initDB()

	log.Print("Prepare db...")
	if err := prepare(); err != nil {
		log.Fatal(err)
	}

	// Define API routes
	router.HandleFunc("/patients", CORS(GetPatients)).Methods("GET")
	router.HandleFunc("/patients", CORS(GetPatients)).Methods("OPTIONS")
	router.HandleFunc("/patients/{id}", CORS(GetPatient)).Methods("GET")
	router.HandleFunc("/patients", CORS(CreatePatient)).Methods("POST")
	router.HandleFunc("/patients/{id}", CORS(UpdatePatient)).Methods("PUT")
	router.HandleFunc("/patients/{id}", CORS(DeletePatient)).Methods("DELETE")

	// Start the server
	log.Fatal(http.ListenAndServe(":8000", router))
}

func prepare() error {
	if _, err := db.Exec(context.Background(), "DROP TABLE IF EXISTS patients"); err != nil {
		return err
	}

	if _, err := db.Exec(context.Background(), "CREATE TABLE patients (id SERIAL PRIMARY KEY, name VARCHAR(100), age INT, address TEXT);"); err != nil {
		return err
	}
	if _, err := db.Exec(context.Background(), "INSERT INTO patients (name, age, address) VALUES ('John Doe', 30, '123 Main St');"); err != nil {
		return err
	}
	return nil
}
