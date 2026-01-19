package main

import (
	"log"
	"os"

	"gress-server/db"
	"gress-server/router"

	"github.com/joho/godotenv"
)

func main() {
	if err := godotenv.Load(); err != nil {
		log.Fatal("Error loading .env file")
	}

	_, err := db.Connect()
	if err != nil {
		log.Fatal(err)
	}

	r := router.Setup()

	r.Run(":" + os.Getenv("PORT"))
}
