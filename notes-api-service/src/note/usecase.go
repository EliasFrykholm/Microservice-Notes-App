package note

import (
	"context"

	"github.com/EliasFrykholm/Microservices-keep-clone/notes-api-service/src/models"
)

type UseCase interface {
	CreateNote(ctx context.Context, user, title, content string) error
	GetNotes(ctx context.Context, user string) ([]*models.Note, error)
	DeleteNote(ctx context.Context, user, id string) error
	UpdateNote(ctx context.Context, user, id, title, content string) error
}
