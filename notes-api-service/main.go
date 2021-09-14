package main

import (
	"context"
	"encoding/json"
	"fmt"
	"net/http"
	"time"

	"github.com/gorilla/mux"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

type Note struct {
	ID      primitive.ObjectID `bson:"_id,omitempty", json:"id,omitempty"`
	Title   string             `json:"title,omitempty", bson:"title,omitempty"`
	Content string             `json:"content,omitempty", bson:"content,omitempty"`
}

var client *mongo.Client

func CreateNoteEndpoint(response http.ResponseWriter, request *http.Request) {
	response.Header().Add("content-type", "application/json")
	var note Note
	json.NewDecoder(request.Body).Decode(&note)
	fmt.Println(request.Body)
	collection := client.Database("keepclone").Collection("notes")
	ctx, _ := context.WithTimeout(context.Background(), 10*time.Second)
	result, _ := collection.InsertOne(ctx, note)
	json.NewEncoder(response).Encode(result)
}

func GetNotesEndpoint(response http.ResponseWriter, request *http.Request) {
	response.Header().Add("content-type", "application/json")
	var notes []Note
	collection := client.Database("keepclone").Collection(("notes"))
	ctx, _ := context.WithTimeout(context.Background(), 10*time.Second)
	cursor, err := collection.Find(ctx, bson.M{})
	if err != nil {
		response.WriteHeader(http.StatusInternalServerError)
		response.Write([]byte(`{"message":` + err.Error() + `}`))
		return
	}
	defer cursor.Close(ctx)
	for cursor.Next(ctx) {
		var note Note
		cursor.Decode(&note)
		fmt.Println(note)
		notes = append(notes, note)
	}
	if err := cursor.Err(); err != nil {
		response.WriteHeader(http.StatusInternalServerError)
		response.Write([]byte(`{"message":` + err.Error() + `}`))
		return
	}
	json.NewEncoder(response).Encode(notes)
}

func main() {
	fmt.Println("Starting application...")
	client, _ = mongo.NewClient(options.Client().ApplyURI("mongodb://localhost:27017"))
	ctx, _ := context.WithTimeout(context.Background(), 10*time.Second)
	client.Connect(ctx)

	router := mux.NewRouter()
	router.HandleFunc("/note", CreateNoteEndpoint).Methods("POST")
	router.HandleFunc("/notes", GetNotesEndpoint).Methods("GET")
	http.ListenAndServe(":12345", router)

}
