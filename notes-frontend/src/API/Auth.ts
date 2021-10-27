import {
  LOGIN_ENDPOINT,
  REFRESH_TOKEN_ENDPOINT,
  SIGNUP_ENDPOINT,
  VALIDATE_TOKEN_ENDPOINT,
} from './Endpoints'
import { UserCredentials, UserInfo } from '../Models/User'

export const Login = async (data: UserCredentials) => {
  const response = await fetch(LOGIN_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  return response.json()
}

export const SignUp = async (data: UserInfo) => {
  const response = await fetch(SIGNUP_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  })
  return response.ok
}

export const ValidateToken = async (token: string) => {
  const response = await fetch(VALIDATE_TOKEN_ENDPOINT, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
  return response.ok
}

export const RefreshToken = async (token: string) => {
  const response = await fetch(REFRESH_TOKEN_ENDPOINT, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  })
  return response.json()
}
