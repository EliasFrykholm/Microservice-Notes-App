export type ListNoteContent = {
  name?: string
  checked?: boolean
}

interface NoteDescription {
  title: string
  content: string | ListNoteContent[]
  color?: string
}

export default NoteDescription
