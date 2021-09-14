package http

import (
	"github.com/EliasFrykholm/Microservices-keep-clone/notes-api-service/note"
	"github.com/gorilla/mux"
)

func RegisterHTTPEndpoints(router *mux.Router, uc note.UseCase) {
	h := NewHandler(uc)

	router.HandleFunc("/note", h.Create).Methods("POST")
	router.HandleFunc("/notes", h.Get).Methods("GET")
}
