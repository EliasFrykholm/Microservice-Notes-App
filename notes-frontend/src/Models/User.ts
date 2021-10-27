export type UserInfo = {
  fullName: string
  username: string
  password: string
}

export type UserCredentials = {
  username: string
  password: string
}

export type UserData = {
  jti: string
  sub: string
  exp: Date
}
