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

type Response struct{
	Success bool `json:"success"`
	Message string `json:"message"`
}

var db *sql.DB
func dbInit(){
	const (
	host = "147.139.199.150"
	port = "5432"
	user = "postgres"
	password = "123"
	dbName = "user_data"
	)

	var err error
	psqlInfo := fmt.Sprintf("host=%s port=%s user=%s password=%s dbname=%s sslmode=disable",host,port,user,password,dbName)
	db,err = sql.Open("postgres", psqlInfo)
	if err != nil{
		log.Print("buadjingan error")
		panic(err)
	}
	log.Print(db.Ping())

	createTable := `
		CREATE TABLE IF NOT EXISTS daily_data(
		id SERIAL PRIMARY KEY ,
		date VARCHAR(100),
		income INT,
		expense INT,
		category VARCHAR(100),
		note VARCHAR(250)
	);`

	_,err= db.Exec(createTable)
	if err != nil{
		log.Print(err)
	}else{
		log.Print("succesfully create table")
	}


}

func handleFrontendData(w http.ResponseWriter, r *http.Request){
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


	fmt.Println("Received:", data.Date, data.Income, data.Expense, data.Category, data.Note)

	_, err = db.Exec("INSERT INTO daily_data(date,income,expense,category,note) VALUES ($1,$2,$3,$4,$5)",data.Date,data.Income,data.Expense,data.Category,data.Note)
	if err != nil{
		response := Response{
			Success: false,
			Message: "Data input error",
	}
		json.NewEncoder(w).Encode(response)
		log.Print("wasu error input tabel walawe")
		return
	}

	response := Response{
			Success: true,
			Message: "Data inputed",
	}
	json.NewEncoder(w).Encode(response)
}

func getData(w http.ResponseWriter, r *http.Request){
	w.Header().Set("Access-Control-Allow-Origin", "http://localhost:5173")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")

	dataUser,err := db.Query("SELECT id,date,income,expense,category,note FROM daily_data")
	if err != nil{
		panic(err)
	}
	defer dataUser.Close()


	var data []DailyData
	for dataUser.Next() {
		var d DailyData
		err := dataUser.Scan(&d.Id,&d.Date, &d.Income, &d.Expense, &d.Category, &d.Note)
		if err != nil {
			http.Error(w, "Error scanning data", http.StatusInternalServerError)
			return
		}
		data = append(data, d)
	}

	json.NewEncoder(w).Encode(data)
}

func handleDelete(w http.ResponseWriter, r *http.Request){
	w.Header().Set("Access-Control-Allow-Origin", "http://localhost:5173")
	w.Header().Set("Access-Control-Allow-Headers", "Content-Type")


}

func main(){
	dbInit()
	fmt.Print("Db init.......")
	
	http.HandleFunc("/api/userData", handleFrontendData)
	http.HandleFunc("/api/getData", getData)
	http.HandleFunc("/api/deleteData",handleDelete)


	log.Print("port in 8080")
	log.Fatal(http.ListenAndServe(":8080",nil))
}