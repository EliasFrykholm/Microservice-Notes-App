package mongo

import (
	"context"

	"github.com/EliasFrykholm/Microservices-keep-clone/notes-api-service/src/models"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
)

type NoteRepository struct {
	db *mongo.Collection
}

func NewNoteRepository(db *mongo.Database, collection string) *NoteRepository {
	return &NoteRepository{
		db: db.Collection(collection),
	}
}

func (r NoteRepository) CreateNote(ctx context.Context, note *models.Note) error {

	res, err := r.db.InsertOne(ctx, note)
	if err != nil {
		return err
	}

	note.ID = res.InsertedID.(primitive.ObjectID).Hex()
	return nil
}

func (r NoteRepository) GetNotes(ctx context.Context, user, includes string, noteType int) ([]*models.Note, error) {
	cur, err := r.db.Find(ctx, bson.M{
		"owner": user,
		"$or": bson.A{
			bson.M{"title": bson.M{"$regex": ".*" + includes + ".*"}},
			bson.M{"content": bson.M{"$regex": ".*" + includes + ".*"}},
		},
	})
	defer cur.Close(ctx)

	if err != nil {
		return nil, err
	}

	out := make([]*models.Note, 0)

	for cur.Next(ctx) {
		note := new(models.Note)
		err := cur.Decode(note)
		if err != nil {
			return nil, err
		}

		out = append(out, note)
	}
	if err := cur.Err(); err != nil {
		return nil, err
	}

	return out, nil
}

func (r NoteRepository) DeleteNote(ctx context.Context, user, id string) error {
	objID, err := primitive.ObjectIDFromHex(id)
	if err != nil {
		return err
	}
	_, err = r.db.DeleteOne(ctx, bson.M{"_id": objID, "owner": user})
	return err
}

func (r NoteRepository) UpdateNote(ctx context.Context, note *models.Note) error {
	objID, err := primitive.ObjectIDFromHex(note.ID)
	if err != nil {
		return err
	}
	note.ID = ""
	_, err = r.db.ReplaceOne(ctx, bson.M{"_id": objID, "owner": note.Owner}, note)
	if err != nil {
		return err
	}
	return nil
}
