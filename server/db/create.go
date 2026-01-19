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
	collection := client.Database("gress").Collection("entries")

	newEntry := Entry{
		Title:   "My First Post",
		Content: "This is some content for the database.",
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