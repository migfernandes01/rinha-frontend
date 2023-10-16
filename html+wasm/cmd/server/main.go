package main

import (
	"fmt"
	"log"
	"net/http"
	"os"

	"github.com/joho/godotenv"
)

func main() {
	// load env vars (if env is dev load from .env)
	env := os.Getenv("ENV")
	if env == "dev" {
		fmt.Println("Loading config from .env")
		err := godotenv.Load("../../.env")
		if err != nil {
			fmt.Println("Error loading config: ", err.Error())
			os.Exit(1)
		}
	}

	port := os.Getenv("PORT")

	log.Fatal(http.ListenAndServe("0.0.0.0:"+port, http.FileServer(http.Dir("../../assets"))))
}
