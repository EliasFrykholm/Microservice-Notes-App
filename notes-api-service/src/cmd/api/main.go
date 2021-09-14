package main

import (
	"fmt"
	"log"

	"github.com/EliasFrykholm/Microservices-keep-clone/notes-api-service/src/config"
	"github.com/EliasFrykholm/Microservices-keep-clone/notes-api-service/src/server"
	"github.com/spf13/viper"
)

func main() {
	fmt.Println("Starting service...")
	if err := config.Init(); err != nil {
		log.Fatalf("%s", err.Error())
	}

	app := server.NewApp()

	if err := app.Run(viper.GetString("port")); err != nil {
		log.Fatalf("%s", err.Error())
	}
}
