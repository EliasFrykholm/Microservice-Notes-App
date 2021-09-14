package mock

import (
	"context"

	"github.com/EliasFrykholm/Microservices-keep-clone/notes-api-service/models"
	"github.com/stretchr/testify/mock"
)

type NoteStorageMock struct {
	mock.Mock
}

func (s *NoteStorageMock) CreateNote(ctx context.Context, note *models.Note) error {
	args := s.Called(note)

	return args.Error(0)
}

func (s *NoteStorageMock) GetNotes(ctx context.Context) ([]*models.Note, error) {
	args := s.Called()

	return args.Get(0).([]*models.Note), args.Error(1)
}

func (s *NoteStorageMock) DeleteNote(ctx context.Context, id string) error {
	args := s.Called(id)

	return args.Error(0)
}

func (s *NoteStorageMock) UpdateNote(ctx context.Context, id string, note *models.Note) error {
	args := s.Called(id, note)

	return args.Error(0)
}
