package main

import (
	"log"
	"os"

	"gress-server/router"

	"github.com/joho/godotenv"
)

func main() {
	if err := godotenv.Load(); err != nil {
		log.Println("Error loading .env file")
	}

	// client, err := db.Connect()
	// if err != nil {
	// 	log.Fatal(err)
	// }
	// db.Create(client)

	r := router.Setup()
	log.Println("Server running on port " + os.Getenv("PORT"))
	r.Run(":" + os.Getenv("PORT"))
}
