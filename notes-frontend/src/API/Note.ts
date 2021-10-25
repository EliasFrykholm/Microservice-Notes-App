import Note from '../Models/Note'
import NoteDescription from '../Models/NoteDescription'
import NoteType from '../Models/NoteType'
import { NOTES_ENDPOINT, NOTE_ENDPOINT } from './Endpoints'

export const fetchNotes = async (
  token: string,
  typeFilter?: NoteType,
  stringFilter?: string,
) => {
  const response = await fetch(NOTES_ENDPOINT, {
    headers: { Authorization: `Bearer ${token}` },
  })
  return response.json() // parses JSON response into native JavaScript objects
}

export const createNote = async (token: string, data: NoteDescription) => {
  const response = await fetch(NOTE_ENDPOINT, {
    method: 'POST',
    // cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    // credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    // referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  })
  return response.json() // parses JSON response into native JavaScript objects
}

export const deleteNote = async (token: string, id: string) => {
  const response = await fetch(NOTE_ENDPOINT, {
    method: 'POST',
    // cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    // credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    // referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify({ id }), // body data type must match "Content-Type" header
  })
  return response.ok
}

export const updateNote = async (token: string, data: Note) => {
  const response = await fetch(NOTE_ENDPOINT, {
    method: 'POST',
    // cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    // credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    // referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify({ data }), // body data type must match "Content-Type" header
  })
  return response.ok
}
