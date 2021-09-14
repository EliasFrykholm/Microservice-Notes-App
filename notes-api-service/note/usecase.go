package note

import (
	"context"

	"github.com/EliasFrykholm/Microservices-keep-clone/notes-api-service/models"
)

type UseCase interface {
	CreateNote(ctx context.Context, title, content string) error
	GetNotes(ctx context.Context) ([]*models.Note, error)
	DeleteNote(ctx context.Context, id string) error
	UpdateNote(ctx context.Context, id, title, content string) error
}
