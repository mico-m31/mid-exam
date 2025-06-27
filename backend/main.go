package main

import (
	"database/sql"
	"fmt"
	"net/http"
	"encoding/json"
	"log"
	_ "github.com/lib/pq"
)
type DailyData struct {
	Id int `json:"id"`
	Date string `json:"date"`
	Income string `json:"income"`
	Expense string `json:"expense"`
	Category string `json:"category"`
	Note string `json:"note"`
}


func dbConnection(){
	const (
	host = "localhost"
	port = "5432"
	user = "postgres"
	password = "123"
	dbName = "user_data"
	)

	psqlInfo := fmt.Sprintf("host=%s port=%s user%s" + "password=%s dbname=%s",host,port,user,password,dbName)
	db,err := sql.Open("postgres", psqlInfo)
	if err != nil{
		panic(err)
	}
	defer db.Close()
}

func handleUserData(w http.ResponseWriter, r *http.Request){
	w.Header().Set("Access-Control-Allow-Origin", "http://localhost:5173")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

	if r.Method == "OPTIONS" {
		w.WriteHeader(http.StatusOK)
		return
	}
	 if r.Method != http.MethodPost {
                http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
                return
        }

	var data DailyData
	err := json.NewDecoder(r.Body).Decode(&data)
	if err != nil{
		http.Error(w, "error wak walawe", http.StatusBadRequest)
		return
	}

		json.NewEncoder(w).Encode(map[string]string{
		"message": "Data received",
	})
	fmt.Println("Received:", data.Date, data.Income, data.Expense, data.Category, data.Note)

}

func main(){
	http.HandleFunc("/api/userData", handleUserData)

	log.Fatal(http.ListenAndServe(":8080",nil))
}