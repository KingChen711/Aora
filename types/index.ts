export type User = {
  $id: string
  username: string
  email: string
  avatar: string
  accountId: string
}

export type Post = {
  $id: string
  title: string
  thumbnail: string
  prompt: string
  video: string
  creator: User
}
