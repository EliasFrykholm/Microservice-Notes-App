package models

type Note struct {
	ID          string        `json:"id" bson:"_id,omitempty"`
	Owner       string        `json:"owner,omitempty" bson:"owner"`
	Title       string        `json:"title" bson:"title"`
	TextContent string        `json:"textContent,omitempty" bson:"textContent,omitempty"`
	ListContent []ListElement `json:"listContent,omitempty" bson:"listContent,omitempty"`
	Created     string        `json:"created,omitempty" bson:"created"`
	Color       string        `json:"color,omitempty" bson:"color,omitempty"`
	Type        int           `json:"type" bson:"type"`
}

type ListElement struct {
	Name    string `json:"name" bson:"name"`
	Checked bool   `json:"checked,omitempty" bson:"checked,omitempty"`
}
