export type ListNoteContent = {
  name?: string
  checked?: boolean
}

interface NoteDescription {
  Title: string
  Content: string | ListNoteContent[]
  Color?: string
}

export default NoteDescription
