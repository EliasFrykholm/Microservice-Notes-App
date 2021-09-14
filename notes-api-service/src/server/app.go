package server

import (
	"context"
	"fmt"
	"log"
	"net/http"
	"os"
	"os/signal"
	"time"

	"github.com/EliasFrykholm/Microservices-keep-clone/notes-api-service/src/note"
	notehttp "github.com/EliasFrykholm/Microservices-keep-clone/notes-api-service/src/note/delivery/http"
	notemongo "github.com/EliasFrykholm/Microservices-keep-clone/notes-api-service/src/note/repository/mongo"
	noteusecase "github.com/EliasFrykholm/Microservices-keep-clone/notes-api-service/src/note/usecase"
	"github.com/gorilla/mux"
	"github.com/spf13/viper"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

type App struct {
	httpServer *http.Server

	noteUC note.UseCase
}

func NewApp() *App {
	db := initDB()

	noteRepo := notemongo.NewNoteRepository(db, viper.GetString("mongo.note_collection"))

	return &App{
		noteUC: noteusecase.NewNoteUseCase(noteRepo),
	}
}

func (a *App) Run(port string) error {

	router := mux.NewRouter()

	notehttp.RegisterHTTPEndpoints(router, a.noteUC)

	a.httpServer = &http.Server{
		Addr:           ":" + port,
		Handler:        router,
		ReadTimeout:    10 * time.Second,
		WriteTimeout:   10 * time.Second,
		MaxHeaderBytes: 1 << 20,
	}

	go func() {
		if err := a.httpServer.ListenAndServe(); err != nil {
			log.Fatalf("Failed to listen and serve: %+v", err)
		}
	}()

	fmt.Println("Successfully started server")

	quit := make(chan os.Signal, 1)
	signal.Notify(quit, os.Interrupt, os.Interrupt)

	<-quit

	ctx, shutdown := context.WithTimeout(context.Background(), 5*time.Second)
	defer shutdown()

	return a.httpServer.Shutdown(ctx)
}

func initDB() *mongo.Database {
	client, err := mongo.NewClient(options.Client().ApplyURI(viper.GetString("MONGO_URI")))
	if err != nil {
		log.Fatalf("Error occured while establishing connection to mongoDB")
	}
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	err = client.Connect(ctx)
	if err != nil {
		log.Fatal(err)
	}

	err = client.Ping(context.Background(), nil)
	if err != nil {
		log.Fatal(err)
	}

	return client.Database(viper.GetString("mongo.name"))
}
