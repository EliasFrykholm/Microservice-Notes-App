export type ListNoteContent = {
  name?: string
  checked?: boolean
}

interface NoteDescription {
  Title: string
  Content: string | ListNoteContent[]
}

export default NoteDescription
