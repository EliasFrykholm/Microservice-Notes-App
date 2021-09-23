import NoteDescription from './NoteDescription'
import NoteType from './NoteType'

interface Note extends NoteDescription {
  Id: string
  Created: Date
  Type: NoteType
}

export default Note
