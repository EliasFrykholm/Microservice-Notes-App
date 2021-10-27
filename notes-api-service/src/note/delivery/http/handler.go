package http

import (
	"encoding/json"
	"net/http"

	"github.com/EliasFrykholm/Microservices-keep-clone/notes-api-service/src/models"
	"github.com/EliasFrykholm/Microservices-keep-clone/notes-api-service/src/note"
	"github.com/EliasFrykholm/Microservices-keep-clone/notes-api-service/src/utils"
)

type Handler struct {
	useCase    note.UseCase
	jwtHandler utils.JwtHandlerInterface
}

func NewHandler(useCase note.UseCase, jwtHandler utils.JwtHandlerInterface) *Handler {
	return &Handler{
		useCase:    useCase,
		jwtHandler: jwtHandler,
	}
}

type createResponse struct {
	Id      string `json:"id"`
	Created string `json:"created"`
}

func (h *Handler) Create(response http.ResponseWriter, request *http.Request) {
	tokenAuth, err := h.jwtHandler.ExtractTokenMetadata(request)
	if err != nil {
		response.WriteHeader(http.StatusUnauthorized)
		response.Write([]byte(`{"message":` + err.Error() + `}`))
		return
	}

	inp := new(models.Note)
	if err := json.NewDecoder(request.Body).Decode(&inp); err != nil {
		response.WriteHeader(http.StatusBadRequest)
		response.Write([]byte(`{"message":` + err.Error() + `}`))
		return
	}

	err = h.useCase.CreateNote(request.Context(), tokenAuth.UserId, inp)

	if err != nil {
		response.WriteHeader(http.StatusInternalServerError)
		response.Write([]byte(`{"message":` + err.Error() + `}`))
		return
	}
	response.WriteHeader(http.StatusOK)
	json.NewEncoder(response).Encode(createResponse{Id: inp.ID, Created: inp.Created})
}

func (h *Handler) Get(response http.ResponseWriter, request *http.Request) {
	tokenAuth, err := h.jwtHandler.ExtractTokenMetadata(request)
	if err != nil {
		response.WriteHeader(http.StatusUnauthorized)
		response.Write([]byte(`{"message":` + err.Error() + `}`))
		return
	}

	stringFilter := request.URL.Query().Get("includes")
	typeFilter := request.URL.Query().Get("type")

	response.Header().Add("content-type", "application/json")
	notes, err := h.useCase.GetNotes(request.Context(), tokenAuth.UserId, stringFilter, typeFilter)
	if err != nil {
		response.WriteHeader(http.StatusInternalServerError)
		response.Write([]byte(`{"message":` + err.Error() + `}`))
		return
	}

	json.NewEncoder(response).Encode(notes)
}

type deleteInput struct {
	ID string `json:"id"`
}

func (h *Handler) Delete(response http.ResponseWriter, request *http.Request) {
	tokenAuth, err := h.jwtHandler.ExtractTokenMetadata(request)
	if err != nil {
		response.WriteHeader(http.StatusUnauthorized)
		response.Write([]byte(`{"message":` + err.Error() + `}`))
		return
	}

	inp := new(deleteInput)
	if err := json.NewDecoder(request.Body).Decode(&inp); err != nil {
		response.WriteHeader(http.StatusBadRequest)
		response.Write([]byte(`{"message":` + err.Error() + `}`))
		return
	}

	err = h.useCase.DeleteNote(request.Context(), tokenAuth.UserId, inp.ID)
	if err != nil {
		response.WriteHeader(http.StatusInternalServerError)
		response.Write([]byte(`{"message":` + err.Error() + `}`))
		return
	}
	response.WriteHeader(http.StatusOK)
}

type updateResponse struct {
	Created string `json:"created"`
}

func (h *Handler) Update(response http.ResponseWriter, request *http.Request) {
	tokenAuth, err := h.jwtHandler.ExtractTokenMetadata(request)
	if err != nil {
		response.WriteHeader(http.StatusUnauthorized)
		response.Write([]byte(`{"message":` + err.Error() + `}`))
		return
	}

	inp := new(models.Note)
	if err := json.NewDecoder(request.Body).Decode(&inp); err != nil {
		response.WriteHeader(http.StatusBadRequest)
		response.Write([]byte(`{"message":` + err.Error() + `}`))
		return
	}

	err = h.useCase.UpdateNote(request.Context(), tokenAuth.UserId, inp)
	if err != nil {
		response.WriteHeader(http.StatusInternalServerError)
		response.Write([]byte(`{"message":` + err.Error() + `}`))
		return
	}
	response.WriteHeader(http.StatusOK)
	json.NewEncoder(response).Encode(updateResponse{Created: inp.Created})
}
