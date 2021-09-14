package main

import (
	"log"

	"github.com/EliasFrykholm/Microservices-keep-clone/notes-api-service/config"
	"github.com/EliasFrykholm/Microservices-keep-clone/notes-api-service/server"
	"github.com/spf13/viper"
)

func main() {
	if err := config.Init(); err != nil {
		log.Fatalf("%s", err.Error())
	}

	app := server.NewApp()

	if err := app.Run(viper.GetString("port")); err != nil {
		log.Fatalf("%s", err.Error())
	}
}
