package http

import (
	"encoding/json"
	"net/http"

	"github.com/EliasFrykholm/Microservices-keep-clone/notes-api-service/models"
	"github.com/EliasFrykholm/Microservices-keep-clone/notes-api-service/note"
)

type Note struct {
	ID      string `json:"id"`
	Title   string `json:"title"`
	Content string `json:"content"`
}

type Handler struct {
	useCase note.UseCase
}

func NewHandler(useCase note.UseCase) *Handler {
	return &Handler{
		useCase: useCase,
	}
}

type createInput struct {
	Title   string `json:"title"`
	Content string `json:"content"`
}

func (h *Handler) Create(response http.ResponseWriter, request *http.Request) {
	inp := new(createInput)
	if err := json.NewDecoder(request.Body).Decode(&inp); err != nil {
		response.WriteHeader(http.StatusBadRequest)
		response.Write([]byte(`{"message":` + err.Error() + `}`))
		return
	}

	err := h.useCase.CreateNote(request.Context(), inp.Title, inp.Content)

	if err != nil {
		response.WriteHeader(http.StatusInternalServerError)
		response.Write([]byte(`{"message":` + err.Error() + `}`))
		return
	}
	response.WriteHeader(http.StatusOK)
}

type getResponse struct {
	Notes []*Note `json:"notes"`
}

func (h *Handler) Get(response http.ResponseWriter, request *http.Request) {
	response.Header().Add("content-type", "application/json")
	notes, err := h.useCase.GetNotes(request.Context())
	if err != nil {
		response.WriteHeader(http.StatusInternalServerError)
		response.Write([]byte(`{"message":` + err.Error() + `}`))
		return
	}

	json.NewEncoder(response).Encode(getResponse{Notes: toNotes(notes)})
}

type deleteInput struct {
	ID string `json:"id"`
}

func (h *Handler) Delete(response http.ResponseWriter, request *http.Request) {
	inp := new(deleteInput)
	if err := json.NewDecoder(request.Body).Decode(&inp); err != nil {
		response.WriteHeader(http.StatusBadRequest)
		response.Write([]byte(`{"message":` + err.Error() + `}`))
		return
	}

	err := h.useCase.DeleteNote(request.Context(), inp.ID)
	if err != nil {
		response.WriteHeader(http.StatusInternalServerError)
		response.Write([]byte(`{"message":` + err.Error() + `}`))
		return
	}
	response.WriteHeader(http.StatusOK)
}

type updateInput struct {
	ID      string `json:"id"`
	Title   string `json:"title"`
	Content string `json:"content"`
}

func (h *Handler) Update(response http.ResponseWriter, request *http.Request) {
	inp := new(updateInput)
	if err := json.NewDecoder(request.Body).Decode(&inp); err != nil {
		response.WriteHeader(http.StatusBadRequest)
		response.Write([]byte(`{"message":` + err.Error() + `}`))
		return
	}

	err := h.useCase.UpdateNote(request.Context(), inp.ID, inp.Title, inp.Content)
	if err != nil {
		response.WriteHeader(http.StatusInternalServerError)
		response.Write([]byte(`{"message":` + err.Error() + `}`))
		return
	}
	response.WriteHeader(http.StatusOK)
}

func toNotes(notes []*models.Note) []*Note {
	out := make([]*Note, len(notes))

	for i, n := range notes {
		out[i] = toNote(n)
	}

	return out
}

func toNote(n *models.Note) *Note {
	return &Note{
		ID:      n.ID,
		Title:   n.Title,
		Content: n.Content,
	}
}
