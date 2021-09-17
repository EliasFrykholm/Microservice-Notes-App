package usecase

import (
	"context"

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

func (n NoteUseCase) CreateNote(ctx context.Context, user, title, content string) error {
	note := &models.Note{
		Owner:   user,
		Title:   title,
		Content: content,
	}

	return n.noteRepo.CreateNote(ctx, note)
}

func (n NoteUseCase) GetNotes(ctx context.Context, user string) ([]*models.Note, error) {
	return n.noteRepo.GetNotes(ctx, user)
}

func (n NoteUseCase) DeleteNote(ctx context.Context, user, id string) error {
	return n.noteRepo.DeleteNote(ctx, user, id)
}

func (n NoteUseCase) UpdateNote(ctx context.Context, user, id, title, content string) error {
	note := &models.Note{
		Owner:   user,
		Title:   title,
		Content: content,
	}

	return n.noteRepo.UpdateNote(ctx, id, note)
}
