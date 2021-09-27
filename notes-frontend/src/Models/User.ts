export type UserInfo = {
  fullName: string
  username: string
  password: string
}

export type UserCredentials = {
  username: string
  password: string
}

export type LoggedInUser = {
  token: string
  id: string
  username: string
}
