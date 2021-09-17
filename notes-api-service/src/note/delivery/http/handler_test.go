package http

import (
	"bytes"
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"testing"

	"github.com/EliasFrykholm/Microservices-keep-clone/notes-api-service/src/models"
	"github.com/EliasFrykholm/Microservices-keep-clone/notes-api-service/src/note/usecase"
	"github.com/EliasFrykholm/Microservices-keep-clone/notes-api-service/src/utils"
	"github.com/gorilla/mux"
	"github.com/stretchr/testify/assert"
)

func TestCreate(t *testing.T) {

	router := mux.NewRouter()

	uc := new(usecase.NoteUseCaseMock)
	jwt := new(utils.JwtHandlerMock)

	RegisterHTTPEndpoints(router, uc, jwt)

	inp := &createInput{
		Title:   "testtitle",
		Content: "testcontent",
	}

	body, err := json.Marshal(inp)
	assert.NoError(t, err)

	uc.On("CreateNote", "test", inp.Title, inp.Content).Return(nil)

	w := httptest.NewRecorder()
	req, _ := http.NewRequest("POST", "/note", bytes.NewBuffer(body))
	router.ServeHTTP(w, req)

	assert.Equal(t, 200, w.Code)
}

func TestGet(t *testing.T) {

	r := mux.NewRouter()
	uc := new(usecase.NoteUseCaseMock)
	jwt := new(utils.JwtHandlerMock)

	RegisterHTTPEndpoints(r, uc, jwt)

	notes := make([]*models.Note, 5)
	for i := 0; i < 5; i++ {
		notes[i] = &models.Note{
			Owner:   "test",
			ID:      "id",
			Title:   "title",
			Content: "content",
		}
	}

	uc.On("GetNotes", "test").Return(notes, nil)

	w := httptest.NewRecorder()
	req, _ := http.NewRequest("GET", "/notes", nil)
	r.ServeHTTP(w, req)

	expectedOut := &getResponse{Notes: toNotes(notes)}

	expectedOutBody, err := json.Marshal(expectedOut)
	assert.NoError(t, err)

	assert.Equal(t, 200, w.Code)
	assert.Equal(t, string(expectedOutBody)+"\n", w.Body.String())
}

func TestDelete(t *testing.T) {

	r := mux.NewRouter()
	uc := new(usecase.NoteUseCaseMock)
	jwt := new(utils.JwtHandlerMock)

	RegisterHTTPEndpoints(r, uc, jwt)

	inp := &deleteInput{
		ID: "id",
	}

	body, err := json.Marshal(inp)
	assert.NoError(t, err)

	uc.On("DeleteNote", "test", inp.ID).Return(nil)

	w := httptest.NewRecorder()
	req, _ := http.NewRequest("DELETE", "/note", bytes.NewBuffer(body))
	r.ServeHTTP(w, req)

	assert.Equal(t, 200, w.Code)
}

func TestUpdate(t *testing.T) {
	r := mux.NewRouter()
	uc := new(usecase.NoteUseCaseMock)
	jwt := new(utils.JwtHandlerMock)

	RegisterHTTPEndpoints(r, uc, jwt)

	inp := &updateInput{
		ID:      "id",
		Title:   "newTestTitle",
		Content: "newTestContent",
	}

	body, err := json.Marshal(inp)
	assert.NoError(t, err)

	uc.On("UpdateNote", "test", inp.ID, inp.Title, inp.Content).Return(nil)

	w := httptest.NewRecorder()
	req, _ := http.NewRequest("PUT", "/note", bytes.NewBuffer(body))
	r.ServeHTTP(w, req)

	assert.Equal(t, 200, w.Code)
}
