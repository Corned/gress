package db

import (
	"context"
	"fmt"
	"log"
	"time"

	"go.mongodb.org/mongo-driver/v2/mongo"
)



func Create(client *mongo.Client) {
	fmt.Println("Creating entry...")

	// "gress" is the database name, "entries" is the collection name
	collection := client.Database("gress").Collection("scrimBlocks")

	newEntry := ScrimBlock{
		Team1: "Team 1",
		Team2: "Team 2",
		Date: time.Now(),
		Entries: []Entry{
			{
				MapName: "Shambali Monestary",
				Team1Ban: "Brigitte",
				Team2Ban: "Sigma",
				Team1Score: 3,
				Team2Score: 1,
				Code: "M0NG0",
				WinningTeam: 1,
			},
		},
	}

	// Create a context with a timeout for the operation
	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	// Insert the document
	result, err := collection.InsertOne(ctx, newEntry)
	if err != nil {
		log.Printf("Failed to insert entry: %v", err)
		return
	}

	fmt.Printf("Inserted document with _id: %v\n", result.InsertedID)
}
