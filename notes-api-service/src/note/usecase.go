package note

import (
	"context"

	"github.com/EliasFrykholm/Microservices-keep-clone/notes-api-service/src/models"
)

type UseCase interface {
	CreateNote(ctx context.Context, user string, note *models.Note) error
	GetNotes(ctx context.Context, user, includes, noteType string) ([]*models.Note, error)
	DeleteNote(ctx context.Context, user, id string) error
	UpdateNote(ctx context.Context, user string, note *models.Note) error
}
