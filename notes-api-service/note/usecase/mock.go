package usecase

import (
	"context"

	"github.com/EliasFrykholm/Microservices-keep-clone/notes-api-service/models"
	"github.com/stretchr/testify/mock"
)

type NoteUseCaseMock struct {
	mock.Mock
}

func (m NoteUseCaseMock) CreateNote(ctx context.Context, title, content string) error {
	args := m.Called(title, content)

	return args.Error(0)
}

func (m NoteUseCaseMock) GetNotes(ctx context.Context) ([]*models.Note, error) {
	args := m.Called()

	return args.Get(0).([]*models.Note), args.Error(1)
}

func (m NoteUseCaseMock) DeleteNote(ctx context.Context, id string) error {
	args := m.Called(id)

	return args.Error(0)
}

func (m NoteUseCaseMock) UpdateNote(ctx context.Context, id, title, content string) error {
	args := m.Called(id, title, content)

	return args.Error(0)
}
