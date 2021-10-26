package usecase

import (
	"context"
	"time"

	"github.com/EliasFrykholm/Microservices-keep-clone/notes-api-service/src/models"
	"github.com/EliasFrykholm/Microservices-keep-clone/notes-api-service/src/note"
)

type NoteUseCase struct {
	noteRepo note.Repository
}

func NewNoteUseCase(noteRepo note.Repository) *NoteUseCase {
	return &NoteUseCase{
		noteRepo: noteRepo,
	}
}

func (n NoteUseCase) CreateNote(ctx context.Context, user string, note *models.Note) error {
	note.Created = time.Now().Format(time.RFC3339)
	note.Owner = user
	return n.noteRepo.CreateNote(ctx, note)
}

func (n NoteUseCase) GetNotes(ctx context.Context, user string, includes string, noteType int) ([]*models.Note, error) {
	return n.noteRepo.GetNotes(ctx, user, includes, noteType)
}

func (n NoteUseCase) DeleteNote(ctx context.Context, user, id string) error {
	return n.noteRepo.DeleteNote(ctx, user, id)
}

func (n NoteUseCase) UpdateNote(ctx context.Context, user string, note *models.Note) error {
	note.Created = time.Now().Format(time.RFC3339)
	note.Owner = user
	return n.noteRepo.UpdateNote(ctx, note)
}
