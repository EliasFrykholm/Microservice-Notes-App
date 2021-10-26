import NoteType from './NoteType'

export type ListNoteContent = {
  name?: string
  checked?: boolean
}

interface NoteDescription {
  title: string
  textContent?: string
  listContent?: ListNoteContent[]
  color?: string
  type: NoteType
}

export default NoteDescription
