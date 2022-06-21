export interface repo {
  name: string
  description: string
  url: string
  createdAt: string
  updatedAt: string
  primaryLanguage: {
    name: string
    color: string
  }
  stargazers: {
    totalCount: number
  }
}
