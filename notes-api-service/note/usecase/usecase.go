package usecase

import (
	"context"

	"github.com/EliasFrykholm/Microservices-keep-clone/notes-api-service/models"
	"github.com/EliasFrykholm/Microservices-keep-clone/notes-api-service/note"
)

type NoteUseCase struct {
	noteRepo note.Repository
}

func NewNoteUseCase(noteRepo note.Repository) *NoteUseCase {
	return &NoteUseCase{
		noteRepo: noteRepo,
	}
}

func (n NoteUseCase) CreateNote(ctx context.Context, title, content string) error {
	note := &models.Note{
		Title:   title,
		Content: content,
	}

	return n.noteRepo.CreateNote(ctx, note)
}

func (n NoteUseCase) GetNotes(ctx context.Context) ([]*models.Note, error) {
	return n.noteRepo.GetNotes(ctx)
}

func (n NoteUseCase) DeleteNote(ctx context.Context, id string) error {
	return n.noteRepo.DeleteNote(ctx, id)
}

func (n NoteUseCase) UpdateNote(ctx context.Context, id, title, content string) error {
	note := &models.Note{
		Title:   title,
		Content: content,
	}

	return n.noteRepo.UpdateNote(ctx, id, note)
}
