package models

type Note struct {
	ID      string `json:"id" bson:"_id,omitempty"`
	Owner   string `json:"owner,omitempty" bson:"owner"`
	Title   string `json:"title" bson:"title"`
	Content string `json:"content" bson:"content"`
	Created string `json:"created,omitempty" bson:"created"`
	Color   string `json:"color,omitempty" bson:"color,omitempty"`
	Type    int    `json:"type" bson:"type"`
}
