package note

import (
	"context"

	"github.com/EliasFrykholm/Microservices-keep-clone/notes-api-service/models"
)

type Repository interface {
	CreateNote(ctx context.Context, note *models.Note) error
	GetNotes(ctx context.Context) ([]*models.Note, error)
}
