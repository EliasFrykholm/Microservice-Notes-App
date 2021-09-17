package usecase

import (
	"context"

	"github.com/EliasFrykholm/Microservices-keep-clone/notes-api-service/src/models"
	"github.com/stretchr/testify/mock"
)

type NoteUseCaseMock struct {
	mock.Mock
}

func (m NoteUseCaseMock) CreateNote(ctx context.Context, user, title, content string) error {
	args := m.Called(user, title, content)

	return args.Error(0)
}

func (m NoteUseCaseMock) GetNotes(ctx context.Context, user string) ([]*models.Note, error) {
	args := m.Called(user)

	return args.Get(0).([]*models.Note), args.Error(1)
}

func (m NoteUseCaseMock) DeleteNote(ctx context.Context, user, id string) error {
	args := m.Called(user, id)

	return args.Error(0)
}

func (m NoteUseCaseMock) UpdateNote(ctx context.Context, user, id, title, content string) error {
	args := m.Called(user, id, title, content)

	return args.Error(0)
}
