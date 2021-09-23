import NoteDescription from './NoteDescription'

interface Note extends NoteDescription {
  Id: string
  Created: Date
}

export default Note
