import NoteDescription from './NoteDescription'
import NoteType from './NoteType'

interface Note extends NoteDescription {
  id: string
  created: string
  type: NoteType
}

export default Note
