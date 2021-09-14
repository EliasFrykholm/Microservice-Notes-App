package mongo

import (
	"context"

	"github.com/EliasFrykholm/Microservices-keep-clone/notes-api-service/models"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

type Note struct {
	ID      primitive.ObjectID `bson:"_id,omitempty"`
	Title   string             `bson:"title"`
	Content string             `bson:"content"`
}

type NoteRepository struct {
	db *mongo.Collection
}

func NewNoteRepository(db *mongo.Database, collection string) *NoteRepository {
	return &NoteRepository{
		db: db.Collection(collection),
	}
}

func (r NoteRepository) CreateNote(ctx context.Context, note *models.Note) error {
	model := toModel(note)

	res, err := r.db.InsertOne(ctx, model)
	if err != nil {
		return err
	}

	note.ID = res.InsertedID.(primitive.ObjectID).Hex()
	return nil
}

func (r NoteRepository) GetNotes(ctx context.Context) ([]*models.Note, error) {
	cur, err := r.db.Find(ctx, bson.M{})
	defer cur.Close(ctx)

	if err != nil {
		return nil, err
	}

	out := make([]*Note, 0)

	for cur.Next(ctx) {
		note := new(Note)
		err := cur.Decode(note)
		if err != nil {
			return nil, err
		}

		out = append(out, note)
	}
	if err := cur.Err(); err != nil {
		return nil, err
	}

	return toNotes(out), nil
}

func toModel(n *models.Note) *Note {

	return &Note{
		Title:   n.Title,
		Content: n.Content,
	}
}

func toNote(n *Note) *models.Note {
	return &models.Note{
		ID:      n.ID.Hex(),
		Title:   n.Title,
		Content: n.Content,
	}
}

func toNotes(notes []*Note) []*models.Note {
	out := make([]*models.Note, len(notes))

	for i, n := range notes {
		out[i] = toNote(n)
	}

	return out
}
