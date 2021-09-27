package http

import (
	"github.com/EliasFrykholm/Microservices-keep-clone/notes-api-service/src/note"
	"github.com/EliasFrykholm/Microservices-keep-clone/notes-api-service/src/utils"
	"github.com/gorilla/mux"
)

func RegisterHTTPEndpoints(router *mux.Router, uc note.UseCase, jwtHandler utils.JwtHandlerInterface) {
	h := NewHandler(uc, jwtHandler)

	router.HandleFunc("/note", h.Create).Methods("POST", "OPTIONS")
	router.HandleFunc("/notes", h.Get).Methods("GET", "OPTIONS")
	router.HandleFunc("/note", h.Delete).Methods("DELETE", "OPTIONS")
	router.HandleFunc("/note", h.Update).Methods("PUT", "OPTIONS")
}
