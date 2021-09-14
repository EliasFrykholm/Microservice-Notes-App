package http

import (
	"github.com/EliasFrykholm/Microservices-keep-clone/notes-api-service/src/note"
	"github.com/gorilla/mux"
)

func RegisterHTTPEndpoints(router *mux.Router, uc note.UseCase) {
	h := NewHandler(uc)

	router.HandleFunc("/note", h.Create).Methods("POST")
	router.HandleFunc("/notes", h.Get).Methods("GET")
	router.HandleFunc("/note", h.Delete).Methods("DELETE")
	router.HandleFunc("/note", h.Update).Methods("PUT")
}
