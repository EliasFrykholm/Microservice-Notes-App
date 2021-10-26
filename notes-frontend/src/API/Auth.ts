import {
  LOGIN_ENDPOINT,
  SIGNUP_ENDPOINT,
  VALIDATE_TOKEN_ENDPOINT,
} from './Endpoints'
import { UserCredentials, UserInfo } from '../Models/User'

export const Login = async (data: UserCredentials) => {
  const response = await fetch(LOGIN_ENDPOINT, {
    method: 'POST',
    // cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    // credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json',
    },
    // referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  })
  return response.json() // parses JSON response into native JavaScript objects
}

export const SignUp = async (data: UserInfo) => {
  const response = await fetch(SIGNUP_ENDPOINT, {
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

export const ValidateToken = async (token: string) => {
  const response = await fetch(VALIDATE_TOKEN_ENDPOINT, {
    method: 'GET',
    // cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
    // credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
  return response.ok // parses JSON response into native JavaScript objects
}
