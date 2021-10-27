import Note from '../Models/Note'
import NoteDescription from '../Models/NoteDescription'
import NoteType from '../Models/NoteType'
import { NOTES_ENDPOINT, NOTE_ENDPOINT } from './Endpoints'

export const fetchNotes = async (
  token: string,
  typeFilter?: NoteType,
  stringFilter?: string,
) => {
  const url = new URL(NOTES_ENDPOINT)
  if (stringFilter) url.searchParams.append('includes', stringFilter)
  if (typeFilter !== undefined)
    url.searchParams.append('type', typeFilter.toString())
  const response = await fetch(url.toString(), {
    headers: { Authorization: `Bearer ${token}` },
  })
  return response.json()
}

export const createNote = async (token: string, data: NoteDescription) => {
  const response = await fetch(NOTE_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  })
  return response.json()
}

export const deleteNote = async (token: string, id: string) => {
  const response = await fetch(NOTE_ENDPOINT, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ id }),
  })
  return response.ok
}

export const updateNote = async (token: string, data: Note) => {
  const response = await fetch(NOTE_ENDPOINT, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  })
  return response.json()
}
