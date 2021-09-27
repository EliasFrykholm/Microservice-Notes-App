import Note from '../Models/Note'
import NoteType from '../Models/NoteType'
import { NOTES_ENDPOINT, NOTE_ENDPOINT } from './Endpoints'

export const fetchNotes = async (
  typeFilter?: NoteType,
  stringFilter?: string,
) => {
  const response = await fetch(NOTES_ENDPOINT, { credentials: 'include' })
  return response.json() // parses JSON response into native JavaScript objects
}

export const createNote = async (data: Note) => {
  const response = await fetch(NOTE_ENDPOINT, {
    method: 'POST',
    // cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    // credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json',
    },
    // referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  })
  return response.ok // parses JSON response into native JavaScript objects
}

export const deleteNote = async (id: string) => {
  const response = await fetch(NOTE_ENDPOINT, {
    method: 'POST',
    // cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    // credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json',
    },
    // referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify({ id }), // body data type must match "Content-Type" header
  })
  return response.ok
}

export const updateNote = async (data: Note) => {
  const response = await fetch(NOTE_ENDPOINT, {
    method: 'POST',
    // cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    // credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json',
    },
    // referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify({ data }), // body data type must match "Content-Type" header
  })
  return response.ok
}
